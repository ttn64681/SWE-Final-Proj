"use client";
import NavBar from "@/components/common/navBar/NavBar";
import ProfileTabs from "@/components/specific/user/ProfileTabs";
import AccountInfo from "@/components/specific/user/AccountInfo";
import ProfileSidebar from "@/components/specific/user/ProfileSidebar";

// User Profile Page
export default function ProfilePage() {
  return (
    <div className="text-white min-h-screen bg-[#1C1C1C]">
      <NavBar />
      <div className="h-30" />

      {/* Navigation */}
      <ProfileTabs />

      {/* Main content area */}
      <div className="max-w-6xl mx-auto px-6 pb-16 ml-20">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10 items-start">
          {/* Profile sidebar */}
          <ProfileSidebar />

          {/* Form */}
          <AccountInfo />
        </div>
      </div>
    </div>
  );
}