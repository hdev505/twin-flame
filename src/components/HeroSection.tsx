import React from 'react';
import { HERO_IMAGE } from '@/data/siteData';

const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Twin Flame Ink Publishing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/70 via-[#2C2C2C]/60 to-[#1a1a1a]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/50 via-transparent to-[#1a1a1a]/30" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#C4935A]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C4935A]/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tagline */}
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#C4935A]/40 bg-[#C4935A]/10 backdrop-blur-sm mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4A574] animate-pulse" />
            <span className="text-[#D4A574] text-sm font-medium tracking-widest uppercase">
              Est. 2024 — Independent Publishing
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="animate-fade-in-up font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6">
          Where Stories
          <br />
          <span className="text-[#D4A574]">Find Their</span>
          <br />
          <span className="italic font-normal">Flame</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-delayed max-w-2xl mx-auto text-lg sm:text-xl text-white/70 font-light leading-relaxed mb-10">
          Twin Flame Ink is an independent publishing house dedicated to amplifying 
          extraordinary voices and crafting books that illuminate the human experience.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-delayed flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('#catalog')}
            className="group px-8 py-4 bg-[#C4935A] hover:bg-[#B38349] text-white font-medium tracking-wide rounded-md transition-all duration-300 hover:shadow-xl hover:shadow-[#C4935A]/30 flex items-center gap-2"
          >
            Explore Our Catalog
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-4 border border-white/30 hover:border-white/60 text-white font-medium tracking-wide rounded-md transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
          >
            Submit Your Manuscript
          </button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { number: '15+', label: 'Published Titles' },
            { number: '8', label: 'Award-Winning Authors' },
            { number: '23', label: 'Languages' },
            { number: '50K+', label: 'Readers Worldwide' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#D4A574]">{stat.number}</div>
              <div className="text-white/50 text-sm mt-1 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollTo('#catalog')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-bounce">
          <path d="M10 4v12M6 12l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  );
};

export default HeroSection;
