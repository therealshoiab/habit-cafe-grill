-- Cloudflare D1 Database Seed Data for The Habit Cafe & Grill

CREATE TABLE IF NOT EXISTS menu_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  rating REAL DEFAULT 4.5,
  popular INTEGER DEFAULT 0,
  image TEXT,
  is_available INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- Initial Settings
INSERT OR REPLACE INTO admin_settings (key, value) VALUES 
('passcode', 'Habit@2026'),
('broadcast_banner', '{"enabled":true,"message":"🔥 Welcome to The Habit Cafe & Grill! Enjoy Srinagar''s finest momos, sizzling grills & authentic kanti. Dine-in, Takeaway & Delivery available.","linkText":"","linkUrl":"","variant":"red"}');

-- Menu Items
INSERT INTO menu_items (id, name, category, price, description, rating, popular, image, is_available) VALUES
(1, 'Chicken Nuggets (Boneless)', 'Starters', '₹199', 'Satisfy your cravings with Chicken Fry, a delectable dish featuring crispy, golden-brown chicken pieces seasoned to perfection.', 3.8, 0, './images/chicken_nuggets.png', 1),
(2, 'Peri Peri Chicken Nuggets', 'Starters', '₹219', 'Spicy and flavorful chicken nuggets tossed in our signature African bird''s eye chilli seasoning mix.', 4.3, 0, './images/peri_peri_nuggets.png', 1),
(3, 'Chilli Chicken', 'Starters', '₹299', 'Serves 1 | Savor the bold and tangy flavors of Chilli Chicken, a popular Indo-Chinese dish that combines succulent chicken with vibrant chili-infused sauce.', 4.7, 1, './images/chilli_chicken.png', 1),
(4, 'Tandoori Chicken', 'Starters', '₹299', 'Our tandoori chicken features tender chicken marinated in yogurt and aromatic spices, then tandoor-grilled to smoky perfection.', 4.2, 0, './images/tandoori_chicken.png', 1),
(5, 'Chicken Momos (Steamed)', 'Momos', '₹120', 'Steamed chicken momos stuffed with seasoned minced chicken, served with garlic chilli dip.', 4.6, 1, './images/steamed_momos_crescent.png', 1),
(6, 'Chicken Malai Momos', 'Momos', '₹160', 'Steamed chicken momos coated in a rich, buttery, and luxurious cream (malai) dressing.', 4.7, 1, './images/chicken_malai_momos.png', 1),
(7, 'Fried Chicken Momos', 'Momos', '₹140', 'Deep-fried golden dumplings filled with hot, seasoned minced chicken.', 4.5, 0, './images/fried_momos_crescent.png', 1),
(8, 'Chicken Kanti [with bone]', 'Main Course', '₹299', 'Serves 1 | Explore the rich and aromatic flavors of Chicken Kanti, a Nepalese dish with marinated chicken roasted over open flames.', 4.3, 0, './images/chicken_kanti_with_bone.jpg', 1),
(9, 'Chicken Kanti [Boneless]', 'Main Course', '₹280', 'Serves 1 | Explore the rich and aromatic flavors of Chicken Kanti, prepared with boneless chicken pieces roasted over open flames.', 4.4, 1, './images/chicken_kanti_boneless.jpg', 1),
(10, 'Butter Chicken (With Bone)', 'Main Course', '₹299', 'Serves 1 | Rich, creamy, and packed with tender bone-in chicken cooked in a rich tomato, butter, and cashew gravy.', 3.8, 0, './images/butter_chicken.png', 1),
(11, 'Butter Chicken ( Boneless )', 'Main Course', '₹330', 'Curry made from boneless chicken with a spiced tomato and butter (makhan) sauce, famous for its rich velvety texture.', 3.7, 1, './images/butter_chicken_creamy.png', 1),
(12, 'Chicken Curry', 'Main Course', '₹299', 'Serves 1 | Comforting chicken curry simmered in a fragrant blend of spices, herbs, and a rich tomato-based gravy.', 3.4, 0, './images/chicken_curry.png', 1),
(13, 'Chicken Biryani', 'Biryani & Rice', '₹150', 'Serves 1 | Delight in the aromatic Chicken Biryani, combining tender chicken and fragrant long-grain basmati rice cooked slowly.', 4.5, 1, './images/chicken_biryani_with_bone.jpg', 1),
(14, 'Chicken Biryani (Boneless)', 'Biryani & Rice', '₹159', 'A savory chicken and rice dish including layers of boneless chicken, rice, and aromatics steamed together.', 3.9, 0, './images/chicken_biryani_boneless.jpg', 1),
(15, 'Chicken Fried Rice', 'Biryani & Rice', '₹180', 'Serves 1 | Flavorful blend of tender chicken, fluffy rice, and stir-fried fresh vegetables.', 4.5, 0, './images/chicken_fried_rice.png', 1),
(16, 'Vegetable Fried Rice', 'Biryani & Rice', '₹140', 'Serves 1 | Delightful medley of fresh vegetables and fluffy rice tossed in aromatic seasonings.', 4.1, 0, './images/veg_fried_rice.png', 1),
(17, 'Schezwan Chicken Fried Rice', 'Biryani & Rice', '₹200', 'Serves 1 | A flavor-packed dish with aromatic rice, tender chicken pieces, veggies, and spicy Schezwan sauce.', 4.8, 0, './images/schezwan_chicken_fried_rice.jpg', 1),
(18, 'Schezwan Veg Fried Rice', 'Biryani & Rice', '₹160', 'Hot & spicy fried rice with bursting flavors of ginger, garlic, soy sauce, red chilli paste, and fresh vegetables.', 5.0, 0, './images/schezwan_veg_fried_rice.jpg', 1),
(19, 'Egg Fried Rice', 'Biryani & Rice', '₹180', 'Serves 1 | Fluffy scrambled eggs, fragrant rice, and garden-fresh vegetables stir-fried to perfection.', 4.2, 0, './images/egg_fried_rice.jpg', 1),
(20, 'Plain Rice', 'Biryani & Rice', '₹100', 'Serves 1 | Freshly cooked basmati rice, simple and fluffy, pairs beautifully with our curries.', 4.0, 0, './images/plain_rice.png', 1),
(21, 'Butter Rice', 'Biryani & Rice', '₹120', 'Serves 1 | Comforting hot rice tossed in melted premium butter.', 4.1, 0, './images/butter_rice.jpg', 1),
(22, 'Fish Nuggets ( Boneless )', 'Seafood', '₹199', 'Serves 1 | Thinly sliced boneless fish deep-fried till golden and spiced with special dry spices.', 4.4, 0, './images/fish_nuggets.png', 1),
(23, 'Fish Kanti', 'Seafood', '₹279', 'Serves 1 | Delicious seasoned seafood delicacy with a crispy exterior and tender inside.', 4.5, 0, './images/fish_kanti.png', 1),
(24, 'Chilli Fish Kanti', 'Seafood', '₹279', 'Serves 1 | Crispy fried fish chunks tossed with spicy green chillies, capsicum, onions, and garlic glaze.', 4.4, 0, './images/chilli_fish_kanti.jpg', 1),
(25, 'Peri Peri Fish Nuggets', 'Seafood', '₹229', 'White fish nuggets marinated in hot peri-peri spices and deep-fried.', 4.3, 0, './images/fish_nuggets.png', 1),
(26, 'Fried Fish', 'Seafood', '₹199', 'Crispy deep-fried local fish coated in a rich traditional spice mix, served with lemons.', 4.5, 1, './images/fried_fish.png', 1),
(27, 'Shawarma Roll', 'Rolls & Shawarma', '₹120', 'Spiced, fire-grilled chicken shavings wrapped in rumali roti with rich garlic cream sauce.', 4.6, 1, './images/shawarma_roll.png', 1),
(28, 'Chicken Kathi Roll', 'Rolls & Shawarma', '₹160', 'Sautéed chicken, sliced onions, and green chutney wrapped in egg-layered flatbread.', 4.4, 0, './images/kathi_roll.png', 1),
(29, 'Chicken Chowmein', 'Rolls & Shawarma', '₹180', 'Stir-fried noodles with shredded chicken, cabbage, carrots, onions, and dark soy sauce.', 4.4, 0, './images/chicken_chowmein.png', 1),
(30, 'Veg Chowmein', 'Rolls & Shawarma', '₹140', 'Wok-tossed noodles with fresh bell peppers, carrots, and spring onions.', 4.2, 0, './images/veg_chowmein.png', 1),
(31, 'Rumali Roti', 'Roti', '₹20', 'Handkerchief-thin, hand-stretched bread cooked on an inverted dome griddle.', 4.3, 0, './images/rumali_roti.jpg', 1),
(32, 'Butter Rumali Roti', 'Roti', '₹30', 'Handkerchief-thin bread glazed with fresh melted butter.', 4.4, 0, './images/butter_rumali_roti.jpg', 1);
