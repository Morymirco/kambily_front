import MainLayout from '@/app/layouts/MainLayout';
import { ReactNode } from 'react';



export default function RootLayout({ children }) {
  return <MainLayout>{children}</MainLayout>;
} 