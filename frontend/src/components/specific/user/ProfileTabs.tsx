import Link from "next/link";

// Navigation to Account Info, Payments, and Order History pages
export default function ProfileTabs(){
    return (
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
    );
}