import React from 'react';
import { ABOUT_IMAGE, READING_IMAGE } from '@/data/siteData';

const values = [
  {
    title: 'Literary Excellence',
    description: 'We publish books that challenge, inspire, and endure — works that contribute meaningfully to the literary conversation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A]">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Diverse Voices',
    description: 'We actively seek and champion writers from all backgrounds, believing that the richest stories emerge from the widest range of perspectives.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A]">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Author Partnership',
    description: 'We believe in true collaboration — working alongside our authors at every stage to realize their creative vision with integrity.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A]">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Craft & Beauty',
    description: 'Every book we publish is a physical object of beauty — designed, typeset, and produced with the care and attention it deserves.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A]">
        <path d="M12 19l7-7 3 3-7 7-3-3z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 2l7.586 7.586" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="11" cy="11" r="2"/>
      </svg>
    ),
  },
];

const AboutSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/10">
              <img
                src={ABOUT_IMAGE}
                alt="Twin Flame Ink Office"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#C4935A]/10 rounded-xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-[#C4935A]/20 rounded-xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <span className="text-[#C4935A] text-sm font-medium tracking-[0.3em] uppercase">Our Story</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2C2C] dark:text-white mt-3 leading-tight">
              Two Flames,<br />
              <span className="text-[#C4935A]">One Vision</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#C4935A] mt-5" />

            <div className="mt-8 space-y-5 text-[#2C2C2C]/70 dark:text-white/70 leading-relaxed">
              <p>
                Twin Flame Ink was born from a simple belief: that every extraordinary story 
                deserves a home where it can burn brightly. Founded in 2024 by two lifelong 
                friends with a shared passion for literature, we set out to create a publishing 
                house that honors both the art of writing and the craft of bookmaking.
              </p>
              <p>
                Our name reflects our philosophy — the twin flames of creativity and craft, 
                writer and editor, story and reader. We believe that the best books emerge 
                from the spark between these forces, and our role is to nurture that flame 
                until it illuminates the world.
              </p>
              <p>
                Today, Twin Flame Ink publishes literary fiction, contemporary novels, 
                mystery and thriller, and poetry — always seeking voices that challenge, 
                surprise, and move us. We are proudly independent, fiercely editorial, 
                and deeply committed to the writers and readers who make this work possible.
              </p>
            </div>

            <button
              onClick={() => scrollTo('#contact')}
              className="mt-8 group flex items-center gap-2 px-6 py-3 bg-[#C4935A] hover:bg-[#B38349] text-white font-medium rounded-md transition-all hover:shadow-lg hover:shadow-[#C4935A]/25"
            >
              Work With Us
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <span className="text-[#C4935A] text-sm font-medium tracking-[0.3em] uppercase">Our Values</span>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2C2C] dark:text-white mt-3">
            What Guides Us
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="group p-6 rounded-xl border border-[#C4935A]/10 hover:border-[#C4935A]/30 hover:bg-[#C4935A]/3 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-[#C4935A]/10 flex items-center justify-center mb-4 group-hover:bg-[#C4935A]/15 transition-colors">
                {value.icon}
              </div>
              <h4 className="font-serif text-lg font-semibold text-[#2C2C2C] dark:text-white mb-2">{value.title}</h4>
              <p className="text-sm text-[#2C2C2C]/60 dark:text-white/60 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Quote Banner */}
        <div className="mt-24 relative rounded-2xl overflow-hidden">
          <img src={READING_IMAGE} alt="Reading" className="w-full h-64 md:h-80 object-cover" />
          <div className="absolute inset-0 bg-[#2C2C2C]/80 flex items-center justify-center px-8">
            <div className="text-center max-w-3xl">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4 text-[#C4935A]/60">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" fill="currentColor"/>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor"/>
              </svg>
              <blockquote className="font-serif text-2xl md:text-3xl text-white italic leading-relaxed">
                "A book is a dream that you hold in your hand. Our mission is to make those dreams real."
              </blockquote>
              <p className="text-[#D4A574] mt-4 font-medium">— Twin Flame Ink, Founding Manifesto</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
