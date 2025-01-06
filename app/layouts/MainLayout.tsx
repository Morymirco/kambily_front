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

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-grow">
        {/* Container principal avec padding responsive */}
        <div className="container mx-auto  sm:px-4 overflow-hidden">
          {children}
        </div>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default MainLayout; 