import React, { useState, useMemo } from 'react';
import reviewsData from '../data/reviews.json';

interface ReviewItem {
  name: string;
  rating: number;
  feedback: string;
}

export default function Reviews() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState<'All' | number>('All');
  const [visibleCount, setVisibleCount] = useState(12);

  // Cast reviews from JSON data
  const reviewsList = reviewsData as ReviewItem[];

  // Filter reviews based on search and rating filters
  const filteredReviews = useMemo(() => {
    return reviewsList.filter((rev) => {
      const matchesSearch = 
        rev.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        rev.feedback.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRating = ratingFilter === 'All' || rev.rating === ratingFilter;
      
      return matchesSearch && matchesRating;
    });
  }, [searchQuery, ratingFilter]);

  // Paginated visible reviews
  const visibleReviews = useMemo(() => {
    return filteredReviews.slice(0, visibleCount);
  }, [filteredReviews, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  // Stats
  const totalReviews = reviewsList.length;
  const averageRating = 4.2; // Keep Google score consistent

  return (
    <div style={{ padding: '8rem 0 5rem 0', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <section className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", marginBottom: '1rem', color: 'var(--text-heading)' }}>
            What Our Patrons Say
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Browse verified customer feedback from our Google Maps listing. Real reviews from real diners.
          </p>
        </div>

        {/* Rating Overview Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '0.8fr 1.2fr', 
            gap: '3rem', 
            alignItems: 'center',
            marginBottom: '4rem' 
          }}
          className="reviews-overview-grid"
        >
          {/* Rating Summary Card */}
          <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', border: '1.5px solid var(--border-color)' }}>
            <span style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--rating-color)', fontFamily: "'Playfair Display', serif", display: 'block', lineHeight: '1' }}>
              {averageRating}
            </span>
            <div style={{ margin: '0.5rem 0', color: 'var(--rating-color)', fontSize: '1.5rem', letterSpacing: '2px' }}>
              ★★★★☆
            </div>
            <span style={{ fontSize: '1.1rem', color: 'var(--text-heading)', fontWeight: 600 }}>Overall Rating Score</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Based on {totalReviews}+ verified Google customer reviews.
            </p>
          </div>

          {/* Search and Filters */}
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)' }}>Filter Feedback</h3>
            
            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%' }}>
              <input 
                type="text" 
                placeholder="Search reviews by name or keyword..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(12); // Reset count on filter change
                }}
                style={{
                  width: '100%',
                  padding: '0.8rem 1.25rem',
                  borderRadius: '30px',
                  backgroundColor: 'var(--surface-color)',
                  border: '1.5px solid var(--border-color)',
                  color: 'var(--text-color)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'all var(--transition-fast)'
                }}
                className="review-search-input"
              />
              <span style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                🔍
              </span>
            </div>

            {/* Rating Filter Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                onClick={() => { setRatingFilter('All'); setVisibleCount(12); }}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: '25px',
                  border: '1px solid',
                  borderColor: ratingFilter === 'All' ? 'var(--primary-color)' : 'var(--border-color)',
                  backgroundColor: ratingFilter === 'All' ? 'var(--primary-color)' : 'var(--surface-color)',
                  color: ratingFilter === 'All' ? '#ffffff' : 'var(--text-color)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                All ({filteredReviews.length})
              </button>
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviewsList.filter(x => x.rating === stars).length;
                if (count === 0) return null;
                return (
                  <button
                    key={stars}
                    onClick={() => { setRatingFilter(stars); setVisibleCount(12); }}
                    style={{
                      padding: '0.45rem 1.1rem',
                      borderRadius: '25px',
                      border: '1px solid',
                      borderColor: ratingFilter === stars ? 'var(--primary-color)' : 'var(--border-color)',
                      backgroundColor: ratingFilter === stars ? 'var(--primary-color)' : 'var(--surface-color)',
                      color: ratingFilter === stars ? '#ffffff' : 'var(--text-color)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {stars} Star ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        {visibleReviews.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {visibleReviews.map((rev, idx) => (
              <div 
                key={idx}
                className="glass-panel review-card"
                style={{
                  padding: '2rem',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--card-shadow)',
                  position: 'relative'
                }}
              >
                {/* Quote Icon Background decoration */}
                <span style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', fontSize: '2.5rem', color: 'rgba(211, 29, 36, 0.05)', fontFamily: 'serif', pointerEvents: 'none' }}>
                  ”
                </span>

                {/* User Header (No Profile Pictures) */}
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>
                    {rev.name}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Dine-in / Take-out Patron</span>
                </div>

                {/* Star rating rendering */}
                <div style={{ color: 'var(--rating-color)', fontSize: '0.85rem', letterSpacing: '1px' }}>
                  {'★'.repeat(rev.rating)}
                  {'☆'.repeat(5 - rev.rating)}
                </div>

                {/* Review Text */}
                <p style={{ fontSize: '0.9rem', color: 'var(--text-color)', lineHeight: '1.65', flexGrow: 1, fontStyle: 'italic' }}>
                  "{rev.feedback}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            No reviews match your filters. Try a different query!
          </div>
        )}

        {/* Pagination Trigger */}
        {filteredReviews.length > visibleCount && (
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <button 
              onClick={handleLoadMore} 
              className="btn btn-primary"
              style={{ padding: '0.75rem 2rem' }}
            >
              Load More Reviews
            </button>
          </div>
        )}

      </section>

      <style>{`
        .review-card {
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .review-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary-color) !important;
        }
        .review-search-input:focus {
          border-color: var(--primary-color) !important;
          box-shadow: 0 0 10px rgba(211, 29, 36, 0.08);
        }
        @media (max-width: 768px) {
          .reviews-overview-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: center !important;
          }
          .reviews-overview-grid div[style*="textAlign: 'left'"] {
            text-align: center !important;
            align-items: center !important;
          }
        }
      `}</style>
    </div>
  );
}
