import React, { useEffect } from 'react';
import gsap from 'gsap';
import SplineSceneWrapper from '../components/SplineSceneWrapper';

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-tagline', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.4 }
    )
    .fromTo('.hero-title-word', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power4.out' }, 
      '-=0.4'
    )
    .fromTo('.hero-subtitle', 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 
      '-=0.4'
    )
    .fromTo('.hero-btn-container', 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, 
      '-=0.3'
    )
    .fromTo('.hero-badge-container', 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, 
      '-=0.3'
    );
  }, []);

  const handleCTA = (page: string) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section 
        className="hero-section"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '7rem 2rem 4rem 2rem',
          boxSizing: 'border-box',
          backgroundColor: 'var(--bg-color)',
        }}
      >
        {/* Hero Background Canvas Removed per user request */}

        <div className="container hero-grid">
          {/* Hero Left Content */}
          <div className="hero-left-content">
            <div className="hero-tagline">
              Srinagar's Favorite Hub
            </div>
            
            <h1 
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                lineHeight: '1.15',
                fontWeight: 800,
                fontFamily: "'Playfair Display', serif",
                color: 'var(--text-heading)',
                letterSpacing: '-0.5px'
              }}
            >
              <span className="hero-title-word">Where </span>
              <span className="hero-title-word" style={{ color: 'var(--primary-color)' }}>Great </span>
              <span className="hero-title-word" style={{ color: 'var(--primary-color)' }}>Food </span>
              <span className="hero-title-word">Meets </span>
              <br className="desktop-only-br" />
              <span className="hero-title-word">Great </span>
              <span className="hero-title-word" style={{ color: 'var(--primary-color)' }}>Vibes.</span>
            </h1>

            <p 
              className="hero-subtitle"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1.05rem',
                color: 'var(--text-muted)',
                maxWidth: '520px',
                lineHeight: '1.65',
                marginTop: '1rem'
              }}
            >
              The Habit Cafe & Grill — Balgarden Road's favorite destination for delicious grills, momos, authentic biryani, shawarmas, and unforgettable dining moments.
            </p>

            <div className="hero-btn-container">
              <button 
                onClick={() => handleCTA('menu')} 
                className="btn btn-primary"
              >
                View Menu
              </button>
              <button 
                onClick={() => handleCTA('order')} 
                className="btn btn-secondary"
              >
                Order Online
              </button>
            </div>

            {/* Badges */}
            <div className="hero-badges-row">
              <div className="hero-badge-container">
                <span className="badge-stat">4.2 ★</span>
                <span className="badge-label">Google Rating</span>
              </div>
              <div className="hero-badge-container">
                <span className="badge-stat">377+</span>
                <span className="badge-label">Patron Reviews</span>
              </div>
              <div className="hero-badge-container">
                <span className="badge-stat">9 AM - 10 PM</span>
                <span className="badge-label">Opening Hours</span>
              </div>
            </div>
          </div>

          {/* Hero Right Content - Spline scene or high-end fallback graphic */}
          <div className="hero-right-media">
            {/* Embed a default premium Spline scene or degradation screen */}
            <SplineSceneWrapper scene="https://prod.spline.design/kZDDjO5Fr4raMmOL/scene.splinecode" />
          </div>
        </div>
      </section>

      {/* 2. CORE TEASER / INTRODUCTION SECTION */}
      <section style={{ padding: '7rem 0', backgroundColor: 'var(--bg-color)', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          
          <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '4.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
              Traditional Kashmiri Hospitality Meets Modern Comfort
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8' }}>
              Located in Balgarden Road near Petrol Pump, Karan Nagar, Srinagar, we combine culinary excellence with premium cafe vibes. Each recipe is crafted by culinary experts using fresh ingredients and slow-grill roasting methods.
            </p>
          </div>

          <div className="teaser-cards-grid">
            {/* Card 1 */}
            <div className="glass-panel teaser-card">
              <div className="teaser-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M16.2 7.8l-2 2a3 3 0 0 0-4.2 4.2l-2 2"></path></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: "'Playfair Display', serif" }}>Premium Grills</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Perfect chicken and fish grills prepared with custom marinades and slow-roasted for ultimate tenderness.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="glass-panel teaser-card">
              <div className="teaser-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: "'Playfair Display', serif" }}>Legendary Momos</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Srinagar's highest-rated chicken momos, chicken malai momos, and fried varieties served with spicy red chutney.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-panel teaser-card">
              <div className="teaser-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: "'Playfair Display', serif" }}>Cozy Ambience</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Relaxing, aesthetic, family-friendly seating designed for sharing meals and creating wonderful memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Styled Responsive Classes (Anti-Inline Media Query Warnings) */}
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: 4rem;
        }
        .hero-left-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: left;
        }
        .hero-tagline {
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          color: var(--primary-color);
          letter-spacing: 3px;
          fontWeight: 700;
          text-transform: uppercase;
          border: 1px solid var(--border-color);
          padding: 0.45rem 1.1rem;
          border-radius: 30px;
          width: fit-content;
          background-color: rgba(211, 29, 36, 0.05);
        }
        .hero-title-word {
          display: inline-block;
        }
        .hero-btn-container {
          display: flex;
          gap: 1rem;
          margin-top: 1.25rem;
        }
        .hero-badges-row {
          display: flex;
          gap: clamp(1rem, 4vw, 2.25rem);
          margin-top: 2rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1.75rem;
        }
        .hero-badge-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .badge-stat {
          font-size: clamp(1.2rem, 3.5vw, 1.6rem);
          font-weight: 700;
          color: var(--rating-color);
          font-family: var(--font-sans);
          white-space: nowrap;
        }
        .badge-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 2px;
          white-space: nowrap;
        }
        .hero-right-media {
          position: relative;
          width: 100%;
          height: 460px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--card-shadow);
          border: 1.5px solid var(--border-color);
        }
        .teaser-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .teaser-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }
        .teaser-icon-wrapper {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(211, 29, 36, 0.06);
          display: flex;
          align-items: center;
          color: var(--primary-color);
          justify-content: center;
        }
        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 3rem !important;
          }
          .hero-left-content {
            text-align: center !important;
            align-items: center !important;
          }
          .hero-btn-container {
            justify-content: center !important;
          }
          .hero-badges-row {
            justify-content: center !important;
            gap: 1.75rem !important;
          }
          .teaser-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .desktop-only-br {
            display: none !important;
          }
        }
        @media (max-width: 580px) {
          .hero-badges-row {
            flex-direction: column !important;
            align-items: center !important;
            gap: 1.25rem !important;
            border-top: 1px solid var(--border-color);
            padding-top: 1.5rem;
            width: 100%;
          }
          .hero-badge-container {
            align-items: center !important;
          }
        }
      `}</style>
    </div>
  );
}
