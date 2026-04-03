import React, { useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote: "Twin Flame Ink represents the future of independent publishing — fiercely literary, beautifully designed, and deeply committed to the art of storytelling.",
    source: "The New York Times Book Review",
    type: "press",
  },
  {
    id: 2,
    quote: "Working with Twin Flame Ink transformed my manuscript into something I never imagined possible. Their editorial vision is extraordinary.",
    source: "Marguerite Ashford",
    subtitle: "Author, The Ember Chronology",
    type: "author",
  },
  {
    id: 3,
    quote: "Every book from Twin Flame Ink is a masterclass in design and editorial craft. They've set a new standard for what independent publishing can achieve.",
    source: "Publishers Weekly",
    type: "press",
  },
  {
    id: 4,
    quote: "The care and attention they bring to every stage of the publishing process is unlike anything I've experienced. They truly honor the writer's voice.",
    source: "Elena Vasquez",
    subtitle: "Author, Tidal Psalms",
    type: "author",
  },
  {
    id: 5,
    quote: "A boutique publisher with the reach and ambition of a major house. Twin Flame Ink is one to watch.",
    source: "Literary Hub",
    type: "press",
  },
];

const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const active = testimonials[activeIndex];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#C4935A] text-sm font-medium tracking-[0.3em] uppercase">Praise</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2C2C] dark:text-white mt-3">
            What They're Saying
          </h2>
          <div className="w-16 h-0.5 bg-[#C4935A] mx-auto mt-5" />
        </div>

        <div className="relative">
          {/* Quote */}
          <div className="text-center min-h-[200px] flex flex-col items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto mb-6 text-[#C4935A]/20">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" fill="currentColor"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor"/>
            </svg>

            <blockquote className="font-serif text-2xl md:text-3xl text-[#2C2C2C] dark:text-white italic leading-relaxed max-w-3xl transition-all duration-500">
              "{active.quote}"
            </blockquote>

            <div className="mt-6">
              <div className="font-semibold text-[#C4935A]">{active.source}</div>
              {active.subtitle && (
                <div className="text-sm text-[#2C2C2C]/50 dark:text-white/50 mt-1">{active.subtitle}</div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#C4935A]/20 hover:border-[#C4935A] flex items-center justify-center transition-all hover:bg-[#C4935A]/5 group"
              aria-label="Previous testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-[#2C2C2C]/40 dark:text-white/40 group-hover:text-[#C4935A] transition-colors">
                <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? 'w-8 h-2 bg-[#C4935A]'
                      : 'w-2 h-2 bg-[#C4935A]/20 hover:bg-[#C4935A]/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#C4935A]/20 hover:border-[#C4935A] flex items-center justify-center transition-all hover:bg-[#C4935A]/5 group"
              aria-label="Next testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-[#2C2C2C]/40 dark:text-white/40 group-hover:text-[#C4935A] transition-colors">
                <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Press Logos */}
        <div className="mt-20 pt-12 border-t border-[#C4935A]/10">
          <p className="text-center text-xs text-[#2C2C2C]/40 dark:text-white/40 tracking-widest uppercase mb-8">As Featured In</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {['The New York Times', 'Publishers Weekly', 'Literary Hub', 'The Paris Review', 'Kirkus Reviews'].map((name) => (
              <div key={name} className="text-[#2C2C2C]/25 dark:text-white/25 font-serif text-lg md:text-xl font-bold hover:text-[#C4935A]/50 transition-colors cursor-default">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
