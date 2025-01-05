'use client'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const MobileNav = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navItems = [
    {
      label: 'Accueil',
      path: '/',
      icon: (
        <Image
          src="/icons/home.svg"
          alt="Accueil"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      )
    },
    {
      label: 'Boutique',
      path: '/boutique',
      icon: (
        <Image
          src="/icons/shop.svg"
          alt="Boutique"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      )
    },
    {
      label: 'Panier',
      path: '/panier',
      icon: (
        <Image
          src="/icons/cart.svg"
          alt="Panier"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      )
    },
    {
      label: 'Favoris',
      path: '/favoris',
      icon: (
        <Image
          src="/icons/heart.svg"
          alt="Favoris"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      )
    },
    {
      label: 'Profil',
      path: '/profile',
      icon: isLoggedIn ? (
        <Image
          src="/team/mory.jpg"
          alt="Profile"
          width={24}
          height={24}
          className="w-6 h-6 rounded-full"
        />
      ) : (
        <Image
          src="/icons/profile.svg"
          alt="Profile"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      )
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-[9999]">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className="relative flex flex-col items-center justify-center w-16"
            >
              <div
                className={`relative ${
                  isActive ? 'text-[#048B9A] scale-110' : 'text-gray-500'
                } transition-all duration-200`}
              >
                {item.icon}
                {isActive && (
                  <div className="absolute -inset-1 bg-[#048B9A]/10 rounded-full -z-10" />
                )}
              </div>
              <span className={`text-xs mt-1 ${
                isActive ? 'text-[#048B9A]' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav; 