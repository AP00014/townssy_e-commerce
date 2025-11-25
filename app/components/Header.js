'use client';

import { useHeader } from '../context/HeaderContext';

export default function Header() {
  const { isHeaderVisible } = useHeader();

  return (
    <div className={`header ${!isHeaderVisible ? 'hidden' : ''}`}>
      <div className="header-top">
        <div>
          <div className="header-greeting">Hello,</div>
          <div className="header-title">Welcome</div>
        </div>
      </div>
    </div>
  );
}

