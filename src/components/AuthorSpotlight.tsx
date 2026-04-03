import React, { useState } from 'react';
import { authors, type Author } from '@/data/siteData';

const AuthorCard: React.FC<{ author: Author; onSelect: (a: Author) => void }> = ({ author, onSelect }) => (
  <div
    className="group cursor-pointer"
    onClick={() => onSelect(author)}
  >
    <div className="relative overflow-hidden rounded-xl">
      <div className="aspect-square overflow-hidden bg-[#f5f0eb]">
        <img
          src={author.photo}
          alt={author.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-90"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <div className="flex gap-3">
          {author.social.twitter && (
            <a href={`https://twitter.com/${author.social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
          {author.social.instagram && (
            <a href={`https://instagram.com/${author.social.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none"/>
              </svg>
            </a>
          )}
          {author.social.website && (
            <a href={`https://${author.social.website}`} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
    <div className="mt-4">
      <h3 className="font-serif text-xl font-semibold text-[#2C2C2C] dark:text-white group-hover:text-[#C4935A] transition-colors">
        {author.name}
      </h3>
      <p className="text-sm text-[#2C2C2C]/50 dark:text-white/50 mt-1">
        {author.genres.join(' · ')}
      </p>
      <p className="text-sm text-[#2C2C2C]/60 dark:text-white/60 mt-1">
        {author.books.length > 0 ? `${author.books.length} published title${author.books.length > 1 ? 's' : ''}` : 'Editor-in-Chief'}
      </p>
    </div>
  </div>
);

const AuthorModal: React.FC<{ author: Author | null; onClose: () => void }> = ({ author, onClose }) => {
  if (!author) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in"
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

        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
              <img src={author.photo} alt={author.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#2C2C2C] dark:text-white">{author.name}</h2>
              <p className="text-[#C4935A] font-medium mt-1">{author.genres.join(' · ')}</p>
              <div className="flex gap-3 mt-4">
                {author.social.twitter && (
                  <a href={`https://twitter.com/${author.social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-[#2C2C2C]/60 dark:text-white/60 hover:text-[#C4935A] transition-colors">
                    {author.social.twitter}
                  </a>
                )}
              </div>
            </div>
          </div>

          <p className="text-[#2C2C2C]/70 dark:text-white/70 leading-relaxed mb-6">{author.bio}</p>

          {author.books.length > 0 && (
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#2C2C2C] dark:text-white mb-3">Bibliography</h3>
              <div className="space-y-2">
                {author.books.map((title) => (
                  <div key={title} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#C4935A]/5 hover:bg-[#C4935A]/10 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#C4935A] flex-shrink-0">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[#2C2C2C] dark:text-white font-medium">{title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AuthorSpotlight: React.FC = () => {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  return (
    <section id="authors" className="py-24 bg-[#f9f6f2] dark:bg-[#111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#C4935A] text-sm font-medium tracking-[0.3em] uppercase">Our Writers</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2C2C] dark:text-white mt-3">
            Author Spotlight
          </h2>
          <div className="w-16 h-0.5 bg-[#C4935A] mx-auto mt-5" />
          <p className="max-w-2xl mx-auto text-[#2C2C2C]/60 dark:text-white/60 mt-5 text-lg">
            Meet the extraordinary voices behind our catalog — writers who illuminate 
            the human experience with every word.
          </p>
        </div>

        {/* Author Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} onSelect={setSelectedAuthor} />
          ))}
        </div>
      </div>

      {/* Author Modal */}
      {selectedAuthor && <AuthorModal author={selectedAuthor} onClose={() => setSelectedAuthor(null)} />}
    </section>
  );
};

export default AuthorSpotlight;
