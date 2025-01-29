import ScrollToTop from '@/app/Components/ScrollToTop';
import MainLayout from '@/app/layouts/MainLayout';
import { Krub } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './providers/AuthProvider';
import { CartProvider } from './providers/CartProvider';
import { FavoritesProvider } from './providers/FavoritesProvider';
import { LoadingProvider } from './providers/LoadingProvider';



const krub = Krub({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-krub',
});

export const metadata = {
  title: {
    default: 'Kambily - Votre boutique en ligne préférée',
    template: '%s | Kambily'
  },
  description: 'Découvrez Kambily, votre destination shopping en ligne en Guinée. Vêtements, accessoires et plus encore avec livraison rapide.',
  keywords: ['ecommerce', 'boutique en ligne', 'shopping', 'Guinée', 'vêtements', 'mode', 'Kambily'],
  authors: [{ name: 'Kambily' }],
  creator: 'Kambily',
  publisher: 'Kambily',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/logo.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/logo.jpg', sizes: '16x16', type: 'image/jpeg' }
    ],
    apple: [
      { url: '/logo.jpg', sizes: '180x180', type: 'image/jpeg' }
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#048B9A',
  manifest: '/manifest.json',
  // Configuration de la recherche dans le navigateur
  other: {
    'theme-color': '#048B9A',
    'msapplication-TileColor': '#048B9A',
    'msapplication-navbutton-color': '#048B9A',
    'apple-mobile-web-app-status-bar-style': '#048B9A',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={krub.variable}>
      <head>
        <link rel="icon" href="/logo.jpg" />
        <meta name="theme-color" content="#048B9A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#048B9A" />
        <meta name="apple-mobile-web-app-title" content="Kambily" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Kambily" />
        {/* Personnalisation de la barre de recherche */}
        <meta name="msapplication-TileColor" content="#048B9A" />
        <meta name="msapplication-navbutton-color" content="#048B9A" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#048B9A" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#037483" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Configuration de la recherche */}
        <meta name="google-site-verification" content="votre-code-de-verification" />
        <link 
          type="application/opensearchdescription+xml" 
          rel="search" 
          href="/opensearch.xml"
          title="Rechercher sur Kambily"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={krub.className}>
        <LoadingProvider>
          <AuthProvider>
            <FavoritesProvider>
              <CartProvider>
               
                  <MainLayout>
                    {children}
                  </MainLayout>
               
              </CartProvider>
            </FavoritesProvider>
          </AuthProvider>
        </LoadingProvider>
        <ScrollToTop />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful');
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}