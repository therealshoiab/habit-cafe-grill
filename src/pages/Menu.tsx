import React, { useState, useMemo, useEffect } from 'react';
import { menuService } from '../services/menuService';
import { MENU_CATEGORIES } from '../data/defaultMenu';
import type { MenuItem } from '../data/defaultMenu';

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => menuService.getMenuItems());

  // Listen to live menu updates from Admin panel
  useEffect(() => {
    const handleUpdate = () => {
      setMenuItems(menuService.getMenuItems());
    };
    window.addEventListener('habit:menu_updated', handleUpdate);
    return () => window.removeEventListener('habit:menu_updated', handleUpdate);
  }, []);

  // Compute dynamic categories based on existing dishes + base categories
  const categories = useMemo(() => {
    const dynamicCats = Array.from(new Set(menuItems.map((i) => i.category))).filter(Boolean);
    return Array.from(new Set([...MENU_CATEGORIES, ...dynamicCats]));
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchQuery, selectedCategory]);

  return (
    <div style={{ padding: '8rem 0 5rem 0', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      
      {/* Menu Header */}
      <section className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", marginBottom: '1rem', color: 'var(--text-heading)' }}>
          Our Culinary Creations
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', marginBottom: '2.5rem' }}>
          Browse through our extensive menu. Sourced fresh, cooked with premium quality ingredients, and served warm.
        </p>

        {/* Search Bar & Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          
          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <input 
              type="text" 
              placeholder="Search for dishes, ingredients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.5rem',
                borderRadius: '30px',
                backgroundColor: 'var(--surface-color)',
                border: '1.5px solid var(--border-color)',
                color: 'var(--text-color)',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'all var(--transition-fast)'
              }}
              className="menu-search-input"
            />
            <span style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              🔍
            </span>
          </div>

          {/* Category Tabs */}
          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '0.5rem',
              maxWidth: '900px',
              padding: '0.5rem 0'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '25px',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--primary-color)' : 'var(--border-color)',
                  backgroundColor: selectedCategory === cat ? 'var(--primary-color)' : 'var(--surface-color)',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--text-color)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of Food Items */}
      <section className="container">
        {filteredItems.length > 0 ? (
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '2rem' 
            }}
          >
            {filteredItems.map((dish, idx) => (
              <div 
                key={dish.id || idx}
                className="glass-panel food-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  height: '100%',
                  textAlign: 'left',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--card-shadow)'
                }}
              >
                {/* Food Image */}
                <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden', backgroundColor: '#1a1a1a' }}>
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    className="food-card-img"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = './images/chicken_nuggets.png';
                    }}
                  />
                  {dish.popular && (
                    <span 
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'var(--primary-color)',
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '20px',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Popular
                    </span>
                  )}
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '0.75rem',
                      right: '0.75rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      color: 'var(--rating-color)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '8px'
                    }}
                  >
                    ★ {dish.rating}
                  </span>
                </div>

                {/* Details Content */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: 600, textTransform: 'uppercase' }}>
                      {dish.category}
                    </span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                      {dish.price}
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', fontFamily: "'Outfit', sans-serif", fontWeight: '600' }}>
                    {dish.name}
                  </h3>
                  
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', flexGrow: 1 }}>
                    {dish.description}
                  </p>

                  <div 
                    style={{ 
                      display: 'flex', 
                      gap: '0.5rem', 
                      marginTop: '0.75rem', 
                      borderTop: '1px solid var(--border-color)', 
                      paddingTop: '0.75rem' 
                    }}
                  >
                    <a 
                      href="https://www.zomato.com/srinagar/the-habit-cafe-and-grill-srinagar/order" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn menu-card-zomato-btn"
                      style={{ 
                        flex: 1, 
                        padding: '0.45rem', 
                        fontSize: '0.75rem', 
                        borderRadius: '15px', 
                        background: '#e23744', 
                        color: '#ffffff', 
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(226, 55, 68, 0.15)',
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Zomato
                    </a>
                    <a 
                      href="https://www.swiggy.com/city/srinagar/the-habit-cafe-and-grill-nursing-gud-bal-garden-karan-nagar-rest625386" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn menu-card-swiggy-btn"
                      style={{ 
                        flex: 1, 
                        padding: '0.45rem', 
                        fontSize: '0.75rem', 
                        borderRadius: '15px', 
                        background: '#fc8019', 
                        color: '#ffffff', 
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(252, 128, 25, 0.15)',
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Swiggy
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No items matched your search query. Try another keyword!
          </div>
        )}
      </section>

      <style>{`
        .food-card:hover .food-card-img {
          transform: scale(1.08);
        }
        .menu-search-input:focus {
          border-color: var(--primary-color) !important;
          box-shadow: 0 0 10px rgba(211, 29, 36, 0.08);
        }
        .menu-card-zomato-btn:hover {
          background-color: #c92c37 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(226, 55, 68, 0.3) !important;
        }
        .menu-card-swiggy-btn:hover {
          background-color: #e47112 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(252, 128, 25, 0.3) !important;
        }
      `}</style>
    </div>
  );
}
