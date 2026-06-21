import React, { useEffect } from 'react';
import gsap from 'gsap';

export default function About() {
  useEffect(() => {
    // GSAP scroll animation for timeline nodes
    gsap.fromTo('.timeline-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
        }
      }
    );
  }, []);

  const timelineEvents = [
    { year: "2018", title: "Inception of The Habit", desc: "Founded with a mission to bring high-quality, delicious quick-bites and cafe options to Srinagar." },
    { year: "2020", title: "Signature Grills & Fusions", desc: "Expanded the menu with fire-roasted grills, authentic momos, and Indo-Chinese fusions, quickly becoming a local favorite." },
    { year: "2022", title: "Karan Nagar Flagship", desc: "Moved to our current premium space in Karan Nagar, enhancing the dining atmosphere with cozy modern aesthetics." },
    { year: "Today", title: "Srinagar's Favorite Hub", desc: "Holding a proud 4.2★ rating with over 377 reviews, we continue to serve Srinagar's best momos and shawarmas daily." }
  ];

  return (
    <div style={{ padding: '8rem 0 5rem 0', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      
      {/* 1. Brand Story Header */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div className="about-story-grid">
          
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div 
              style={{
                fontSize: '0.85rem',
                color: 'var(--primary-color)',
                letterSpacing: '4px',
                fontWeight: 700,
                textTransform: 'uppercase',
                border: '1px solid var(--border-color)',
                padding: '0.4rem 1.25rem',
                borderRadius: '30px',
                width: 'fit-content',
                backgroundColor: 'rgba(212, 175, 55, 0.05)'
              }}
            >
              Our Story
            </div>
            
            <h2 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)' }}>
              A Passion For Great Food & Cozy Dining
            </h2>
            
            <p style={{ color: 'var(--text-color)', lineHeight: '1.8' }}>
              At The Habit Cafe & Grill, our journey started with a simple belief: food should connect people and inspire warmth. Nestled in Balgarden Road, Karan Nagar, we set out to create a culinary hub that merges fresh, high-quality ingredients with a comfortable, family-friendly atmosphere.
            </p>
            
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              Whether you are here for our legendary steamed chicken malai momos, slow-cooked boneless chicken biryani, or crispy fried fish, each dish is made with premium spices and utmost care. We prioritize hospitality above all, ensuring every guest feels right at home.
            </p>

            <div className="about-highlights-grid">
              <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--primary-color)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>100% Fresh</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', flexGrow: 1 }}>We source only local, fresh poultry and fish daily. No compromises.</span>
              </div>
              <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--primary-color)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Family Atmosphere</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', flexGrow: 1 }}>Cozy space designed for family gatherings, friends' hangouts, and celebrations.</span>
              </div>
            </div>
          </div>

          {/* Right Image / Graphic */}
          <div style={{ position: 'relative', width: '100%' }}>
            <div 
              style={{
                width: '100%',
                height: 'clamp(280px, 45vw, 480px)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--card-shadow)',
                border: '1.5px solid var(--border-color)',
                backgroundImage: 'url("./images/habit_storefront_3.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            {/* Ambient gold glow */}
            <div className="glow-spot" style={{ top: '-10%', right: '-10%', opacity: 0.3 }} />
          </div>
        </div>
      </section>

      {/* 2. Interactive Timeline */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", marginBottom: '1rem' }}>Our Journey Over The Years</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            A look back at the milestones that shaped The Habit Cafe & Grill into Karan Nagar's favorite restaurant.
          </p>
        </div>

        <div 
          className="timeline-container" 
          style={{
            position: 'relative',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '2rem 0'
          }}
        >
          {/* Central Line */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '2px',
              backgroundColor: 'var(--border-color)',
              transform: 'translateX(-50%)'
            }}
            className="timeline-center-line"
          />

          {timelineEvents.map((evt, idx) => (
            <div 
              key={idx}
              className="timeline-item"
              style={{
                display: 'flex',
                justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end',
                alignItems: 'center',
                width: '100%',
                marginBottom: '3rem',
                position: 'relative'
              }}
            >
              {/* Timeline dot */}
              <div 
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-color)',
                  border: '3px solid var(--primary-color)',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  boxShadow: '0 0 10px var(--primary-color)'
                }}
              />

              {/* Timeline Card */}
              <div 
                className="glass-panel"
                style={{
                  width: '43%',
                  padding: '2rem',
                  textAlign: 'left',
                  position: 'relative'
                }}
              >
                <span 
                  style={{ 
                    fontSize: '1.5rem', 
                    fontFamily: "'Playfair Display', serif", 
                    color: 'var(--primary-color)', 
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}
                >
                  {evt.year}
                </span>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>{evt.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{evt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insert responsive style helpers */}
      <style>{`
        .about-story-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
        }
        .about-highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1rem;
          align-items: stretch;
        }
        @media (max-width: 580px) {
          .about-highlights-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
        @media (max-width: 991px) {
          .about-story-grid {
            display: flex !important;
            flex-direction: column-reverse !important;
            gap: 2.5rem !important;
          }
          .timeline-center-line {
            left: 20px !important;
            transform: none !important;
          }
          .timeline-item {
            justify-content: flex-end !important;
          }
          .timeline-item > div:first-child {
            left: 20px !important;
          }
          .timeline-item > .glass-panel {
            width: calc(100% - 60px) !important;
          }
        }
      `}</style>
    </div>
  );
}
