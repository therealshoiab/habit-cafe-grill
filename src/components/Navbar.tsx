import React, { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLightTheme: boolean;
  setIsLightTheme: (theme: boolean) => void;
}

export default function Navbar({ 
  currentPage, 
  setCurrentPage, 
  isLightTheme, 
  setIsLightTheme 
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'menu', label: 'Menu' },
    { key: 'signatures', label: 'Signatures' },
    { key: 'gallery', label: 'Gallery' },
    { key: 'reviews', label: 'Reviews' },
    { key: 'order', label: 'Order Online' },
    { key: 'contact', label: 'Contact' },
    { key: 'faq', label: 'FAQ' }
  ];

  const handleLinkClick = (key: string) => {
    setCurrentPage(key);
    window.location.hash = `#/${key}`;
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      className={`glass-panel navbar-container ${isScrolled ? 'nav-scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: isScrolled ? '1rem' : '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '92%',
        maxWidth: '1200px',
        zIndex: 9999,
        padding: '0.85rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '50px',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: isLightTheme 
          ? 'rgba(255, 255, 255, 0.88)' 
          : 'rgba(18, 18, 22, 0.92)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        border: isLightTheme 
          ? '1px solid rgba(211, 29, 36, 0.22)' 
          : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isScrolled
          ? 'rgba(0, 0, 0, 0.12) 0px 10px 30px, rgba(211, 29, 36, 0.04) 0px 4px 16px'
          : 'rgba(0, 0, 0, 0.04) 0px 4px 20px'
      }}
    >
      {/* Brand Logo Repro */}
      <div onClick={() => handleLinkClick('home')} style={{ cursor: 'pointer' }}>
        <BrandLogo size={42} showText={true} />
      </div>

      {/* Desktop Navigation Links */}
      <div className="nav-desktop-links">
        {navLinks.map((link) => (
          <button
            key={link.key}
            onClick={() => handleLinkClick(link.key)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: currentPage === link.key ? '700' : '400',
              fontSize: '0.85rem',
              letterSpacing: '0.5px',
              color: currentPage === link.key ? 'var(--primary-color)' : 'var(--text-color)',
              padding: '0.45rem 0.8rem',
              borderRadius: '20px',
              transition: 'all var(--transition-fast)'
            }}
            className="nav-link-btn"
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Utility Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Theme Toggle */}
        <button
          onClick={() => setIsLightTheme(!isLightTheme)}
          className="btn-icon"
          title="Toggle Theme"
          style={{ width: '36px', height: '36px' }}
        >
          {isLightTheme ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          )}
        </button>

        {/* CTA Order Button */}
        <button
          onClick={() => handleLinkClick('order')}
          className="btn nav-order-cta"
          style={{
            fontSize: '0.75rem',
            padding: '0.55rem 1.35rem',
            borderRadius: '20px',
            backgroundColor: 'var(--rating-color)',
            color: '#ffffff',
            border: 'none',
            boxShadow: 'rgba(36, 150, 63, 0.2) 0px 4px 12px'
          }}
        >
          Order Now
        </button>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="btn-icon mobile-menu-toggle"
          style={{ width: '36px', height: '36px' }}
        >
          {isMobileMenuOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-nav-overlay glass-panel"
          style={{
            position: 'absolute',
            top: '4.5rem',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '1.5rem',
            borderRadius: '24px',
            zIndex: 998,
            boxShadow: 'var(--card-shadow)',
            backgroundColor: 'var(--surface-color)',
            border: '2px solid var(--border-color)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)'
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => handleLinkClick(link.key)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: currentPage === link.key ? '600' : '400',
                fontSize: '1rem',
                color: currentPage === link.key ? 'var(--primary-color)' : 'var(--text-color)',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                backgroundColor: currentPage === link.key ? 'rgba(212, 175, 55, 0.08)' : 'transparent'
              }}
            >
              {link.label}
            </button>
          ))}
          
          <button
            onClick={() => handleLinkClick('order')}
            className="btn"
            style={{ 
              width: '100%', 
              marginTop: '1rem', 
              borderRadius: '12px',
              backgroundColor: 'var(--rating-color)',
              color: '#ffffff',
              border: 'none'
            }}
          >
            Order Online
          </button>
        </div>
      )}

      {/* Media Query styles rendered cleanly outside of style objects */}
      <style>{`
        .nav-desktop-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .mobile-menu-toggle {
          display: none;
        }
        .nav-order-cta {
          display: inline-flex;
        }
        .nav-order-cta:hover {
          background-color: #1c7c33 !important;
          transform: translateY(-1px);
          box-shadow: rgba(36, 150, 63, 0.35) 0px 6px 16px !important;
        }
        @media (max-width: 1024px) {
          .nav-desktop-links {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
        @media (max-width: 768px) {
          .nav-order-cta {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
