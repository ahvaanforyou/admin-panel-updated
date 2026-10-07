import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenCreateModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -100 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none transition-all duration-500">
      <header
        className={`pointer-events-auto w-full max-w-4xl rounded-full transition-all duration-500 border ${
          isScrolled
            ? 'bg-white/70 backdrop-blur-xl shadow-lg border-white/60 py-2.5 px-5 sm:px-7 scale-[0.98]'
            : 'bg-white/85 backdrop-blur-md shadow-md border-stone-200/60 py-3 px-6 sm:px-8'
        }`}
        style={{
          boxShadow: isScrolled
            ? '0 20px 40px -15px rgba(78, 29, 29, 0.12), 0 0 1px 1px rgba(255, 255, 255, 0.9) inset'
            : '0 10px 30px -10px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - EXACT Ahvaan Serif from Reference Image */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div className="flex flex-col items-center">
              <span className="font-editorial text-xl sm:text-2xl font-bold tracking-[0.22em] text-[#8C6D46] uppercase leading-none">
                AHVAAN
              </span>
              <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.4em] text-[#8C6D46]/70 uppercase mt-0.5">
                FOR YOU
              </span>
            </div>
          </a>

          {/* Center Navigation Links - EXACT Underline & Styling */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-stone-700">
            <button
              onClick={() => scrollTo('hero')}
              className="font-bold text-stone-900 border-b-2 border-stone-900 pb-0.5 transition-all"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('templates')}
              className="hover:text-brand-primary transition-colors pb-0.5 border-b-2 border-transparent hover:border-brand-primary"
            >
              Invitations
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="hover:text-brand-primary transition-colors pb-0.5 border-b-2 border-transparent hover:border-brand-primary"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('carousel')}
              className="hover:text-brand-primary transition-colors pb-0.5 border-b-2 border-transparent hover:border-brand-primary"
            >
              Blog
            </button>
            <button
              onClick={() => scrollTo('benefits')}
              className="hover:text-brand-primary transition-colors pb-0.5 border-b-2 border-transparent hover:border-brand-primary"
            >
              About
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="hover:text-brand-primary transition-colors pb-0.5 border-b-2 border-transparent hover:border-brand-primary"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action: Pill Button 'Create Your Invitation ->' */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenCreateModal}
              className="bg-[#4E1D1D] hover:bg-[#3A1414] text-white px-5 sm:px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Create Your Invitation</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCreateModal}
              className="bg-[#4E1D1D] text-white px-3 py-1.5 rounded-full text-[11px] font-semibold"
            >
              Create
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-stone-700 hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-stone-200/80 flex flex-col gap-3 text-xs font-semibold text-stone-800 pb-2">
            <button onClick={() => scrollTo('hero')} className="text-left py-1 text-brand-primary">Home</button>
            <button onClick={() => scrollTo('templates')} className="text-left py-1">Invitations</button>
            <button onClick={() => scrollTo('how-it-works')} className="text-left py-1">How It Works</button>
            <button onClick={() => scrollTo('carousel')} className="text-left py-1">Special Moments</button>
            <button onClick={() => scrollTo('benefits')} className="text-left py-1">About</button>
            <button onClick={() => scrollTo('faq')} className="text-left py-1">FAQ</button>
            <a href="/admin" target="_blank" rel="noopener noreferrer" className="text-left py-1 text-stone-500">
              Admin Portal →
            </a>
          </div>
        )}
      </header>
    </div>
  );
}
