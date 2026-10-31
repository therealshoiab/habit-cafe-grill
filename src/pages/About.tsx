import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

interface FAQItem {
  question: string;
  answer: string;
}

export default function About() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    // GSAP scroll animation for timeline nodes
    gsap.fromTo('.timeline-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
        }
      }
    );
  }, []);

  const timelineEvents = [
    { year: "2018", title: "Inception of The Habit", desc: "Founded with a mission to bring high-quality, delicious quick-bites and cafe options to Srinagar." },
    { year: "2020", title: "Signature Grills & Fusions", desc: "Expanded the menu with fire-roasted grills, authentic momos, and Indo-Chinese fusions, quickly becoming a local favorite." },
    { year: "2022", title: "Karan Nagar Flagship", desc: "Moved to our current premium space in Karan Nagar, enhancing the dining atmosphere with cozy modern aesthetics." },
    { year: "Today", title: "Srinagar's Favorite Hub", desc: "Holding a proud 4.2★ rating with over 377 reviews, we continue to serve Srinagar's best momos and shawarmas daily." }
  ];

  const faqs: FAQItem[] = [
    {
      question: "What are your business hours?",
      answer: "We are open every day from 9:00 AM to 10:00 PM, serving breakfast, lunch, quick bites, and dinner."
    },
    {
      question: "Where is The Habit Cafe & Grill located?",
      answer: "We are located at BALGARDEN ROAD, Near Petrol Pump, Karan Nagar, Srinagar, Jammu & Kashmir 190010. You can get live directions from our Contact page or map embed."
    },
    {
      question: "How can I order food online for home delivery?",
      answer: "You can order directly through our delivery partners Swiggy and Zomato. Simply click the links on our 'Order Online' page to open our official delivery menu."
    },
    {
      question: "Do you support takeaway, drive-through, or pick-up?",
      answer: "Yes! You can place a takeaway order by calling us directly at +91 70066 77631. We also offer drive-through services, where we deliver the hot packed food straight to your car window."
    },
    {
      question: "Can I book a table or make reservations in advance?",
      answer: "Yes, we accept table reservations for families, corporate lunches, or friend groups. You can submit a request using the form on our 'Contact' page, or call us directly."
    },
    {
      question: "What is the average cost for dining here?",
      answer: "The average cost is very reasonable, ranging from ₹1 to ₹400 per person, depending on your choices. We offer premium quality food at highly affordable prices."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ padding: '8rem 0 5rem 0', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      
      {/* 1. Brand Story Header */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div className="about-story-grid">
          
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                backgroundColor: 'rgba(212, 175, 55, 0.05)'
              }}
            >
              Our Story
            </div>
            
            <h2 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)' }}>
              A Passion For Great Food & Cozy Dining
            </h2>
            
            <p style={{ color: 'var(--text-color)', lineHeight: '1.8' }}>
              At The Habit Cafe & Grill, our journey started with a simple belief: food should connect people and inspire warmth. Nestled in Balgarden Road, Karan Nagar, we set out to create a culinary hub that merges fresh, high-quality ingredients with a comfortable, family-friendly atmosphere.
            </p>
            
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              Whether you are here for our legendary steamed chicken malai momos, slow-cooked boneless chicken biryani, or crispy fried fish, each dish is made with premium spices and utmost care. We prioritize hospitality above all, ensuring every guest feels right at home.
            </p>

            <div className="about-highlights-grid">
              <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--primary-color)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>100% Fresh</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', flexGrow: 1 }}>We source only local, fresh poultry and fish daily. No compromises.</span>
              </div>
              <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--primary-color)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Family Atmosphere</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', flexGrow: 1 }}>Cozy space designed for family gatherings, friends' hangouts, and celebrations.</span>
              </div>
            </div>
          </div>

          {/* Right Image / Graphic */}
          <div style={{ position: 'relative', width: '100%' }}>
            <div 
              style={{
                width: '100%',
                height: 'clamp(280px, 45vw, 480px)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--card-shadow)',
                border: '1.5px solid var(--border-color)',
                backgroundImage: 'url("./images/habit_storefront_3.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            {/* Ambient gold glow */}
            <div className="glow-spot" style={{ top: '-10%', right: '-10%', opacity: 0.3 }} />
          </div>
        </div>
      </section>

      {/* 2. Interactive Timeline */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", marginBottom: '1rem', color: 'var(--text-heading)' }}>
            Our Journey Over The Years
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            A look back at the milestones that shaped The Habit Cafe & Grill into Karan Nagar's favorite restaurant.
          </p>
        </div>

        <div 
          className="timeline-container" 
          style={{
            position: 'relative',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '2rem 0'
          }}
        >
          {/* Central Line */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '2px',
              backgroundColor: 'var(--border-color)',
              transform: 'translateX(-50%)'
            }}
            className="timeline-center-line"
          />

          {timelineEvents.map((evt, idx) => (
            <div 
              key={idx}
              className="timeline-item"
              style={{
                display: 'flex',
                justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end',
                alignItems: 'center',
                width: '100%',
                marginBottom: '3rem',
                position: 'relative'
              }}
            >
              {/* Timeline dot */}
              <div 
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-color)',
                  border: '3px solid var(--primary-color)',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  boxShadow: '0 0 10px var(--primary-color)'
                }}
              />

              {/* Timeline Card */}
              <div 
                className="glass-panel"
                style={{
                  width: '43%',
                  padding: '2rem',
                  textAlign: 'left',
                  position: 'relative'
                }}
              >
                <span 
                  style={{ 
                    fontSize: '1.5rem', 
                    fontFamily: "'Playfair Display', serif", 
                    color: 'var(--primary-color)', 
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}
                >
                  {evt.year}
                </span>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>{evt.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{evt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Combined Frequently Asked Questions (FAQ) Section */}
      <section className="container" style={{ maxWidth: '850px' }} id="faq">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
              backgroundColor: 'rgba(212, 175, 55, 0.05)'
            }}
          >
            Got Questions?
          </div>
          <h2 style={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", marginBottom: '1rem', color: 'var(--text-heading)' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--text-muted)', margin: '0 auto' }}>
            Find quick answers to common questions about reservations, home delivery, location, and dining at The Habit.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  textAlign: 'left'
                }}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    padding: '1.5rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--text-heading)',
                    gap: '1rem',
                    textAlign: 'left'
                  }}
                >
                  <span>{faq.question}</span>
                  <span style={{ fontSize: '1.25rem', color: 'var(--primary-color)', transition: 'transform 0.3s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                    ＋
                  </span>
                </button>

                {/* Accordion Content */}
                <div 
                  style={{
                    maxHeight: isOpen ? '300px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    padding: isOpen ? '0 2rem 1.5rem 2rem' : '0 2rem'
                  }}
                >
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        .about-story-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
        }
        .about-highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1rem;
          align-items: stretch;
        }
        @media (max-width: 580px) {
          .about-highlights-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
        @media (max-width: 991px) {
          .about-story-grid {
            display: flex !important;
            flex-direction: column-reverse !important;
            gap: 2.5rem !important;
          }
          .timeline-center-line {
            left: 20px !important;
            transform: none !important;
          }
          .timeline-item {
            justify-content: flex-end !important;
          }
          .timeline-item > div:first-child {
            left: 20px !important;
          }
          .timeline-item > .glass-panel {
            width: calc(100% - 60px) !important;
          }
        }
      `}</style>
    </div>
  );
}
