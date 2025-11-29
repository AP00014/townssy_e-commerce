'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import ProfileModal from './ProfileModal';
import { useProfile } from '../context/ProfileContext';

export default function BottomNav() {
  const pathname = usePathname();
  const isCartPage = pathname === '/cart';
  const { isProfileOpen, toggleProfile, closeProfile } = useProfile();

  const navItems = [
    { 
      label: 'Home', 
      path: '/',
      icon: (isActive) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isActive ? "white" : "none"} stroke={isActive ? "white" : "#999999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    {
      label: 'Orders',
      path: '/orders',
      icon: (isActive) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isActive ? "white" : "none"} stroke={isActive ? "white" : "#999999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      )
    },
    { 
      label: 'Cart', 
      path: '/cart',
      icon: (isActive) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isActive ? "white" : "none"} stroke={isActive ? "white" : "#999999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      )
    },
    { 
      label: 'Favorites', 
      path: '/favorites',
      icon: (isActive) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isActive ? "white" : "none"} stroke={isActive ? "white" : "#999999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    },
    { 
      label: 'Profile', 
      path: '/profile',
      isModal: true,
      icon: (isActive) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isActive ? "white" : "none"} stroke={isActive ? "white" : "#999999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
  ];

  return (
    <>
      <nav className="bottom-nav">
        {navItems.map((item) => {
          const isActive = item.path === pathname;
          const isCartActive = item.path === '/cart' && isCartPage;
          const active = isActive || isCartActive;

          if (item.isModal) {
            return (
              <div
                key={item.path}
                className="nav-item"
                onClick={toggleProfile}
                style={{ cursor: 'pointer' }}
              >
                <div className={`nav-icon-wrapper ${active ? 'active' : ''}`}>
                  {item.icon(active)}
                </div>
                <span style={{ fontSize: '10px', marginTop: '2px' }}>{item.label}</span>
              </div>
            );
          }

          return (
            <Link key={item.path} href={item.path} className="nav-item">
              <div className={`nav-icon-wrapper ${active ? 'active' : ''}`}>
                {item.icon(active)}
              </div>
              <span style={{ fontSize: '10px', marginTop: '2px' }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <ProfileModal isOpen={isProfileOpen} onClose={closeProfile} variant="modal" />
    </>
  );
}

