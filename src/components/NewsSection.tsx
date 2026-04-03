import React, { useState } from 'react';
import { blogPosts, type BlogPost } from '@/data/siteData';

const NewsCard: React.FC<{ post: BlogPost; featured?: boolean; onRead: (p: BlogPost) => void }> = ({ post, featured, onRead }) => (
  <article
    className={`group cursor-pointer ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
    onClick={() => onRead(post)}
  >
    <div className={`relative overflow-hidden rounded-xl ${featured ? 'aspect-[16/10]' : 'aspect-[16/10]'}`}>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-[#1a1a1a]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full bg-[#C4935A]/90 text-white text-xs font-medium">{post.category}</span>
          <span className="text-white/60 text-xs">{post.readTime}</span>
        </div>
        <h3 className={`font-serif font-bold text-white leading-tight group-hover:text-[#D4A574] transition-colors ${
          featured ? 'text-2xl md:text-3xl' : 'text-lg'
        }`}>
          {post.title}
        </h3>
        {featured && (
          <p className="text-white/70 mt-3 text-sm leading-relaxed line-clamp-2 hidden md:block">{post.excerpt}</p>
        )}
        <div className="text-white/50 text-xs mt-3">{post.date}</div>
      </div>
    </div>
  </article>
);

const ArticleModal: React.FC<{ post: BlogPost | null; onClose: () => void }> = ({ post, onClose }) => {
  if (!post) return null;

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

        <div className="aspect-[16/9] overflow-hidden rounded-t-xl">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#C4935A]/10 text-[#C4935A] text-xs font-medium">{post.category}</span>
            <span className="text-[#2C2C2C]/40 dark:text-white/40 text-xs">{post.date}</span>
            <span className="text-[#2C2C2C]/40 dark:text-white/40 text-xs">{post.readTime}</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2C2C2C] dark:text-white mb-4">{post.title}</h2>
          <p className="text-[#2C2C2C]/70 dark:text-white/70 leading-relaxed mb-4">{post.excerpt}</p>
          <p className="text-[#2C2C2C]/60 dark:text-white/60 leading-relaxed">
            This is a preview of the full article. The complete story explores the topic in depth, 
            featuring exclusive interviews, behind-the-scenes insights, and expert commentary from 
            the Twin Flame Ink editorial team. Stay tuned for the full publication.
          </p>
          <div className="mt-6 pt-6 border-t border-[#C4935A]/15 flex items-center justify-between">
            <span className="text-sm text-[#2C2C2C]/50 dark:text-white/50">Twin Flame Ink Editorial</span>
            <button className="px-5 py-2 bg-[#C4935A] hover:bg-[#B38349] text-white text-sm font-medium rounded-md transition-all">
              Share Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="news" className="py-24 bg-[#f9f6f2] dark:bg-[#111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-[#C4935A] text-sm font-medium tracking-[0.3em] uppercase">Latest Updates</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2C2C] dark:text-white mt-3">
              News & Insights
            </h2>
            <div className="w-16 h-0.5 bg-[#C4935A] mt-5" />
          </div>
          <button className="mt-6 md:mt-0 group flex items-center gap-2 text-[#C4935A] hover:text-[#B38349] font-medium transition-colors">
            View All Articles
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Featured Article */}
          <NewsCard post={blogPosts[0]} featured onRead={setSelectedPost} />

          {/* Other Articles */}
          <div className="space-y-6">
            {blogPosts.slice(1, 3).map((post) => (
              <NewsCard key={post.id} post={post} onRead={setSelectedPost} />
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {blogPosts.slice(3).map((post) => (
            <NewsCard key={post.id} post={post} onRead={setSelectedPost} />
          ))}
        </div>
      </div>

      {selectedPost && <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </section>
  );
};

export default NewsSection;
