"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

interface ProfileContextType {
  profilePic: File | null;
  setProfilePic: (file: File | null) => void;
  profilePicUrl: string | null;
  setProfilePicUrl: (url: string | null) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (profilePicUrl && profilePicUrl.startsWith('blob:')) {
        URL.revokeObjectURL(profilePicUrl);
      }
    };
  }, [profilePicUrl]);

  const value = useMemo(
    () => ({ profilePic, setProfilePic, profilePicUrl, setProfilePicUrl }),
    [profilePic, profilePicUrl]
  );

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
