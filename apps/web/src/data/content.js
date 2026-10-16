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
    id: 'tpl-traditional-video',
    slug: 'traditional-template-custom-video',
    name: 'Traditional Template with Custom Video',
    clientTitle: 'Traditional Template with Custom Video',
    subtitle: 'Temple Door Animation + Custom Video',
    venue: 'Palace Gardens & Banquet',
    category: 'wedding',
    categoryName: 'Wedding & Reception',
    price: '₹5,000',
    originalPrice: '₹7,999',
    priceVal: 5000,
    phoneImage: '/images/templates/leaves_intro.jpg',
    image: '/images/templates/leaves_intro.jpg',
    cardImage: '/images/templates/leaves_intro.jpg',
    bannerImage: '/images/templates/leaves_intro.jpg',
    objectPosition: 'object-center',
    previewUrl: 'https://hitesh-weds-neha.vercel.app',
    hasLivePreview: true,
    themeColor: '#4E1D1D',
    themeLight: '#FFF0EC',
    textColor: '#351410',
    description: 'Grand royal traditional door opening reveal accompanied by your personalized intro video, ceremonial music, live Google Maps, and instant RSVP tracking.',
    features: ['Door Animation', 'Custom Video', 'RSVP & Maps', 'Music'],
    featured: true,
    badge: 'Traditional + Video',
    badgeColor: '#FFF0EC',
    badgeText: '#A83232',
    tags: ['Door Animation', 'Custom Video', 'Cinematic', 'Luxury']
  },
  {
    id: 'tpl-traditional',
    slug: 'traditional-template',
    name: 'Traditional Template',
    clientTitle: 'Traditional Template',
    subtitle: 'Temple Background & Ceremonial Music',
    venue: 'Coastal Bay Resort & Mandap',
    category: 'wedding',
    categoryName: 'Wedding & Reception',
    price: '₹4,500',
    originalPrice: '₹6,499',
    priceVal: 4500,
    phoneImage: '/images/templates/temple_door_preview.jpg',
    image: '/images/templates/temple_door_preview.jpg',
    cardImage: '/images/templates/temple_door_preview.jpg',
    bannerImage: '/images/templates/temple_door_preview.jpg',
    objectPosition: 'object-center',
    previewUrl: 'https://kalyan-weds-inchara.vercel.app',
    hasLivePreview: true,
    themeColor: '#F5CD51',
    themeLight: '#FFF7E6',
    textColor: '#351410',
    description: 'Sacred traditional South Indian temple aesthetic featuring gopuram arches, traditional Ganesha blessings, ceremonial music, live countdown, and interactive venue directions.',
    features: ['No Animation', 'RSVP & Maps', 'Ceremonial Music'],
    featured: true,
    badge: 'Traditional',
    badgeColor: '#FFFBEB',
    badgeText: '#B45309',
    tags: ['Traditional', 'Temple', 'Gopuram', 'South Indian']
  },
  {
    id: 'tpl-sangeet-cocktails',
    slug: 'sangeet-cocktails-custom-template',
    name: 'Sangeet & Cocktails Custom Template',
    clientTitle: 'Sangeet & Cocktails Custom Template',
    subtitle: 'Cocktail Party & Live Countdown',
    venue: 'The Crown Venue, Dallas, TX',
    category: 'wedding',
    categoryName: 'Wedding & Sangeet',
    price: '₹2,500',
    originalPrice: '₹3,999',
    priceVal: 2500,
    phoneImage: '/images/templates/client_mgs_3.jpg',
    image: '/images/templates/client_mgs_3.jpg',
    cardImage: '/images/templates/client_mgs_3.jpg',
    bannerImage: '/images/templates/client_mgs_3.jpg',
    objectPosition: 'object-top',
    previewUrl: 'https://sreeja-and-nikhil-sangeet-invite.vercel.app/',
    hasLivePreview: true,
    themeColor: '#E6A935',
    themeLight: '#FFF4D6',
    textColor: '#1F1F1F',
    description: 'Black tie cocktail aesthetic with warm hanging lanterns, couple dancing illustration, live countdown, venue directions, and instant RSVP without heavy animations.',
    features: ['Party Countdown', 'RSVP & Maps', 'Countdown Timer'],
    featured: true,
    badge: 'Best Value',
    badgeColor: '#FFFBEB',
    badgeText: '#B45309',
    tags: ['Sangeet', 'Cocktail', 'Glitter', 'Simple']
  },
  {
    id: 'tpl-velvet-hues',
    slug: 'velvet-hues-template',
    name: 'Velvet Hues (Royal Udaipur)',
    clientTitle: 'Velvet Hues · Royal Udaipur',
    subtitle: 'Royal Heritage & Arched Card',
    venue: 'Jagmandir Island Palace, Udaipur',
    category: 'wedding',
    categoryName: 'Wedding & Reception',
    price: '₹3,000',
    originalPrice: '₹4,999',
    priceVal: 3000,
    phoneImage: '/images/templates/client_mgs_5.jpg',
    image: '/images/templates/client_mgs_5.jpg',
    cardImage: '/images/templates/client_mgs_5.jpg',
    bannerImage: '/images/templates/client_mgs_5.jpg',
    objectPosition: 'object-top',
    previewUrl: 'https://royal-wedding-invitation-sandy.vercel.app/',
    hasLivePreview: true,
    themeColor: '#351410',
    themeLight: '#FFF0EC',
    textColor: '#351410',
    description: 'Grand palace aesthetic with ornate Mughal jali archways, royal vintage typography, gold foil accents, and multi-ceremony royal timeline.',
    features: ['Card Animation', 'RSVP & Maps', 'Spotify Music'],
    featured: true,
    badge: 'Royal Udaipur',
    badgeColor: '#FFF0EC',
    badgeText: '#A83232',
    tags: ['Heritage', 'Royal Palace', 'Gold Foil', 'Traditional', 'Udaipur']
  },
  {
    id: 'tpl-modern-white-wedding',
    slug: 'modern-white-wedding-template',
    name: 'Modern White Elegance (Aisha & Rayan)',
    clientTitle: 'Modern White Elegance · Aisha & Rayan',
    subtitle: 'Wax Seal Gate & Mechanical Flip Clock',
    venue: 'Villa Serena, Lisbon',
    category: 'wedding',
    categoryName: 'Wedding & Reception',
    price: '₹3,000',
    originalPrice: '₹4,999',
    priceVal: 3000,
    phoneImage: '/images/templates/modern_white_wedding_aisha_rayan.jpg',
    image: '/images/templates/modern_white_wedding_aisha_rayan.jpg',
    cardImage: '/images/templates/modern_white_wedding_aisha_rayan.jpg',
    bannerImage: '/images/templates/modern_white_wedding_aisha_rayan.jpg',
    objectPosition: 'object-center',
    previewUrl: 'https://modern-white-wedding.vercel.app/',
    hasLivePreview: true,
    themeColor: '#4A3B32',
    themeLight: '#FBF9F7',
    textColor: '#2B1B17',
    description: 'Minimalist European white aesthetic featuring an interactive gold wax seal envelope unboxing, mechanical flip clock countdown, waltz music, and floral accents.',
    features: ['Wax Seal Gate', 'Flip Clock Countdown', 'Waltz Audio & RSVP'],
    featured: true,
    badge: 'Modern White',
    badgeColor: '#F5EBE6',
    badgeText: '#6D4C41',
    tags: ['Modern White', 'Wax Seal', 'Minimalist', 'Flip Clock', 'Villa Serena']
  },
  {
    id: 'tpl-unrevealed-2',
    slug: 'yet-to-be-revealed-2',
    name: 'Yet to be Revealed',
    clientTitle: 'Yet to be Revealed',
    subtitle: 'Sneak Peek · In The Works',
    venue: 'Ahvaan Design Studio',
    category: 'wedding',
    categoryName: 'Wedding & Reception',
    price: 'On Hold',
    originalPrice: '',
    priceVal: 0,
    phoneImage: null,
    image: null,
    bannerImage: null,
    previewUrl: null,
    hasLivePreview: false,
    isUnrevealed: true,
    themeColor: '#351410',
    themeLight: '#FAF8F6',
    textColor: '#666666',
    description: 'A brand-new handcrafted celebration experience is currently in our design workshop. Stay tuned for the grand reveal!',
    features: ['Sneak Peek', 'Secret Theme', 'Coming Soon'],
    featured: true,
    badge: 'On Hold',
    badgeColor: '#FEF3C7',
    badgeText: '#B45309',
    tags: ['Sneak Peek', 'Secret Theme', 'On Hold']
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
