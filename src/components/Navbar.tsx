import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Catalog', href: '#catalog' },
  { label: 'Authors', href: '#authors' },
  { label: 'Services', href: '#services' },
  { label: 'News', href: '#news' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On non-home pages, always show scrolled style
  const isHome = location.pathname === '/';
  const showScrolled = scrolled || !isHome;

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    if (!isHome) {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showScrolled
          ? 'bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={scrollToTop} className="flex items-center gap-3 group">
            <div className="relative">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 4C12 4 8 10 8 16C8 22 12 28 18 32C24 28 28 22 28 16C28 10 24 4 18 4Z" 
                  className={`transition-colors duration-300 ${showScrolled ? 'fill-[#C4935A]' : 'fill-[#D4A574]'}`} opacity="0.8"/>
                <path d="M18 4C14 4 10 10 10 16C10 22 14 28 18 32" 
                  className={`transition-colors duration-300 ${showScrolled ? 'stroke-[#2C2C2C] dark:stroke-white' : 'stroke-white'}`} strokeWidth="1.5" fill="none"/>
                <path d="M18 4C22 4 26 10 26 16C26 22 22 28 18 32" 
                  className={`transition-colors duration-300 ${showScrolled ? 'stroke-[#2C2C2C] dark:stroke-white' : 'stroke-white'}`} strokeWidth="1.5" fill="none"/>
                <circle cx="18" cy="16" r="3" 
                  className={`transition-colors duration-300 ${showScrolled ? 'fill-[#2C2C2C] dark:fill-white' : 'fill-white'}`}/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-xl font-bold tracking-wide leading-tight transition-colors duration-300 ${
                showScrolled ? 'text-[#2C2C2C] dark:text-white' : 'text-white'
              }`}>
                Twin Flame
              </span>
              <span className={`text-[10px] font-sans tracking-[0.35em] uppercase transition-colors duration-300 ${
                showScrolled ? 'text-[#C4935A]' : 'text-[#D4A574]'
              }`}>
                Ink Publishing
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-md hover:bg-black/5 dark:hover:bg-white/10 ${
                  showScrolled
                    ? 'text-[#2C2C2C]/80 dark:text-white/80 hover:text-[#C4935A]'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Cart Button */}
            <button
              onClick={openCart}
              className={`relative ml-2 p-2.5 rounded-md transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/10 ${
                showScrolled ? 'text-[#2C2C2C]/80 dark:text-white/80 hover:text-[#C4935A]' : 'text-white/85 hover:text-white'
              }`}
              aria-label="Open cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#C4935A] text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-fade-in">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('#contact')}
              className="ml-3 px-6 py-2.5 bg-[#C4935A] hover:bg-[#B38349] text-white text-sm font-medium tracking-wide rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-[#C4935A]/25"
            >
              Submit Manuscript
            </button>
          </div>

          {/* Mobile: Cart + Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={openCart}
              className={`relative p-2 rounded-md transition-colors ${showScrolled ? 'text-[#2C2C2C] dark:text-white' : 'text-white'}`}
              aria-label="Open cart"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#C4935A] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`transition-colors duration-300 ${showScrolled ? 'text-[#2C2C2C] dark:text-white' : 'text-white'}`}>
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                ) : (
                  <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/98 dark:bg-[#1a1a1a]/98 backdrop-blur-xl border-t border-[#C4935A]/20 px-4 py-6 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left px-4 py-3 text-[#2C2C2C] dark:text-white/90 hover:text-[#C4935A] hover:bg-[#C4935A]/5 rounded-md text-base font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3">
            <button
              onClick={() => handleNavClick('#contact')}
              className="w-full px-6 py-3 bg-[#C4935A] hover:bg-[#B38349] text-white text-sm font-medium tracking-wide rounded-md transition-all"
            >
              Submit Manuscript
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
