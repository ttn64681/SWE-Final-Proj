'use client';
import { useState, useEffect } from 'react';
import { buildUrl, endpoints } from '../config/api';
import { BackendUser } from '@/types/user';

// Helper function to get userId from JWT token
function getUserIdFromToken(): number {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) return 0;
  
  try {
    const [, payloadBase64] = token.split('.');
    const decodedPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const userData = JSON.parse(decodedPayload);
    return userData.userId || 0;
  } catch (error) {
    console.error('Error decoding token:', error);
    return 0;
  }
}

// Function to fetch user information from the backend (Corresponds to getUserById endpoint)
async function getUserInfo(userId: number) {
  try {
    // Get token from storage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    // Get userId from token if not provided
    const actualUserId = userId || getUserIdFromToken();
    if (!actualUserId) {
      console.error('No user ID available');
      return null;
    }
    
    const response = await fetch(buildUrl(`/api/user/info?userId=${actualUserId}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch user info:', response.status, response.statusText);
      return null;
    }

    const text = await response.text();
    if (!text || text.trim() === '') {
      console.error('Empty response from user endpoint');
      return null;
    }

    const userData = JSON.parse(text);

    // Fetch home address from address table
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const addressResponse = await fetch(buildUrl(`/api/address/user/${userId}/home`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (addressResponse.ok) {
        const text = await addressResponse.text();
        if (text && text.trim() !== '') {
          const homeAddress = JSON.parse(text) as {
            street: string;
            city: string;
            state: string;
            zip: string;
            country?: string;
          };
          userData.homeStreet = homeAddress.street;
          userData.homeCity = homeAddress.city;
          userData.homeState = homeAddress.state;
          userData.homeZip = homeAddress.zip;
          userData.homeCountry = homeAddress.country || 'US';
        }
      }
    } catch (error) {
      console.log('No home address found for user:', error);
    }

    console.log('Successfully retrieved user data from backend');
    return userData;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

// Function to send updated user information to the backend (Corresponds to updateUser endpoint)
async function updateUserInfo(userId: number, userInfo: Partial<BackendUser>) {
  console.log('ID: ' + userId);
  console.log(userInfo);
  try {
    // Get token from storage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    // Get userId from token if not provided
    const actualUserId = userId || getUserIdFromToken();
    if (!actualUserId) {
      console.error('No user ID available');
      return null;
    }

    const response = await fetch(buildUrl(`/api/user/info?userId=${actualUserId}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating user info:', error);
    return null;
  }
}

// Function to request the backend to change a user's password (Corresponds to changePassword endpoint)
async function changePassword(userId: number, passwordInfo: Partial<BackendUser>) {
  try {
    // Get token from storage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    // Get userId from token if not provided
    const actualUserId = userId || getUserIdFromToken();
    if (!actualUserId) {
      console.error('No user ID available');
      return null;
    }

    const response = await fetch(buildUrl(`/api/user/change-password?userId=${actualUserId}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(passwordInfo),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating password:', error);
    return null;
  }
}

export function useUser(userId: number) {
  const [user, setUser] = useState<BackendUser | null>(null);

  // Fetches a user's information by their user ID
  useEffect(() => {
    const fetchUserInfo = async () => {
      console.log('Fetching user info...');
      const fetchedInfo = await getUserInfo(userId);

      if (fetchedInfo) {
        setUser(fetchedInfo);
        console.log('User info fetched.');
        return user;
      } else {
        console.log('Failed to load user data.');
        return null;
      }
    };
    fetchUserInfo();
  }, [userId]);

  // Updates a user's information
  const updateUser = async (userInfo: Partial<BackendUser>) => {
    console.log('Updating user info...');
    const updatedUser = await updateUserInfo(userId, userInfo);

    if (updatedUser) {
      setUser(updatedUser);
      return true;
    } else {
      console.log('Failed to update user data.');
      return false;
    }
  };

  // Updates a user's password
  const updatePassword = async (passwordInfo: Partial<BackendUser>) => {
    console.log('Updating password info...');
    const updatedUser = await changePassword(userId, passwordInfo);

    if (updatedUser) {
      setUser(updatedUser);
      return true;
    } else {
      console.log('Failed to update password data.');
      return false;
    }
  };
  return { user, updateUser, updatePassword };
}
