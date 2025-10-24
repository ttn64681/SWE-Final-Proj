'use client';

import { BackendPayment } from "@/types/payment";
import { useState, useEffect } from "react";
import api, { apiConfig, buildUrl, endpoints } from "@/config/api";



export function usePayments(userId: number) {

    const [payments, setPayments] = useState<BackendPayment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchPayments() {
        try {
            setLoading(true);
            const response = await api.get(apiConfig.buildUrl(endpoints.payments.getPayments(userId)));
            console.log("Fetched payments: ", response.data);
            setPayments(response.data);
        } catch (error) {
            console.error("Fetch payments error: ", error);
            setError("Failed to load payment data.");
        } finally {
            setLoading(false);
        }
    }

    async function addPayment(newPayment: Omit<BackendPayment, 'payment_info_id' | 'user_id'>) {
        console.log("New payment:", newPayment);
        try {
            const response = await fetch(apiConfig.buildUrl(endpoints.payments.addPaymentInfo(userId)), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPayment),
            });
            // const response = await api.post(apiConfig.buildUrl(endpoints.payments.addPaymentInfo(userId)), newPayment);
            await fetchPayments(); // refresh list
            const data = await response.json();
            return data;
        } catch(error) {
            console.error("Add payment error: ", error);
            setError("Failed to add payment data.");
        }
    }

    async function updatePayment(currentPaymentId: number, updatedPayment: Partial<BackendPayment>) {
        try {
            const response = await api.put(endpoints.payments.updatePaymentInfo(userId, currentPaymentId), updatedPayment);
            await fetchPayments(); // refresh list
            return response.data;
        } catch(error) {
            console.error("Update payment error ", error);
            setError("Failed to update payment data.");
        }
    }

    async function deletePayment(currentPaymentId: number) {
        try {
            const response = await api.delete(endpoints.payments.deletePaymentInfo(userId, currentPaymentId));
            await fetchPayments(); // refresh list
        } catch(error) {
            console.error("Delete payment error ", error);
            setError("Failed to delete payment data");
        }
    }
    
    useEffect(() => {
        if (userId) fetchPayments();
    }, [userId])

    return {
        payments,
        loading,
        error,
        addPayment,
        updatePayment,
        deletePayment,
        fetchPayments
    };

}