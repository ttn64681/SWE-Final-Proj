"use client";
import { useState, useEffect } from 'react';
import {buildUrl, endpoints} from '../config/api';
import { BackendUser } from '../types/user';

// Function to fetch user information from the backend (Corresponds to getUserById endpoint)
    async function getUserInfo(userId: number) {
        try {
            const response = await fetch(buildUrl(endpoints.users.getUserById(userId)), {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Fetch error:", error);
            return null;
        }
    }

// Function to send updated user information to the backend (Corresponds to updateUser endpoint)
    async function updateUserInfo(userId: number, userInfo: Partial<BackendUser>) {
        console.log("ID: " + userId);
        console.log(userInfo);
        try {
            const response = await fetch(buildUrl(endpoints.users.updateUser(userId)), {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });
            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Error updating user info:", error);
            return null;
        }
    }

// Function to request the backend to change a user's password (Corresponds to changePassword endpoint)
    async function changePassword(userId: number, passwordInfo: Partial<BackendUser>) {
        try {
            const response = await fetch(buildUrl(endpoints.users.changePassword(userId)), {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(passwordInfo),
            });
            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Error updating password:", error);
            return null;
        }
    }


export function useUser(userId: number) {

    const [user, setUser] = useState<BackendUser | null>(null);

    // Fetches a user's information by their user ID
    useEffect(() => {
        const fetchUserInfo = async () => {
            console.log("Fetching user info...");
            const fetchedInfo = await getUserInfo(userId); 
        
            if (fetchedInfo) {
                setUser(fetchedInfo);
                return user;
            } else {
                console.log("Failed to load user data.");
                return null;
            }
        };
        fetchUserInfo();
    }, [userId]);

    // Updates a user's information
    const updateUser = async (userInfo: Partial<BackendUser>) => {
        console.log("Updating user info...");
        const updatedUser = await updateUserInfo(userId, userInfo); 
        
        if (updatedUser) {
            setUser(updatedUser);
            return true;
        } else {
            console.log("Failed to update user data.");
            return false;
        }
    };

    // Updates a user's password
    const updatePassword = async (passwordInfo: Partial<BackendUser>) => {
        console.log("Updating user info...");
        const updatedUser = await changePassword(userId, passwordInfo); 
        
        if (updatedUser) {
            setUser(updatedUser);
            return true;
        } else {
            console.log("Failed to update user data.");
            return false;
        }
    };
    //console.log(user);
    return {user, updateUser, updatePassword};
}