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
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E1306C] flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
                title="Follow on Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@AhvaanForYou"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF0000] flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
                title="Subscribe on YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              <a
                href="https://wa.me/918985966940"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
                title="WhatsApp Us"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
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
                <div className="w-8 h-8 rounded-lg bg-[#E1306C]/20 text-[#E1306C] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
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
                <div className="w-8 h-8 rounded-lg bg-[#FF0000]/20 text-[#FF0000] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
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
                <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 text-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
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
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-[#F5CD51] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
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
