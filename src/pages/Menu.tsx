import React, { useState, useMemo } from 'react';

interface MenuItem {
  name: string;
  category: string;
  price: string;
  description: string;
  rating: number;
  popular?: boolean;
  image: string;
}

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Starters',
    'Momos',
    'Main Course',
    'Biryani & Rice',
    'Seafood',
    'Rolls & Shawarma',
    'Roti'
  ];

  const menuItems: MenuItem[] = [
    // Starters
    {
      name: "Chicken Nuggets (Boneless)",
      category: "Starters",
      price: "₹199",
      description: "Satisfy your cravings with Chicken Fry, a delectable dish featuring crispy, golden-brown chicken pieces seasoned to perfection.",
      rating: 3.8,
      image: "./images/chicken_nuggets.png"
    },
    {
      name: "Peri Peri Chicken Nuggets",
      category: "Starters",
      price: "₹219",
      description: "Spicy and flavorful chicken nuggets tossed in our signature African bird's eye chilli seasoning mix.",
      rating: 4.3,
      image: "./images/peri_peri_nuggets.png"
    },
    {
      name: "Chilli Chicken",
      category: "Starters",
      price: "₹299",
      description: "Serves 1 | Savor the bold and tangy flavors of Chilli Chicken, a popular Indo-Chinese dish that combines succulent chicken with vibrant chili-infused sauce.",
      rating: 4.7,
      popular: true,
      image: "./images/chilli_chicken.png"
    },
    {
      name: "Tandoori Chicken",
      category: "Starters",
      price: "₹299",
      description: "Our tandoori chicken features tender chicken marinated in yogurt and aromatic spices, then tandoor-grilled to smoky perfection.",
      rating: 4.2,
      image: "./images/tandoori_chicken.png"
    },
    
    // Momos
    {
      name: "Chicken Momos (Steamed)",
      category: "Momos",
      price: "₹120",
      description: "Steamed chicken momos stuffed with seasoned minced chicken, served with garlic chilli dip.",
      rating: 4.6,
      popular: true,
      image: "./images/steamed_momos_crescent.png"
    },
    {
      name: "Chicken Malai Momos",
      category: "Momos",
      price: "₹160",
      description: "Steamed chicken momos coated in a rich, buttery, and luxurious cream (malai) dressing.",
      rating: 4.7,
      popular: true,
      image: "./images/chicken_malai_momos.png"
    },
    {
      name: "Fried Chicken Momos",
      category: "Momos",
      price: "₹140",
      description: "Deep-fried golden dumplings filled with hot, seasoned minced chicken.",
      rating: 4.5,
      image: "./images/fried_momos_crescent.png"
    },

    // Main Course
    {
      name: "Chicken Kanti [with bone]",
      category: "Main Course",
      price: "₹299",
      description: "Serves 1 | Explore the rich and aromatic flavors of Chicken Kanti, a Nepalese dish with marinated chicken roasted over open flames.",
      rating: 4.3,
      image: "./images/chicken_kanti_with_bone.jpg"
    },
    {
      name: "Chicken Kanti [Boneless]",
      category: "Main Course",
      price: "₹280",
      description: "Serves 1 | Explore the rich and aromatic flavors of Chicken Kanti, prepared with boneless chicken pieces roasted over open flames.",
      rating: 4.4,
      popular: true,
      image: "./images/chicken_kanti_boneless.jpg"
    },
    {
      name: "Butter Chicken (With Bone)",
      category: "Main Course",
      price: "₹299",
      description: "Serves 1 | Rich, creamy, and packed with tender bone-in chicken cooked in a rich tomato, butter, and cashew gravy.",
      rating: 3.8,
      image: "./images/butter_chicken.png"
    },
    {
      name: "Butter Chicken ( Boneless )",
      category: "Main Course",
      price: "₹330",
      description: "Curry made from boneless chicken with a spiced tomato and butter (makhan) sauce, famous for its rich velvety texture.",
      rating: 3.7,
      popular: true,
      image: "./images/butter_chicken_creamy.png"
    },
    {
      name: "Chicken Curry",
      category: "Main Course",
      price: "₹299",
      description: "Serves 1 | Comforting chicken curry simmered in a fragrant blend of spices, herbs, and a rich tomato-based gravy.",
      rating: 3.4,
      image: "./images/chicken_curry.png"
    },

    // Biryani & Rice
    {
      name: "Chicken Biryani",
      category: "Biryani & Rice",
      price: "₹150",
      description: "Serves 1 | Delight in the aromatic Chicken Biryani, combining tender chicken and fragrant long-grain basmati rice cooked slowly.",
      rating: 4.5,
      popular: true,
      image: "./images/chicken_biryani_with_bone.jpg"
    },
    {
      name: "Chicken Biryani (Boneless)",
      category: "Biryani & Rice",
      price: "₹159",
      description: "A savory chicken and rice dish including layers of boneless chicken, rice, and aromatics steamed together.",
      rating: 3.9,
      image: "./images/chicken_biryani_boneless.jpg"
    },
    {
      name: "Chicken Fried Rice",
      category: "Biryani & Rice",
      price: "₹180",
      description: "Serves 1 | Flavorful blend of tender chicken, fluffy rice, and stir-fried fresh vegetables.",
      rating: 4.5,
      image: "./images/chicken_fried_rice.png"
    },
    {
      name: "Vegetable Fried Rice",
      category: "Biryani & Rice",
      price: "₹140",
      description: "Serves 1 | Delightful medley of fresh vegetables and fluffy rice tossed in aromatic seasonings.",
      rating: 4.1,
      image: "./images/veg_fried_rice.png"
    },
    {
      name: "Schezwan Chicken Fried Rice",
      category: "Biryani & Rice",
      price: "₹200",
      description: "Serves 1 | A flavor-packed dish with aromatic rice, tender chicken pieces, veggies, and spicy Schezwan sauce.",
      rating: 4.8,
      image: "./images/schezwan_chicken_fried_rice.jpg"
    },
    {
      name: "Schezwan Veg Fried Rice",
      category: "Biryani & Rice",
      price: "₹160",
      description: "Hot & spicy fried rice with bursting flavors of ginger, garlic, soy sauce, red chilli paste, and fresh vegetables.",
      rating: 5.0,
      image: "./images/schezwan_veg_fried_rice.jpg"
    },
    {
      name: "Egg Fried Rice",
      category: "Biryani & Rice",
      price: "₹180",
      description: "Serves 1 | Fluffy scrambled eggs, fragrant rice, and garden-fresh vegetables stir-fried to perfection.",
      rating: 4.2,
      image: "./images/egg_fried_rice.jpg"
    },
    {
      name: "Plain Rice",
      category: "Biryani & Rice",
      price: "₹100",
      description: "Serves 1 | Freshly cooked basmati rice, simple and fluffy, pairs beautifully with our curries.",
      rating: 4.0,
      image: "./images/plain_rice.png"
    },
    {
      name: "Butter Rice",
      category: "Biryani & Rice",
      price: "₹120",
      description: "Serves 1 | Comforting hot rice tossed in melted premium butter.",
      rating: 4.1,
      image: "./images/butter_rice.jpg"
    },

    // Seafood
    {
      name: "Fish Nuggets ( Boneless )",
      category: "Seafood",
      price: "₹199",
      description: "Serves 1 | Thinly sliced boneless fish deep-fried till golden and spiced with special dry spices.",
      rating: 4.4,
      image: "./images/fish_nuggets.png"
    },
    {
      name: "Fish Kanti",
      category: "Seafood",
      price: "₹279",
      description: "Serves 1 | Delicious seasoned seafood delicacy with a crispy exterior and tender inside.",
      rating: 4.5,
      image: "./images/fish_kanti.png"
    },
    {
      name: "Chilli Fish Kanti",
      category: "Seafood",
      price: "₹279",
      description: "Serves 1 | Crispy fried fish chunks tossed with spicy green chillies, capsicum, onions, and garlic glaze.",
      rating: 4.4,
      image: "./images/chilli_fish_kanti.jpg"
    },
    {
      name: "Peri Peri Fish Nuggets",
      category: "Seafood",
      price: "₹229",
      description: "White fish nuggets marinated in hot peri-peri spices and deep-fried.",
      rating: 4.3,
      image: "./images/fish_nuggets.png"
    },
    {
      name: "Fried Fish",
      category: "Seafood",
      price: "₹199",
      description: "Crispy deep-fried local fish coated in a rich traditional spice mix, served with lemons.",
      rating: 4.5,
      popular: true,
      image: "./images/fried_fish.png"
    },

    // Rolls & Shawarma
    {
      name: "Shawarma Roll",
      category: "Rolls & Shawarma",
      price: "₹120",
      description: "Spiced, fire-grilled chicken shavings wrapped in rumali roti with rich garlic cream sauce.",
      rating: 4.6,
      popular: true,
      image: "./images/shawarma_roll.png"
    },
    {
      name: "Chicken Kathi Roll",
      category: "Rolls & Shawarma",
      price: "₹160",
      description: "Sautéed chicken, sliced onions, and green chutney wrapped in egg-layered flatbread.",
      rating: 4.4,
      image: "./images/kathi_roll.png"
    },
    {
      name: "Chicken Chowmein",
      category: "Rolls & Shawarma",
      price: "₹180",
      description: "Stir-fried noodles with shredded chicken, cabbage, carrots, onions, and dark soy sauce.",
      rating: 4.4,
      image: "./images/chicken_chowmein.png"
    },
    {
      name: "Veg Chowmein",
      category: "Rolls & Shawarma",
      price: "₹140",
      description: "Wok-tossed noodles with fresh bell peppers, carrots, and spring onions.",
      rating: 4.2,
      image: "./images/veg_chowmein.png"
    },

    // Roti
    {
      name: "Rumali Roti",
      category: "Roti",
      price: "₹20",
      description: "Handkerchief-thin, hand-stretched bread cooked on an inverted dome griddle.",
      rating: 4.3,
      image: "./images/rumali_roti.jpg"
    },
    {
      name: "Butter Rumali Roti",
      category: "Roti",
      price: "₹30",
      description: "Handkerchief-thin bread glazed with fresh melted butter.",
      rating: 4.4,
      image: "./images/butter_rumali_roti.jpg"
    }
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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
                key={idx}
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
                <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    className="food-card-img"
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
