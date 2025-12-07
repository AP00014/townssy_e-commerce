'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favouriteItems, setFavouriteItems] = useState([]);

  // Load favourites from localStorage on mount
  useEffect(() => {
    const savedFavourites = localStorage.getItem('favourites');
    if (savedFavourites) {
      setFavouriteItems(JSON.parse(savedFavourites));
    }
  }, []);

  // Save favourites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favouriteItems));
  }, [favouriteItems]);

  const addToFavourites = (product) => {
    setFavouriteItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (!existingItem) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const removeFromFavourites = (productId) => {
    setFavouriteItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const toggleFavourite = (product) => {
    const isFavourite = favouriteItems.some(item => item.id === product.id);
    if (isFavourite) {
      removeFromFavourites(product.id);
    } else {
      addToFavourites(product);
    }
  };

  const isFavourite = (productId) => {
    return favouriteItems.some(item => item.id === productId);
  };

  const clearFavourites = () => {
    setFavouriteItems([]);
  };

  const getFavouritesCount = () => {
    return favouriteItems.length;
  };

  return (
    <FavouritesContext.Provider value={{
      favouriteItems,
      addToFavourites,
      removeFromFavourites,
      toggleFavourite,
      isFavourite,
      clearFavourites,
      getFavouritesCount
    }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within FavouritesProvider');
  }
  return context;
}