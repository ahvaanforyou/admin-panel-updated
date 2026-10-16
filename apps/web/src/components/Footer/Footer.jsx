import React from 'react';
import { Phone, Mail, Instagram, Youtube, ArrowUpRight, Heart, MessageCircle } from 'lucide-react';

export default function Footer({ onCategoryClick, onCreateClick, onOpenCreateModal, onNavigate }) {
  const handleCreate = onCreateClick || onOpenCreateModal;
  return (
    <footer className="bg-[#241717] text-white pt-16 pb-12 border-t border-[#3A2424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <a href="/" className="inline-block mb-5 group">
              <img 
                src="/images/logo/ahvaan-nav-logo.png" 
                alt="Ahvaan for You" 
                className="h-10 sm:h-12 w-auto object-contain hover:opacity-90 transition-opacity"
              />
            </a>

            <p className="text-xs text-white/70 max-w-sm leading-relaxed mb-6">
              Ahvaan for You is India's premium digital invitation studio. We craft interactive, emotion-filled celebration invites with live maps, RSVP tracking, music, and effortless sharing.
            </p>

            {/* Contact Details from PRD */}
            <div className="space-y-2 text-xs">
              <a 
                href="tel:+918985966940" 
                className="flex items-center gap-2.5 text-white/80 hover:text-theme-wedding transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-theme-wedding" />
                <span>+91 89859 66940</span>
              </a>

              <a 
                href="mailto:team@ahvaanforyou.com" 
                className="flex items-center gap-2.5 text-white/80 hover:text-theme-wedding transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-theme-wedding" />
                <span>team@ahvaanforyou.com</span>
              </a>
            </div>

            {/* Social Media Links from PRD */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/ahvaan_for_you/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://www.youtube.com/@AhvaanForYou"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                title="Subscribe on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-theme-wedding mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a href="#templates" className="hover:text-white transition-colors">All Invitations</a>
              </li>
              <li>
                <a href="#carousel" className="hover:text-white transition-colors">Celebration Categories</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a>
              </li>
              <li>
                <a href="#moments" className="hover:text-white transition-colors">Client Moments & Reviews</a>
              </li>
            </ul>
          </div>

          {/* Occasions Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-theme-wedding mb-4">
              Occasions
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button onClick={() => onCategoryClick('wedding')} className="hover:text-white transition-colors">
                  Wedding & Sangeet
                </button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('baby-shower')} className="hover:text-white transition-colors">
                  Baby Shower & Godh Bharai
                </button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('birthday')} className="hover:text-white transition-colors">
                  Birthday Parties
                </button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('house-warming')} className="hover:text-white transition-colors">
                  Griha Pravesh & Housewarming
                </button>
              </li>
            </ul>
          </div>

          {/* Admin & Creation Portal Link */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-theme-wedding mb-4">
              Management
            </h4>
            <div className="space-y-3">
              <button
                onClick={handleCreate}
                className="w-full py-2 px-3 rounded-xl bg-theme-wedding text-brand-primary text-xs font-bold text-center block hover:bg-amber-300 transition-colors cursor-pointer"
              >
                Order Custom Invitation
              </button>

              

              <p className="text-[11px] text-white/40 leading-relaxed">
                Connects live with the Ahvaan studio management portal.
              </p>
            </div>
          </div>

        </div>

        {/* Universal Social Media Handles Bar */}
        <div className="py-8 border-b border-white/10">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#F5CD51] block mb-1">
                  Universal Handles & Direct Connect
                </span>
                <p className="text-xs text-white/60">
                  Explore real wedding stories, creative showcases, and instant WhatsApp support.
                </p>
              </div>
              <span className="hidden md:inline-block text-[11px] text-white/40">
                Available 7 days a week · Instant WhatsApp
              </span>
            </div>

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 w-full">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/ahvaan_for_you/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group min-w-0"
              >
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Instagram className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold truncate">Instagram</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#F5CD51] transition-colors truncate">@ahvaan_for_you</div>
                </div>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@AhvaanForYou"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group min-w-0"
              >
                <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Youtube className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold truncate">YouTube</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#F5CD51] transition-colors truncate">@AhvaanForYou</div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918985966940"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group min-w-0"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold truncate">WhatsApp</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#F5CD51] transition-colors truncate">+91 89859 66940</div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:team@ahvaanforyou.com"
                className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group min-w-0"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold truncate">Email</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#F5CD51] transition-colors truncate">team@ahvaanforyou.com</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <div>
            © 2026 Ahvaan for You (ahvaanforyou.com). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Refund Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
