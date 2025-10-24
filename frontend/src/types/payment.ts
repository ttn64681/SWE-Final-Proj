 

export interface BackendPayment {
    payment_info_id: number;
    user_id: number;
    card_number: string;
    billing_address: string;    
    expiration_date: string;
    cardholder_name: string;
} 