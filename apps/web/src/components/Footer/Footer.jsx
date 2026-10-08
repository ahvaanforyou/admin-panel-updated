import React from 'react';
import { Sparkles, Phone, Mail, Instagram, Youtube, ArrowUpRight, Heart } from 'lucide-react';

export default function Footer({ onCategoryClick, onCreateClick }) {
  return (
    <footer className="bg-[#241717] text-white pt-16 pb-12 border-t border-[#3A2424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-primary border border-theme-wedding/30 flex items-center justify-center text-theme-wedding">
                <Sparkles className="w-4 h-4 text-theme-wedding" />
              </div>
              <div className="flex flex-col">
                <span className="font-editorial text-xl font-bold tracking-[0.2em] text-white uppercase">
                  AHVAAN
                </span>
                <span className="text-[9px] font-semibold tracking-[0.35em] text-white/50 uppercase">
                  FOR YOU
                </span>
              </div>
            </div>

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
                href="mailto:contact@ahvaanforyou.com" 
                className="flex items-center gap-2.5 text-white/80 hover:text-theme-wedding transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-theme-wedding" />
                <span>contact@ahvaanforyou.com</span>
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
                onClick={onCreateClick}
                className="w-full py-2 px-3 rounded-xl bg-theme-wedding text-brand-primary text-xs font-bold text-center block hover:bg-amber-300 transition-colors"
              >
                Order Custom Invitation
              </button>

              <a
                href="/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Admin Dashboard</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <p className="text-[11px] text-white/40 leading-relaxed">
                Connects live with the Ahvaan studio management portal.
              </p>
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
