import React from 'react';

export default function Legal() {
  return (
    <div style={{ padding: '8rem 0 5rem 0', minHeight: '100vh', backgroundColor: 'var(--bg-color)', textAlign: 'left' }}>
      <section className="container" style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Privacy Policy */}
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginBottom: '1.5rem', color: 'var(--text-heading)' }}>
            Privacy Policy
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Last updated: June 18, 2026
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-color)' }}>
            <p>
              At The Habit Cafe & Grill, we respect your privacy. This Privacy Policy describes how we collect, use, and process customer data when you visit our website, submit table reservations, or interact with our newsletter forms.
            </p>
            
            <h4 style={{ color: 'var(--text-heading)', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1.1rem', marginTop: '0.5rem' }}>
              1. Information We Collect
            </h4>
            <p>
              When you use our online reservation form, we collect personal information such as your name, phone number, email address, the number of guests, and reservation date/time. This information is required to confirm and manage your table booking.
            </p>
            
            <h4 style={{ color: 'var(--text-heading)', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1.1rem', marginTop: '0.5rem' }}>
              2. How We Use Your Data
            </h4>
            <p>
              We use the collected information solely to:
              <br />• Contact you to confirm table reservations.
              <br />• Send you promotional offers or newsletters (only if you subscribe to our newsletter).
              <br />• Improve our customer service and website experience.
            </p>

            <h4 style={{ color: 'var(--text-heading)', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1.1rem', marginTop: '0.5rem' }}>
              3. Data Security
            </h4>
            <p>
              Your data is stored securely. We do not sell, rent, or share your personal information with third-party advertising companies. External links (such as Swiggy, Zomato, and Google Maps) are governed by their respective privacy policies.
            </p>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginBottom: '1.5rem', color: 'var(--text-heading)' }}>
            Terms & Conditions
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Last updated: June 18, 2026
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-color)' }}>
            <p>
              By accessing this website or submitting reservation details, you agree to comply with the following Terms and Conditions of service.
            </p>
            
            <h4 style={{ color: 'var(--text-heading)', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1.1rem', marginTop: '0.5rem' }}>
              1. Table Reservations
            </h4>
            <p>
              Submitting a reservation request through the website does not guarantee a table. Reservations are only confirmed after our staff contacts you via phone to verify details and availability. We reserve the right to cancel or release tables if guests are more than 15 minutes late.
            </p>
            
            <h4 style={{ color: 'var(--text-heading)', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1.1rem', marginTop: '0.5rem' }}>
              2. Intellectual Property
            </h4>
            <p>
              All branding elements, logo designs, text descriptions, and custom code on this website are the properties of The Habit Cafe & Grill. Unauthorized reproduction is strictly prohibited.
            </p>

            <h4 style={{ color: 'var(--text-heading)', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1.1rem', marginTop: '0.5rem' }}>
              3. Disclaimer
            </h4>
            <p>
              We strive to keep our menu prices and opening hours accurate. However, items and prices are subject to change without prior notice. Delivery services are handled by third-party platforms (Swiggy, Zomato) and are subject to their service parameters.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}
