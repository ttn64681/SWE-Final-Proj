'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Checkbox from '@/components/common/forms/Checkbox';
import NavBar from '@/components/common/navBar/NavBar';
import { useProfile } from '@/contexts/ProfileContext';
import styles from './profile.module.css';

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
  // Check if we're on the client side before accessing storage
  if (typeof window === 'undefined') {
    return 0; // Return default value during SSR
  }

  // Check localStorage first, then sessionStorage
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
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
    return { secure: false, message: 'The new password should be different from the old password.' };
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
  const { user, isLoading, error, updateUser, updatePassword } = useUser(getUserID());

  const [userData, setUserData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    homeStreet: '',
    homeCity: '',
    homeState: '',
    homeZip: '',
    homeCountry: '',
  });

  useEffect(() => {
    //console.log(user);
    if (user) {
      setUserData({
        email: user.email,
        currentPassword: '',
        newPassword: '',
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phoneNumber,
        homeStreet: user.homeStreet || '',
        homeCity: user.homeCity || '',
        homeState: user.homeState || '',
        homeZip: user.homeZip || '',
        homeCountry: user.homeCountry || '',
      });

      // Set the initial promotion enrollment state from user data
      setSubscribeToPromotions(user.enrolledForPromotions || false);

      //console.log("User data set");
    }
  }, [user]);

  // Send updated user data to the backend
  const saveProfileChanges = async () => {
    if (validatePhoneNumber(userData.phone)) {
      const success = await updateUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phone,
        homeStreet: userData.homeStreet,
        homeCity: userData.homeCity,
        homeState: userData.homeState,
        homeZip: userData.homeZip,
        homeCountry: userData.homeCountry,
        enrolledForPromotions: subscribeToPromotions,
      });

      if (success) {
        alert('Profile updated successfully.');
      } else {
        alert('Failed to update user profile.');
      }
    } else {
      alert('The phone number is invalid. Check that it contains only numbers.');
    }
  };

  // Send updated password data to the backend
  const savePasswordChange = async () => {
    // Check if new password meets security requirements
    const { secure, message } = checkPasswordSecurity(userData.currentPassword, userData.newPassword);

    // If it does, send the password inputs to the backend
    if (secure) {
      const success = await updatePassword({
        currentPassword: userData.currentPassword,
        newPassword: userData.newPassword,
      });

      // Password was updated successfully
      if (success) {
        alert('Password changed successfully.');
        // Password was not updated: current password is incorrect
      } else {
        alert('Failed to update password. Check that your current password is correct.');
      }
    } else {
      // If the new password does not meet security requirements, tell the user why
      alert(message);
    }
  };
  // Promotions subscription state
  const [subscribeToPromotions, setSubscribeToPromotions] = useState(false);

  const { profilePic, setProfilePic, profilePicUrl, setProfilePicUrl } = useProfile();

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setProfilePicUrl(URL.createObjectURL(file));
    }
  };

  if (isLoading) {
    return (
      <div className="text-white min-h-screen bg-[#1C1C1C]">
        <NavBar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-white text-xl">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-white min-h-screen bg-[#1C1C1C]">
        <NavBar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-red-400 text-xl">Failed to load profile: {error || 'Unknown error'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen bg-[#1C1C1C]">
      <NavBar />
      <div className="h-30" />

      {/* Navigation */}
      <div className="flex items-center justify-center gap-10 mt-2 mb-18 font-red-rose text-[30px]">
        <Link href="/user/profile" className="relative font-bold text-acm-pink">
          Account Info
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-acm-pink rounded-full" />
        </Link>
        <Link href="/user/payments" className="font-bold text-gray-300 hover:text-white transition-colors">
          Payment
        </Link>
        <Link href="/user/orders" className="font-bold text-gray-300 hover:text-white transition-colors">
          Order History
        </Link>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-8 pb-16 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
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
              <div className="rounded-full flex items-center justify-center transition-colors w-[170px] h-[170px] bg-[#2B2B2B]">
                {profilePicUrl ? (
                  <img src={profilePicUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
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
            <button className="text-[#FF478B] hover:text-[#FF3290] font-afacad text-lg cursor-pointer" type="button">
              Log Out
            </button>
          </aside>

          {/* Form */}
          <section className="p-0">
            <div className="mb-8 pb-4 border-b border-white/10">
              <h1 className="text-3xl text-acm-pink font-red-rose mb-2">Edit Personal Info</h1>
              <p className="text-white/60 text-sm">Update your profile information</p>
            </div>

            {/* Email (read only) */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-y-6 gap-x-8">
              <label className="self-center text-white font-afacad text-lg font-bold">Email</label>
              <div>
                <input
                  type="email"
                  value={userData.email}
                  readOnly
                  disabled
                  placeholder={userData.email}
                  className={`${styles.emailInput} cursor-not-allowed opacity-60`}
                />
                <p className="text-xs text-gray-500 mt-1 font-afacad">Email cannot be changed</p>
              </div>

              {/* Name */}
              <label className="self-center text-white font-afacad text-lg font-bold">Name</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block font-afacad">First Name</label>
                  <input
                    type="text"
                    value={userData.firstName}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setUserData((prev) => ({ ...prev, firstName: newValue }));
                    }}
                    className={styles.profileInput}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block font-afacad">Last Name</label>
                  <input
                    type="text"
                    value={userData.lastName}
                    onChange={(e) => setUserData((prev) => ({ ...prev, lastName: e.target.value }))}
                    className={styles.profileInput}
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Home Address */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-white font-afacad text-lg font-bold">Home Address</label>
                </div>
                <div className="space-y-4">
                  {/* Street - Full width */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block font-afacad">Street Address</label>
                    <input
                      type="text"
                      value={userData.homeStreet}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setUserData((prev) => ({ ...prev, homeStreet: newValue }));
                      }}
                      className={styles.profileInput}
                      placeholder="123 Main Street, Apt 4B"
                    />
                  </div>
                  {/* City, State, ZIP - 3 columns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block font-afacad">City</label>
                      <input
                        type="text"
                        value={userData.homeCity}
                        onChange={(e) => setUserData((prev) => ({ ...prev, homeCity: e.target.value }))}
                        className={styles.profileInput}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block font-afacad">State</label>
                      <input
                        type="text"
                        value={userData.homeState}
                        onChange={(e) => setUserData((prev) => ({ ...prev, homeState: e.target.value }))}
                        className={styles.profileInput}
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block font-afacad">ZIP Code</label>
                      <input
                        type="text"
                        value={userData.homeZip}
                        onChange={(e) => setUserData((prev) => ({ ...prev, homeZip: e.target.value }))}
                        className={styles.profileInput}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  {/* Country - Full width */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block font-afacad">Country</label>
                    <input
                      type="text"
                      value={userData.homeCountry}
                      onChange={(e) => setUserData((prev) => ({ ...prev, homeCountry: e.target.value }))}
                      className={styles.profileInput}
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>

              {/* Phone number */}
              <label className="self-center text-white font-afacad text-lg font-bold">Phone Number</label>
              <div>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                  className={styles.profileInput}
                  placeholder="+1 (555) 123-4567"
                />
                <p className="text-xs text-gray-500 mt-1 font-afacad">Include country code if outside US</p>
              </div>
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
                title="Save Changes"
                type="button"
                onClick={saveProfileChanges}
                className="px-8 py-3 rounded-full font-afacad font-bold text-black cursor-pointer hover:opacity-90 transition-opacity bg-gradient-to-r from-acm-pink to-acm-orange border-none"
              >
                Save Changes
              </button>
            </div>

            {/* Change Password */}
            <div className="mt-16 pt-6 border-t border-white/10">
              <div className="mb-6 pb-2 border-b border-white/10">
                <h1 className="text-3xl text-acm-pink font-red-rose mb-2">Change Password</h1>
                <p className="text-white/60 text-sm">Update your account password</p>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-y-6 gap-x-8">
                  <label className="self-center text-white font-afacad text-lg font-bold">Current Password</label>
                  <div>
                    <input
                      type="password"
                      value={userData.currentPassword}
                      onChange={(e) => setUserData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      className={styles.profileInput}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-y-6 gap-x-8">
                  <label className="self-center text-white font-afacad text-lg font-bold">New Password</label>
                  <div>
                    <input
                      type="password"
                      value={userData.newPassword}
                      onChange={(e) => setUserData((prev) => ({ ...prev, newPassword: e.target.value }))}
                      className={styles.profileInput}
                      placeholder="Must be at least 8 characters with uppercase, lowercase, and number"
                    />
                    <p className="text-xs text-gray-500 mt-1 font-afacad">
                      Must contain: 8+ characters, uppercase, lowercase, and number
                    </p>
                  </div>
                </div>
              </div>

              {/* Change password button */}
              <div className="flex justify-center mt-10">
                <button
                  title="Change Password"
                  type="button"
                  onClick={savePasswordChange}
                  className="px-8 py-3 rounded-full font-afacad font-bold text-black cursor-pointer hover:opacity-90 transition-opacity bg-gradient-to-r from-acm-pink to-acm-orange border-none"
                >
                  Change Password
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
