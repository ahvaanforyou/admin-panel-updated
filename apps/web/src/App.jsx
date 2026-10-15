import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import OccasionCarousel from './components/Carousel/OccasionCarousel';
import Categories from './components/Categories/Categories';
import TemplateShowcase from './components/Templates/TemplateShowcase';
import TemplatePreviewModal from './components/Preview/TemplatePreviewModal';
import FAQ from './components/FAQ/FAQ';
import Moments from './components/Moments/Moments';
import CreateModal from './components/CreateModal/CreateModal';
import Footer from './components/Footer/Footer';
import HowItWorksPage from './pages/HowItWorks/HowItWorksPage';
import BlogsPage from './pages/Blogs/BlogsPage';
import InvitationsPage from './pages/Invitations/InvitationsPage';
import AboutPage from './pages/About/AboutPage';
import { useLenis } from './hooks/useLenis';
import { TEMPLATES } from './data/content';

export default function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  // URL Path Routing
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    const [pathname, hash] = path.split('#');
    window.history.pushState(null, '', path);
    setCurrentPath(pathname || '/');
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -80 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [preSelectedTemplate, setPreSelectedTemplate] = useState(null);

  // Quick preview trigger by ID
  const handleQuickPreview = (templateId) => {
    const tpl = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
    setPreviewTemplate(tpl);
  };

  // Preview click on template card
  const handleOpenPreview = (template) => {
    setPreviewTemplate(template);
  };

  // Create action from template card or preview modal
  const handleStartCreation = (template, keepPreviewing = false) => {
    if (keepPreviewing) {
      setPreviewTemplate(template);
      return;
    }
    setPreviewTemplate(null);
    setPreSelectedTemplate(template);
    setCreateModalOpen(true);
  };

  const handleOpenGeneralCreate = () => {
    setPreSelectedTemplate(null);
    setCreateModalOpen(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectCategoryFromBanner = (catId) => {
    setSelectedCategory(catId);
    scrollToSection('templates');
  };

  const isHowItWorks = currentPath === '/howitworks' || currentPath === '/how-it-works';
  const isBlogs = currentPath === '/blogs' || currentPath === '/blog' || currentPath.startsWith('/blogs/') || currentPath.startsWith('/blog/');
  const isInvitations = currentPath === '/invitations' || currentPath === '/templates' || currentPath.startsWith('/invitation');
  const isAbout = currentPath === '/about';

  return (
    <div className="min-h-screen flex flex-col bg-white text-surface-text selection:bg-[#4E1D1D] selection:text-white">
      
      {/* 1. Floating Middle Pill Navbar with Sticky Glass Effect */}
      <Navbar
        onOpenCreateModal={handleOpenGeneralCreate}
        currentPath={currentPath}
        onNavigate={navigate}
      />

      {isBlogs ? (
        /* ================= BLOGS / ARTICLES PAGE ================= */
        <BlogsPage
          onNavigate={navigate}
          onOpenCreateModal={handleOpenGeneralCreate}
        />
      ) : isHowItWorks ? (
        /* ================= HOW IT WORKS PAGE ================= */
        <HowItWorksPage
          onNavigate={navigate}
          onOpenCreateModal={handleOpenGeneralCreate}
        />
      ) : isInvitations ? (
        /* ================= DEDICATED INVITATIONS PAGE ================= */
        <InvitationsPage
          onNavigate={navigate}
          onPreviewTemplate={handleOpenPreview}
          onCreateTemplate={(tpl) => handleStartCreation(tpl, false)}
        />
      ) : isAbout ? (
        /* ================= ABOUT US PAGE ================= */
        <AboutPage
          onNavigate={navigate}
          onOpenCreateModal={handleOpenGeneralCreate}
        />
      ) : (
        /* ================= HOME LANDING PAGE ================= */
        <>
          {/* 2. Hero Section Matching Image 1 (Swirl line, stroke 'unforgettable', exact geometric grid) */}
          <Hero onCreateClick={handleOpenGeneralCreate} />

          {/* 3. Second Section: Occasion Carousel with Fast Wheel Movement */}
          <OccasionCarousel onSelectTemplate={handleSelectCategoryFromBanner} />

          {/* 4. Filterable Template Catalog */}
          <TemplateShowcase
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onPreviewTemplate={handleOpenPreview}
            onCreateTemplate={(tpl) => handleStartCreation(tpl, false)}
          />

          {/* 5. Frequently Asked Questions (Accordion) */}
          <FAQ />

          {/* 6. Client Moments & Reviews Glass Cards */}
          <Moments />

          {/* 7. Site Footer with brand, categories, social & admin link */}
          <Footer
            onCategoryClick={handleSelectCategoryFromBanner}
            onCreateClick={handleOpenGeneralCreate}
          />
        </>
      )}

      {/* Interactive Mobile Mockup Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onSelectForCreation={handleStartCreation}
        />
      )}

      {/* Lead/Client Creation & Enquiry Modal */}
      <CreateModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        preSelectedTemplate={preSelectedTemplate}
      />

    </div>
  );
}
