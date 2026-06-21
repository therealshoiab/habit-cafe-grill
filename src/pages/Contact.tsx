import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.date) {
      // Format date/time nicely
      let formattedDate = formData.date;
      try {
        formattedDate = new Date(formData.date).toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short'
        });
      } catch (err) {
        console.error("Error formatting date:", err);
      }

      // Build the WhatsApp message template
      const whatsappMessage = `*New Table Reservation Request* 🍽️\n\n` +
        `• *Name:* ${formData.name}\n` +
        `• *Phone:* ${formData.phone}\n` +
        `• *Email:* ${formData.email || 'N/A'}\n` +
        `• *Number of Guests:* ${formData.guests} Guest(s)\n` +
        `• *Date & Time:* ${formattedDate}\n` +
        `• *Additional Notes:* ${formData.message || 'None'}`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      // User's temporary test number (will change to client's number later)
      const targetNumber = '917780938743'; 
      const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      // Set submission status
      setIsSubmitted(true);

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        guests: '2',
        date: '',
        message: ''
      });
      setTimeout(() => setIsSubmitted(false), 6000);
    }
  };

  return (
    <div style={{ padding: '8rem 0 5rem 0', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <section className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", marginBottom: '1rem', color: 'var(--text-heading)' }}>
            Visit Us & Table Reservations
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Book a table for special gatherings, dinner with family, or simply drop us a line with questions or feedback.
          </p>
        </div>

        {/* Contact Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.1fr 0.9fr', 
            gap: '3.5rem', 
            alignItems: 'stretch',
            marginBottom: '4rem'
          }}
          className="contact-grid"
        >
          {/* Reservation Form */}
          <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.6rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', marginBottom: '1.5rem' }}>
              Reservation Form
            </h3>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>Your Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder="e.g. Musaib Afzal"
                      value={formData.name}
                      onChange={handleChange}
                      className="reservation-input" 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      placeholder="e.g. +91 70066 77631"
                      value={formData.phone}
                      onChange={handleChange}
                      className="reservation-input" 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }} className="form-row-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="e.g. name@example.com (optional)"
                      value={formData.email}
                      onChange={handleChange}
                      className="reservation-input" 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>Number of Guests</label>
                    <select 
                      name="guests" 
                      value={formData.guests}
                      onChange={handleChange}
                      className="reservation-input"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8">8+ Guests</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>Reservation Date & Time *</label>
                  <input 
                    type="datetime-local" 
                    name="date" 
                    required 
                    value={formData.date}
                    onChange={handleChange}
                    className="reservation-input" 
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>Special Message / Note</label>
                  <textarea 
                    name="message" 
                    rows={4} 
                    placeholder="Any dietary restrictions, special occasions, or special requests..."
                    value={formData.message}
                    onChange={handleChange}
                    className="reservation-input"
                    style={{ resize: 'vertical' }} 
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '0.95rem', borderRadius: '30px', marginTop: '0.5rem', color: '#ffffff' }}
                >
                  Confirm Reservation
                </button>
              </form>
            ) : (
              <div 
                style={{ 
                  textAlign: 'center', 
                  padding: '3rem 1.5rem', 
                  color: 'var(--primary-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem' 
                }}
              >
                <div style={{ fontSize: '3rem' }}>✓</div>
                <h4 style={{ fontSize: '1.4rem', color: 'var(--text-heading)', fontFamily: "'Outfit', sans-serif" }}>
                  Reservation Requested!
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Thank you! We have received your reservation request. Our staff will call you shortly on your provided phone number to confirm your table details.
                </p>
              </div>
            )}
          </div>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
            <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)' }}>Location Details</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                BALGARDEN ROAD, Near Petrol Pump, Karan Nagar, Srinagar, Jammu & Kashmir 190010
              </p>
              <a 
                href="https://www.google.com/maps/place/The+Habit+Cafe+And+Grill/@34.0763381,74.7940638,17.61z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ alignSelf: 'flex-start', fontSize: '0.8rem', padding: '0.6rem 1.25rem' }}
              >
                Get Driving Directions
              </a>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)' }}>Phone Support</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Call us for immediate queries, home delivery bookings, or event inquiries.
              </p>
              <a 
                href="tel:+917006677631" 
                style={{ 
                  fontSize: '1.6rem', 
                  fontWeight: 800, 
                  color: 'var(--primary-color)',
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: '0.5px',
                  display: 'inline-block',
                  marginTop: '0.25rem'
                }}
              >
                +91 70066 77631
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div 
          className="glass-panel" 
          style={{ 
            height: '400px', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            border: '1.5px solid var(--border-color)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          <iframe 
            title="The Habit Cafe & Grill Google Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.8117762699863!2d74.7956117!3d34.0760374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18fa6a2eed2db%3A0x458e790961f1ea92!2sThe%20Habit%20Cafe%20And%20Grill!5e0!3m2!1sen!2sin!4v1718600000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
          />
        </div>

      </section>

      <style>{`
        .reservation-input {
          padding: 0.85rem 1.25rem;
          border-radius: 12px;
          background-color: var(--surface-color);
          border: 1.5px solid var(--border-color);
          color: var(--text-color);
          font-size: 0.95rem;
          outline: none;
          font-family: var(--font-sans);
          width: 100%;
          box-sizing: border-box;
          transition: all var(--transition-fast);
        }
        .reservation-input:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(211, 29, 36, 0.12);
          background-color: var(--bg-color);
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .form-row-2 {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}
