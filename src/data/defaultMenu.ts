export interface MenuItem {
  id: string | number;
  name: string;
  category: string;
  price: string;
  description: string;
  rating: number;
  popular?: boolean;
  image: string;
}

export interface BroadcastBannerData {
  enabled: boolean;
  message: string;
  linkText?: string;
  linkUrl?: string;
  variant?: 'red' | 'gold' | 'dark';
}

export const MENU_CATEGORIES = [
  'All',
  'Starters',
  'Momos',
  'Main Course',
  'Biryani & Rice',
  'Seafood',
  'Rolls & Shawarma',
  'Roti'
];

export const DEFAULT_BROADCAST_BANNER: BroadcastBannerData = {
  enabled: true,
  message: '🔥 Welcome to The Habit Cafe & Grill! Enjoy Srinagar\'s finest momos, sizzling grills & authentic kanti. Dine-in, Takeaway & Delivery available.',
  linkText: 'Order Online',
  linkUrl: '#/order',
  variant: 'red'
};

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: 1,
    name: "Chicken Nuggets (Boneless)",
    category: "Starters",
    price: "₹199",
    description: "Satisfy your cravings with Chicken Fry, a delectable dish featuring crispy, golden-brown chicken pieces seasoned to perfection.",
    rating: 3.8,
    image: "./images/chicken_nuggets.png"
  },
  {
    id: 2,
    name: "Peri Peri Chicken Nuggets",
    category: "Starters",
    price: "₹219",
    description: "Spicy and flavorful chicken nuggets tossed in our signature African bird's eye chilli seasoning mix.",
    rating: 4.3,
    image: "./images/peri_peri_nuggets.png"
  },
  {
    id: 3,
    name: "Chilli Chicken",
    category: "Starters",
    price: "₹299",
    description: "Serves 1 | Savor the bold and tangy flavors of Chilli Chicken, a popular Indo-Chinese dish that combines succulent chicken with vibrant chili-infused sauce.",
    rating: 4.7,
    popular: true,
    image: "./images/chilli_chicken.png"
  },
  {
    id: 4,
    name: "Tandoori Chicken",
    category: "Starters",
    price: "₹299",
    description: "Our tandoori chicken features tender chicken marinated in yogurt and aromatic spices, then tandoor-grilled to smoky perfection.",
    rating: 4.2,
    image: "./images/tandoori_chicken.png"
  },
  
  // Momos
  {
    id: 5,
    name: "Chicken Momos (Steamed)",
    category: "Momos",
    price: "₹120",
    description: "Steamed chicken momos stuffed with seasoned minced chicken, served with garlic chilli dip.",
    rating: 4.6,
    popular: true,
    image: "./images/steamed_momos_crescent.png"
  },
  {
    id: 6,
    name: "Chicken Malai Momos",
    category: "Momos",
    price: "₹160",
    description: "Steamed chicken momos coated in a rich, buttery, and luxurious cream (malai) dressing.",
    rating: 4.7,
    popular: true,
    image: "./images/chicken_malai_momos.png"
  },
  {
    id: 7,
    name: "Fried Chicken Momos",
    category: "Momos",
    price: "₹140",
    description: "Deep-fried golden dumplings filled with hot, seasoned minced chicken.",
    rating: 4.5,
    image: "./images/fried_momos_crescent.png"
  },

  // Main Course
  {
    id: 8,
    name: "Chicken Kanti [with bone]",
    category: "Main Course",
    price: "₹299",
    description: "Serves 1 | Explore the rich and aromatic flavors of Chicken Kanti, a Nepalese dish with marinated chicken roasted over open flames.",
    rating: 4.3,
    image: "./images/chicken_kanti_with_bone.jpg"
  },
  {
    id: 9,
    name: "Chicken Kanti [Boneless]",
    category: "Main Course",
    price: "₹280",
    description: "Serves 1 | Explore the rich and aromatic flavors of Chicken Kanti, prepared with boneless chicken pieces roasted over open flames.",
    rating: 4.4,
    popular: true,
    image: "./images/chicken_kanti_boneless.jpg"
  },
  {
    id: 10,
    name: "Butter Chicken (With Bone)",
    category: "Main Course",
    price: "₹299",
    description: "Serves 1 | Rich, creamy, and packed with tender bone-in chicken cooked in a rich tomato, butter, and cashew gravy.",
    rating: 3.8,
    image: "./images/butter_chicken.png"
  },
  {
    id: 11,
    name: "Butter Chicken ( Boneless )",
    category: "Main Course",
    price: "₹330",
    description: "Curry made from boneless chicken with a spiced tomato and butter (makhan) sauce, famous for its rich velvety texture.",
    rating: 3.7,
    popular: true,
    image: "./images/butter_chicken_creamy.png"
  },
  {
    id: 12,
    name: "Chicken Curry",
    category: "Main Course",
    price: "₹299",
    description: "Serves 1 | Comforting chicken curry simmered in a fragrant blend of spices, herbs, and a rich tomato-based gravy.",
    rating: 3.4,
    image: "./images/chicken_curry.png"
  },

  // Biryani & Rice
  {
    id: 13,
    name: "Chicken Biryani",
    category: "Biryani & Rice",
    price: "₹150",
    description: "Serves 1 | Delight in the aromatic Chicken Biryani, combining tender chicken and fragrant long-grain basmati rice cooked slowly.",
    rating: 4.5,
    popular: true,
    image: "./images/chicken_biryani_with_bone.jpg"
  },
  {
    id: 14,
    name: "Chicken Biryani (Boneless)",
    category: "Biryani & Rice",
    price: "₹159",
    description: "A savory chicken and rice dish including layers of boneless chicken, rice, and aromatics steamed together.",
    rating: 3.9,
    image: "./images/chicken_biryani_boneless.jpg"
  },
  {
    id: 15,
    name: "Chicken Fried Rice",
    category: "Biryani & Rice",
    price: "₹180",
    description: "Serves 1 | Flavorful blend of tender chicken, fluffy rice, and stir-fried fresh vegetables.",
    rating: 4.5,
    image: "./images/chicken_fried_rice.png"
  },
  {
    id: 16,
    name: "Vegetable Fried Rice",
    category: "Biryani & Rice",
    price: "₹140",
    description: "Serves 1 | Delightful medley of fresh vegetables and fluffy rice tossed in aromatic seasonings.",
    rating: 4.1,
    image: "./images/veg_fried_rice.png"
  },
  {
    id: 17,
    name: "Schezwan Chicken Fried Rice",
    category: "Biryani & Rice",
    price: "₹200",
    description: "Serves 1 | A flavor-packed dish with aromatic rice, tender chicken pieces, veggies, and spicy Schezwan sauce.",
    rating: 4.8,
    image: "./images/schezwan_chicken_fried_rice.jpg"
  },
  {
    id: 18,
    name: "Schezwan Veg Fried Rice",
    category: "Biryani & Rice",
    price: "₹160",
    description: "Hot & spicy fried rice with bursting flavors of ginger, garlic, soy sauce, red chilli paste, and fresh vegetables.",
    rating: 5.0,
    image: "./images/schezwan_veg_fried_rice.jpg"
  },
  {
    id: 19,
    name: "Egg Fried Rice",
    category: "Biryani & Rice",
    price: "₹180",
    description: "Serves 1 | Fluffy scrambled eggs, fragrant rice, and garden-fresh vegetables stir-fried to perfection.",
    rating: 4.2,
    image: "./images/egg_fried_rice.jpg"
  },
  {
    id: 20,
    name: "Plain Rice",
    category: "Biryani & Rice",
    price: "₹100",
    description: "Serves 1 | Freshly cooked basmati rice, simple and fluffy, pairs beautifully with our curries.",
    rating: 4.0,
    image: "./images/plain_rice.png"
  },
  {
    id: 21,
    name: "Butter Rice",
    category: "Biryani & Rice",
    price: "₹120",
    description: "Serves 1 | Comforting hot rice tossed in melted premium butter.",
    rating: 4.1,
    image: "./images/butter_rice.jpg"
  },

  // Seafood
  {
    id: 22,
    name: "Fish Nuggets ( Boneless )",
    category: "Seafood",
    price: "₹199",
    description: "Serves 1 | Thinly sliced boneless fish deep-fried till golden and spiced with special dry spices.",
    rating: 4.4,
    image: "./images/fish_nuggets.png"
  },
  {
    id: 23,
    name: "Fish Kanti",
    category: "Seafood",
    price: "₹279",
    description: "Serves 1 | Delicious seasoned seafood delicacy with a crispy exterior and tender inside.",
    rating: 4.5,
    image: "./images/fish_kanti.png"
  },
  {
    id: 24,
    name: "Chilli Fish Kanti",
    category: "Seafood",
    price: "₹279",
    description: "Serves 1 | Crispy fried fish chunks tossed with spicy green chillies, capsicum, onions, and garlic glaze.",
    rating: 4.4,
    image: "./images/chilli_fish_kanti.jpg"
  },
  {
    id: 25,
    name: "Peri Peri Fish Nuggets",
    category: "Seafood",
    price: "₹229",
    description: "White fish nuggets marinated in hot peri-peri spices and deep-fried.",
    rating: 4.3,
    image: "./images/fish_nuggets.png"
  },
  {
    id: 26,
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
    id: 27,
    name: "Shawarma Roll",
    category: "Rolls & Shawarma",
    price: "₹120",
    description: "Spiced, fire-grilled chicken shavings wrapped in rumali roti with rich garlic cream sauce.",
    rating: 4.6,
    popular: true,
    image: "./images/shawarma_roll.png"
  },
  {
    id: 28,
    name: "Chicken Kathi Roll",
    category: "Rolls & Shawarma",
    price: "₹160",
    description: "Sautéed chicken, sliced onions, and green chutney wrapped in egg-layered flatbread.",
    rating: 4.4,
    image: "./images/kathi_roll.png"
  },
  {
    id: 29,
    name: "Chicken Chowmein",
    category: "Rolls & Shawarma",
    price: "₹180",
    description: "Stir-fried noodles with shredded chicken, cabbage, carrots, onions, and dark soy sauce.",
    rating: 4.4,
    image: "./images/chicken_chowmein.png"
  },
  {
    id: 30,
    name: "Veg Chowmein",
    category: "Rolls & Shawarma",
    price: "₹140",
    description: "Wok-tossed noodles with fresh bell peppers, carrots, and spring onions.",
    rating: 4.2,
    image: "./images/veg_chowmein.png"
  },

  // Roti
  {
    id: 31,
    name: "Rumali Roti",
    category: "Roti",
    price: "₹20",
    description: "Handkerchief-thin, hand-stretched bread cooked on an inverted dome griddle.",
    rating: 4.3,
    image: "./images/rumali_roti.jpg"
  },
  {
    id: 32,
    name: "Butter Rumali Roti",
    category: "Roti",
    price: "₹30",
    description: "Handkerchief-thin bread glazed with fresh melted butter.",
    rating: 4.4,
    image: "./images/butter_rumali_roti.jpg"
  }
];
