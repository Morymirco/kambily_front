'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    FaBars,
    FaChartLine,
    FaHistory,
    FaHome,
    FaMoneyBillWave,
    FaMotorcycle,
    FaStar,
    FaTimes,
    FaUser
} from 'react-icons/fa';

const DriverLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: FaHome, path: '/driver' },
    { name: 'Mes Livraisons', icon: FaMotorcycle, path: '/driver/deliveries' },
    { name: 'Historique', icon: FaHistory, path: '/driver/history' },
    { name: 'Mes Gains', icon: FaMoneyBillWave, path: '/driver/earnings' },
    { name: 'Mes Évaluations', icon: FaStar, path: '/driver/ratings' },
    { name: 'Mon Profil', icon: FaUser, path: '/driver/profile' },
    { name: 'Analyses', icon: FaChartLine, path: '/driver/analytics' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full w-64 bg-white border-r">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/driver" className="flex items-center">
              <img src="/logo.webp" alt="Logo" className="h-8" />
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#048B9A] text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="ml-3">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser className="w-5 h-5 text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Mamadou Diallo</p>
                <p className="text-xs text-gray-500">Livreur</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b">
        <div className="flex items-center justify-between h-16 px-4">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <FaBars className="w-5 h-5" />
          </button>
          <img src="/logo.webp" alt="Logo" className="h-8" />
          <div className="w-8" /> {/* Spacer */}
        </div>
      </div>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-64' : ''
      }`}>
        <div className="p-4 md:p-8 mt-16 md:mt-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DriverLayout; 