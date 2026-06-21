import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SignatureItem {
  name: string;
  tagline: string;
  description: string;
  rating: string;
  ingredients: string[];
  image: string;
  price: string;
}

export default function Signatures() {
  const containerRef = useRef<HTMLDivElement>(null);

  const signatureDishes: SignatureItem[] = [
    {
      name: "Steamed Momos",
      tagline: "Juicy hand-crafted dumplings",
      description: "Steamed to perfection, these soft, juicy dumplings are packed with fresh chicken mince and seasoned herbs, served with our legendary extra-spicy red chilli dip.",
      rating: "4.6 ★ (230+ ratings)",
      ingredients: ["Minced Chicken", "Garlic", "Spring Onions", "House Spicy Dip"],
      image: "./images/steamed_momos_crescent.png",
      price: "₹120"
    },
    {
      name: "Fried Momos",
      tagline: "Ultra-crispy golden dumplings",
      description: "Our signature chicken momos deep-fried to a perfect golden crisp, offering a crunchy exterior while remaining juicy and flavorful on the inside.",
      rating: "4.5 ★ (190+ ratings)",
      ingredients: ["Fried Chicken Momos", "Garlic Mayo", "Tandoori Dipping Sauce"],
      image: "./images/fried_momos_crescent.png",
      price: "₹140"
    },
    {
      name: "Chicken Kathi Roll",
      tagline: "Srinagar's favorite chicken wrap",
      description: "Juicy, fire-roasted tandoori chicken chunks tossed with fresh onions, capsicum, green chutney, and cream, all wrapped inside a soft, flaky flatbread.",
      rating: "4.4 ★ (150+ ratings)",
      ingredients: ["Tandoori Chicken", "Flaky Paratha", "Sliced Onions", "Mint Chutney"],
      image: "./images/kathi_roll.png",
      price: "₹160"
    },
    {
      name: "Chicken Chowmein",
      tagline: "The absolute Indo-Chinese classic",
      description: "Wok-tossed noodles sautéed with tender shredded chicken, julienned carrots, green cabbage, spring onions, and our signature soy-garlic sauce blend.",
      rating: "4.4 ★ (120+ ratings)",
      ingredients: ["Wok-fried Noodles", "Shredded Chicken", "Cabbage & Carrots", "Soy Sauce"],
      image: "./images/chicken_chowmein.png",
      price: "₹180"
    },
    {
      name: "Veg Chowmein",
      tagline: "Richly seasoned vegetable noodles",
      description: "Delightful stir-fried noodles tossed with green bell peppers, red carrots, cabbage, and scallions in a light savory glaze, perfect for noodle lovers.",
      rating: "4.2 ★ (80+ ratings)",
      ingredients: ["Noodles", "Bell Peppers", "Carrots", "Sautéed Onion & Garlic"],
      image: "./images/veg_chowmein.png",
      price: "₹140"
    },
    {
      name: "Boneless Chicken Kanti",
      tagline: "Traditional dry-sautéed spice mix",
      description: "A Kashmiri-style dry preparation of tender boneless chicken sautéed on a high flame with onions, fresh green chillies, tomatoes, and aromatic home spices.",
      rating: "4.4 ★ (90+ ratings)",
      ingredients: ["Sautéed Boneless Chicken", "Green Chillies", "Thick Sliced Onions", "Kashmiri Spices"],
      image: "./images/chicken_kanti_boneless.jpg",
      price: "₹280"
    },
    {
      name: "Fried Fish",
      tagline: "Crispy local spiced trout",
      description: "Locally sourced fresh fish coated in an aromatic traditional batter, deep-fried to a perfect golden crisp while retaining tender, flaky meat inside.",
      rating: "4.5 ★ (70+ ratings)",
      ingredients: ["Local Fish", "Spiced Batter", "Lemon Wedges", "Mint Chutney"],
      image: "./images/fried_fish.png",
      price: "₹199"
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.sig-scroll-card');

    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);

  return (
    <div style={{ padding: '8rem 0 5rem 0', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <section className="container" ref={containerRef}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
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
              margin: '0 auto 1rem auto',
              backgroundColor: 'rgba(211, 29, 36, 0.05)'
            }}
          >
            The Signatures
          </div>
          <h2 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
            Srinagar's Legendary Specialties
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.65' }}>
            We've gathered all our top-rated signature dishes below. Scroll down to explore the details, ingredients, and pricing of these culinary landmarks.
          </p>
        </div>

        {/* 1 Scroll Staggered Layout of All Signatures */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
          {signatureDishes.map((dish, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={dish.name}
                className="glass-panel sig-scroll-card"
                style={{
                  display: 'flex',
                  flexDirection: isEven ? 'row' : 'row-reverse',
                  gap: '3rem',
                  padding: '2.5rem',
                  borderRadius: '24px',
                  alignItems: 'center',
                  border: '1.5px solid var(--border-color)',
                  boxShadow: 'var(--card-shadow)'
                }}
              >
                {/* Image Section */}
                <div 
                  style={{ 
                    flex: 1, 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    height: '320px',
                    border: '1px solid var(--border-color)' 
                  }}
                >
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Content Section */}
                <div style={{ flex: 1.2, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {dish.tagline}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '2.2rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)' }}>
                    {dish.name}
                  </h3>

                  <div style={{ color: 'var(--rating-color)', fontSize: '0.85rem', fontWeight: 600 }}>
                    {dish.rating}
                  </div>

                  <p style={{ color: 'var(--text-color)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                    {dish.description}
                  </p>

                  {/* Ingredients Tags */}
                  <div>
                    <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      Key Ingredients
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {dish.ingredients.map(ing => (
                        <span 
                          key={ing}
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '15px',
                            backgroundColor: 'rgba(211, 29, 36, 0.05)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-color)'
                          }}
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Zomato / Swiggy Direct Orders */}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <a 
                      href="https://www.zomato.com/srinagar/the-habit-cafe-and-grill-srinagar/order" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn sig-card-zomato-btn"
                      style={{ 
                        flex: 1, 
                        padding: '0.65rem', 
                        fontSize: '0.8rem', 
                        background: '#e23744', 
                        color: '#ffffff', 
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(226, 55, 68, 0.15)',
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Order on Zomato
                    </a>
                    <a 
                      href="https://www.swiggy.com/city/srinagar/the-habit-cafe-and-grill-nursing-gud-bal-garden-karan-nagar-rest625386" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn sig-card-swiggy-btn"
                      style={{ 
                        flex: 1, 
                        padding: '0.65rem', 
                        fontSize: '0.8rem', 
                        background: '#fc8019', 
                        color: '#ffffff', 
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(252, 128, 25, 0.15)',
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Order on Swiggy
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Styled styles block for responsive viewports */}
      <style>{`
        @media (max-width: 768px) {
          .sig-scroll-card {
            flex-direction: column !important;
            padding: 1.5rem !important;
            gap: 1.5rem !important;
          }
          .sig-scroll-card div[style*="height: '320px'"] {
            height: 220px !important;
            width: 100% !important;
          }
        }
        .sig-card-zomato-btn:hover {
          background-color: #c92c37 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(226, 55, 68, 0.3) !important;
        }
        .sig-card-swiggy-btn:hover {
          background-color: #e47112 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(252, 128, 25, 0.3) !important;
        }
      `}</style>
    </div>
  );
}
