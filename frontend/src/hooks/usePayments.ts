'use client';

import { BackendPayment } from '@/types/payment';
import { useState, useEffect } from 'react';
import { buildUrl, endpoints } from '@/config/api';

export function usePayments(userId: number) {
  const [payments, setPayments] = useState<BackendPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchPayments() {
    try {
      setLoading(true);
      // Fetch payment cards from new endpoint
      const response = await fetch(buildUrl(endpoints.paymentCards.getUserPaymentCards(userId)), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = (await response.json()) as BackendPayment[];
      console.log('Fetched payments: ', data);

      // Fetch billing addresses for each payment card
      const paymentsWithAddress = await Promise.all(
        (data || []).map(async (card) => {
          if (card.address_id) {
            try {
              const addressResponse = await fetch(buildUrl(endpoints.addresses.getAddressById(card.address_id)), {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (addressResponse.ok) {
                const address = (await addressResponse.json()) as {
                  street: string;
                  city: string;
                  state: string;
                  zip: string;
                  country?: string;
                };
                return {
                  ...card,
                  billing_street: address.street,
                  billing_city: address.city,
                  billing_state: address.state,
                  billing_zip: address.zip,
                  billing_country: address.country || 'US',
                } as BackendPayment;
              }
            } catch {
              console.log('No billing address found for card');
            }
          }
          return card;
        })
      );

      setPayments(paymentsWithAddress as BackendPayment[]);
    } catch (error) {
      console.error('Fetch payments error: ', error);
      setError('Failed to load payment data.');
    } finally {
      setLoading(false);
    }
  }

  async function addPayment(newPayment: Omit<BackendPayment, 'id' | 'user_id'>) {
    console.log('New payment:', newPayment);
    try {
      const response = await fetch(buildUrl(endpoints.paymentCards.createPaymentCard()), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPayment),
      });
      await fetchPayments(); // refresh list
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Add payment error: ', error);
      setError('Failed to add payment data.');
    }
  }

  async function updatePayment(currentPaymentId: number, updatedPayment: Partial<BackendPayment>) {
    try {
      const response = await fetch(buildUrl(endpoints.paymentCards.updatePaymentCard(currentPaymentId)), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPayment),
      });
      await fetchPayments(); // refresh list
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Update payment error ', error);
      setError('Failed to update payment data.');
    }
  }

  async function deletePayment(currentPaymentId: number) {
    try {
      const response = await fetch(buildUrl(endpoints.paymentCards.deletePaymentCard(currentPaymentId)), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await fetchPayments(); // refresh list
      return response.ok;
    } catch (error) {
      console.error('Delete payment error ', error);
      setError('Failed to delete payment data');
    }
  }

  useEffect(() => {
    if (userId) fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return {
    payments,
    loading,
    error,
    addPayment,
    updatePayment,
    deletePayment,
    fetchPayments,
  };
}
