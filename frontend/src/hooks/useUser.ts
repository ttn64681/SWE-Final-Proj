"use client";
import { useState, useEffect } from 'react';
import {buildUrl, endpoints} from '../config/api';
import { BackendUser } from '../types/user';

// Function to fetch user information from the backend (Corresponds to getUserById endpoint)
    async function getUserInfo(userId: number) {
        try {
            //const response = await api.get(endpoints.users.getUserById(userId)); // backend GET request
            //return response.data;

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
        //console.log("ID: " + userId);
        //console.log(userInfo);
        try {
            const response = await fetch(buildUrl(endpoints.users.updateUser(userId)), {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });
            const data = await response.json();

            
        // backend PUT request
            return data;

        } catch (error) {
            console.error("Error updating user info:", error);
            return null;
        }
    }


export function useUser(userId: number) {

    const [user, setUser] = useState<BackendUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(<string | null>(null));

    // Fetches a user's information by their user ID
    useEffect(() => {
        if (userId) {
        const fetchUserInfo = async () => {
            console.log("Fetching user info...");
            const fetchedInfo = await getUserInfo(userId); 
        
            if (fetchedInfo) {
                setUser(fetchedInfo);
            } else {
                setError("Failed to load user data.");
            }
            setLoading(false);
        };
        fetchUserInfo();
        }
    }, []);

    // Updates a user's information
    const updateUser = async (userInfo: Partial<BackendUser>) => {
        console.log("Updating user info...");
        const updatedUser = await updateUserInfo(userId, userInfo); 
        
        if (updatedUser) {
            setUser(updatedUser);
            return true;
        } else {
            setError("Failed to update user data.");
            return false;
        }
    };
    console.log(user);
    return { user, loading, error, updateUser};
}