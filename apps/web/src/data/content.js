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
    id: 'tpl-wed-01',
    slug: 'sreeja-nikhil-royal-wedding',
    name: 'Royal Sangeet & Vivah',
    subtitle: 'Sreeja & Nikhil • Jaipur Palace Theme',
    category: 'wedding',
    categoryName: 'Wedding & Sangeet',
    price: '₹1,999',
    originalPrice: '₹3,499',
    image: '/images/templates/wedding-sangeet.jpg',
    themeColor: '#FFC655',
    themeLight: '#FFF4D6',
    textColor: '#684B02',
    description: 'A regal royal wedding invitation with ornate Mughal jali archways, golden marigold motifs, dynamic RSVP form, embedded Google Maps to the banquet, and soothing shehnai music.',
    features: ['Instant RSVP Form', 'Live Venue Google Maps', 'Custom Audio / Music Player', 'Event Schedule Timeline', 'Photo Gallery', 'WhatsApp 1-Click Share'],
    featured: true,
    tags: ['Traditional', 'Golden Arch', 'Luxury', 'Sangeet']
  },
  {
    id: 'tpl-wed-02',
    slug: 'hanisha-ronish-modern-soiree',
    name: 'Twilight Sangeet Soirée',
    subtitle: 'Hanisha & Ronish • Modern Cocktail Vibe',
    category: 'wedding',
    categoryName: 'Wedding & Sangeet',
    price: '₹2,299',
    originalPrice: '₹3,999',
    image: '/images/templates/wedding-sangeet.jpg',
    themeColor: '#FFC655',
    themeLight: '#FFF4D6',
    textColor: '#684B02',
    description: 'Contemporary midnight-blue and gold celestial aesthetic designed for cocktail parties, sangeet nights, and intimate ceremonies with interactive countdown timer.',
    features: ['Live Event Countdown', 'Interactive Dress Code Guide', 'Live Google Maps', 'Direct Host Calling', 'RSVP via WhatsApp'],
    featured: true,
    tags: ['Modern', 'Sangeet', 'Cocktail']
  },
  {
    id: 'tpl-baby-01',
    slug: 'little-adventurer-baby-shower',
    name: 'Teddy & Cloud Baby Shower',
    subtitle: 'Welcoming Baby Sharma • Teddy Bear Story',
    category: 'baby-shower',
    categoryName: 'Baby Shower',
    price: '₹1,499',
    originalPrice: '₹2,499',
    image: '/images/templates/baby-shower.jpg',
    themeColor: '#0776C6',
    themeLight: '#E8F5FF',
    textColor: '#044473',
    description: 'Charming pastel sky theme with fluffy clouds, hot-air balloons, cute teddy illustrations, and baby shower games integration.',
    features: ['Baby Registry Link', 'RSVP Confirmation', 'Venue Navigation', 'Lullaby Audio Track', 'Guest Wishes Board'],
    featured: true,
    tags: ['Pastel', 'Teddy Bear', 'Cuddly', 'Boy & Girl']
  },
  {
    id: 'tpl-baby-02',
    slug: 'golden-sunshine-godh-bharai',
    name: 'Traditional Godh Bharai',
    subtitle: 'Blessings for the Mother-to-Be',
    category: 'baby-shower',
    categoryName: 'Baby Shower',
    price: '₹1,699',
    originalPrice: '₹2,799',
    image: '/images/templates/baby-shower.jpg',
    themeColor: '#0776C6',
    themeLight: '#E8F5FF',
    textColor: '#044473',
    description: 'Traditional Vedic motifs combined with contemporary pastel serenity for Seemantham / Godh Bharai ceremonies with blessings section.',
    features: ['Blessings Note Entry', 'Muhurtham Timeline', 'Google Maps Location', 'Family Introduction'],
    featured: false,
    tags: ['Vedic', 'Godh Bharai', 'Seemantham']
  },
  {
    id: 'tpl-bday-01',
    slug: 'rohan-safari-5th-birthday',
    name: 'Wild Safari Adventure',
    subtitle: "Rohan's 5th Birthday Celebration",
    category: 'birthday',
    categoryName: 'Birthday Party',
    price: '₹1,299',
    originalPrice: '₹2,199',
    image: '/images/templates/birthday.jpg',
    themeColor: '#F7526C',
    themeLight: '#FFF0F3',
    textColor: '#821629',
    description: 'Vibrant safari jungle theme packed with smiling lions, gentle giraffes, cartoon animations, energetic party tracks, and quick RSVP for parents.',
    features: ['Kids Theme Animations', 'Quick Parent RSVP', 'Theme Costume Guide', 'Venue Direction Link'],
    featured: true,
    tags: ['Kids Safari', 'Playful', 'Fun']
  },
  {
    id: 'tpl-bday-02',
    slug: 'aaradhya-unicorn-princess',
    name: 'Pastel Dreamland Princess',
    subtitle: "Aaradhya's 6th Birthday Gala",
    category: 'birthday',
    categoryName: 'Birthday Party',
    price: '₹1,399',
    originalPrice: '₹2,299',
    image: '/images/templates/birthday.jpg',
    themeColor: '#F7526C',
    themeLight: '#FFF0F3',
    textColor: '#821629',
    description: 'Sparkling fairy castle design with pastel rainbow palettes, confetti shower animations, and custom party photo upload gallery.',
    features: ['Confetti Animations', 'Live RSVP Tracker', 'Party Playlist', 'Gift Registry Wishlist'],
    featured: false,
    tags: ['Princess', 'Fairy', 'Pastel']
  },
  {
    id: 'tpl-house-01',
    slug: 'our-new-beginning-housewarming',
    name: 'Griha Pravesh & Shanti',
    subtitle: 'The Reddy Family • New Abode Puja',
    category: 'house-warming',
    categoryName: 'House Warming',
    price: '₹1,599',
    originalPrice: '₹2,599',
    image: '/images/templates/house-warming.jpg',
    themeColor: '#314A31',
    themeLight: '#EEF3EC',
    textColor: '#182E18',
    description: 'Serene and auspicious housewarming invitation featuring fresh mango leaves, brass diyas, Vedic kalash motifs, and step-by-step puja timing.',
    features: ['Puja Schedule & Muhurtham', 'Turn-by-Turn GPS Map', 'RSVP Headcount', 'Live WhatsApp Location Pin'],
    featured: true,
    tags: ['Griha Pravesh', 'Puja', 'Traditional', 'Minimal']
  },
  {
    id: 'tpl-house-02',
    slug: 'modern-nest-housewarming',
    name: 'Modern Nest & Cocktails',
    subtitle: 'Celebrating Our First Home',
    category: 'house-warming',
    categoryName: 'House Warming',
    price: '₹1,499',
    originalPrice: '₹2,399',
    image: '/images/templates/house-warming.jpg',
    themeColor: '#314A31',
    themeLight: '#EEF3EC',
    textColor: '#182E18',
    description: 'Architectural line art and chic botanical accents for modern apartment warms and open-house brunch celebrations.',
    features: ['Apartment Tower Entry Guide', 'Parking Instructions', 'RSVP via WhatsApp', 'Spotify Background Music'],
    featured: false,
    tags: ['Modern Architecture', 'Botanical', 'Open House']
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
