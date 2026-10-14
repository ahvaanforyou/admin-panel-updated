// Category definitions with exact PRD & Design System hex tokens
export const CATEGORIES = [
  {
    id: 'all',
    name: 'All Celebrations',
    icon: 'Sparkles',
    color: '#4E1D1D',
    lightColor: '#FAF8F6',
    count: 12
  },
  {
    id: 'wedding',
    name: 'Wedding & Sangeet',
    tagline: 'Festive, luxurious, timeless traditions',
    color: '#FFC655',
    lightColor: '#FFF4D6',
    darkText: '#5A4100',
    count: 4,
    badge: 'Trending'
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    tagline: 'Joyful, pastel, warm welcomes',
    color: '#0776C6',
    lightColor: '#E8F5FF',
    darkText: '#044473',
    count: 3,
    badge: 'Popular'
  },
  {
    id: 'birthday',
    name: 'Birthday Party',
    tagline: 'Energetic, playful & celebratory',
    color: '#F7526C',
    lightColor: '#FFF0F3',
    darkText: '#821629',
    count: 3,
    badge: 'Kids & Adults'
  },
  {
    id: 'house-warming',
    name: 'House Warming',
    tagline: 'Calm, elegant new beginnings',
    color: '#314A31',
    lightColor: '#EEF3EC',
    darkText: '#182E18',
    count: 2,
    badge: 'Traditional'
  }
];

export const TEMPLATES = [
  {
    id: 'tpl-nikhil-divya',
    slug: 'nikhil-divya-temple-wedding',
    name: 'Divya & Nikhil Vivah',
    subtitle: 'Traditional South Indian Temple Ceremony',
    venue: 'Dama Convention, Visakhapatnam',
    category: 'wedding',
    categoryName: 'Wedding & Reception',
    price: '₹2,999',
    originalPrice: '₹4,999',
    image: '/images/templates/nikhil-divya-social-thumbnail.png',
    bannerImage: '/images/templates/nikhil-divya-banner.jpg',
    themeColor: '#F5CD51',
    themeLight: '#FFF7E6',
    textColor: '#351410',
    description: 'Authentic temple aesthetic with ornate golden gopuram arches, traditional Ganesha blessings, Dama Convention reception details, live Google Maps, and serene shehnai audio.',
    features: ['Temple Gopuram Card Design', 'Dama Convention Google Maps', 'Interactive WhatsApp RSVP', 'Nuptial Muhurtham Timeline', 'Traditional Shehnai Audio', '1-Click WhatsApp Share'],
    featured: true,
    badge: 'Client Favorite',
    badgeColor: '#FFFBEB',
    badgeText: '#B45309',
    tags: ['Traditional', 'Temple', 'Gopuram', 'South Indian'],
    priceVal: 2999
  },
  {
    id: 'tpl-kalyan-inchara',
    slug: 'kalyan-inchara-beach-wedding',
    name: 'Inchara & Kalyan Vivah',
    subtitle: 'Beach Mandap Destination Wedding',
    venue: 'Coastal Bay Resort & Mandap',
    category: 'wedding',
    categoryName: 'Wedding & Sangeet',
    price: '₹3,499',
    originalPrice: '₹5,499',
    image: '/images/templates/kalyan-inchara-social-thumbnail.png',
    bannerImage: '/images/templates/kalyan-inchara-banner.jpg',
    themeColor: '#E6A935',
    themeLight: '#FFF4D6',
    textColor: '#4A3005',
    description: 'Romantic destination beach wedding with coastal sunset mandapam, scratch countdown timer, multi-day Sangeet & Haldi itinerary, and high-res couple photo gallery.',
    features: ['Interactive Scratch Countdown', 'Beach Mandap Coastal Theme', 'Multi-day Event Itinerary', 'High-Res Photo Gallery', 'Live GPS Navigation', 'Direct Host Calling'],
    featured: true,
    badge: 'Trending',
    badgeColor: '#FEF3C7',
    badgeText: '#B45309',
    tags: ['Destination', 'Beach Mandap', 'Scratch Card', 'Modern'],
    priceVal: 3499
  },
  {
    id: 'tpl-hanisha-ronish',
    slug: 'hanisha-ronish-modern-soiree',
    name: 'Hanisha & Ronish Soirée',
    subtitle: 'Twilight Sangeet & Vivah Celebration',
    venue: 'Palace Gardens & Banquet',
    category: 'wedding',
    categoryName: 'Wedding & Sangeet',
    price: '₹2,499',
    originalPrice: '₹3,999',
    image: '/images/templates/hanisha-ronish-banner.jpg',
    bannerImage: '/images/templates/hanisha-ronish-banner.jpg',
    themeColor: '#F4C4B7',
    themeLight: '#FFF0EC',
    textColor: '#351410',
    description: 'Contemporary pastel blush and golden starlight aesthetic designed for cocktail parties, sangeet nights, and intimate ceremonies with interactive countdown timer.',
    features: ['Live Event Countdown', 'Interactive Dress Code Guide', 'Live Google Maps', 'Direct Host Calling', 'RSVP via WhatsApp'],
    featured: true,
    badge: 'Most Loved',
    badgeColor: '#FFF0EC',
    badgeText: '#A83232',
    tags: ['Pastel Blush', 'Cocktail', 'Sangeet', 'Luxury'],
    priceVal: 2499
  },
  {
    id: 'tpl-royal-udaipur',
    slug: 'royal-udaipur-palace-wedding',
    name: 'Royal Udaipur Vivah',
    subtitle: 'Heritage Palace Rajputana Theme',
    venue: 'Jagmandir Island Palace, Udaipur',
    category: 'wedding',
    categoryName: 'Wedding & Reception',
    price: '₹3,999',
    originalPrice: '₹6,499',
    image: '/images/templates/card-royal.png',
    bannerImage: '/images/templates/card-royal.png',
    themeColor: '#FFC655',
    themeLight: '#FFF8E1',
    textColor: '#684B02',
    description: 'Grand palace aesthetic with ornate Mughal jali archways, royal vintage typography, gold foil accents, and multi-ceremony royal timeline.',
    features: ['Heritage Mughal Jali Borders', 'Royal Shehnai Background Track', 'Multi-day Royal Schedule', 'VIP RSVP Headcount', 'Live Venue Google Maps'],
    featured: true,
    badge: 'Heritage Royal',
    badgeColor: '#FFFBEB',
    badgeText: '#B45309',
    tags: ['Heritage', 'Royal Palace', 'Gold Foil', 'Traditional'],
    priceVal: 3999
  },
  {
    id: 'tpl-little-smiles',
    slug: 'little-smiles-safari-birthday',
    name: 'Little Smiles Safari',
    subtitle: "Ayaan's 1st Birthday Adventure",
    venue: 'The Palm Club & Lawn',
    category: 'birthday',
    categoryName: 'Birthday Party',
    price: '₹1,499',
    originalPrice: '₹2,499',
    image: '/images/templates/card-littlesmiles.png',
    bannerImage: '/images/templates/card-littlesmiles.png',
    themeColor: '#F7526C',
    themeLight: '#FFF0F3',
    textColor: '#821629',
    description: 'Vibrant safari jungle theme packed with cute lion illustrations, cartoon balloon animations, cheerful party music, and quick dietary RSVP for parents.',
    features: ['Kids Theme Cartoon Animations', 'Quick Parent RSVP', 'Theme Costume Guide', 'Live Venue Directions', 'Digital Wish Wall'],
    featured: true,
    badge: 'Fun & Playful',
    badgeColor: '#FFF0F3',
    badgeText: '#D97706',
    tags: ['Safari', 'Kids Birthday', 'Cartoon', 'Fun'],
    priceVal: 1499
  },
  {
    id: 'tpl-sweet-beginnings',
    slug: 'sweet-beginnings-baby-shower',
    name: 'Sweet Beginnings Baby Shower',
    subtitle: 'Welcoming Baby Sharma • Cloud Dream',
    venue: 'Orchid Banquet & Terrace',
    category: 'baby-shower',
    categoryName: 'Baby Shower',
    price: '₹1,699',
    originalPrice: '₹2,799',
    image: '/images/templates/baby-shower.jpg',
    bannerImage: '/images/templates/baby-shower.jpg',
    themeColor: '#0776C6',
    themeLight: '#E8F5FF',
    textColor: '#044473',
    description: 'Charming pastel sky theme with fluffy clouds, hot-air balloons, cute teddy illustrations, baby registry link, and blessings message board.',
    features: ['Baby Gift Registry Link', 'Online RSVP Confirmation', 'Venue Navigation', 'Lullaby Audio Track', 'Guest Wishes Board'],
    featured: true,
    badge: 'Dreamy Pastel',
    badgeColor: '#E8F5FF',
    badgeText: '#0776C6',
    tags: ['Pastel Sky', 'Teddy Bear', 'Blessings', 'Baby Shower'],
    priceVal: 1699
  }
];

export const FAQS = [
  {
    question: 'How does Ahvaan for You work?',
    answer: 'It takes just 3 simple steps: 1) Browse our curated template designs and select your favorite. 2) Provide your event details, venue address, and photographs via our enquiry form or WhatsApp. 3) Our design team customizes your invitation with custom animations, background music, RSVP tracking, and live maps within 24 to 48 hours!'
  },
  {
    question: 'How long does it take to get my customized invitation?',
    answer: 'Standard delivery is within 24–48 hours after receiving your complete event details. We also offer an express 12-hour turnaround for urgent celebrations.'
  },
  {
    question: 'Can I add our own music and personalized song?',
    answer: 'Yes! You can choose any romantic instrumental, traditional shehnai, Bollywood party track, or even provide your own audio MP3 or Spotify link.'
  },
  {
    question: 'How do guests RSVP and how do I see their responses?',
    answer: 'Each invitation includes an interactive RSVP widget. Guests submit their attendance, dietary preferences, and guest count. You receive instant notifications directly on your WhatsApp and in your private dashboard.'
  },
  {
    question: 'Will the invitation work on both mobile phones and laptops?',
    answer: 'Absolutely. Every Ahvaan invitation is built with ultra-responsive mobile-first design, ensuring silky-smooth animations on iPhone, Android, iPads, laptops, and smart TVs alike.'
  },
  {
    question: 'Can I add Google Maps directions for the venue?',
    answer: 'Yes, we embed a 1-click "Open in Google Maps" button that launches turn-by-turn driving directions straight to your venue or resort gates.'
  },
  {
    question: 'What if I need last-minute corrections or date changes?',
    answer: 'We provide up to 2 rounds of free revisions for timings, spellings, photo changes, or venue updates even after delivery.'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priyanka & Arjun',
    location: 'Hyderabad, Telangana',
    event: 'Royal Wedding & Sangeet',
    quote: 'Our guests in the US and Bangalore were blown away! The embedded Google Maps and background shehnai music made it feel like an ultra-luxury experience. Zero paper waste and 100% attendance tracking.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    date: 'September 2026'
  },
  {
    id: 2,
    name: 'Dr. Sneha & Vikram Rao',
    location: 'Bangalore, Karnataka',
    event: 'Baby Shower (Godh Bharai)',
    quote: 'The pastel teddy theme was utterly heartwarming. Collecting RSVP numbers for lunch catering was effortless thanks to the instant WhatsApp alert. Highly recommended!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    date: 'August 2026'
  },
  {
    id: 3,
    name: 'Karthik & Meera Iyer',
    location: 'Chennai, Tamil Nadu',
    event: 'Griha Pravesh Puja',
    quote: 'Traditional aesthetic with modern tech convenience. Elder relatives found the 1-tap Google Maps link so easy to open right inside WhatsApp. Beautiful work by team Ahvaan.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: 'September 2026'
  }
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Choose a Template',
    description: 'Explore our hand-crafted, emotion-driven designs tailored for weddings, baby showers, birthdays, and housewarmings.',
    icon: 'Sparkles'
  },
  {
    step: '02',
    title: 'Share Your Details',
    description: 'Submit your event dates, venue location, photos, and music preference via our intuitive form or quick WhatsApp chat.',
    icon: 'FileText'
  },
  {
    step: '03',
    title: 'We Customize It',
    description: 'Our senior invitation designers personalize typography, animations, interactive RSVPs, and turn-by-turn map directions.',
    icon: 'Palette'
  },
  {
    step: '04',
    title: 'Receive & Share',
    description: 'Get your private interactive link within 24 hours. Send it to family and friends across WhatsApp, Instagram, or Email with a single click.',
    icon: 'Send'
  }
];
