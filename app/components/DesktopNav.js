'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ProfileModal from './ProfileModal';
import { useProfile } from '../context/ProfileContext';

export default function DesktopNav({ cartCount = 3 }) {
  const pathname = usePathname();
  const { isProfileOpen, toggleProfile, closeProfile } = useProfile();

  return (
    <>
      <div className="desktop-nav">
        <Link href="/favorites" className="desktop-nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </Link>
        <Link href="/cart" className="desktop-nav-item">
          <div className="desktop-cart-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && (
              <span className="desktop-cart-badge">{cartCount}</span>
            )}
          </div>
        </Link>
        <div className="profile-dropdown-container">
          <div
            className="desktop-nav-item"
            onClick={toggleProfile}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <ProfileModal isOpen={isProfileOpen} onClose={closeProfile} variant="dropdown" />
        </div>
      </div>
    </>
  );
}

