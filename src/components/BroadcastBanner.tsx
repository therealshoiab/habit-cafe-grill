import React, { useState, useEffect } from 'react';
import { menuService } from '../services/menuService';
import type { BroadcastBannerData } from '../data/defaultMenu';

interface BroadcastBannerProps {
  onVisibilityChange?: (visible: boolean) => void;
}

export default function BroadcastBanner({ onVisibilityChange }: BroadcastBannerProps) {
  const [banner, setBanner] = useState<BroadcastBannerData>(menuService.getBroadcastBanner());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const latest = menuService.getBroadcastBanner();
      setBanner(latest);
      setDismissed(false); // Re-show on new updates
    };

    window.addEventListener('habit:broadcast_updated', handleUpdate);
    return () => window.removeEventListener('habit:broadcast_updated', handleUpdate);
  }, []);

  const isVisible = banner.enabled && Boolean(banner.message.trim()) && !dismissed;

  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(isVisible);
    }
  }, [isVisible, onVisibilityChange]);

  if (!isVisible) return null;

  const getBackground = () => {
    switch (banner.variant) {
      case 'gold':
        return 'linear-gradient(90deg, #9e6d20 0%, #e5b757 50%, #9e6d20 100%)';
      case 'dark':
        return 'linear-gradient(90deg, #111116 0%, #262630 50%, #111116 100%)';
      case 'red':
      default:
        return 'linear-gradient(90deg, #b0151a 0%, #d31d24 50%, #b0151a 100%)';
    }
  };

  const textColor = banner.variant === 'gold' ? '#0f0a07' : '#ffffff';

  const handleLinkClick = () => {
    if (!banner.linkUrl) return;
    if (banner.linkUrl.startsWith('#/')) {
      window.location.hash = banner.linkUrl;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.open(banner.linkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="broadcast-banner-wrapper"
      style={{
        position: 'relative',
        zIndex: 10001,
        width: '100%',
        background: getBackground(),
        color: textColor,
        boxShadow: '0 4px 15px rgba(211, 29, 36, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.45rem 1rem',
        fontSize: '0.86rem',
        fontWeight: 600,
        fontFamily: "'Outfit', sans-serif",
        overflow: 'hidden'
      }}
    >
      {/* Left Badge */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.4rem', 
          padding: '0.2rem 0.65rem', 
          backgroundColor: 'rgba(0, 0, 0, 0.25)', 
          borderRadius: '20px',
          fontSize: '0.74rem',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          fontWeight: 800,
          flexShrink: 0,
          zIndex: 2
        }}
      >
        <span style={{ animation: 'blinkPulse 1.5s infinite' }}>📢</span>
        <span>Announcement</span>
      </div>

      {/* Marquee Scrolling Ticker in Center */}
      <div 
        className="broadcast-marquee-container"
        style={{
          flexGrow: 1,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          margin: '0 1.25rem',
          position: 'relative'
        }}
        title="Hover to pause announcement"
      >
        <div 
          className="broadcast-marquee-track"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            animation: 'marqueeScrollRightToLeft 30s linear infinite',
            width: 'max-content'
          }}
        >
          <span style={{ paddingRight: '3.5rem' }}>
            {banner.message}
          </span>
          <span style={{ paddingRight: '3.5rem' }}>
            ✦ &nbsp;&nbsp;&nbsp; {banner.message}
          </span>
          <span style={{ paddingRight: '3.5rem' }}>
            ✦ &nbsp;&nbsp;&nbsp; {banner.message}
          </span>
        </div>
      </div>

      {/* Right Action & Dismiss */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0, zIndex: 2 }}>
        {banner.linkText && banner.linkText.trim().toLowerCase() !== 'order online' && banner.linkUrl && (
          <button
            onClick={handleLinkClick}
            style={{
              background: banner.variant === 'gold' ? '#0f0a07' : '#ffffff',
              color: banner.variant === 'gold' ? '#ffffff' : '#d31d24',
              border: 'none',
              borderRadius: '20px',
              padding: '0.25rem 0.85rem',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {banner.linkText}
          </button>
        )}

        <button
          onClick={() => setDismissed(true)}
          style={{
            background: 'transparent',
            border: 'none',
            color: textColor,
            cursor: 'pointer',
            fontSize: '1rem',
            padding: '0.15rem 0.35rem',
            lineHeight: 1,
            opacity: 0.8,
            transition: 'opacity 0.2s ease'
          }}
          title="Dismiss Announcement"
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
        >
          ✕
        </button>
      </div>

      <style>{`
        @keyframes marqueeScrollRightToLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes blinkPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.92); }
        }
        .broadcast-marquee-container:hover .broadcast-marquee-track,
        .broadcast-marquee-track:hover {
          animation-play-state: paused;
          cursor: default;
        }
      `}</style>
    </div>
  );
}
