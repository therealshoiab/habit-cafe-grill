import React, { useEffect, useState, useRef } from 'react';

export default function InteractiveCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const trailRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Setup interactive hover listeners
    const addHoverClass = () => document.body.classList.add('cursor-hover');
    const removeHoverClass = () => document.body.classList.remove('cursor-hover');

    const setupHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, .btn, input, textarea, select, [role="button"], .food-card');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', addHoverClass);
        el.addEventListener('mouseleave', removeHoverClass);
      });
    };

    // Watch for DOM changes to apply listeners to dynamic components
    const observer = new MutationObserver(setupHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    setupHoverListeners();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      observer.disconnect();
      document.body.classList.remove('cursor-hover');
    };
  }, []);

  // Smooth trail effect using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const updateTrail = () => {
      const ease = 0.15; // Smooth factor
      const dx = position.x - trailRef.current.x;
      const dy = position.y - trailRef.current.y;
      
      trailRef.current.x += dx * ease;
      trailRef.current.y += dy * ease;
      
      setTrailPosition({ x: trailRef.current.x, y: trailRef.current.y });
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className="custom-cursor" 
        style={{ left: `${trailPosition.x}px`, top: `${trailPosition.y}px` }}
      />
      <div 
        className="custom-cursor-dot" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
}
