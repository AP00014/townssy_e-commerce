import "./globals.css";
import "./styles/cart.css";
import "./styles/favourites.css";
import "./styles/locationfilter.css";
import "./styles/quickfilter.css";
import "./styles/category.css";
import "./styles/discover.css";
import { HeaderProvider } from "./context/HeaderContext";
import { CartProvider } from "./context/CartContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import { ProfileProvider } from "./context/ProfileContext";
import { AuthProvider } from "./context/AuthContext";

export const metadata = {
  title: "Townssy E-commerce",
  description: "Modern e-commerce platform",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="theme-color" content="#06392F" />
      </head>
      <body>
        <HeaderProvider>
          <AuthProvider>
            <CartProvider>
              <FavouritesProvider>
                <ProfileProvider>
                  {children}
                </ProfileProvider>
              </FavouritesProvider>
            </CartProvider>
          </AuthProvider>
        </HeaderProvider>
      </body>
    </html>
  );
}
