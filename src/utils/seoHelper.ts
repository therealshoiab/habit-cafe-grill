export interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
  ogType?: string;
  ogImage?: string;
}

const defaultMetadata: PageMetadata = {
  title: "The Habit Cafe & Grill | Best Cafe & Restaurant in Srinagar",
  description: "Experience the finest dining in Srinagar at The Habit Cafe & Grill. Savor the best chicken momos, authentic biryani, shawarma, grills, and fast food near Karan Nagar. Great food, great vibes!",
  keywords: "Restaurant in Srinagar, Cafe in Srinagar, Best Momos in Srinagar, Best Shawarma in Srinagar, Best Biryani in Srinagar, The Habit Cafe And Grill, Restaurants Near Karan Nagar, Karan Nagar Food, Srinagar dining",
  ogType: "website",
  ogImage: "https://b.zmtcdn.com/data/pictures/2/21465822/c922fc8c9c3bd209a9df18b5e10863dc_o2_featured_v2.jpg?output-format=webp"
};

const pagesMeta: Record<string, PageMetadata> = {
  home: {
    title: "The Habit Cafe & Grill | Premium Restaurant & Cafe in Srinagar",
    description: "Welcome to The Habit Cafe & Grill, Srinagar's ultimate dining destination for mouth-watering grills, momos, biryani, and shawarmas. Balgarden Road, Karan Nagar.",
    keywords: "The Habit Cafe And Grill, Cafe in Srinagar, Best Grill in Srinagar, Restaurant Karan Nagar"
  },
  about: {
    title: "About Us | The Habit Cafe & Grill Srinagar",
    description: "Discover the story of The Habit Cafe & Grill. Learn about our commitment to fresh ingredients, comfortable atmosphere, and excellent customer-first hospitality in Kashmir.",
    keywords: "Habit Cafe story, about restaurant srinagar, family restaurant srinagar"
  },
  menu: {
    title: "Our Menu | Grills, Momos, Shawarma & More | The Habit Cafe",
    description: "Explore the delicious menu at The Habit Cafe & Grill. From chicken kanti and malai momos to fish nuggets, rumali rotis, and chowmein, we have it all at affordable prices.",
    keywords: "Habit Cafe menu, best momos menu, kanti price srinagar, fast food menu srinagar"
  },
  signatures: {
    title: "Signature Dishes | The Habit Cafe & Grill",
    description: "Taste our absolute favorites! Try Srinagar's best Shawarma Roll, Chicken Malai Momos, Fried Fish, and Boneless Chicken Kanti at The Habit Cafe & Grill.",
    keywords: "best shawarma roll srinagar, chicken malai momos srinagar, signature food srinagar"
  },
  gallery: {
    title: "Gallery | Food & Ambience Visuals | The Habit Cafe & Grill",
    description: "Take a virtual tour of The Habit Cafe & Grill. Browse high-quality images of our mouth-watering dishes, dining space, customers, and restaurant vibe.",
    keywords: "Srinagar cafe photos, restaurant ambiance pictures, food gallery srinagar"
  },
  reviews: {
    title: "Customer Reviews (4.2★) | The Habit Cafe & Grill",
    description: "Read what our customers say about our delicious food and cozy atmosphere. Rated 4.2 stars with over 377+ reviews in Srinagar.",
    keywords: "Habit Cafe reviews, customer rating srinagar, best chicken momos feedback"
  },
  order: {
    title: "Order Online | Swiggy & Zomato Delivery | The Habit Cafe",
    description: "Order food online from The Habit Cafe & Grill. Fast delivery via Swiggy and Zomato or call us directly for takeaway and drive-through orders in Srinagar.",
    keywords: "order online srinagar, Habit Cafe Swiggy, Habit Cafe Zomato, food delivery Karan Nagar"
  },
  contact: {
    title: "Contact & Table Reservations | The Habit Cafe & Grill",
    description: "Find us at Balgarden Road near Petrol Pump, Karan Nagar, Srinagar. Call +91 70066 77631 to make a reservation or get driving directions.",
    keywords: "Habit Cafe contact, table booking srinagar, Karan Nagar cafe directions"
  },
  blog: {
    title: "The Habit Blog | Food Stories & Kashmir Dining Guides",
    description: "Read our latest articles on why customers love our shawarma, the secrets behind our fried rice, and family dining guides in Srinagar.",
    keywords: "Srinagar food blog, best momos guide, Kashmir dining tips"
  },
  faq: {
    title: "Frequently Asked Questions | The Habit Cafe & Grill",
    description: "Have questions about reservations, home delivery, average cost, or menu options? Find all the answers in our FAQ page.",
    keywords: "restaurant FAQ srinagar, delivery details srinagar"
  },
  privacy: {
    title: "Privacy Policy | The Habit Cafe & Grill",
    description: "Read the privacy policy of The Habit Cafe & Grill regarding customer data protection.",
    keywords: "privacy policy"
  },
  terms: {
    title: "Terms & Conditions | The Habit Cafe & Grill",
    description: "Read the terms of service and dining conditions for The Habit Cafe & Grill.",
    keywords: "terms and conditions"
  }
};

export function updateSEO(pageKey: string): void {
  const meta = pagesMeta[pageKey] || defaultMetadata;
  
  // Update Document Title
  document.title = meta.title;
  
  // Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', meta.description);

  // Update Meta Keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', meta.keywords || defaultMetadata.keywords);

  // Update Open Graph Tags
  updateMetaTag('og:title', meta.title);
  updateMetaTag('og:description', meta.description);
  updateMetaTag('og:type', meta.ogType || defaultMetadata.ogType!);
  updateMetaTag('og:image', meta.ogImage || defaultMetadata.ogImage!);
  updateMetaTag('og:url', window.location.href);

  // Update Twitter Cards
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', meta.title);
  updateMetaTag('twitter:description', meta.description);
  updateMetaTag('twitter:image', meta.ogImage || defaultMetadata.ogImage!);

  // Inject/Update JSON-LD Schema
  injectJSONLD();
}

function updateMetaTag(property: string, content: string): void {
  let tag = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    if (property.startsWith('og:')) {
      tag.setAttribute('property', property);
    } else {
      tag.setAttribute('name', property);
    }
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function injectJSONLD(): void {
  const schemaId = "jsonld-restaurant-schema";
  let script = document.getElementById(schemaId) as HTMLScriptElement;
  if (!script) {
    script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "The Habit Cafe & Grill",
    "image": "https://b.zmtcdn.com/data/pictures/2/21465822/c922fc8c9c3bd209a9df18b5e10863dc_o2_featured_v2.jpg",
    "url": "https://www.zomato.com/srinagar/the-habit-cafe-and-grill-srinagar",
    "telephone": "+917006677631",
    "priceRange": "₹1-400 per person",
    "servesCuisine": ["North Indian", "Biryani", "Rolls", "Seafood", "Momos", "Chinese", "Fast Food"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "BALGARDEN ROAD, Near Petrol Pump, Karan Nagar",
      "addressLocality": "Srinagar",
      "addressRegion": "Jammu & Kashmir",
      "postalCode": "190010",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.0760374,
      "longitude": 74.7978004
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "22:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.2",
      "reviewCount": "377"
    },
    "sameAs": [
      "https://www.swiggy.com/city/srinagar/the-habit-cafe-and-grill-nursing-gud-bal-garden-karan-nagar-rest625386",
      "https://www.zomato.com/srinagar/the-habit-cafe-and-grill-srinagar/order",
      "https://www.google.com/maps/place/The+Habit+Cafe+And+Grill/@34.0763381,74.7940638,17.61z"
    ]
  };

  script.text = JSON.stringify(restaurantSchema, null, 2);
}
