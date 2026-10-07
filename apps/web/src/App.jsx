import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Categories from './components/Categories/Categories';
import TemplateShowcase from './components/Templates/TemplateShowcase';
import TemplatePreviewModal from './components/Preview/TemplatePreviewModal';
import WhyDigital from './components/WhyDigital/WhyDigital';
import HowItWorks from './components/HowItWorks/HowItWorks';
import FAQ from './components/FAQ/FAQ';
import Testimonials from './components/Testimonials/Testimonials';
import CreateModal from './components/CreateModal/CreateModal';
import Footer from './components/Footer/Footer';
import { useLenis } from './hooks/useLenis';
import { TEMPLATES } from './data/content';

export default function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  // State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [preSelectedTemplate, setPreSelectedTemplate] = useState(null);

  // Quick preview trigger by ID (from Hero mockup)
  const handleQuickPreview = (templateId) => {
    const tpl = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];
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
        window.__lenis.scrollTo(el, { offset: -60 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectCategoryFromBanner = (catId) => {
    setSelectedCategory(catId);
    scrollToSection('templates');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F6] text-surface-text">
      
      {/* 1. Header Navigation */}
      <Navbar onOpenCreateModal={handleOpenGeneralCreate} />

      {/* 2. Hero Section with stroke handwriting animation & mobile mockup */}
      <Hero
        onExploreClick={() => scrollToSection('templates')}
        onCreateClick={handleOpenGeneralCreate}
        onPreviewQuick={handleQuickPreview}
      />

      {/* 3. Celebration Categories (Wedding, Baby Shower, Birthday, Housewarming) */}
      <Categories
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategoryFromBanner}
      />

      {/* 4. Filterable Template Catalog */}
      <TemplateShowcase
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onPreviewTemplate={handleOpenPreview}
        onCreateTemplate={(tpl) => handleStartCreation(tpl, false)}
      />

      {/* 5. Features & Benefits (Why Digital Invitations?) */}
      <WhyDigital />

      {/* 6. Four-Step Process (How It Works) */}
      <HowItWorks onCreateClick={handleOpenGeneralCreate} />

      {/* 7. Client Reviews & Social Proof */}
      <Testimonials />

      {/* 8. Frequently Asked Questions (Accordion) */}
      <FAQ />

      {/* 9. Site Footer with brand, categories, social & admin link */}
      <Footer 
        onCategoryClick={handleSelectCategoryFromBanner}
        onCreateClick={handleOpenGeneralCreate}
      />

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
