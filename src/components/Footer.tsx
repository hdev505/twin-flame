import React from 'react';

const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <button onClick={scrollToTop} className="flex items-center gap-3 group mb-5">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <path d="M18 4C12 4 8 10 8 16C8 22 12 28 18 32C24 28 28 22 28 16C28 10 24 4 18 4Z" fill="#C4935A" opacity="0.8"/>
                <path d="M18 4C14 4 10 10 10 16C10 22 14 28 18 32" stroke="white" strokeWidth="1.5" fill="none"/>
                <path d="M18 4C22 4 26 10 26 16C26 22 22 28 18 32" stroke="white" strokeWidth="1.5" fill="none"/>
                <circle cx="18" cy="16" r="3" fill="white"/>
              </svg>
              <div>
                <div className="font-serif text-lg font-bold text-white">Twin Flame</div>
                <div className="text-[9px] tracking-[0.35em] uppercase text-[#C4935A]">Ink Publishing</div>
              </div>
            </button>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Independent publishing house dedicated to amplifying extraordinary voices 
              and crafting books that illuminate the human experience.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { label: 'Twitter', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'Instagram', svg: true },
                { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#C4935A]/20 flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  {social.svg ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/50 group-hover:text-[#C4935A] transition-colors">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="5"/>
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/50 group-hover:text-[#C4935A] transition-colors">
                      <path d={social.path} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Catalog', href: '#catalog' },
                { label: 'New Releases', href: '#catalog' },
                { label: 'Bestsellers', href: '#catalog' },
                { label: 'Poetry', href: '#catalog' },
                { label: 'Fiction', href: '#catalog' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/50 hover:text-[#C4935A] text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-white mb-4">Authors</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Our Authors', href: '#authors' },
                { label: 'Submit Manuscript', href: '#contact' },
                { label: 'Author Guidelines', href: '#services' },
                { label: 'Rights & Licensing', href: '#contact' },
                { label: 'Author Events', href: '#news' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/50 hover:text-[#C4935A] text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', href: '#about' },
                { label: 'Our Team', href: '#about' },
                { label: 'News & Press', href: '#news' },
                { label: 'Careers', href: '#contact' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/50 hover:text-[#C4935A] text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-serif font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                'Submission Guidelines',
                'Press Kit',
                'Media Inquiries',
                'Bookseller Info',
                'Foreign Rights',
              ].map((label) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo('#contact')}
                    className="text-white/50 hover:text-[#C4935A] text-sm transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/40 text-sm">
            &copy; {currentYear} Twin Flame Ink Publishing. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <button
                key={link}
                onClick={() => {}}
                className="text-white/40 hover:text-[#C4935A] text-sm transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-[#C4935A] flex items-center justify-center transition-all hover:bg-[#C4935A]/10 group"
            aria-label="Back to top"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-white/40 group-hover:text-[#C4935A] transition-colors">
              <path d="M10 16V4M6 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
