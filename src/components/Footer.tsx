import React, { useState } from 'react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleLinkClick = (key: string) => {
    setCurrentPage(key);
    window.location.hash = `#/${key}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer 
      style={{
        backgroundColor: 'var(--surface-color)',
        borderTop: '1px solid var(--border-color)',
        padding: '5rem 0 2rem 0',
        color: 'var(--text-color)',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
        zIndex: 2
      }}
    >
      <div className="container footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1.4fr', gap: '4rem', marginBottom: '4rem' }}>
        
        {/* Brand Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div 
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.6rem',
              fontWeight: 700,
              color: 'var(--primary-color)',
              letterSpacing: '1px',
              cursor: 'pointer'
            }}
            onClick={() => handleLinkClick('home')}
          >
            THE HABIT
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif", letterSpacing: '3px' }}>
              CAFE & GRILL
            </span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Srinagar's premier dining destination. Bringing you premium grills, authentic momos, shawarmas, and a luxury cafe atmosphere in the heart of Karan Nagar.
          </p>
          
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {/* Instagram */}
            <a href="https://www.instagram.com/the_habit_cafe_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Follow us on Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/TheHabitcafeandgrilll" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Like us on Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            {/* X */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
            </a>
            {/* Threads */}
            <a href="https://threads.net" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M8 12a4 4 0 1 0 8 0v-2a2 2 0 0 0 -4 0v2"></path></svg>
            </a>
          </div>
        </div>

        {/* Quick Sitemaps */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-heading)' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            <li><a style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('home')}>Home</a></li>
            <li><a style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('about')}>About Us</a></li>
            <li><a style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('menu')}>Menu</a></li>
            <li><a style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('signatures')}>Signature Dishes</a></li>
            <li><a style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('gallery')}>Photo Gallery</a></li>
            <li><a style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('reviews')}>Reviews</a></li>
          </ul>
        </div>

        {/* Contact details */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-heading)' }}>Find Us</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>BALGARDEN ROAD, Near Petrol Pump, Karan Nagar, Srinagar, Jammu & Kashmir 190010</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <a href="tel:+917006677631" style={{ color: 'var(--text-heading)', fontWeight: '600' }}>+91 70066 77631</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>9:00 AM – 10:00 PM (Everyday)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom bar */}
      <div 
        className="container" 
        style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}
      >
        <div>
          © {new Date().getFullYear()} The Habit Cafe & Grill. All rights reserved.
        </div>
        
        {/* Policy Links */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a onClick={() => handleLinkClick('privacy')} style={{ cursor: 'pointer' }}>Privacy Policy</a>
          <a onClick={() => handleLinkClick('terms')} style={{ cursor: 'pointer' }}>Terms & Conditions</a>
        </div>
      </div>

      <style>{`
        .social-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-color);
          transition: all var(--transition-fast);
        }
        .social-icon-btn:hover {
          color: var(--primary-color);
          border-color: var(--primary-color);
          background-color: rgba(211, 29, 36, 0.05);
          transform: translateY(-2px);
        }
        @media (max-width: 991px) {
          footer .container {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 576px) {
          footer .container {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          footer .container:last-child {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
