
export interface BackendPayment {
    id: number;
    user_id: number;
    card_number: string;
    cardholder_name: string;
    payment_card_type: string; // visa, mastercard, amex, discover
    is_default: boolean;
    expiration_date: string; // MM/YY format
    address_id?: number; // Foreign key to address table
    // Address fields from the related address
    billing_street?: string;
    billing_city?: string;
    billing_state?: string;
    billing_zip?: string;
    billing_country?: string;
} 