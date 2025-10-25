'use client';

import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useState, useEffect } from "react";
import NavBar from "@/components/common/navBar/NavBar";
import { useProfile } from "@/contexts/ProfileContext";
import { usePayments } from "@/hooks/usePayments";
import { BackendPayment } from "@/types/payment";

export default function PaymentsPage() {

  
  const [paymentMethods, setPaymentMethods] = useState<BackendPayment[]>([]);

  const [showAddModal, setShowAddModal] = useState({
    isShown: false,
    text: ""
  });
  const [newCardData, setNewCardData] = useState({
    cardId: 0,
    cardType: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    state: ""
  });

  function decodeJWT(token: string) {
  const [, payloadBase64] = token.split('.');
  const decodedPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
  
  return JSON.parse(decodedPayload);
}

  function getUserID() {
  const token = sessionStorage.getItem("token");
  console.log(token);

  if (token) {
    const userData = decodeJWT(token);
    console.log("Decoded User Data:", userData);
    const userId = userData.userId;
    console.log("User ID:", userId);
    return userId;
  } else {
    // If the token is somehow not present, return 0 as a failsafe, which is an unused ID
    return 0;
  }
}

  const userId = getUserID();
  const { payments, addPayment, updatePayment, deletePayment, fetchPayments } = usePayments(userId);

  useEffect(() => {
    // Fetch user payment when page loads or userId changes
    fetchPayments();
  }, [userId]);

  useEffect(() => {
    console.log("User ID: " + userId);
    console.log("Payments: " + payments);
    // console.log("Holder: " + payments)
    if (payments && payments.length > 0) setPaymentMethods(payments);
  }, [payments]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { profilePicUrl } = useProfile();

  const addCard = async () => {
    // check if all fields filled
    const fields = [
      'cardType',
      'cardNumber',
      'expirationDate',
      'cvv',
      'cardholderName',
      'billingAddress',
      'city',
      'state',
    ];
    const allFilled = fields.every((field) => newCardData[field as keyof typeof newCardData]);

    if (!allFilled) {
      console.log('Missing required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {      

      // Remove spaces from card number
      const cleanedCardNumber = newCardData.cardNumber.replace(/\s+/g, '');

      // Format expiration date to YYYY-MM-DD
      const [expMonth, expYear] = newCardData.expirationDate.split('/');
      const formattedExpDate = `20${expYear}-${expMonth.padStart(2, '0')}-01`;

      if (showAddModal.text === "Add") {

        if (payments.length < 3) {
          addPayment(
            {
              card_number: cleanedCardNumber,
              billing_address: newCardData.billingAddress,
              expiration_date: formattedExpDate,
              cardholder_name: newCardData.cardholderName
            }
          );
        } else {
          console.log("Maximum of 3 payment methods reached.");
        }
      } else if (showAddModal.text === "Change") {
        console.log("EDIT: ", newCardData.cardId);
        updatePayment(
          newCardData.cardId,
          {
            card_number: cleanedCardNumber,
            billing_address: newCardData.billingAddress,
            expiration_date: formattedExpDate,
            cardholder_name: newCardData.cardholderName
          }
        );
      }
      
      clearForm();
      setShowAddModal({ isShown: false, text: "Add" });
    } catch (error) {
      console.error('Failed to add card:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCard = (paymentId: number) => {
    try {
      deletePayment(paymentId);
    } catch (error) {
      console.error('Failed to delete card:', error);
    }
  };

  // clear form data
  const clearForm = () => {
    setNewCardData({
      cardId: 0,
      cardType: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      cardholderName: "",
      billingAddress: "",
      city: "",
      state: ""
    });
  };

  const closeModal = () => {
    setShowAddModal({ isShown: false, text: "Add" });
    clearForm();
  };

  // format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = cleaned.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return cleaned;
    }
  };

  // Replaces the first 12 digits with "*"
  // Example:
  // Input: 4444 4444 4444 4444
  // Output: **** **** **** ****
  const censorCardNumber = (value: string) => {
    const cleaned = value.replace(/\s+/g, '');
    if (cleaned.length !== 16) return value; // return original if not 16 digits
    return '**** **** **** ' + cleaned.slice(12);
  }

  // format exp date
  const formatExpirationDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
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

      {/* Main content area */}
      <div className="max-w-6xl mx-auto px-6 pb-16 ml-20">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10 items-start">
          {/* Profile sidebar */}
          <aside className="flex flex-col items-center gap-6 -mt-2 md:-mt-20">
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: '170px',
                height: '170px',
                backgroundColor: '#2B2B2B',
              }}
            >
              {profilePicUrl ? (
                <img src={profilePicUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
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
            <div className="space-y-0">
              {paymentMethods.map((method) => (
                <div key={method.payment_info_id} className="flex items-center py-4 border-b border-white">
                  {/* <div className="w-24">
                    {method.isDefault && (
                      <span className="text-white font-afacad font-bold">Default</span>
                    )}
                  </div> */}
                  <div className="flex items-center flex-1 justify-between px-4">
                    <span className="text-white font-afacad text-xl w-32 text-left ml-40">{method.cardholder_name}</span>
                    <span className="text-white font-afacad text-xl">{censorCardNumber(formatCardNumber(method.card_number))}</span>
                    <div className="flex flex-row text-2xl ml-auto gap-x-4">
                      <button
                        onClick={() => {
                            setShowAddModal({ isShown: true, text: "Change" });
                            setNewCardData({...newCardData, cardId: method.payment_info_id, cardNumber: method.card_number, expirationDate: method.expiration_date.slice(5,7) + '/' + method.expiration_date.slice(2,4), cardholderName: method.cardholder_name, billingAddress: method.billing_address});
                          }}
                      >
                        <MdEdit className="text-white hover:text-red-500 cursor-pointer" />
                      </button>
                      <button
                        onClick={() => deleteCard(method.payment_info_id)}
                      >
                        <MdDelete className="text-white hover:text-red-500 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add payment method button */}
              <div className="mt-6">
                <button
                  onClick={() => setShowAddModal({ isShown: true, text: "Add" })}
                  className="px-6 py-2 rounded-full font-afacad font-bold text-white border-2 transition-colors hover:bg-[#FF478B] hover:border-[#FF478B]"
                  style={{
                    borderColor: '#FF478B',
                    backgroundColor: 'transparent',
                  }}
                >
                  Add +
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddModal.isShown && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-white/3 backdrop-blur-md rounded-lg p-8 w-full max-w-md mx-4"
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white font-afacad">{showAddModal.text} Payment Method</h2>
            </div>

            <form className="space-y-4">
              {/* Card Type */}
              <div>
                <label className="block text-white text-sm mb-2 font-afacad">Card Type</label>
                <select
                  title="Select Card Type"
                  value={newCardData.cardType}
                  onChange={(e) => setNewCardData({ ...newCardData, cardType: e.target.value })}
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#FF478B] focus:border-transparent cursor-pointer"
                  required
                >
                  <option value="">Select Card Type</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="American Express">American Express</option>
                  <option value="Discover">Discover</option>
                </select>
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-white text-sm mb-2 font-afacad">Card Number</label>
                <input
                  type="text"
                  value={newCardData.cardNumber}
                  onChange={(e) => setNewCardData({ ...newCardData, cardNumber: formatCardNumber(e.target.value) })}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#FF478B] focus:border-transparent"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  maxLength={19}
                  required
                />
              </div>

              {/* Name on card */}
              <div>
                <label className="block text-white text-sm mb-2 font-afacad">Name on Card</label>
                <input
                  type="text"
                  value={newCardData.cardholderName}
                  onChange={(e) => setNewCardData({ ...newCardData, cardholderName: e.target.value })}
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#FF478B] focus:border-transparent"
                  required
                />
              </div>

              {/* Expiration Date and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm mb-2 font-afacad">Expiration Date</label>
                  <input
                    type="text"
                    value={newCardData.expirationDate}
                    onChange={(e) =>
                      setNewCardData({ ...newCardData, expirationDate: formatExpirationDate(e.target.value) })
                    }
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#FF478B] focus:border-transparent"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm mb-2 font-afacad">CVV</label>
                  <input
                    type="text"
                    value={newCardData.cvv}
                    onChange={(e) => setNewCardData({ ...newCardData, cvv: e.target.value.replace(/\D/g, '') })}
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#FF478B] focus:border-transparent"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              {/* Separator line */}
              <div className="border-t border-white/20 my-4"></div>

              {/* Billing Address */}
              <div>
                <label className="block text-white text-sm mb-2 font-afacad">Billing Address</label>
                <input
                  type="text"
                  value={newCardData.billingAddress}
                  onChange={(e) => setNewCardData({ ...newCardData, billingAddress: e.target.value })}
                  placeholder="123 Main St"
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#FF478B] focus:border-transparent"
                  required
                />
              </div>

              {/* City and State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm mb-2 font-afacad">City</label>
                  <input
                    type="text"
                    value={newCardData.city}
                    onChange={(e) => setNewCardData({ ...newCardData, city: e.target.value })}
                    placeholder="New York"
                    className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#FF478B] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm mb-2 font-afacad">State</label>
                  <input
                    type="text"
                    value={newCardData.state}
                    onChange={(e) => setNewCardData({ ...newCardData, state: e.target.value })}
                    placeholder="NY"
                    className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#FF478B] focus:border-transparent"
                    maxLength={2}
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 rounded-md font-afacad font-bold text-white border-2 border-white/20 hover:border-white/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => addCard()}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 rounded-md font-afacad font-bold text-white bg-gradient-to-r from-[#FF478B] to-[#FF5C33] hover:from-[#FF5C33] hover:to-[#FF478B] transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? `${showAddModal.text}ing...` : `${showAddModal.text} Card`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
