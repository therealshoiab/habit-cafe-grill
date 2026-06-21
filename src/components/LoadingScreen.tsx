import React, { useEffect, useState } from 'react';
import BrandLogo from './BrandLogo';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 1000; // 1 second loading
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.floor(next);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Start transition
      setIsFadingOut(true);

      // Trigger onComplete after CSS transition finishes (600ms)
      const timer = setTimeout(() => {
        onComplete();
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div 
      className="loader-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0c0c0e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'translateY(-100%)' : 'translateY(0%)',
        ['--text-heading' as any]: '#ffffff',
        ['--bg-color' as any]: '#0c0c0e',
        ['--text-muted' as any]: 'rgba(255, 255, 255, 0.5)'
      }}
    >
      <div 
        className="loader-logo-wrap" 
        style={{
          marginBottom: '2rem',
          textAlign: 'center',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          opacity: isFadingOut ? 0 : 1,
          transform: isFadingOut ? 'translateY(-20px)' : 'translateY(0)'
        }}
      >
        <BrandLogo size={75} showText={true} />
      </div>
      
      <div 
        className="loader-progress"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '200px',
          transition: 'opacity 0.3s ease',
          opacity: isFadingOut ? 0 : 1
        }}
      >
        <div 
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.2rem',
            color: 'var(--text-heading)',
            fontWeight: 500,
            marginBottom: '0.5rem'
          }}
        >
          {progress}%
        </div>
        <div 
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}
        >
          <div 
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: 'var(--primary-color)',
              transition: 'width 0.1s linear'
            }}
          />
        </div>
      </div>
    </div>
  );
}
