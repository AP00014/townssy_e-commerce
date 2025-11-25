'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    // Hide header after 10 seconds (10000ms)
    const timer = setTimeout(() => {
      setIsHeaderVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HeaderContext.Provider value={{ isHeaderVisible, setIsHeaderVisible }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within HeaderProvider');
  }
  return context;
}

