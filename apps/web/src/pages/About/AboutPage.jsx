import React from 'react';
import { ArrowLeft } from 'lucide-react';
import AboutSection from '../../components/About/AboutSection';
import Footer from '../../components/Footer/Footer';

export default function AboutPage({ onNavigate, onOpenCreateModal }) {
  return (
    <div className="min-h-screen bg-white pt-24 sm:pt-28 flex flex-col justify-between text-[#1F1F1F]">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 select-text">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-4 text-xs text-stone-500">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-stone-700 hover:text-[#4E1D1D] font-semibold transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Completely Borderless About Section */}
        <AboutSection />

      </main>

      <Footer
        onCategoryClick={() => onNavigate('/#carousel')}
        onCreateClick={onOpenCreateModal}
      />
    </div>
  );
}
