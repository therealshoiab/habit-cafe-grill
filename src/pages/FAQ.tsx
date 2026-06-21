import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      <section className="container" style={{ maxWidth: '800px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", marginBottom: '1rem', color: 'var(--text-heading)' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--text-muted)', margin: '0 auto' }}>
            Find quick answers to common questions about reservations, home delivery, location, and cost.
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
                    gap: '1rem'
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
    </div>
  );
}
