import './globals.css'
import './styles/cart.css'
import './styles/favourites.css'
import './styles/locationfilter.css'
import './styles/quickfilter.css'
import './styles/category.css'
import { HeaderProvider } from './context/HeaderContext'
import { CartProvider } from './context/CartContext'
import { FavouritesProvider } from './context/FavouritesContext'
import { ProfileProvider } from './context/ProfileContext'

export const metadata = {
  title: 'Townssy E-commerce',
  description: 'Modern e-commerce platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#06392F" />
      </head>
      <body>
        <HeaderProvider>
          <CartProvider>
            <FavouritesProvider>
              <ProfileProvider>
                {children}
              </ProfileProvider>
            </FavouritesProvider>
          </CartProvider>
        </HeaderProvider>
      </body>
    </html>
  )
}