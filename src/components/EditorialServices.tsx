import React, { useState } from 'react';
import { services } from '@/data/siteData';

const iconMap: Record<string, React.ReactNode> = {
  pen: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A]">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  palette: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A]">
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  megaphone: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A]">
      <path d="M3 11l18-5v12L3 13v-2z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  globe: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A]">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
};

const processSteps = [
  { step: '01', title: 'Submit', desc: 'Send us your manuscript through our online portal during open submission windows.' },
  { step: '02', title: 'Review', desc: 'Our editorial team carefully reads every submission, providing feedback within 8-12 weeks.' },
  { step: '03', title: 'Develop', desc: 'Selected manuscripts undergo rigorous developmental editing with our expert editors.' },
  { step: '04', title: 'Publish', desc: 'From design to distribution, we bring your book to readers worldwide with care and craft.' },
];

const EditorialServices: React.FC = () => {
  const [activeService, setActiveService] = useState(0);

  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#C4935A] text-sm font-medium tracking-[0.3em] uppercase">What We Do</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2C2C] dark:text-white mt-3">
            Editorial Services
          </h2>
          <div className="w-16 h-0.5 bg-[#C4935A] mx-auto mt-5" />
          <p className="max-w-2xl mx-auto text-[#2C2C2C]/60 dark:text-white/60 mt-5 text-lg">
            From manuscript to masterpiece — our comprehensive publishing services 
            guide every book from first draft to final shelf.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {services.map((service, i) => (
            <div
              key={service.id}
              onClick={() => setActiveService(i)}
              className={`group cursor-pointer p-8 rounded-xl border transition-all duration-500 ${
                activeService === i
                  ? 'border-[#C4935A] bg-[#C4935A]/5 shadow-lg shadow-[#C4935A]/10'
                  : 'border-[#C4935A]/10 hover:border-[#C4935A]/30 hover:bg-[#C4935A]/3'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                activeService === i ? 'bg-[#C4935A]/15' : 'bg-[#C4935A]/8 group-hover:bg-[#C4935A]/12'
              }`}>
                {iconMap[service.icon]}
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#2C2C2C] dark:text-white mb-3">{service.title}</h3>
              <p className="text-sm text-[#2C2C2C]/60 dark:text-white/60 leading-relaxed mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#2C2C2C]/70 dark:text-white/70">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C4935A] flex-shrink-0">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Publishing Process */}
        <div className="relative">
          <div className="text-center mb-12">
            <span className="text-[#C4935A] text-sm font-medium tracking-[0.3em] uppercase">Our Process</span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2C2C] dark:text-white mt-3">
              From Manuscript to Masterpiece
            </h3>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#C4935A]/20 via-[#C4935A]/40 to-[#C4935A]/20" />

            {processSteps.map((step, i) => (
              <div key={step.step} className="relative text-center group">
                <div className="relative z-10 w-24 h-24 mx-auto rounded-full border-2 border-[#C4935A]/30 bg-white dark:bg-[#1a1a1a] flex items-center justify-center mb-5 group-hover:border-[#C4935A] group-hover:shadow-lg group-hover:shadow-[#C4935A]/15 transition-all duration-500">
                  <span className="font-serif text-2xl font-bold text-[#C4935A]">{step.step}</span>
                </div>
                <h4 className="font-serif text-xl font-semibold text-[#2C2C2C] dark:text-white mb-2">{step.title}</h4>
                <p className="text-sm text-[#2C2C2C]/60 dark:text-white/60 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialServices;
