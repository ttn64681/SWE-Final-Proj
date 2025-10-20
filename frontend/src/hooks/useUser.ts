"use client";
import { useState, useEffect } from 'react';
import api, {endpoints} from '../config/api';
import { BackendUser } from '../types/user';

// Function to fetch user information from the backend 
    async function getUserInfo(userId: number) {
        try {
            const response = await api.get(endpoints.users.getUserById(userId)); // backend GET request
            return response.data;

        } catch (error) {
            console.error("Fetch error:", error);
            return null;
        }
    }

// Fetches a user's information by their user ID
export function useUser(userId: number) {

    const [user, setUser] = useState<BackendUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(<string | null>(null));

    useEffect(() => {
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
}, [userId]);
    console.log(user);
    return { user, loading, error };
}