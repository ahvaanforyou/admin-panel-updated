import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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

        {/* Dedicated About Section */}
        <div className="rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden bg-white my-4">
          <AboutSection />
        </div>

        {/* Call to action card */}
        <div className="my-12 p-8 sm:p-12 rounded-3xl bg-[#351410] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to celebrate with your dream invite?
            </h3>
            <p className="text-stone-300 text-sm max-w-md">
              Let our monkey gang turn your wedding or celebration into an unforgettable digital experience.
            </p>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="px-8 py-3.5 rounded-full bg-white text-[#351410] font-bold text-sm hover:bg-stone-100 transition-colors flex items-center gap-2 flex-shrink-0 shadow-md"
          >
            <span>Create Your Invitation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </main>

      <Footer
        onCategoryClick={() => onNavigate('/#carousel')}
        onCreateClick={onOpenCreateModal}
      />
    </div>
  );
}
