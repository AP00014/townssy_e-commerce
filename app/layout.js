import './globals.css'
import './styles/cart.css'
import './styles/favourites.css'
import { HeaderProvider } from './context/HeaderContext'
import { CartProvider } from './context/CartContext'
import { FavouritesProvider } from './context/FavouritesContext'

export const metadata = {
  title: 'Townssy E-commerce',
  description: 'Modern e-commerce platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <HeaderProvider>
          <CartProvider>
            <FavouritesProvider>
              {children}
            </FavouritesProvider>
          </CartProvider>
        </HeaderProvider>
      </body>
    </html>
  )
}