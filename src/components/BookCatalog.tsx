import React, { useState, useMemo, useRef, useEffect } from 'react';
import { books, genres, type Book } from '@/data/siteData';
import { useCart } from '@/contexts/CartContext';

const BookCard: React.FC<{ book: Book; onSelect: (book: Book) => void; onAddToCart: (book: Book) => void; index: number }> = ({ book, onSelect, onAddToCart, index }) => {
  const [visible, setVisible] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(book);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div
      ref={ref}
      className={`group cursor-pointer transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${(index % 5) * 100}ms` }}
      onClick={() => onSelect(book)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl hover:shadow-[#C4935A]/10 transition-all duration-500">
        <div className="aspect-[2/3] overflow-hidden bg-[#f5f0eb]">
          <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/95 via-[#1a1a1a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
          <p className="text-white/80 text-xs leading-relaxed line-clamp-2 mb-3">{book.synopsis}</p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#D4A574] font-semibold">${book.price.toFixed(2)}</span>
            <span className="text-white/60 text-xs">{book.pages} pages</span>
          </div>
          <button
            onClick={handleAdd}
            className={`w-full py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              justAdded
                ? 'bg-green-500 text-white'
                : 'bg-[#C4935A] hover:bg-[#B38349] text-white'
            }`}
          >
            {justAdded ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
        {book.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-[#C4935A] text-white text-xs font-medium tracking-wider uppercase rounded">
            Featured
          </div>
        )}
      </div>
      <div className="mt-4 px-1">
        <h3 className="font-serif text-lg font-semibold text-[#2C2C2C] dark:text-white leading-tight group-hover:text-[#C4935A] transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-[#2C2C2C]/60 dark:text-white/60 mt-1">{book.author}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#C4935A]/10 text-[#C4935A] font-medium">{book.genre}</span>
            <span className="text-xs text-[#2C2C2C]/40 dark:text-white/40">{book.year}</span>
          </div>
          <span className="text-sm font-semibold text-[#C4935A]">${book.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

const BookModal: React.FC<{ book: Book | null; onClose: () => void; onAddToCart: (book: Book, qty: number) => void }> = ({ book, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!book) return null;

  const handleAdd = () => {
    onAddToCart(book, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#2C2C2C] dark:text-white">
            <path d="M14 4L4 14M4 4l10 10" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-3 py-1 rounded-full bg-[#C4935A]/10 text-[#C4935A] font-medium">{book.genre}</span>
              {book.featured && (
                <span className="text-xs px-3 py-1 rounded-full bg-[#C4935A] text-white font-medium">Featured</span>
              )}
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#2C2C2C] dark:text-white mb-2">{book.title}</h2>
            <p className="text-[#C4935A] font-medium mb-4">by {book.author}</p>
            <p className="text-[#2C2C2C]/70 dark:text-white/70 leading-relaxed mb-6">{book.synopsis}</p>

            <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-[#C4935A]/15">
              <div>
                <div className="text-xs text-[#2C2C2C]/50 dark:text-white/50 uppercase tracking-wider">Pages</div>
                <div className="font-semibold text-[#2C2C2C] dark:text-white mt-1">{book.pages}</div>
              </div>
              <div>
                <div className="text-xs text-[#2C2C2C]/50 dark:text-white/50 uppercase tracking-wider">Year</div>
                <div className="font-semibold text-[#2C2C2C] dark:text-white mt-1">{book.year}</div>
              </div>
              <div>
                <div className="text-xs text-[#2C2C2C]/50 dark:text-white/50 uppercase tracking-wider">ISBN</div>
                <div className="font-semibold text-[#2C2C2C] dark:text-white mt-1 text-sm">{book.isbn}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-2xl font-serif font-bold text-[#C4935A]">${book.price.toFixed(2)}</div>
              {/* Free shipping badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" rx="2" ry="2"/>
                  <path d="M16 8h4l3 3v5h-7V8z"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                Free Shipping
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#C4935A]/20 rounded-md overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#2C2C2C]/60 dark:text-white/60 hover:bg-[#C4935A]/10 hover:text-[#C4935A] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" strokeLinecap="round"/>
                  </svg>
                </button>
                <span className="w-12 h-10 flex items-center justify-center text-sm font-semibold text-[#2C2C2C] dark:text-white bg-white dark:bg-[#1a1a1a] border-x border-[#C4935A]/20">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#2C2C2C]/60 dark:text-white/60 hover:bg-[#C4935A]/10 hover:text-[#C4935A] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 px-6 py-3 font-medium rounded-md transition-all duration-300 flex items-center justify-center gap-2 ${
                  justAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-[#C4935A] hover:bg-[#B38349] text-white hover:shadow-lg hover:shadow-[#C4935A]/25'
                }`}
              >
                {justAdded ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>

              <button className="p-3 border border-[#C4935A]/30 hover:border-[#C4935A] rounded-md transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#C4935A]">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookCatalog: React.FC = () => {
  const [activeGenre, setActiveGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'price'>('title');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (book: Book, qty = 1) => {
    addToCart({
      product_id: String(book.id),
      name: book.title,
      sku: book.isbn,
      price: Math.round(book.price * 100), // convert to cents
      image: book.cover,
      author: book.author,
    }, qty);
  };

  const filteredBooks = useMemo(() => {
    let result = [...books];
    if (activeGenre !== 'All') {
      result = result.filter((b) => b.genre === activeGenre);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.genre.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'year') return b.year - a.year;
      return a.price - b.price;
    });
    return result;
  }, [activeGenre, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#C4935A] text-sm font-medium tracking-[0.3em] uppercase">Our Collection</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2C2C] dark:text-white mt-3">
            The Catalog
          </h2>
          <div className="w-16 h-0.5 bg-[#C4935A] mx-auto mt-5" />
          <p className="max-w-2xl mx-auto text-[#2C2C2C]/60 dark:text-white/60 mt-5 text-lg">
            Discover our curated collection of literary fiction, contemporary novels, 
            gripping thrillers, and luminous poetry.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeGenre === genre
                    ? 'bg-[#C4935A] text-white shadow-md shadow-[#C4935A]/25'
                    : 'bg-[#C4935A]/8 text-[#2C2C2C]/70 dark:text-white/70 hover:bg-[#C4935A]/15 hover:text-[#C4935A]'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40 dark:text-white/40">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search titles, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#C4935A]/20 bg-white dark:bg-[#1a1a1a] text-[#2C2C2C] dark:text-white placeholder:text-[#2C2C2C]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#C4935A] focus:ring-1 focus:ring-[#C4935A]/30 transition-all text-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'title' | 'year' | 'price')}
              className="px-4 py-2.5 rounded-lg border border-[#C4935A]/20 bg-white dark:bg-[#1a1a1a] text-[#2C2C2C] dark:text-white text-sm focus:outline-none focus:border-[#C4935A] focus:ring-1 focus:ring-[#C4935A]/30 transition-all cursor-pointer"
            >
              <option value="title">Sort by Title</option>
              <option value="year">Sort by Year</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>

        <div className="mb-8 text-sm text-[#2C2C2C]/50 dark:text-white/50">
          Showing {filteredBooks.length} of {books.length} titles
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
            {filteredBooks.map((book, i) => (
              <BookCard key={book.id} book={book} onSelect={setSelectedBook} onAddToCart={handleAddToCart} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-[#C4935A]/40 mb-4">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-[#2C2C2C]/50 dark:text-white/50 text-lg">No books match your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveGenre('All'); }}
              className="mt-4 text-[#C4935A] hover:text-[#B38349] font-medium text-sm transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {selectedBook && <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} onAddToCart={handleAddToCart} />}
    </section>
  );
};

export default BookCatalog;
