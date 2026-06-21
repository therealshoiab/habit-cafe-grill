import React from 'react';

interface NotFoundProps {
  setCurrentPage: (page: string) => void;
}

export default function NotFound({ setCurrentPage }: NotFoundProps) {
  const handleHomeClick = () => {
    setCurrentPage('home');
    window.location.hash = '#/home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      style={{ 
        padding: '8rem 0 5rem 0', 
        minHeight: '100vh', 
        backgroundColor: '#0a0a0c', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <section className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        
        {/* Visual floating number */}
        <div 
          style={{
            fontSize: '9rem',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800,
            color: 'var(--primary-color)',
            lineHeight: '1',
            letterSpacing: '2px',
            textShadow: '0 10px 30px rgba(212, 175, 55, 0.25)',
            animation: 'float404 4s ease-in-out infinite'
          }}
        >
          404
        </div>

        <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', marginTop: '1rem' }}>
          Page Not Found
        </h2>
        
        <p style={{ color: 'var(--text-muted)', maxWidth: '450px', fontSize: '1rem', lineHeight: '1.6' }}>
          Oops! The page you are looking for has been eaten, moved, or simply doesn't exist. Let's get you back to the warmth of our cafe.
        </p>

        <button 
          onClick={handleHomeClick}
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
        >
          Go Back Home
        </button>

        <style>{`
          @keyframes float404 {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
        `}</style>
      </section>
    </div>
  );
}
