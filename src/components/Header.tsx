import { Bell, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header: React.FC = () => {
  return (
         <header className="flex items-center justify-between border-b border-gray-200 px-10 py-3">
           <div className="flex items-center gap-4 text-[#663399]">
             <div className="w-4 h-4">
               <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"/>
               </svg>
             </div>
             <h2 className="text-lg font-bold">HubDigital</h2>
           </div>
           
           <div className="flex items-center gap-8">
             <nav className="flex items-center gap-9">
               {/* <Link href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Dashboard</Link> */}
               <Link href={'/'} className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Products</Link>
               <Link href={"/orders"} className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Orders</Link>
               <Link href={"/customers"} className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Customers</Link>
               {/* <Link href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">Analytics</Link> */}
             </nav>
             
             <Link href={'/notifications'} className="flex items-center justify-center h-10 px-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
               <Bell color='#663399' className="w-5 h-5 text-gray-900" />
             </Link>
             
               {/* <User className="w-6 h-6 text-gray-600" /> */}
           </div>
         </header>
          

  )
}

export default Header