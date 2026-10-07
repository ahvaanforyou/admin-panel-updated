import React, { useState } from 'react';
import { Menu, X, Sparkles, Phone, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenCreateModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -80 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-brand-border/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-theme-wedding shadow-soft-sm group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-theme-wedding" />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-xl font-bold tracking-[0.18em] text-brand-primary uppercase leading-tight">
              AHVAAN
            </span>
            <span className="text-[10px] font-semibold tracking-[0.35em] text-surface-muted uppercase">
              FOR YOU
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-surface-text">
          <button 
            onClick={() => scrollTo('templates')} 
            className="hover:text-brand-primary transition-colors py-2 relative group"
          >
            Invitations
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollTo('how-it-works')} 
            className="hover:text-brand-primary transition-colors py-2 relative group"
          >
            How It Works
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollTo('benefits')} 
            className="hover:text-brand-primary transition-colors py-2 relative group"
          >
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollTo('faq')} 
            className="hover:text-brand-primary transition-colors py-2 relative group"
          >
            FAQ
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollTo('testimonials')} 
            className="hover:text-brand-primary transition-colors py-2 relative group"
          >
            Reviews
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+918985966940"
            className="flex items-center gap-2 text-xs font-semibold text-brand-primary hover:text-brand-dark px-3 py-2 rounded-lg hover:bg-brand-primary/5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-primary" />
            <span>+91 89859 66940</span>
          </a>

          {/* Admin Login Link */}
          <a
            href="/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-surface-muted hover:text-brand-primary transition-colors px-2 py-1 flex items-center gap-1"
            title="Open Admin Portal"
          >
            <span>Admin</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <button
            onClick={onOpenCreateModal}
            className="bg-brand-primary hover:bg-brand-dark text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-soft-md hover:shadow-soft-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
          >
            <span>Create Invitation</span>
            <Sparkles className="w-3.5 h-3.5 text-theme-wedding" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenCreateModal}
            className="bg-brand-primary text-white px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide"
          >
            Create
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-surface-text hover:text-brand-primary hover:bg-brand-primary/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-brand-border px-6 py-6 space-y-4 shadow-soft-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-surface-text">
            <button 
              onClick={() => scrollTo('templates')} 
              className="text-left py-2 hover:text-brand-primary border-b border-surface-border/40"
            >
              Invitations Catalogue
            </button>
            <button 
              onClick={() => scrollTo('how-it-works')} 
              className="text-left py-2 hover:text-brand-primary border-b border-surface-border/40"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollTo('benefits')} 
              className="text-left py-2 hover:text-brand-primary border-b border-surface-border/40"
            >
              Features & Benefits
            </button>
            <button 
              onClick={() => scrollTo('faq')} 
              className="text-left py-2 hover:text-brand-primary border-b border-surface-border/40"
            >
              Frequently Asked Questions
            </button>
            <button 
              onClick={() => scrollTo('testimonials')} 
              className="text-left py-2 hover:text-brand-primary border-b border-surface-border/40"
            >
              Client Reviews
            </button>
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href="tel:+918985966940"
              className="flex items-center justify-center gap-2 text-xs font-semibold text-brand-primary py-2.5 rounded-xl bg-brand-soft border border-brand-border"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: +91 89859 66940</span>
            </a>

            <div className="flex items-center justify-between px-2 pt-1 text-xs text-surface-muted">
              <a
                href="/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-brand-primary"
              >
                <span>Admin Portal</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span>ahvaanforyou.com</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
