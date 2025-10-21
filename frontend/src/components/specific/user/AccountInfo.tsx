"use client";
import { useState, useEffect } from "react";
import Checkbox from "@/components/common/forms/Checkbox";
import styles from '@/app/(user)/user/profile/profile.module.css';

// Hook to retrieve user from backend
import { useUser } from '@/hooks/useUser';

// Decode the token for the current login session
function decodeJWT(token: string) {
  const [, payloadBase64] = token.split('.');
  const decodedPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
  
  return JSON.parse(decodedPayload);
}

// Get the ID of the logged in user using the token
function getUserID() {
  const token = sessionStorage.getItem("token");
  // console.log(token);

  if (token) {
    const userData = decodeJWT(token);
    // console.log("Decoded User Data:", userData);
    const userId = userData.userId;
    // console.log("User ID:", userId);
    return userId;
  } else {
    // If the token is somehow not present, return -1 as a failsafe, which is an unused ID
    return -1;
  }
}

export default function AccountInfo(){

    // Initialize user profile data
      const [userData, setUserData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
      });
    
      // Get the user's personal info from the backend
      const {user, loading, error} = useUser(getUserID());
    
      useEffect(() => {
        // console.log(user);
        if (user) {
          setUserData({
            email: user.email,
            password: "",
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phoneNumber,
          });
        }
      }, [user]);
    
      // Promotions subscription state
      const [subscribeToPromotions, setSubscribeToPromotions] = useState(false);

    return (
        <section className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-y-6 gap-x-6">
              <label className="self-center text-white font-afacad text-lg font-bold">Email</label>
              <input
                type="email"
                value={userData.email}
                readOnly
                className={styles.emailInput}
                placeholder="Email address"
              />

              <label className="self-center text-white font-afacad text-lg font-bold">Password</label>
              <input
                type="password"
                value={userData.password}
                readOnly
                className={styles.emailInput}
                placeholder="Enter password"
              />

              <label className="self-center text-white font-afacad text-lg font-bold">Name</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-2 font-afacad">First</div>
                  <input
                    type="text"
                    value={userData.firstName}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setUserData(prev => ({ ...prev, firstName: newValue }));
                    }}
                    className={styles.profileInput}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2 font-afacad">Last</div>
                  <input
                    type="text"
                    value={userData.lastName}
                    onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                    className={styles.profileInput}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <label className="self-center text-white font-afacad text-lg font-bold">Phone Number</label>
              <input
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                className={styles.profileInput}
                placeholder="Enter phone number"
              />
            </div>

            {/* Promotions checkbox */}
            <div className="mt-8">
              <Checkbox
                id="promotions"
                label="Subscribe to promotions"
                checked={subscribeToPromotions}
                onChange={setSubscribeToPromotions}
              />
            </div>

            {/* Save button */}
            <div className="flex justify-center mt-10">
              <button
                className="px-8 py-3 rounded-full font-afacad font-bold text-black"
                style={{ 
                  background: "linear-gradient(to right, #FF478B, #FF5C33)",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Save Changes
              </button>
            </div>
          </section>
    );
}