import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenCreateModal, currentPath = '/', onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHowItWorks = currentPath === '/howitworks' || currentPath === '/how-it-works';
  const isBlogs = currentPath === '/blogs' || currentPath === '/blog' || currentPath.startsWith('/blogs/') || currentPath.startsWith('/blog/');
  const isInvitations = currentPath === '/invitations' || currentPath === '/templates';
  const isAbout = currentPath === '/about';
  const isHome = !isHowItWorks && !isBlogs && !isInvitations && !isAbout && (!currentPath || currentPath === '/' || currentPath === '/#home');
  const isSubpage = isHowItWorks || isBlogs || isInvitations || isAbout;

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);

    if (target === 'invitations') {
      if (onNavigate) {
        onNavigate('/invitations');
      } else {
        window.history.pushState(null, '', '/invitations');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    if (target === 'about') {
      if (onNavigate) {
        onNavigate('/about');
      } else {
        window.history.pushState(null, '', '/about');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    if (target === 'howitworks') {
      if (onNavigate) {
        onNavigate('/howitworks');
      } else {
        window.history.pushState(null, '', '/howitworks');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    if (target === 'blogs') {
      if (onNavigate) {
        onNavigate('/blogs');
      } else {
        window.history.pushState(null, '', '/blogs');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    if (target === 'home') {
      if (isSubpage) {
        if (onNavigate) {
          onNavigate('/');
        } else {
          window.history.pushState(null, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Anchor links (templates, carousel, moments, faq)
    if (isSubpage) {
      if (onNavigate) {
        onNavigate('/#' + target);
      } else {
        window.history.pushState(null, '', '/#' + target);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(target);
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { offset: -90 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
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
            : '0 10px 30px -10px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - High Resolution Official Ahvaan for You Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <img
              src="/images/logo/ahvaan-nav-logo.png"
              alt="Ahvaan for You"
              className="h-8 sm:h-9.5 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Center Navigation Links - Exactly matching Reference */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-stone-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-all pb-0.5 ${
                isHome
                  ? 'font-bold text-stone-900 border-b-2 border-stone-900'
                  : 'font-medium text-stone-700 hover:text-brand-primary border-b-2 border-transparent hover:border-brand-primary'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('invitations')}
              className={`transition-all pb-0.5 ${
                isInvitations
                  ? 'font-bold text-stone-900 border-b-2 border-stone-900'
                  : 'font-medium text-stone-700 hover:text-brand-primary border-b-2 border-transparent hover:border-brand-primary'
              }`}
            >
              Invitations
            </button>

            <button
              onClick={() => handleNavClick('howitworks')}
              className={`transition-all pb-0.5 ${
                isHowItWorks
                  ? 'font-bold text-stone-900 border-b-2 border-stone-900'
                  : 'font-medium text-stone-700 hover:text-brand-primary border-b-2 border-transparent hover:border-brand-primary'
              }`}
            >
              How It Works
            </button>

            <button
              onClick={() => handleNavClick('blogs')}
              className={`transition-all pb-0.5 ${
                isBlogs
                  ? 'font-bold text-stone-900 border-b-2 border-stone-900'
                  : 'font-medium text-stone-700 hover:text-brand-primary border-b-2 border-transparent hover:border-brand-primary'
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`transition-all pb-0.5 ${
                isAbout
                  ? 'font-bold text-stone-900 border-b-2 border-stone-900'
                  : 'font-medium text-stone-700 hover:text-brand-primary border-b-2 border-transparent hover:border-brand-primary'
              }`}
            >
              About
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
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-1 ${isHome ? 'text-brand-primary font-bold' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('invitations')} 
              className={`text-left py-1 ${isInvitations ? 'text-brand-primary font-bold' : ''}`}
            >
              Invitations
            </button>
            <button
              onClick={() => handleNavClick('howitworks')}
              className={`text-left py-1 ${isHowItWorks ? 'text-brand-primary font-bold' : ''}`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('blogs')}
              className={`text-left py-1 ${isBlogs ? 'text-brand-primary font-bold' : ''}`}
            >
              Blog
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className={`text-left py-1 ${isAbout ? 'text-brand-primary font-bold' : ''}`}
            >
              About
            </button>
            <a
              href="/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left py-1 text-stone-500"
            >
              Admin Portal →
            </a>
          </div>
        )}
      </header>
    </div>
  );
}
