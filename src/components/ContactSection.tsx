import React, { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
};

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubmitted(false), 5000);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="contact" className="py-24 bg-[#f9f6f2] dark:bg-[#111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left Column - Info */}
          <div className="lg:col-span-2">
            <span className="text-[#C4935A] text-sm font-medium tracking-[0.3em] uppercase">Get In Touch</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C2C2C] dark:text-white mt-3 leading-tight">
              Let's Start a<br />
              <span className="text-[#C4935A]">Conversation</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#C4935A] mt-5" />

            <p className="mt-6 text-[#2C2C2C]/70 dark:text-white/70 leading-relaxed">
              Whether you're an author with a manuscript, a reader with a question, or a 
              bookseller interested in carrying our titles, we'd love to hear from you.
            </p>

            {/* Contact Info */}
            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#C4935A]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A]">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#2C2C2C] dark:text-white">Email</div>
                  <div className="text-sm text-[#2C2C2C]/60 dark:text-white/60">hello@twinflameink.com</div>
                  <div className="text-sm text-[#2C2C2C]/60 dark:text-white/60">submissions@twinflameink.com</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#C4935A]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A]">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#2C2C2C] dark:text-white">Office</div>
                  <div className="text-sm text-[#2C2C2C]/60 dark:text-white/60">
                    127 Literary Lane, Suite 400<br />
                    Brooklyn, NY 11201
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#C4935A]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A]">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#2C2C2C] dark:text-white">Submissions</div>
                  <div className="text-sm text-[#2C2C2C]/60 dark:text-white/60">
                    Open submission window:<br />
                    January 15 – March 31, 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Guidelines Box */}
            <div className="mt-10 p-6 rounded-xl border border-[#C4935A]/20 bg-[#C4935A]/5">
              <h4 className="font-serif text-lg font-semibold text-[#2C2C2C] dark:text-white mb-3">Manuscript Submissions</h4>
              <ul className="space-y-2 text-sm text-[#2C2C2C]/70 dark:text-white/70">
                <li className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C4935A] flex-shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Complete manuscript or first 50 pages + synopsis
                </li>
                <li className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C4935A] flex-shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Query letter with author bio
                </li>
                <li className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C4935A] flex-shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Response within 8-12 weeks
                </li>
                <li className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C4935A] flex-shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  We accept simultaneous submissions
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl shadow-black/5 p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#2C2C2C] dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-[#2C2C2C]/60 dark:text-white/60">Thank you for reaching out. We'll get back to you within 2-3 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    {['general', 'submission', 'press', 'rights'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={formData.type === type}
                          onChange={(e) => handleChange('type', e.target.value)}
                          className="w-4 h-4 text-[#C4935A] border-[#C4935A]/30 focus:ring-[#C4935A]"
                        />
                        <span className="text-sm text-[#2C2C2C]/70 dark:text-white/70 capitalize">{type === 'rights' ? 'Rights & Licensing' : type === 'submission' ? 'Manuscript' : type}</span>
                      </label>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] dark:text-white mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border bg-transparent text-[#2C2C2C] dark:text-white placeholder:text-[#2C2C2C]/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 transition-all text-sm ${
                          errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30' : 'border-[#C4935A]/20 focus:border-[#C4935A] focus:ring-[#C4935A]/30'
                        }`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] dark:text-white mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border bg-transparent text-[#2C2C2C] dark:text-white placeholder:text-[#2C2C2C]/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 transition-all text-sm ${
                          errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30' : 'border-[#C4935A]/20 focus:border-[#C4935A] focus:ring-[#C4935A]/30'
                        }`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] dark:text-white mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border bg-transparent text-[#2C2C2C] dark:text-white placeholder:text-[#2C2C2C]/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 transition-all text-sm ${
                        errors.subject ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30' : 'border-[#C4935A]/20 focus:border-[#C4935A] focus:ring-[#C4935A]/30'
                      }`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] dark:text-white mb-1.5">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border bg-transparent text-[#2C2C2C] dark:text-white placeholder:text-[#2C2C2C]/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 transition-all text-sm resize-none ${
                        errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30' : 'border-[#C4935A]/20 focus:border-[#C4935A] focus:ring-[#C4935A]/30'
                      }`}
                      placeholder="Tell us about your project, question, or inquiry..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-[#C4935A] hover:bg-[#B38349] text-white font-medium tracking-wide rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#C4935A]/25"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Newsletter */}
            <div className="mt-8 p-8 rounded-2xl bg-[#2C2C2C] dark:bg-[#0a0a0a]">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h4 className="font-serif text-xl font-semibold text-white mb-1">Stay in the Story</h4>
                  <p className="text-white/60 text-sm">
                    Subscribe to our newsletter for new releases, author events, and exclusive literary content.
                  </p>
                </div>
                {newsletterSubmitted ? (
                  <div className="flex items-center gap-2 text-[#D4A574]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm font-medium">Subscribed!</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 md:w-64 px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#C4935A] focus:ring-1 focus:ring-[#C4935A]/30 text-sm"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#C4935A] hover:bg-[#B38349] text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
