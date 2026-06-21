import React, { useState, useEffect } from 'react';
import { updateSEO } from './utils/seoHelper';

// Layout & Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Signatures from './pages/Signatures';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import OrderOnline from './pages/OrderOnline';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const saved = localStorage.getItem('theme-preference');
    return saved !== 'dark'; // Light by default
  });

  // Sync hash routing on mount and hash changes
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash || '#/home';
      const path = hash.replace(/^#\//, '');
      const validPages = [
        'home', 'about', 'menu', 'signatures', 'gallery', 
        'reviews', 'order', 'contact', 'faq', 'privacy', 'terms'
      ];
      if (validPages.includes(path)) {
        setCurrentPage(path);
      } else {
        setCurrentPage('404');
      }
    };

    window.addEventListener('hashchange', parseHash);
    parseHash(); // Initial check

    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Update theme class on body (Bright theme is default, toggle dark-theme class)
  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme-preference', 'light');
    } else {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme-preference', 'dark');
    }
  }, [isLightTheme]);

  // Update SEO meta tags on page change
  useEffect(() => {
    if (!isLoading) {
      updateSEO(currentPage);
    }
  }, [currentPage, isLoading]);

  // Update scroll progress indicator
  useEffect(() => {
    const handleScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
      }
    };
    
    window.addEventListener('scroll', handleScrollProgress);
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  // Page Switcher Renderer
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'menu':
        return <Menu />;
      case 'signatures':
        return <Signatures />;
      case 'gallery':
        return <Gallery />;
      case 'reviews':
        return <Reviews />;
      case 'order':
        return <OrderOnline />;
      case 'contact':
        return <Contact />;
      case 'faq':
        return <FAQ />;
      case 'privacy':
      case 'terms':
        return <Legal />;
      case '404':
      default:
        return <NotFound setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      {/* 1. Preloader loading screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <div className="bg-gradient-radial" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
          
          {/* Scroll progress bar */}
          <div className="scroll-progress-bar" />

          {/* Custom Trail Cursors removed per user request */}

          {/* Navigation */}
          <Navbar 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            isLightTheme={isLightTheme} 
            setIsLightTheme={setIsLightTheme} 
          />

          {/* Active view body */}
          <main className="main-content">
            {renderPage()}
          </main>

          {/* Footer map & site details */}
          <Footer setCurrentPage={setCurrentPage} />

          {/* Floating CTA Call Reservation Button */}
          <div className="floating-cta">
            <a 
              href="tel:+917006677631" 
              className="btn floating-call-btn"
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--rating-color)',
                border: 'none',
                boxShadow: 'rgba(36, 150, 63, 0.35) 0px 8px 24px'
              }}
              title="Call Reservation"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
