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

// Payment card with camelCase fields (for frontend use)
export interface PaymentCard {
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

// Form data for payment card modal
export interface PaymentCardFormData {
  cardId: number;
  cardType: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardholderName: string;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  isDefault: boolean;
}
