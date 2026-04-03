import React, { useState } from 'react';
import { books, type Book } from '@/data/siteData';
import { useCart } from '@/contexts/CartContext';

const featuredBooks = books.filter((b) => b.featured);

const FeaturedBooks: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const activeBook = featuredBooks[activeIndex];
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      product_id: String(activeBook.id),
      name: activeBook.title,
      sku: activeBook.isbn,
      price: Math.round(activeBook.price * 100),
      image: activeBook.cover,
      author: activeBook.author,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };


  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="py-20 bg-[#2C2C2C] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 25% 50%, #C4935A 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#D4A574] text-sm font-medium tracking-[0.3em] uppercase">Editor's Choice</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-3">Featured This Season</h2>
          <div className="w-16 h-0.5 bg-[#C4935A] mx-auto mt-5" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Book Display */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 md:w-72 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-black/40 transition-all duration-500">
                <img
                  src={activeBook.cover}
                  alt={activeBook.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative shadow book */}
              <div className="absolute -left-4 top-4 w-64 md:w-72 aspect-[2/3] rounded-xl bg-white/5 -z-10 transform -rotate-3" />
              <div className="absolute -right-4 top-8 w-64 md:w-72 aspect-[2/3] rounded-xl bg-white/3 -z-20 transform rotate-2" />
            </div>
          </div>

          {/* Book Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#C4935A]/20 text-[#D4A574] text-xs font-medium">{activeBook.genre}</span>
              <span className="text-white/40 text-sm">{activeBook.year}</span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
              {activeBook.title}
            </h3>
            <p className="text-[#D4A574] font-medium mb-5">by {activeBook.author}</p>
            <p className="text-white/60 leading-relaxed mb-8 text-lg">{activeBook.synopsis}</p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="font-serif text-3xl font-bold text-[#D4A574]">${activeBook.price.toFixed(2)}</span>
              <button
                onClick={handleAddToCart}
                className={`px-6 py-3 font-medium rounded-md transition-all flex items-center gap-2 ${
                  justAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-[#C4935A] hover:bg-[#B38349] text-white hover:shadow-lg hover:shadow-[#C4935A]/25'
                }`}
              >
                {justAdded ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Added!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={() => scrollTo('#catalog')}
                className="px-6 py-3 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-all hover:bg-white/5"
              >
                View in Catalog
              </button>
            </div>


            {/* Thumbnail Selector */}
            <div className="flex gap-3">
              {featuredBooks.map((book, i) => (
                <button
                  key={book.id}
                  onClick={() => setActiveIndex(i)}
                  className={`w-16 h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    i === activeIndex
                      ? 'border-[#C4935A] shadow-lg shadow-[#C4935A]/30 scale-105'
                      : 'border-white/10 opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
