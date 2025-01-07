import TestProvider from '@/app/providers/TestProvider';

export default function TestLayout({ children }) {
  return (
    <TestProvider>
      {children}
    </TestProvider>
  );
} 