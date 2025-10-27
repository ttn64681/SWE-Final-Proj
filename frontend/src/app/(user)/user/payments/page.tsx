'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MdDelete, MdEdit, MdCreditCard } from 'react-icons/md';
import { useState, useEffect } from 'react';
import NavBar from '@/components/common/navBar/NavBar';
import { useProfile } from '@/contexts/ProfileContext';
import PaymentCardModal, { PaymentCardFormData } from '@/components/specific/user/PaymentCardModal';
import { buildUrl, endpoints } from '@/config/api';

interface PaymentCard {
  id: number;
  cardNumber: string;
  cardholderName: string;
  paymentCardType: string;
  expirationDate: string;
  isDefault: boolean;
  billingStreet?: string;
  billingCity?: string;
  billingState?: string;
  billingZip?: string;
  billingCountry?: string;
}

interface PaymentCardResponse {
  id: number;
  cardNumber: string;
  cardholderName: string;
  paymentCardType: string;
  expirationDate: string;
  isDefault: boolean;
  billingStreet?: string;
  billingCity?: string;
  billingState?: string;
  billingZip?: string;
  billingCountry?: string;
}

interface BillingAddress {
  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export default function PaymentsPage() {
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'Add' | 'Edit'>('Add');
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [editingCard, setEditingCard] = useState<PaymentCard | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<number>(0);
  const { profilePicUrl } = useProfile();

  // Get user ID from token
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const [, payloadBase64] = token.split('.');
          const decodedPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
          const userData = JSON.parse(decodedPayload);
          setUserId(userData.userId);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }
  }, []);

  // Fetch payment cards
  const fetchPaymentCards = async () => {
    if (!userId) return;

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(buildUrl(`/api/payment-card/user/${userId}`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      const cards = (await response.json()) as PaymentCardResponse[];

      // Payment cards already include billing address fields from the backend
      setPaymentCards(cards as PaymentCard[]);
    } catch (error) {
      console.error('Error fetching payment cards:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPaymentCards();
    }
  }, [userId]);

  // Format card number for display
  const formatCardNumber = (cardNumber: string | undefined): string => {
    if (!cardNumber) return '**** **** **** ****';
    const cleaned = cardNumber.replace(/\s+/g, '');
    if (cleaned.length >= 4) {
      return `**** **** **** ${cleaned.slice(-4)}`;
    }
    return cardNumber;
  };

  // Format expiration date
  const formatExpirationDate = (dateString: string | undefined): string => {
    if (!dateString) return '--/--';
    if (dateString.includes('/')) return dateString;
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${year}`;
  };

  // Handle add card
  const handleAddCard = () => {
    setEditingCardId(null);
    setEditingCard(null);
    setModalMode('Add');
    setIsModalOpen(true);
  };

  // Handle edit card
  const handleEditCard = (card: PaymentCard) => {
    setEditingCardId(card.id);
    setEditingCard(card);
    setModalMode('Edit');
    setIsModalOpen(true);
  };

  // Handle delete card
  const handleDeleteCard = async (cardId: number) => {
    if (!confirm('Are you sure you want to delete this payment method?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(buildUrl(`/api/payment-card/${cardId}`), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (response.ok) {
        await fetchPaymentCards();
      } else {
        alert('Failed to delete payment card');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Error deleting payment card');
    }
  };

  // Handle form submission
  const handleSubmit = async (formData: PaymentCardFormData) => {
    setIsSubmitting(true);
    try {
      if (modalMode === 'Add' && paymentCards.length >= 3) {
        alert('Maximum of 3 payment methods reached.');
        setIsSubmitting(false);
        return;
      }

      const payload = {
        userId: userId, // Add user ID
        cardType: formData.cardType,
        cardNumber: formData.cardNumber.replace(/\s+/g, ''),
        expirationDate: formData.expirationDate,
        cardholderName: formData.cardholderName,
        billingStreet: formData.billingStreet,
        billingCity: formData.billingCity,
        billingState: formData.billingState,
        billingZip: formData.billingZip,
        billingCountry: formData.billingCountry,
        isDefault: formData.isDefault,
      };

      if (modalMode === 'Add') {
        // Create payment card with billing address
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await fetch(buildUrl('/api/payment-card'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          alert('Failed to add payment card');
        } else {
          await fetchPaymentCards();
          setIsModalOpen(false);
        }
      } else {
        // Update payment card
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await fetch(buildUrl(`/api/payment-card/${editingCardId}`), {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          alert('Failed to update payment card');
        } else {
          await fetchPaymentCards();
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error('Error submitting card:', error);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-white min-h-screen bg-[#1C1C1C]">
      <NavBar />
      <div className="h-30" />

      {/* Navigation */}
      <div className="flex items-center justify-center gap-10 mt-2 mb-18 font-red-rose" style={{ fontSize: '30px' }}>
        <Link href="/user/profile" className="font-bold text-gray-300 hover:text-white transition-colors">
          Account Info
        </Link>
        <Link href="/user/payments" className="relative font-bold" style={{ color: '#FF478B' }}>
          Payment
          <span
            className="absolute rounded-full"
            style={{
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '32px',
              height: '2px',
              backgroundColor: '#FF478B',
            }}
          />
        </Link>
        <Link href="/user/orders" className="font-bold text-gray-300 hover:text-white transition-colors">
          Order History
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10 items-start">
          {/* Profile sidebar */}
          <aside className="flex flex-col items-center gap-6 -mt-2 md:-mt-20">
            <div
              className="rounded-full flex items-center justify-center"
              style={{ width: '170px', height: '170px', backgroundColor: '#2B2B2B' }}
            >
              {profilePicUrl ? (
                <Image
                  src={profilePicUrl}
                  alt="Profile"
                  width={170}
                  height={170}
                  className="w-full h-full rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#EDEDED" strokeWidth="1.2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M3 21c2.2-4.2 6.1-6 9-6s6.8 1.8 9 6" />
                </svg>
              )}
            </div>
            <button className="text-[#FF478B] hover:text-[#FF3290] font-afacad text-lg" type="button">
              Log Out
            </button>
          </aside>

          {/* Payment methods */}
          <section className="p-0">
            <h1 className="text-2xl text-acm-pink font-red-rose mb-6">Payment Methods</h1>

            <div className="space-y-4">
              {paymentCards.map((card) => (
                <div key={card.id} className="bg-white/5 border border-white/20 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <MdCreditCard className="text-3xl text-acm-pink" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-afacad text-lg">{card.cardholderName}</span>
                          {card.isDefault && (
                            <span className="text-acm-pink text-xs font-bold bg-acm-pink/20 px-2 py-1 rounded">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <span className="text-white/70 font-afacad text-sm">{formatCardNumber(card.cardNumber)}</span>
                        <div className="text-white/60 font-afacad text-xs">
                          {formatExpirationDate(card.expirationDate)} • {card.paymentCardType.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCard(card)}
                        className="p-2 text-white hover:text-acm-pink transition-colors"
                        title="Edit"
                      >
                        <MdEdit className="text-2xl" />
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-2 text-white hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <MdDelete className="text-2xl" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {paymentCards.length === 0 && (
                <div className="text-center py-12 text-white/60 font-afacad">No payment methods yet.</div>
              )}
            </div>

            {/* Add button */}
            {paymentCards.length < 3 && (
              <div className="mt-6">
                <button
                  onClick={handleAddCard}
                  className="px-6 py-3 rounded-full font-afacad font-bold text-white border-2 border-acm-pink hover:bg-acm-pink transition-colors"
                >
                  Add Payment Method +
                </button>
              </div>
            )}

            {paymentCards.length >= 3 && (
              <div className="mt-4 text-center text-white/60 text-sm font-afacad">
                Maximum of 3 payment methods reached.
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Payment Card Modal */}
      <PaymentCardModal
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCard(null);
        }}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        initialData={
          editingCard
            ? {
                cardId: editingCard.id,
                cardType: editingCard.paymentCardType,
                cardNumber: editingCard.cardNumber,
                expirationDate: editingCard.expirationDate,
                cardholderName: editingCard.cardholderName,
                billingStreet: editingCard.billingStreet || '',
                billingCity: editingCard.billingCity || '',
                billingState: editingCard.billingState || '',
                billingZip: editingCard.billingZip || '',
                billingCountry: editingCard.billingCountry || 'US',
                isDefault: editingCard.isDefault,
              }
            : undefined
        }
      />
    </div>
  );
}
