import React, { useState, useEffect, useRef } from 'react';

interface GalleryItem {
  id: number;
  category: 'Cafe Vibe' | 'Social Hub';
  title: string;
  source: 'Instagram' | 'Facebook';
  likes: string;
  comments: string;
  views?: string;
  isVideo?: boolean;
  postUrl: string;
  mediaUrl: string;
}

interface VideoPlayerProps {
  src: string;
  isMuted: boolean;
  onToggleMute: (e: React.MouseEvent) => void;
  onClickCard: () => void;
}

function GalleryVideoPlayer({ src, isMuted, onToggleMute, onClickCard }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // IntersectionObserver to auto-play/pause videos on mobile when they scroll in/out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const isMobile = window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window);
            if (isMobile) {
              video.play().catch(() => {});
            }
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Sync play/pause with hover state (for desktop hover-to-play)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window);
    if (!isMobile) {
      if (isHovered) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, [isHovered]);

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClickCard}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <video
        ref={videoRef}
        src={src}
        muted={isMuted}
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      />
      
      {/* Floating Sound Controller */}
      <button
        onClick={onToggleMute}
        style={{
          position: 'absolute',
          bottom: '0.75rem',
          right: '0.75rem',
          zIndex: 10,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: 'rgba(10, 10, 15, 0.75)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          transition: 'all 0.2s'
        }}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        )}
      </button>
      
      {/* Video Tag Indicator */}
      <span 
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: '#ffffff',
          padding: '0.2rem 0.5rem',
          borderRadius: '12px',
          fontSize: '0.65rem',
          fontWeight: 700,
          pointerEvents: 'none',
          zIndex: 5,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        Reel
      </span>
    </div>
  );
}

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Cafe Vibe' | 'Social Hub'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mutedStates, setMutedStates] = useState<Record<number, boolean>>({});

  const galleryItems: GalleryItem[] = [
    // Restaurant / Cafe Vibe (Storefronts & Interiors)
    {
      id: 1,
      category: 'Cafe Vibe',
      title: 'The Habit Cafe & Grill Front Façade & Premium Glasswork',
      source: 'Facebook',
      likes: '524',
      comments: '42',
      postUrl: 'https://www.facebook.com/TheHabitcafeandgrilll',
      mediaUrl: './images/habit_storefront_3.jpg'
    },
    {
      id: 2,
      category: 'Cafe Vibe',
      title: 'Outdoor Dining & Interactive Ambient Vibe',
      source: 'Instagram',
      likes: '456',
      comments: '28',
      postUrl: 'https://www.instagram.com/the_habit_cafe_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      mediaUrl: './images/habit_storefront_1.jpg'
    },
    {
      id: 4,
      category: 'Cafe Vibe',
      title: 'Elegant Entrance & Warm Welcoming Seating Areas',
      source: 'Instagram',
      likes: '280',
      comments: '19',
      postUrl: 'https://www.instagram.com/the_habit_cafe_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      mediaUrl: './images/habit_storefront_2.jpg'
    },

    // Social Hub (Instagram Posts / Reels)
    {
      id: 6,
      category: 'Social Hub',
      title: 'Celebrating Together: Happy Birthday to Our Master Chef! 🎂',
      source: 'Instagram',
      likes: '141',
      comments: '12',
      views: '1.2k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/p/DRzatOkD-Ij/',
      mediaUrl: './videos/chef_birthday.mp4'
    },
    {
      id: 7,
      category: 'Social Hub',
      title: "Elegance Served on a Plate: Experience The Habit's Vibe ✨",
      source: 'Instagram',
      likes: '81',
      comments: '8',
      views: '890',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/DTXSm3Ekcwr/',
      mediaUrl: './videos/cafe_ambience.mp4'
    },
    {
      id: 8,
      category: 'Social Hub',
      title: 'Our Signature Pleated Crescent Momos Platter 🥟',
      source: 'Instagram',
      likes: '220',
      comments: '14',
      views: '1.5k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/DRl2L8qx5Nd/',
      mediaUrl: './videos/momo_platter.mp4'
    },
    {
      id: 9,
      category: 'Social Hub',
      title: 'Authentic Boneless Chicken Kanti with Fluffy Rumali Roti 🍗',
      source: 'Instagram',
      likes: '110',
      comments: '9',
      isVideo: false,
      postUrl: 'https://www.instagram.com/p/DRgu1sPkfx6/',
      mediaUrl: './videos/chicken_kanti.jpg'
    },
    {
      id: 10,
      category: 'Social Hub',
      title: 'Chicken Hakka Noodles: Sizzling Wok Action! 🍜',
      source: 'Instagram',
      likes: '147',
      comments: '11',
      views: '1.1k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/DFH5k9GvOxB/',
      mediaUrl: './videos/noodles_sizzle.mp4'
    },
    {
      id: 11,
      category: 'Social Hub',
      title: 'Sizzle & Taste: Wok Hei Fried Rice Masterclass 🍚',
      source: 'Instagram',
      likes: '195',
      comments: '16',
      views: '1.8k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/Cwb4ZG0otE7/',
      mediaUrl: './videos/reel_cwb4zg0ote7.mp4'
    },
    {
      id: 12,
      category: 'Social Hub',
      title: 'Behind the Scenes: Crafting our Famous Kebabs 🍢',
      source: 'Instagram',
      likes: '312',
      comments: '24',
      views: '2.4k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/DDR5tkcPrHw/',
      mediaUrl: './videos/reel_ddr5tkcprhw.mp4'
    },
    {
      id: 13,
      category: 'Social Hub',
      title: 'Cozy Evenings & Warm Lights at The Habit ☕',
      source: 'Instagram',
      likes: '184',
      comments: '12',
      views: '1.6k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/DCoue-BS3n7/',
      mediaUrl: './videos/reel_dcoue_bs3n7.mp4'
    },
    {
      id: 14,
      category: 'Social Hub',
      title: 'Satisfying Noodle Toss: High Flames, Fresh Flavors 🔥',
      source: 'Instagram',
      likes: '276',
      comments: '19',
      views: '2.1k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/DByFm_UPB1E/',
      mediaUrl: './videos/reel_dbyfm_upb1e.mp4'
    },
    {
      id: 15,
      category: 'Social Hub',
      title: 'Pouring the Love: Creamy Rich Butter Chicken Gravy 🥘',
      source: 'Instagram',
      likes: '340',
      comments: '28',
      views: '3.2k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/DBlzgShvcsp/',
      mediaUrl: './videos/reel_dblzgshvcsp.mp4'
    },
    {
      id: 16,
      category: 'Social Hub',
      title: 'Juicy Steamed Crescent Momos Fresh Out of the Steamer 🥟',
      source: 'Instagram',
      likes: '215',
      comments: '15',
      views: '1.9k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/DAqx15LS-Gk/',
      mediaUrl: './videos/reel_daqx15ls_gk.mp4'
    },
    {
      id: 17,
      category: 'Social Hub',
      title: 'Freshness Guaranteed: Handpicked Ingredients Daily 🍅',
      source: 'Instagram',
      likes: '128',
      comments: '6',
      isVideo: false,
      postUrl: 'https://www.instagram.com/p/DAqJ2CjP6sh/',
      mediaUrl: './videos/post_daqj2cjp6sh.jpg'
    },
    {
      id: 18,
      category: 'Social Hub',
      title: 'Crunchy & Golden Fried Fish Platter 🐟',
      source: 'Instagram',
      likes: '159',
      comments: '11',
      views: '1.4k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/C_s5jFQPl7m/',
      mediaUrl: './videos/reel_c_s5jfqpl7m.mp4'
    },
    {
      id: 19,
      category: 'Social Hub',
      title: 'A Warm Welcome: Our Dining Space Awaits You 🍽️',
      source: 'Instagram',
      likes: '240',
      comments: '18',
      isVideo: false,
      postUrl: 'https://www.instagram.com/p/C8eWzSRvglz/',
      mediaUrl: './videos/post_c8ewzsrvglz.jpg'
    },
    {
      id: 20,
      category: 'Social Hub',
      title: 'The Habit Specialty: Boneless Chicken Kanti Sizzle 🍳',
      source: 'Instagram',
      likes: '180',
      comments: '14',
      views: '1.3k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/C7onxf_vrNs/',
      mediaUrl: './videos/reel_c7onxf_vrns.mp4'
    },
    {
      id: 21,
      category: 'Social Hub',
      title: 'Perfect Pleating: Our Chefs Crafting Crescent Momos 🥟',
      source: 'Instagram',
      likes: '298',
      comments: '22',
      views: '2.8k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/C7ZShVdP4Vy/',
      mediaUrl: './videos/reel_c7zshvdp4vy.mp4'
    },
    {
      id: 22,
      category: 'Social Hub',
      title: 'Golden Peri Peri Chicken Nuggets Platter 🍗',
      source: 'Instagram',
      likes: '165',
      comments: '10',
      views: '1.2k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/C6f0QRJP-g0/',
      mediaUrl: './videos/reel_c6f0qrjp_g0.mp4'
    },
    {
      id: 23,
      category: 'Social Hub',
      title: 'Sizzling Stir-fry Hakka Chowmein Noodles 🍝',
      source: 'Instagram',
      likes: '187',
      comments: '12',
      views: '1.5k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/C6YvHDGPXm2/',
      mediaUrl: './videos/reel_c6yvhdgpxm2.mp4'
    },
    {
      id: 24,
      category: 'Social Hub',
      title: 'Aromatic Basmati Rice Chicken Biryani Platter 🌾',
      source: 'Instagram',
      likes: '320',
      comments: '25',
      views: '3.1k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/C6WjTDBv4_g/',
      mediaUrl: './videos/reel_c6wjtdbv4_g.mp4'
    },
    {
      id: 25,
      category: 'Social Hub',
      title: 'Mouthwatering Chicken Tikka Grill Vibe 🍢',
      source: 'Instagram',
      likes: '245',
      comments: '16',
      views: '2.2k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/C5QwOf6PCw9/',
      mediaUrl: './videos/reel_c5qwof6pcw9.mp4'
    },
    {
      id: 26,
      category: 'Social Hub',
      title: 'The Vibe check: Beautiful Glasswork Cafe Settings 💫',
      source: 'Instagram',
      likes: '192',
      comments: '14',
      isVideo: false,
      postUrl: 'https://www.instagram.com/p/C5OXcggP4bd/',
      mediaUrl: './videos/post_c5oxcggp4bd.jpg'
    },
    {
      id: 27,
      category: 'Social Hub',
      title: 'Slow Cooked Boneless Butter Chicken Gravy Simmer 🥘',
      source: 'Instagram',
      likes: '270',
      comments: '19',
      views: '2.3k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/CtmLjNOguV-/',
      mediaUrl: './videos/reel_ctmljnoguv_.mp4'
    },
    {
      id: 28,
      category: 'Social Hub',
      title: 'Our Secret Spices: The Magic behind Habit Grill 🌶️',
      source: 'Instagram',
      likes: '156',
      comments: '8',
      views: '920',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/CpH0lOrAVcC/',
      mediaUrl: './videos/reel_cph0loravcc.mp4'
    },
    {
      id: 29,
      category: 'Social Hub',
      title: 'Freshly Flipped Butter Rumali Roti on Tawa 🫓',
      source: 'Instagram',
      likes: '310',
      comments: '24',
      views: '2.9k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/reel/Cokn5GMgaEP/',
      mediaUrl: './videos/reel_cokn5gmagep.mp4'
    },
    {
      id: 30,
      category: 'Social Hub',
      title: 'Gatherings & Celebrations: Best Moments at The Habit 🎉',
      source: 'Instagram',
      likes: '285',
      comments: '21',
      isVideo: false,
      postUrl: 'https://www.instagram.com/p/Ckv5KAePnT7/',
      mediaUrl: './videos/post_ckv5kaepnt7.jpg'
    },
    {
      id: 31,
      category: 'Social Hub',
      title: 'Cafe Vibe: Indoor Dining Seating Showcase 🛋️',
      source: 'Instagram',
      likes: '176',
      comments: '12',
      isVideo: false,
      postUrl: 'https://www.instagram.com/p/Ce05RXGvYRK/',
      mediaUrl: './videos/post_ce05rxgvyrk.jpg'
    },
    {
      id: 32,
      category: 'Social Hub',
      title: 'Tandoori Chicken Platter: Juicy & Charred 🍗',
      source: 'Instagram',
      likes: '290',
      comments: '18',
      views: '2.6k',
      isVideo: true,
      postUrl: 'https://www.instagram.com/p/Ccz0IUUPbzE/',
      mediaUrl: './videos/post_ccz0iuupbze.mp4'
    },
    {
      id: 33,
      category: 'Social Hub',
      title: 'Outdoor Garden Dining: Perfect Vibe for Family 🌳',
      source: 'Instagram',
      likes: '324',
      comments: '31',
      isVideo: false,
      postUrl: 'https://www.instagram.com/p/CaPmZikvmE4/',
      mediaUrl: './videos/post_capmzikvme4.jpg'
    },
    {
      id: 34,
      category: 'Social Hub',
      title: 'Our Corner: Cozy Corners to Work & Dine 💻',
      source: 'Instagram',
      likes: '205',
      comments: '15',
      isVideo: false,
      postUrl: 'https://www.instagram.com/p/CaHI16yP40U/',
      mediaUrl: './videos/post_cahi16yp40u.jpg'
    },
    {
      id: 35,
      category: 'Social Hub',
      title: 'Night Vibe: The Habit Glows under Srinagar Skies 🌃',
      source: 'Instagram',
      likes: '380',
      comments: '42',
      isVideo: false,
      postUrl: 'https://www.instagram.com/p/CWaatR4PitX/',
      mediaUrl: './videos/post_cwaatr4pitx.jpg'
    },
    {
      id: 36,
      category: 'Social Hub',
      title: 'The Warmth of Coffee: Perfect Brew for Srinagar Seasons ☕',
      source: 'Instagram',
      likes: '148',
      comments: '10',
      isVideo: false,
      postUrl: 'https://www.instagram.com/p/CWSmZhXvHXf/',
      mediaUrl: './videos/post_cwsmzhxvhxf.jpg'
    },
    {
      id: 37,
      category: 'Social Hub',
      title: 'Signature Platters: Sharing Happiness over Table 🍱',
      source: 'Instagram',
      likes: '294',
      comments: '22',
      isVideo: false,
      postUrl: 'https://www.instagram.com/p/CWN6BCJvSKQ/',
      mediaUrl: './videos/post_cwn6bcjvskq.jpg'
    },
    {
      id: 38,
      category: 'Social Hub',
      title: 'Modern Interior Elegance: Glass & Cozy Lighting 💡',
      source: 'Instagram',
      likes: '230',
      comments: '16',
      isVideo: false,
      postUrl: 'https://www.instagram.com/p/CWNnwTDvIC_/',
      mediaUrl: './videos/post_cwnnwtdvic_.jpg'
    }
  ];

  // Filtering logic
  const filteredItems = galleryItems.filter((item) => {
    return selectedFilter === 'All' || item.category === selectedFilter;
  });

  const openLightbox = (id: number) => {
    const idx = galleryItems.findIndex((x) => x.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (dir: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    let nextIdx = dir === 'prev' ? lightboxIndex - 1 : lightboxIndex + 1;
    if (nextIdx < 0) nextIdx = galleryItems.length - 1;
    if (nextIdx >= galleryItems.length) nextIdx = 0;
    setLightboxIndex(nextIdx);
  };

  const toggleMute = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // prevent opening lightbox
    const currentlyMuted = mutedStates[id] !== false; // default true (muted)
    if (currentlyMuted) {
      // Unmuting: Mute all other videos first
      const newMutedStates: Record<number, boolean> = {};
      galleryItems.forEach((item) => {
        newMutedStates[item.id] = true;
      });
      newMutedStates[id] = false; // Unmute this video
      setMutedStates(newMutedStates);
    } else {
      // Mute this video
      setMutedStates((prev) => ({
        ...prev,
        [id]: true
      }));
    }
  };

  // Helper for rendering social network badges
  const renderSocialIcon = (source: 'Instagram' | 'Facebook', size = 16) => {
    if (source === 'Instagram') {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      );
    }
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    );
  };

  return (
    <div style={{ padding: '8rem 0 5rem 0', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <section className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", marginBottom: '1rem', color: 'var(--text-heading)' }}>
            Vibe Gallery & Social Hub
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            Explore our restaurant vibes, cozy garden views, and interactive social moments cached directly from our official channels.
          </p>

          {/* Filters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {(['All', 'Cafe Vibe', 'Social Hub'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                style={{
                  padding: '0.5rem 1.35rem',
                  borderRadius: '25px',
                  border: '1px solid',
                  borderColor: selectedFilter === filter ? 'var(--primary-color)' : 'var(--border-color)',
                  backgroundColor: selectedFilter === filter ? 'var(--primary-color)' : 'var(--surface-color)',
                  color: selectedFilter === filter ? '#ffffff' : 'var(--text-color)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {filter === 'Cafe Vibe' ? 'Restaurant Vibe' : filter === 'Social Hub' ? 'Social Hub' : 'Show All'}
              </button>
            ))}
          </div>
        </div>

        {/* Embedded Posts Container Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '2rem',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {filteredItems.map((item) => {
            const isVideo = item.isVideo;
            const isMuted = mutedStates[item.id] !== false; // default true (muted)

            return (
              <div 
                key={item.id}
                onClick={() => openLightbox(item.id)}
                className="glass-panel gallery-item-card"
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--card-shadow)',
                  backgroundColor: 'var(--surface-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '380px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {/* Custom Instagram-Style Top Header for Social Items */}
                <div style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div 
                      style={{ 
                        width: '30px', 
                        height: '30px', 
                        borderRadius: '50%', 
                        overflow: 'hidden', 
                        backgroundColor: 'var(--primary-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {item.source === 'Instagram' ? (
                        <span style={{ color: '#ffffff', fontSize: '0.8rem', display: 'flex' }}>
                          {renderSocialIcon('Instagram', 14)}
                        </span>
                      ) : (
                        <span style={{ color: '#ffffff', fontSize: '0.8rem', display: 'flex' }}>
                          {renderSocialIcon('Facebook', 14)}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                        {item.source === 'Instagram' ? 'the_habit_cafe_' : 'TheHabitCafe'}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Srinagar, Kashmir</span>
                    </div>
                  </div>
                  <a 
                    href={item.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--primary-color)',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    View Post
                  </a>
                </div>

                {/* Media Viewport */}
                <div style={{ flexGrow: 1, backgroundColor: '#050508', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isVideo ? (
                    <GalleryVideoPlayer
                      src={item.mediaUrl}
                      isMuted={isMuted}
                      onToggleMute={(e) => toggleMute(e, item.id)}
                      onClickCard={() => openLightbox(item.id)}
                    />
                  ) : (
                    <img 
                      src={item.mediaUrl}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                      className="gallery-item-img"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fullscreen Interactive Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(5, 5, 8, 0.98)',
            backdropFilter: 'blur(12px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            boxSizing: 'border-box'
          }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button 
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              zIndex: 100,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              transition: 'all 0.2s'
            }}
            className="lightbox-close-btn"
          >
            ✕
          </button>

          {/* Navigation Controls */}
          <button 
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
            style={{
              position: 'absolute',
              left: '1.5rem',
              zIndex: 50,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              transition: 'all 0.2s'
            }}
            className="lightbox-nav-btn"
          >
            ←
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
            style={{
              position: 'absolute',
              right: '1.5rem',
              zIndex: 50,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              transition: 'all 0.2s'
            }}
            className="lightbox-nav-btn"
          >
            →
          </button>

          {/* Main Content Modal Card - Stops Propagation */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              maxWidth: '960px', 
              width: '100%', 
              display: 'flex', 
              flexDirection: 'row', 
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1.5px solid var(--border-color)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
              backgroundColor: 'var(--surface-color)',
              maxHeight: '85vh',
              height: '600px'
            }}
            className="lightbox-modal-container glass-panel"
          >
            {/* Visual Media Section (Left 60% / Full Width on Stack) */}
            <div 
              style={{ 
                position: 'relative',
                flex: '0 0 60%',
                backgroundColor: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}
              className="lightbox-media-section"
            >
              {galleryItems[lightboxIndex].isVideo ? (
                <video 
                  src={galleryItems[lightboxIndex].mediaUrl}
                  controls
                  autoPlay
                  loop
                  style={{ width: '100%', height: '100%', maxHeight: '85vh', objectFit: 'contain' }}
                />
              ) : (
                <img 
                  src={galleryItems[lightboxIndex].mediaUrl} 
                  alt={galleryItems[lightboxIndex].title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              )}
            </div>

            {/* details Sidebar Section (Right 40%) */}
            <div 
              style={{ 
                flex: '0 0 40%', 
                padding: '2rem', 
                boxSizing: 'border-box', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between', 
                backgroundColor: 'rgba(255,255,255,0.01)',
                borderLeft: '1px solid var(--border-color)',
                textAlign: 'left',
                height: '100%',
                overflowY: 'auto'
              }}
              className="lightbox-sidebar-section"
            >
              {/* Header Profile */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div 
                    style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      overflow: 'hidden', 
                      backgroundColor: 'var(--primary-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    {galleryItems[lightboxIndex].source === 'Instagram' ? renderSocialIcon('Instagram', 16) : renderSocialIcon('Facebook', 16)}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                      {galleryItems[lightboxIndex].source === 'Instagram' ? 'the_habit_cafe_' : 'TheHabitCafe'}
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Official Vibe Post</span>
                  </div>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '1rem 0' }} />
              </div>

              {/* footer interaction section */}
              <div>
                {/* Social Link Action Button */}
                <a 
                  href={galleryItems[lightboxIndex].postUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    padding: '0.85rem 1.5rem',
                    borderRadius: '30px',
                    backgroundColor: galleryItems[lightboxIndex].source === 'Instagram' ? '#e1306c' : '#1877f2',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                    textAlign: 'center'
                  }}
                  className="social-redirect-btn"
                >
                  {renderSocialIcon(galleryItems[lightboxIndex].source, 16)}
                  <span>View on {galleryItems[lightboxIndex].source}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium responsive stylesheet styles */}
      <style>{`
        .gallery-item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          border-color: var(--primary-color) !important;
        }
        .gallery-item-card:hover .gallery-item-img {
          transform: scale(1.04);
        }
        .social-redirect-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.35);
          filter: brightness(1.1);
        }
        .lightbox-close-btn:hover, .lightbox-nav-btn:hover {
          background-color: rgba(255,255,255,0.15) !important;
          transform: scale(1.05);
        }

        /* Lightbox responsiveness */
        @media (max-width: 768px) {
          .lightbox-modal-container {
            flex-direction: column !important;
            height: auto !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
          }
          .lightbox-media-section {
            flex: 0 0 auto !important;
            height: 320px !important;
            width: 100% !important;
          }
          .lightbox-sidebar-section {
            flex: 0 0 auto !important;
            width: 100% !important;
            border-left: none !important;
            border-top: 1px solid var(--border-color) !important;
            padding: 1.25rem !important;
            height: auto !important;
          }
          .lightbox-nav-btn {
            display: none !important; /* Hide left/right navigation arrows on mobile */
          }
        }
      `}</style>
    </div>
  );
}
