import { useProfile } from "@/contexts/ProfileContext";

export default function ProfileSidebar(){

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
    );
}