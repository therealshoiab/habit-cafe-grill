import React, { Suspense, lazy, useState, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

// Error Boundary for catching Spline rendering/buffer errors
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("Spline Render Error caught by Boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface SplineSceneWrapperProps {
  scene: string;
  className?: string;
  fallback?: React.ReactNode;
}

export default function SplineSceneWrapper({ 
  scene, 
  className = '', 
  fallback 
}: SplineSceneWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    console.warn("Spline loading error handler triggered.");
    setHasError(true);
  };

  // Default premium fallback skeleton loader
  const defaultFallback = (
    <div 
      className="spline-skeleton-loader"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        zIndex: 1
      }}
    >
      <div 
        className="spline-spinner"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid rgba(212, 175, 55, 0.1)',
          borderTopColor: '#d4af37',
          animation: 'spin 1s linear infinite'
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  const errorFallback = (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        backgroundImage: 'url("./images/habit_storefront_1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: '1.5px solid var(--border-color)'
      }}
    >
      {/* Semi-transparent dark overlay for text contrast */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          zIndex: 1
        }}
      />
      
      {/* Text overlay content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '2rem', color: '#ffffff' }}>
        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>☕</span>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffffff', fontFamily: "'Playfair Display', serif", textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          Welcome to The Habit
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.95)', marginTop: '0.5rem', fontFamily: "'Outfit', sans-serif", textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
          Experience the cozy warmth & authentic flavors of Srinagar's premium cafe.
        </p>
      </div>
    </div>
  );

  return (
    <div 
      className={`spline-container ${className}`} 
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {!isLoaded && !hasError && (fallback || defaultFallback)}
      
      {!hasError ? (
        <SplineErrorBoundary fallback={errorFallback}>
          <Suspense fallback={fallback || defaultFallback}>
            <Spline 
              scene={scene} 
              onLoad={handleLoad} 
              onError={handleError}
              style={{ 
                width: '100%', 
                height: '100%',
                opacity: isLoaded ? 1 : 0, 
                transition: 'opacity 0.8s ease'
              }} 
            />
          </Suspense>
        </SplineErrorBoundary>
      ) : (
        errorFallback
      )}
    </div>
  );
}
