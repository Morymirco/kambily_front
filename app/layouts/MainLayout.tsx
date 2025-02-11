  'use client'
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Footer from './../Components/Footer';
import Navbar from './../Components/NavBar/Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Utiliser usePathname pour vérifier la route actuelle
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isDriverRoute = pathname?.startsWith('/driver');

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdminRoute && !isDriverRoute && <Navbar />}
      
      <main className="flex-grow">
        {/* Container principal avec padding responsive */}
        <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-4">
          {children}
        </div>
      </main>

      {!isAdminRoute && !isDriverRoute && <Footer />}
    </div>
  );
};

export default MainLayout; 