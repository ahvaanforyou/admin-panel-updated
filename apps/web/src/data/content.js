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
    id: 'tpl-door-video',
    slug: 'hitesh-neha-grand-vivah',
    name: 'Hitesh & Neha Grand Vivah',
    clientTitle: 'Hitesh & Neha Grand Vivah',
    subtitle: 'Door Animation + Custom Video',
    venue: 'The Grand Ballroom & Palace',
    category: 'wedding',
    categoryName: 'Wedding & Reception',
    price: '₹5,000',
    originalPrice: '₹7,999',
    priceVal: 5000,
    phoneImage: '/images/templates/neha_mobile_view.jpg',
    image: '/images/templates/neha_mobile_view.jpg',
    bannerImage: '/images/templates/neha_mobile_view.jpg',
    previewUrl: 'https://hitesh-weds-neha.vercel.app/',
    hasLivePreview: true,
    themeColor: '#4E1D1D',
    themeLight: '#FFF0EC',
    textColor: '#351410',
    description: 'Cinematic wedding website featuring traditional temple door opening animation, custom intro video, emotional background music, live Google Maps, RSVP tracking, and Spotify integration.',
    features: ['Door Animation', 'Custom Video', 'RSVP & Maps', 'Music'],
    featured: true,
    badge: 'Door + Custom Video',
    badgeColor: '#FFF0EC',
    badgeText: '#A83232',
    tags: ['Door Animation', 'Custom Video', 'Cinematic', 'Luxury']
  },
  {
    id: 'tpl-door-traditional',
    slug: 'divya-nikhil-temple-wedding',
    name: 'Divya & Nikhil Grand Vivah',
    clientTitle: 'Divya & Nikhil Grand Vivah',
    subtitle: 'Door Animation (No Video)',
    venue: 'Dama Convention, Visakhapatnam',
    category: 'wedding',
    categoryName: 'Wedding & Reception',
    price: '₹4,500',
    originalPrice: '₹6,499',
    priceVal: 4500,
    phoneImage: '/images/templates/temple_door_preview.jpg',
    image: '/images/templates/temple_door_preview.jpg',
    bannerImage: '/images/templates/temple_door_preview.jpg',
    previewUrl: 'https://divyawedsnikhil.ahvaanforyou.com',
    hasLivePreview: true,
    themeColor: '#F5CD51',
    themeLight: '#FFF7E6',
    textColor: '#351410',
    description: 'Sacred South Indian temple aesthetic featuring traditional brass bell door opening reveal, ornate gopuram arches, ceremonial music, live countdown, and interactive venue directions.',
    features: ['Door Animation', 'RSVP & Maps', 'Ceremonial Music'],
    featured: true,
    badge: 'Door Animation',
    badgeColor: '#FFFBEB',
    badgeText: '#B45309',
    tags: ['Traditional', 'Temple Door', 'Gopuram', 'South Indian']
  },
  {
    id: 'tpl-royal-maroon',
    slug: 'velvet-hues-editorial-vivah',
    name: 'Velvet Hues Editorial Vivah',
    clientTitle: 'Velvet Hues Editorial Vivah',
    subtitle: 'Card Animation & Music',
    venue: 'The Grand Ballroom',
    category: 'wedding',
    categoryName: 'Wedding & Reception',
    price: '₹3,000',
    originalPrice: '₹4,999',
    priceVal: 3000,
    phoneImage: '/images/templates/client_mgs_3.jpg',
    image: '/images/templates/client_mgs_3.jpg',
    bannerImage: '/images/templates/client_mgs_3.jpg',
    previewUrl: 'https://hitesh-weds-neha.vercel.app/',
    hasLivePreview: true,
    themeColor: '#351410',
    themeLight: '#FFF0EC',
    textColor: '#351410',
    description: 'Minimalist editorial card design in rich velvet maroon hues featuring smooth envelope/card animations, clean typography, Spotify playlist integration, and full ceremony timeline.',
    features: ['Card Animation', 'RSVP & Maps', 'Spotify Music'],
    featured: true,
    badge: 'Card Animation',
    badgeColor: '#FFF0EC',
    badgeText: '#A83232',
    tags: ['Card Animation', 'Velvet Hues', 'Editorial', 'Modern']
  },
  {
    id: 'tpl-sangeet-cocktails',
    slug: 'sreeja-nikhil-sangeet-cocktails',
    name: 'Sreeja & Nikhil Sangeet',
    clientTitle: 'Sreeja & Nikhil Sangeet',
    subtitle: 'Sangeet (No Animation)',
    venue: 'The Crown Venue, Dallas, TX',
    category: 'wedding',
    categoryName: 'Wedding & Sangeet',
    price: '₹2,500',
    originalPrice: '₹3,999',
    priceVal: 2500,
    phoneImage: '/images/templates/client_mgs_1.jpg',
    image: '/images/templates/client_mgs_1.jpg',
    bannerImage: '/images/templates/client_mgs_1.jpg',
    previewUrl: 'https://sreeja-and-nikhil-sangeet-invite.vercel.app/',
    hasLivePreview: true,
    themeColor: '#E6A935',
    themeLight: '#FFF4D6',
    textColor: '#1F1F1F',
    description: 'Black tie cocktail aesthetic with warm hanging lanterns, couple dancing illustration, live countdown, venue directions, and instant RSVP without heavy animations.',
    features: ['No Animation', 'RSVP & Maps', 'Countdown Timer'],
    featured: true,
    badge: 'Best Value',
    badgeColor: '#FFFBEB',
    badgeText: '#B45309',
    tags: ['Sangeet', 'Cocktail', 'Glitter', 'Simple']
  },
  {
    id: 'tpl-kalyan-inchara',
    slug: 'kalyan-inchara-beach-wedding',
    name: 'Inchara & Kalyan Vivah',
    clientTitle: 'Inchara & Kalyan Vivah',
    subtitle: 'Coastal Beach Mandap',
    venue: 'Coastal Bay Resort & Mandap',
    category: 'wedding',
    categoryName: 'Wedding & Reception',
    price: '₹3,500',
    originalPrice: '₹5,499',
    priceVal: 3500,
    phoneImage: '/images/templates/client_mgs_2.jpg',
    image: '/images/templates/client_mgs_2.jpg',
    bannerImage: '/images/templates/client_mgs_2.jpg',
    previewUrl: null,
    hasLivePreview: false,
    themeColor: '#E6A935',
    themeLight: '#FFF4D6',
    textColor: '#4A3005',
    description: 'Romantic destination wedding with traditional South Indian Kalash, cute couple chibi illustrations, gold border, scratch countdown timer, and venue navigation.',
    features: ['RSVP', 'Maps', 'Bulk Emails'],
    featured: true,
    badge: 'Preview Coming Soon',
    badgeColor: '#FEF3C7',
    badgeText: '#B45309',
    tags: ['Destination', 'Beach Mandap', 'South Indian', 'Chibi']
  },
  {
    id: 'tpl-hanisha-ronish',
    slug: 'hanisha-ronish-modern-soiree',
    name: 'Hanisha & Ronish Soirée',
    clientTitle: 'Hanisha & Ronish Soirée',
    subtitle: 'Pastel Blush & Starlight',
    venue: 'Palace Gardens & Banquet',
    category: 'wedding',
    categoryName: 'Wedding & Sangeet',
    price: '₹3,500',
    originalPrice: '₹4,999',
    priceVal: 3500,
    phoneImage: '/images/templates/client_mgs_5.jpg',
    image: '/images/templates/client_mgs_5.jpg',
    bannerImage: '/images/templates/client_mgs_5.jpg',
    previewUrl: null,
    hasLivePreview: false,
    themeColor: '#F4C4B7',
    themeLight: '#FFF0EC',
    textColor: '#351410',
    description: 'Contemporary pastel blush and golden starlight aesthetic designed for cocktail parties, sangeet nights, and intimate ceremonies with interactive countdown timer.',
    features: ['RSVP', 'Maps', 'Bulk Emails'],
    featured: true,
    badge: 'Preview Coming Soon',
    badgeColor: '#FFF0EC',
    badgeText: '#A83232',
    tags: ['Pastel Blush', 'Cocktail', 'Sangeet', 'Luxury']
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
