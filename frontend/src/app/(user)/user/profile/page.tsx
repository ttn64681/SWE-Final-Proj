"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Checkbox from "@/components/common/forms/Checkbox";
import NavBar from "@/components/common/navBar/NavBar";
import { useProfile } from "@/contexts/ProfileContext";
import styles from "./profile.module.css";

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
  //console.log(token);

  if (token) {
    const userData = decodeJWT(token);
    //console.log("Decoded User Data:", userData);
    const userId = userData.userId;
    //console.log("User ID:", userId);
    return userId;
  } else {
    // If the token is somehow not present, return 0 as a failsafe, which is an unused ID
    return 0;
  }
}

function validatePhoneNumber(phoneNumber: string) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phoneNumber);
}

function checkPasswordSecurity(currentPwd: string, newPwd: string) {
  if (currentPwd == newPwd) {
    return { secure: false, message: "The new password should be different from the old password." }
  }
  if (newPwd.length < 8) {
    return { secure: false, message: 'The new password must be at least 8 characters long.' };
  }
  if (!/(?=.*[a-z])/.test(newPwd)) {
    return { secure: false, message: 'The new password must contain at least one lowercase letter.' };
  }
  if (!/(?=.*[A-Z])/.test(newPwd)) {
    return { secure: false, message: 'The new password must contain at least one uppercase letter.' };
  }
  if (!/(?=.*\d)/.test(newPwd)) {
    return { secure: false, message: 'The new password must contain at least one number.' };
  }
  return { secure: true };
}


export default function ProfilePage() {
  // Initialize user profile data
  // Get the user profile data from the backend
  const {user, updateUser, updatePassword} = useUser(getUserID());

  const [userData, setUserData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    state: "",
    country: ""
  });


  useEffect(() => {
    //console.log(user);
    if (user) {
      setUserData({
        email: user.email,
        currentPassword: "",
        newPassword: "",
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phoneNumber,
        street: user.address,
        state: user.state,
        country: user.country
      });
      //console.log("User data set");
    }
  }, [user]);

  // Send updated user data to the backend
  const saveProfileChanges = async () => {
    if (validatePhoneNumber(userData.phone)) {
      const success = await updateUser( {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phone,
        address: userData.street,
        state: userData.state,
        country: userData.country
      });

      if (success) {
        alert("Profile updated successfully.");
      } else {
        alert("Failed to update user profile.");
      }
    } else {
      alert("The phone number is invalid. Check that it contains only numbers.");
    }
  } 

  // Send updated password data to the backend
  const savePasswordChange = async () => {
    // Check if new password meets security requirements
    const {secure, message} = checkPasswordSecurity(userData.currentPassword, userData.newPassword);

    // If it does, send the password inputs to the backend
    if (secure) {
      const success = await updatePassword( {
        currentPassword: userData.currentPassword,
        newPassword: userData.newPassword
      });

      // Password was updated successfully
      if (success) {
        alert("Password changed successfully.");
      // Password was not updated: current password is incorrect
      } else {
        alert("Failed to update password. Check that your current password is correct.");
      }
    } else {
      // If the new password does not meet security requirements, tell the user why
      alert(message);
    }
  } 

  // Promotions subscription state
  const [subscribeToPromotions, setSubscribeToPromotions] = useState(false);
  
  const { profilePic, setProfilePic, profilePicUrl, setProfilePicUrl } = useProfile();

  // Handle profile picture upload - was a real pain to get working
  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setProfilePicUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="text-white min-h-screen bg-[#1C1C1C]">
      <NavBar />
      <div className="h-30" />

      {/* Navigation */}
      <div className="flex items-center justify-center gap-10 mt-2 mb-18 font-red-rose" style={{ fontSize: '30px' }}>
        <Link 
          href="/user/profile" 
          className="relative font-bold"
          style={{ color: '#FF478B' }}
        >
          Account Info
          <span 
            className="absolute rounded-full"
            style={{ 
              bottom: '-8px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              width: '32px', 
              height: '2px', 
              backgroundColor: '#FF478B' 
            }} 
          />
        </Link>
        <Link 
          href="/user/payments" 
          className="font-bold text-gray-300 hover:text-white transition-colors"
        >
          Payment
        </Link>
        <Link 
          href="/user/orders" 
          className="font-bold text-gray-300 hover:text-white transition-colors"
        >
          Order History
        </Link>
      </div>

      {/* Main content area */}
      <div className="max-w-6xl mx-auto px-6 pb-16 ml-20">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10 items-start">
          {/* Profile sidebar */}
          <aside className="flex flex-col items-center gap-6 -mt-2 md:-mt-20">
            <div className="relative group">
              <input
                title="Upload Profile Picture"
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full z-10"
              />
              <div 
                className="rounded-full flex items-center justify-center transition-colors"
                style={{ 
                  width: '170px', 
                  height: '170px', 
                  backgroundColor: '#2B2B2B' 
                }}
              >
                {profilePicUrl ? (
                  <img
                    src={profilePicUrl}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#EDEDED" strokeWidth="1.2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M3 21c2.2-4.2 6.1-6 9-6s6.8 1.8 9 6" />
                  </svg>
                )}
                {/* Edit overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity">
                  <span className="text-white font-afacad text-lg font-bold">Edit</span>
                </div>
              </div>
            </div>
            <button
              className="text-[#FF478B] hover:text-[#FF3290] font-afacad text-lg"
              type="button"
            >
              Log Out
            </button>
          </aside>

          {/* Form */}
          
          <section className="p-0">
            <h1 className="text-2xl text-acm-pink font-red-rose mb-10"> Edit Personal Info </h1>

            {/* Email (read only) */}
            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-y-6 gap-x-6">
              <label className="self-center text-white font-afacad text-lg font-bold">Email</label>
              <input
                type="email"
                value={userData.email}
                readOnly
                className={styles.emailInput}
                placeholder="Email address"
                style={{ 
                  cursor: "not-allowed"
                }}
              />

              {/* Name */}
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

              {/* Address */}
              <label className="self-center text-white font-afacad text-lg font-bold">Address</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-2 font-afacad">Street</div>
                  <input
                    type="text"
                    value={userData.street}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setUserData(prev => ({ ...prev, street: newValue }));
                    }}
                    className={styles.profileInput}
                    placeholder="Enter street address"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2 font-afacad">State</div>
                  <input
                    type="text"
                    value={userData.state}
                    onChange={(e) => setUserData(prev => ({ ...prev, state: e.target.value }))}
                    className={styles.profileInput}
                    placeholder="Enter state"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2 font-afacad">Country</div>
                  <input
                    type="text"
                    value={userData.country}
                    onChange={(e) => setUserData(prev => ({ ...prev, country: e.target.value }))}
                    className={styles.profileInput}
                    placeholder="Enter country"
                  />
                </div>
              </div>

              {/* Phone number */}
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
                onClick={saveProfileChanges}
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

            {/* Change Password */}
            <h1 className="text-2xl text-acm-pink font-red-rose mt-10"> Change Password </h1>
            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-y-6 gap-x-6 mt-10">
              
                <label className="self-center text-white font-afacad text-lg font-bold">Current Password </label>
                <input
                  type="password"
                  value={userData.currentPassword}
                  onChange={(e) => setUserData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className={styles.profileInput}
                  placeholder="Enter current password"
                />

                <label className="self-center text-white font-afacad text-lg font-bold">New Password </label>
                <input
                  type="password"
                  value={userData.newPassword}
                  onChange={(e) => setUserData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className={styles.profileInput}
                  placeholder="Enter new password"
                />
            </div>

            {/* Change password button */}
              <div className="flex justify-center mt-10">
                <button
                  onClick={savePasswordChange}
                  className="px-8 py-3 rounded-full font-afacad font-bold text-black"
                    style={{ 
                      background: "linear-gradient(to right, #FF478B, #FF5C33)",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                  Change Password
                </button>
              </div>
          </section>
        </div>
      </div>
    </div>
  );
}