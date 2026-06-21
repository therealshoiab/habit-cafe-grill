import React from 'react';

export default function OrderOnline() {
  return (
    <div style={{ padding: '8rem 0 5rem 0', minHeight: '100vh', backgroundColor: 'var(--bg-color)', display: 'flex', alignItems: 'center' }}>
      <section className="container" style={{ width: '100%' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", marginBottom: '1rem', color: 'var(--text-heading)' }}>
            Order Online & Reservations
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Get your favorite dishes delivered directly to your doorstep in Srinagar, or select from our self-collect options.
          </p>
        </div>

        {/* Ordering Methods Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '3rem',
            alignItems: 'stretch'
          }}
          className="order-grid"
        >
          {/* 1. Online Delivery Channels */}
          <div 
            className="glass-panel" 
            style={{ 
              padding: '3rem 2.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '2rem',
              textAlign: 'left',
              justifyContent: 'center'
            }}
          >
            <div>
              <span style={{ color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem' }}>
                Delivery Partners
              </span>
              <h3 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
                Order to Your Doorstep
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Order from Swiggy or Zomato to experience our hot and crispy grills, wraps, and momos with rapid home delivery across Srinagar.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Zomato CTA */}
              <a 
                href="https://www.zomato.com/srinagar/the-habit-cafe-and-grill-srinagar/order" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary order-channel-btn"
                style={{ 
                  backgroundColor: '#e23744', 
                  color: '#ffffff',
                  boxShadow: '0 4px 15px rgba(226, 55, 68, 0.3)',
                  textTransform: 'none',
                  fontSize: '1rem',
                  padding: '1rem'
                }}
              >
                Order on Zomato
              </a>

              {/* Swiggy CTA */}
              <a 
                href="https://www.swiggy.com/city/srinagar/the-habit-cafe-and-grill-nursing-gud-bal-garden-karan-nagar-rest625386" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary order-channel-btn"
                style={{ 
                  backgroundColor: '#fc8019', 
                  color: '#ffffff',
                  boxShadow: '0 4px 15px rgba(252, 128, 25, 0.3)',
                  textTransform: 'none',
                  fontSize: '1rem',
                  padding: '1rem'
                }}
              >
                Order on Swiggy
              </a>
            </div>
          </div>

          {/* 2. Self Collect & Reservations */}
          <div 
            className="glass-panel" 
            style={{ 
              padding: '3rem 2.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '2rem',
              textAlign: 'left',
              justifyContent: 'center'
            }}
          >
            <div>
              <span style={{ color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem' }}>
                Direct Collect
              </span>
              <h3 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
                Takeaway, Drive-Through & Dine-In
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Call us directly to schedule a pickup or choose a drive-through order. You can also specify table reservations for a premium dine-in experience.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  backgroundColor: 'var(--surface-color)', 
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.25rem' }}>Dine-In</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reserved table seating</span>
              </div>
              
              <div 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  backgroundColor: 'var(--surface-color)', 
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.25rem' }}>Takeaway</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hot & packed collect</span>
              </div>

              <div 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  backgroundColor: 'var(--surface-color)', 
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.25rem' }}>Drive-Through</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Collect at your car window</span>
              </div>

              <div 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  backgroundColor: 'var(--surface-color)', 
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.25rem' }}>Call Us</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone bookings</span>
              </div>
            </div>

            <a 
              href="tel:+917006677631" 
              className="btn call-action-btn"
              style={{ 
                padding: '0.95rem', 
                fontSize: '0.95rem', 
                textTransform: 'none', 
                width: '100%', 
                textAlign: 'center',
                backgroundColor: 'var(--rating-color)',
                color: '#ffffff',
                border: 'none',
                boxShadow: 'rgba(36, 150, 63, 0.25) 0px 8px 20px',
                fontWeight: 600
              }}
            >
              📞 Call Restaurant: +91 70066 77631
            </a>
          </div>
        </div>

      </section>

      <style>{`
        .order-channel-btn:hover {
          transform: translateY(-2px);
        }
        .call-action-btn:hover {
          background-color: #1c7c33 !important;
          transform: translateY(-2px);
          box-shadow: rgba(36, 150, 63, 0.45) 0px 10px 24px !important;
        }
        @media (max-width: 768px) {
          .order-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
