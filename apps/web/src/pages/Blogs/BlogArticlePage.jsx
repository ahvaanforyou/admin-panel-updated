import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Lightbulb, 
  ChevronRight,
  MapPin,
  Heart,
  Users,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import Footer from '../../components/Footer/Footer';

const TABLE_OF_CONTENTS = [
  { id: 'sec-01', num: '01', title: 'What Is a Digital Wedding Invitation Website?' },
  { id: 'sec-02', num: '02', title: 'Why Are Couples Choosing Digital Invitations?' },
  { id: 'sec-03', num: '03', title: 'What Should a Wedding Website Include?' },
  { id: 'sec-04', num: '04', title: 'How Does a Digital Wedding Invitation Work?' },
  { id: 'sec-05', num: '05', title: 'Digital vs Printed Wedding Card' },
  { id: 'sec-06', num: '06', title: 'Digital Invitation vs Wedding Video' },
  { id: 'sec-07', num: '07', title: 'How to Create a Wedding Invitation Website' },
  { id: 'sec-08', num: '08', title: 'How to Share on WhatsApp' },
  { id: 'sec-09', num: '09', title: 'How to Collect RSVPs Online' },
  { id: 'sec-10', num: '10', title: 'Cost of a Digital Wedding Invitation' },
];

const COMPARISON_ROWS = [
  {
    factor: 'Sharing',
    digital: 'Send through a link or digital file instantly to unlimited guests worldwide',
    printed: 'Deliver or hand over physically; requires postage and printing lead time',
  },
  {
    factor: 'Design',
    digital: 'Can include web features, animations, background music, countdown & video',
    printed: 'Offers physical materials, specialty textures, foil stamping and finishes',
  },
  {
    factor: 'Event details',
    digital: 'Can organise several events on a single page with custom schedules and maps',
    printed: 'Space depends strictly on physical card inserts and layout constraints',
  },
  {
    factor: 'Updates',
    digital: 'Website details may be edited live anytime without re-printing',
    printed: 'Changes usually require a new print run, custom inserts, or phone calls',
  },
  {
    factor: 'Guest access',
    digital: 'Requires a smartphone, tablet or computer with internet access',
    printed: 'Can be read directly without any electronic device',
  },
  {
    factor: 'Personal touch',
    digital: 'Can include photo galleries, love stories, personalized messages & video greetings',
    printed: 'Offers a tangible keepsake, traditional presentation, and handwritten warmth',
  },
  {
    factor: 'RSVP',
    digital: 'Can be seamlessly integrated with automated forms and guest tracking spreadsheets',
    printed: 'Usually requires an RSVP card return, phone call, or separate messaging',
  },
  {
    factor: 'Environmental considerations',
    digital: 'Zero paper waste, completely eco-friendly and sustainable',
    printed: 'Uses paper, ink, envelopes, packaging materials, and physical transport',
  },
  {
    factor: 'Cost',
    digital: 'Predictable flat cost; varies by design format, features, and custom domains',
    printed: 'Varies significantly by paper quality, embellishments, quantity, and delivery postage',
  },
];

const SCHEDULE_ITEMS = [
  { event: 'Haldi Ceremony', date: 'Dec 10, 2026', time: '10:00 AM', venue: 'Courtyard Lawn, The Grand Palace' },
  { event: 'Mehendi & Sangeet', date: 'Dec 10, 2026', time: '6:30 PM', venue: 'Royal Ballroom, The Grand Palace' },
  { event: 'Wedding Ceremony (Pheras)', date: 'Dec 11, 2026', time: '11:00 AM', venue: 'Lakeside Mandap, The Grand Palace' },
  { event: 'Reception Dinner', date: 'Dec 11, 2026', time: '7:30 PM', venue: 'Imperial Gardens, The Grand Palace' },
];

export default function BlogArticlePage({ onBack, onNavigate, onOpenCreateModal }) {
  const [activeSection, setActiveSection] = useState('sec-01');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Scroll spy to highlight active section in Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = TABLE_OF_CONTENTS.length - 1; i >= 0; i--) {
        const item = TABLE_OF_CONTENTS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF8] pt-24 sm:pt-28 flex flex-col justify-between text-[#2D231E]">
      {/* Article Container */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-text">
        
        {/* Breadcrumb Navigation & Back to Blogs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-[#4E1D1D] font-semibold transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Blogs</span>
            </button>

          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-700 text-xs font-medium transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>

        {/* Hero Banner matching PDF */}
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl mb-12 sm:mb-16 min-h-[420px] sm:min-h-[500px] flex flex-col justify-end p-6 sm:p-10 lg:p-14 bg-stone-900">
          <img
            src="/images/blogs/blog-wedding-mandap.jpg"
            alt="Digital Wedding Invitation Website"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay to match PDF perfectly */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

          <div className="relative z-10 max-w-3xl text-white">
            {/* Tag Badge */}
            <div className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold tracking-wider uppercase mb-4">
              WEDDING
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-4">
              Digital Wedding Invitation Website: Complete Guide for Indian Weddings
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base lg:text-lg text-white/90 font-normal leading-relaxed mb-6 max-w-2xl">
              Learn what a digital wedding invitation website is, what to include, and how it makes your wedding celebrations easier and more memorable.
            </p>

            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/80 font-medium pt-3 border-t border-white/20">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-white/70" />
                <span>Sep 25, 2026</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-white/70" />
                <span>8 min read</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-white/70" />
                <span>2.4K views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Layout: Article Body (Left) + Sticky Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* ================= LEFT COLUMN: ARTICLE CONTENT ================= */}
          <article className="lg:col-span-8 space-y-12 leading-relaxed text-[#382E28]">
            
            {/* Introduction */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1916]">
                Introduction
              </h2>
              <p className="text-base sm:text-lg text-[#4A3E37] leading-relaxed">
                Your wedding is a once-in-a-lifetime celebration, and the invitation is the first glimpse your guests get into your special journey. While traditional printed cards will always have their charm, many couples today are choosing a digital wedding invitation website for its convenience, creativity and modern features.
              </p>
              <p className="text-base text-[#574A43] leading-relaxed">
                In this complete guide, you’ll learn what a digital wedding invitation website is, why it’s becoming so popular, what to include, and how you can create one for your big day.
              </p>
            </section>

            {/* Feature Showcase Banner */}
            <div className="bg-[#F5EDE6] border border-[#E8DBD0] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
              <div className="max-w-sm space-y-3">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E1815] leading-tight">
                  One Beautiful Link for Your Entire <span className="italic font-serif text-[#783226]">Wedding Celebration</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#6C584E]">
                  All your wedding events, Google Maps, RSVP tracking, photo galleries and story in one elegant digital invitation link.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {[
                    { label: 'Events', icon: Calendar },
                    { label: 'RSVP', icon: CheckCircle2 },
                    { label: 'Photos', icon: Sparkles },
                    { label: 'Maps', icon: MapPin },
                    { label: 'Our Story', icon: Heart },
                    { label: 'And More', icon: Smartphone }
                  ].map((feat, idx) => {
                    const Icon = feat.icon;
                    return (
                      <div key={idx} className="bg-white/80 rounded-xl p-2.5 text-center shadow-xs border border-white">
                        <Icon className="w-4 h-4 mx-auto text-[#783226] mb-1" />
                        <span className="text-[11px] font-semibold text-stone-700 block">{feat.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-full md:w-60 flex-shrink-0 flex justify-center">
                <div className="w-52 rounded-[28px] overflow-hidden shadow-xl border-4 border-white bg-white">
                  <img
                    src="/images/blogs/article/one-beautiful-link-banner.png"
                    alt="Wedding Invitation Mockup Preview"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.src = '/images/blogs/blog-wedding-mandap.jpg';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Section 01: What Is a Digital Wedding Invitation Website? */}
            <section id="sec-01" className="scroll-mt-24 space-y-4 pt-2 border-t border-stone-200/60">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FCEEE8] text-[#9E4D38] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  01
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F1916]">
                  What Is a Digital Wedding Invitation Website?
                </h2>
              </div>
              <p className="text-base text-[#4A3E37]">
                A digital wedding invitation website is an online invitation that you can share with your family and friends through a simple link. Instead of a physical card, you get a beautifully designed website that includes all your wedding details — from event schedules and venue maps to photos, RSVP forms and your love story.
              </p>
              
              {/* Highlight callout box */}
              <div className="bg-[#FEF9ED] border-l-4 border-[#E0A838] p-4 sm:p-5 rounded-r-2xl flex items-start gap-3.5 my-4">
                <Lightbulb className="w-5 h-5 text-[#C88A16] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#634816] leading-relaxed">
                  <strong>Think of it as a mini wedding website</strong>, created just for your celebration, that your guests can open on their phones or laptops anytime, anywhere.
                </p>
              </div>

              <p className="text-base text-[#574A43]">
                Guests simply tap the link on WhatsApp, SMS, or email, and they immediately have all the ceremony information, dress codes, timings, and live Google Maps navigation right at their fingertips.
              </p>
            </section>

            {/* Section 02: Why Are Couples Choosing Digital Wedding Invitations? */}
            <section id="sec-02" className="scroll-mt-24 space-y-5 pt-4 border-t border-stone-200/60">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FCEEE8] text-[#9E4D38] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  02
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F1916]">
                  Why Are Couples Choosing Digital Wedding Invitations?
                </h2>
              </div>
              <p className="text-base text-[#4A3E37]">
                Wedding planning involves many decisions, and communicating with guests can become a task of its own. Digital wedding invitations offer a practical way to share information while giving couples more flexibility over the presentation and design.
              </p>
              <p className="text-sm font-semibold text-[#783226] uppercase tracking-wider">
                Here are the primary reasons modern couples are switching:
              </p>

              <div className="space-y-4">
                {[
                  {
                    num: '1',
                    title: 'Easy to share with family and friends',
                    desc: 'A digital wedding invitation can be shared through WhatsApp, email, or other messaging platforms. Guests can open the link without needing to keep track of a physical card. This is particularly useful when the guest list includes relatives living in different cities or countries.'
                  },
                  {
                    num: '2',
                    title: 'One place for every wedding function',
                    desc: 'Indian weddings often involve several ceremonies, each with its own schedule, venue, and dress code. A wedding website can organise the haldi, mehendi, sangeet, wedding ceremony, and reception in one place. Guests can revisit the page whenever they need to check a detail.'
                  },
                  {
                    num: '3',
                    title: 'A more personalised invitation',
                    desc: 'Digital invitations offer opportunities to personalise the experience with photographs, colours, typography, illustrations, animations, and meaningful messages. Couples can choose a style that reflects their personalities, cultural traditions, and the atmosphere of their wedding.'
                  },
                  {
                    num: '4',
                    title: 'Convenient updates',
                    desc: 'Wedding plans sometimes change. A venue, event time, or other detail may need to be updated after the invitation has been shared. If your invitation website supports editing, you can update the relevant information on the live page instead of redesigning and redistributing every version of the invitation.'
                  },
                  {
                    num: '5',
                    title: 'Helpful for guests travelling from other places',
                    desc: 'Guests travelling from another city or country may need more than the wedding date. They might need directions, accommodation information, a complete event schedule, and contact details. A well-organised wedding website can bring these details together.'
                  },
                  {
                    num: '6',
                    title: 'Flexible options for different budgets',
                    desc: 'Digital invitations come in different formats and price ranges. A simple e-card, an animated invitation, and a personalised wedding website offer different levels of design and functionality. The right option depends on your requirements and budget.'
                  },
                  {
                    num: '7',
                    title: 'A more organised RSVP process',
                    desc: 'Instead of collecting responses across several family WhatsApp groups, a website with an RSVP form lets you gather guest confirmations in one organised place.'
                  }
                ].map((reason) => (
                  <div key={reason.num} className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                    <h3 className="text-base font-bold text-[#1F1916] mb-1.5 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-700 text-xs flex items-center justify-center font-bold">
                        {reason.num}
                      </span>
                      {reason.title}
                    </h3>
                    <p className="text-sm text-[#5C4D44] pl-7 leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 03: What Should a Wedding Invitation Website Include? */}
            <section id="sec-03" className="scroll-mt-24 space-y-5 pt-4 border-t border-stone-200/60">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FCEEE8] text-[#9E4D38] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  03
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F1916]">
                  What Should a Wedding Invitation Website Include?
                </h2>
              </div>
              <p className="text-base text-[#4A3E37]">
                A digital wedding invitation website can hold much more information than a traditional printed card, but it should still remain easy to navigate.
              </p>

              <h3 className="text-lg font-serif font-bold text-[#1F1916] pt-2">
                Essential sections of a wedding website:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {[
                  { title: '1. Welcome section', text: 'Couples names, the wedding date, and an inviting welcome message setting the tone.' },
                  { title: '2. Event schedule with dates and venues', text: 'Clear breakdown of each function (Mehendi, Sangeet, Wedding, Reception) with exact times.' },
                  { title: '3. Google Maps and navigation links', text: 'Direct clickable links opening Google Maps or Apple Maps right on the guest mobile phone.' },
                  { title: '4. RSVP form', text: 'Allow guests to confirm attendance, total guest count, and specific function attendance.' },
                  { title: '5. Photo gallery', text: 'Showcase pre-wedding shoots, engagement photos, or cherished memories of the couple.' },
                  { title: '6. Love story or couples journey', text: 'A short, heartfelt note about how you met and how your love story unfolded.' },
                  { title: '7. Dress code and theme guidance', text: 'Help guests prepare attire, traditional Indian wear, color palettes, and themes.' },
                  { title: '8. Accommodation & travel info', text: 'Hotels, airport directions, shuttle timings, and stay arrangements for outstation guests.' },
                  { title: '9. Frequently Asked Questions (FAQ)', text: 'Answers to parking, children attendance, photography etiquette, and local weather.' },
                  { title: '10. Contact details', text: 'Phone numbers of designated wedding coordinators or family members for inquiries.' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#FBF8F5] border border-[#EFE5DC] p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-[#2D1E18] mb-1">{item.title}</h4>
                    <p className="text-xs text-[#6B5A50] leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Sample Event Schedule Table */}
              <div className="mt-6 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <div className="bg-[#F9F4F0] px-5 py-3 border-b border-stone-200">
                  <h4 className="text-sm font-bold text-[#2E1815]">Example Indian Wedding Multi-Event Schedule</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm text-[#4A3E37]">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                      <tr>
                        <th className="p-3 sm:p-4">Event</th>
                        <th className="p-3 sm:p-4">Date & Time</th>
                        <th className="p-3 sm:p-4">Venue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {SCHEDULE_ITEMS.map((item, i) => (
                        <tr key={i} className="hover:bg-stone-50/60 transition-colors">
                          <td className="p-3 sm:p-4 font-semibold text-[#1F1916]">{item.event}</td>
                          <td className="p-3 sm:p-4 text-stone-600">{item.date} &bull; {item.time}</td>
                          <td className="p-3 sm:p-4 text-stone-600 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#9E4D38] flex-shrink-0" />
                            <span>{item.venue}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Optional sections */}
              <div className="pt-3">
                <h4 className="text-sm font-bold text-[#783226] uppercase tracking-wider mb-2">
                  Optional sections you might want to add:
                </h4>
                <ul className="list-disc list-inside text-sm text-[#574A43] space-y-1 pl-2">
                  <li>A live stream link for overseas relatives unable to attend in person</li>
                  <li>A digital shagun QR code or gift registry link</li>
                  <li>A background wedding soundtrack or traditional shehnai instrumental</li>
                  <li>Bridal party introductions (Meet the Bridesmaids & Groomsmen)</li>
                  <li>A digital guestbook or congratulatory message wall</li>
                </ul>
              </div>
            </section>

            {/* Section 04: How Does a Digital Wedding Invitation Work? */}
            <section id="sec-04" className="scroll-mt-24 space-y-5 pt-4 border-t border-stone-200/60">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FCEEE8] text-[#9E4D38] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  04
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F1916]">
                  How Does a Digital Wedding Invitation Work?
                </h2>
              </div>
              <p className="text-base text-[#4A3E37]">
                Creating and sharing a digital wedding invitation is generally straightforward. Here is the step-by-step process:
              </p>

              <div className="space-y-3">
                {[
                  { step: 'Step 1: Choose your invitation style', desc: 'Decide how you want your wedding to be presented. You might prefer a traditional Indian design, a floral invitation, a royal theme, a minimalist layout, or a contemporary modern aesthetic.' },
                  { step: 'Step 2: Add your wedding details', desc: 'Enter the couple’s names, dates, venues, event timings, invitation messages, and family host names. For multi-day weddings, verify each ceremony schedule.' },
                  { step: 'Step 3: Personalise the design', desc: 'Customise the invitation with photographs, custom colours, typography, and meaningful quotes.' },
                  { step: 'Step 4: Add useful features', desc: 'Enable interactive features such as RSVP form, venue Google Map pins, photo galleries, countdown timer, and wedding itinerary.' },
                  { step: 'Step 5: Preview and test', desc: 'Before sharing, open the page on both mobile phones and laptops. Check that buttons, maps, RSVP submissions, and links work smoothly.' },
                  { step: 'Step 6: Publish your invitation', desc: 'Publish the page and obtain your unique shareable web link (e.g. ahvaanforyou.com/rahul-and-priya).' },
                  { step: 'Step 7: Share it with your guests', desc: 'Send the invitation through WhatsApp, email, or SMS accompanied by a warm personal invitation message.' },
                  { step: 'Step 8: Manage responses and updates', desc: 'Review guest RSVPs in real time and easily make live schedule updates if any ceremony timing changes.' },
                ].map((st, idx) => (
                  <div key={idx} className="border-l-2 border-[#9E4D38] pl-4 py-1.5">
                    <h4 className="text-sm font-bold text-[#1F1916]">{st.step}</h4>
                    <p className="text-xs sm:text-sm text-[#5C4D44] mt-0.5 leading-relaxed">{st.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 05: Digital Wedding Invitation vs Printed Wedding Card */}
            <section id="sec-05" className="scroll-mt-24 space-y-5 pt-4 border-t border-stone-200/60">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FCEEE8] text-[#9E4D38] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  05
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F1916]">
                  Digital Wedding Invitation vs Printed Wedding Card
                </h2>
              </div>
              <p className="text-base text-[#4A3E37]">
                Choosing between a digital wedding invitation and a traditional printed card comes down to your personal priorities, budget, and guest experience. Here is a side-by-side comparison:
              </p>

              {/* Responsive Comparison Table */}
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm my-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm text-[#4A3E37]">
                    <thead className="bg-[#F9F4F0] text-[#2E1815] font-bold border-b border-stone-200">
                      <tr>
                        <th className="p-3.5 sm:p-4 w-1/4">Factor</th>
                        <th className="p-3.5 sm:p-4 w-3/8 text-[#783226]">Digital wedding invitation</th>
                        <th className="p-3.5 sm:p-4 w-3/8 text-stone-700">Printed wedding card</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {COMPARISON_ROWS.map((row, i) => (
                        <tr key={i} className="hover:bg-[#FDFBF9] transition-colors">
                          <td className="p-3.5 sm:p-4 font-bold text-[#1F1916] bg-stone-50/50">{row.factor}</td>
                          <td className="p-3.5 sm:p-4 text-[#4A3E37] leading-relaxed">{row.digital}</td>
                          <td className="p-3.5 sm:p-4 text-stone-500 leading-relaxed">{row.printed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 06: Digital Invitation vs Wedding Video */}
            <section id="sec-06" className="scroll-mt-24 space-y-4 pt-4 border-t border-stone-200/60">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FCEEE8] text-[#9E4D38] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  06
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F1916]">
                  Digital Invitation vs Wedding Video
                </h2>
              </div>
              <p className="text-base text-[#4A3E37]">
                Digital invitations and wedding invitation videos are often treated as the same thing, but they serve slightly different purposes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                  <h3 className="text-base font-bold text-[#1F1916] mb-2">Wedding Invitation Video</h3>
                  <p className="text-xs sm:text-sm text-[#5C4D44] leading-relaxed">
                    A visual presentation, usually an MP4 video containing music, motion typography, photos and dates. Great for high visual emotion, but lacks interactive clickable maps, dynamic schedules, and live RSVP collection.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#E8DBD0] shadow-xs bg-[#FAF5F1]">
                  <h3 className="text-base font-bold text-[#783226] mb-2">Digital Invitation Website</h3>
                  <p className="text-xs sm:text-sm text-[#5C4D44] leading-relaxed">
                    A full interactive webpage that combines beautiful visuals and music with interactive functionality: live Google Maps navigation, RSVP forms, expandable event itineraries, and live updates.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 07: How to Create a Wedding Invitation Website */}
            <section id="sec-07" className="scroll-mt-24 space-y-4 pt-4 border-t border-stone-200/60">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FCEEE8] text-[#9E4D38] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  07
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F1916]">
                  How to Create a Wedding Invitation Website
                </h2>
              </div>
              <p className="text-base text-[#4A3E37]">
                With Ahvaan for You, creating an exquisite digital wedding invitation website takes just a few minutes without any coding or technical knowledge:
              </p>
              <ol className="list-decimal list-inside space-y-2.5 text-sm sm:text-base text-[#574A43] pl-2">
                <li><strong>Select a Template:</strong> Browse our curated catalog of traditional, royal, modern, and floral wedding designs.</li>
                <li><strong>Enter Your Details:</strong> Add bride & groom names, function dates, timings, venues, and personal message.</li>
                <li><strong>Customize Colors & Photos:</strong> Upload your couple photos and customize the aesthetic.</li>
                <li><strong>Add Interactive Features:</strong> Enable RSVP collection, venue map links, and WhatsApp sharing.</li>
                <li><strong>Share Your Link:</strong> Instantly share with family and friends on WhatsApp with a single tap.</li>
              </ol>
            </section>

            {/* Section 08: How to Share a Digital Wedding Invitation on WhatsApp */}
            <section id="sec-08" className="scroll-mt-24 space-y-4 pt-4 border-t border-stone-200/60">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FCEEE8] text-[#9E4D38] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  08
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F1916]">
                  How to Share a Digital Wedding Invitation on WhatsApp
                </h2>
              </div>
              <p className="text-base text-[#4A3E37]">
                WhatsApp is the most popular platform for sharing digital wedding invitations in India. Here are best practices for sharing:
              </p>
              <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2">
                <h4 className="text-sm font-bold text-[#1F1916]">Tips for sharing invitations on WhatsApp:</h4>
                <ul className="list-disc list-inside text-xs sm:text-sm text-[#5C4D44] space-y-1.5 pl-2">
                  <li>Include a warm, personal greeting when inviting elders or close relatives.</li>
                  <li>Keep the accompanying text message concise and highlight the couple’s names and wedding dates.</li>
                  <li>Make sure the website link generates a rich preview card with your invitation cover image.</li>
                  <li>Mention that the full schedule, location maps, and RSVP form are inside the link.</li>
                  <li>Avoid spamming WhatsApp groups; send individual personal messages where possible.</li>
                </ul>
              </div>
            </section>

            {/* Section 09: How to Collect Wedding RSVPs Online */}
            <section id="sec-09" className="scroll-mt-24 space-y-4 pt-4 border-t border-stone-200/60">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FCEEE8] text-[#9E4D38] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  09
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F1916]">
                  How to Collect Wedding RSVPs Online
                </h2>
              </div>
              <p className="text-base text-[#4A3E37]">
                RSVP stands for <em>répondez s'il vous plaît</em>, French for "please reply". In wedding planning, knowing who plans to attend helps you estimate catering numbers, coordinate seating, and book accommodations.
              </p>
              <div className="bg-[#FBF8F5] p-5 rounded-2xl border border-[#EFE5DC] space-y-2">
                <h4 className="text-sm font-bold text-[#2E1815]">Best practices for wedding RSVPs:</h4>
                <p className="text-xs sm:text-sm text-[#6C584E]">
                  Keep the form short. Ask only for information that helps with planning: Guest name, attendance confirmation, number of attendees, and specific functions attending (Mehendi, Sangeet, Wedding, Reception). Set a clear deadline to give caterers accurate numbers.
                </p>
              </div>
            </section>

            {/* Section 10: How Much Does a Digital Wedding Invitation Cost? */}
            <section id="sec-10" className="scroll-mt-24 space-y-4 pt-4 border-t border-stone-200/60">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FCEEE8] text-[#9E4D38] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  10
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F1916]">
                  How Much Does a Digital Wedding Invitation Cost?
                </h2>
              </div>
              <p className="text-base text-[#4A3E37]">
                The cost of a digital wedding invitation depends on its format, level of customisation, design complexity, and available features.
              </p>
              <p className="text-sm sm:text-base text-[#574A43]">
                While printed wedding invitation sets often cost thousands of dollars or rupees for physical cards, printing, envelopes, and postal couriers, an interactive wedding website offers unlimited guest access for a fraction of that cost.
              </p>
              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-2">
                <h4 className="text-sm font-bold text-[#1F1916]">What influences the price?</h4>
                <ul className="list-disc list-inside text-xs sm:text-sm text-[#5C4D44] space-y-1 pl-2">
                  <li>Invitation format: static cards vs animated website with music and forms</li>
                  <li>Number of celebration functions and schedule complexity</li>
                  <li>RSVP tracking and guest management features</li>
                  <li>Custom personal domain (e.g. rahulwedsneha.com)</li>
                  <li>Photo galleries and multimedia hosting</li>
                </ul>
              </div>
            </section>

            {/* Article Call to Action Banner */}
            <div className="bg-[#4E1D1D] text-white rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden shadow-xl mt-12">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 max-w-xl mx-auto space-y-4">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold">
                  Ready to Create Your Wedding Invitation Website?
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Create a beautiful, interactive digital invitation for your wedding in minutes. Share easily on WhatsApp and collect RSVPs effortlessly.
                </p>
                <button
                  onClick={onOpenCreateModal}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#4E1D1D] font-bold text-xs sm:text-sm shadow-lg hover:bg-stone-100 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Create Your Invitation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </article>

          {/* ================= RIGHT COLUMN: STICKY SIDEBAR ================= */}
          <aside className="lg:col-span-4 space-y-8 select-none">
            
            {/* Sticky Container */}
            <div className="lg:sticky lg:top-24 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar pr-1">
              
              {/* Table of Contents Card */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-md">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
                  <span className="w-2 h-2 rounded-full bg-[#9E4D38]" />
                  <h3 className="text-base font-serif font-bold text-[#1F1916]">
                    Table of Contents
                  </h3>
                </div>

                <nav className="space-y-1">
                  {TABLE_OF_CONTENTS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left flex items-start gap-2.5 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#F9EFE9] text-[#783226] font-bold shadow-xs'
                            : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900 font-medium'
                        }`}
                      >
                        <span className={`text-[11px] font-mono mt-0.5 ${isActive ? 'text-[#9E4D38]' : 'text-stone-400'}`}>
                          {item.num}
                        </span>
                        <span className="line-clamp-1 leading-snug">{item.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Related Blogs Card matching PDF */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-md">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-stone-100">
                  <h3 className="text-base font-serif font-bold text-[#1F1916]">
                    Related Blogs
                  </h3>
                  <button
                    onClick={onBack}
                    className="text-xs font-semibold text-[#783226] hover:text-[#4E1D1D] inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      id: 2,
                      tag: 'DIGITAL INVITATIONS',
                      title: 'Digital Invitations: The Complete Guide for Every Occasion',
                      date: 'Sep 20, 2026',
                      readTime: '6 min read',
                      image: '/images/blogs/blog-digital-guide.jpg',
                    },
                    {
                      id: 3,
                      tag: 'TIPS & GUIDES',
                      title: 'WhatsApp Invitations: How to Send Digital Wedding, Birthday & Event Invites',
                      date: 'Sep 18, 2026',
                      readTime: '5 min read',
                      image: '/images/blogs/blog-whatsapp-invite.jpg',
                    },
                  ].map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group flex gap-3.5 items-center p-2 rounded-2xl hover:bg-stone-50 cursor-pointer transition-colors"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200/60">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-[#9E4D38] uppercase tracking-wider block mb-0.5">
                          {rel.tag}
                        </span>
                        <h4 className="text-xs font-bold text-[#1F1916] group-hover:text-[#4E1D1D] line-clamp-2 leading-snug transition-colors">
                          {rel.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10.5px] text-stone-400 mt-1">
                          <span>{rel.date}</span>
                          <span>&bull;</span>
                          <span>{rel.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>

      {/* Footer */}
      <Footer
        onCategoryClick={() => onNavigate('/#templates')}
        onCreateClick={onOpenCreateModal}
      />
    </div>
  );
}
