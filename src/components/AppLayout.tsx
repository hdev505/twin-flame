import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedBooks from '@/components/FeaturedBooks';
import BookCatalog from '@/components/BookCatalog';
import AuthorSpotlight from '@/components/AuthorSpotlight';
import TestimonialSection from '@/components/TestimonialSection';
import EditorialServices from '@/components/EditorialServices';
import NewsSection from '@/components/NewsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <CartDrawer />
      <HeroSection />
      <FeaturedBooks />
      <BookCatalog />
      <AuthorSpotlight />
      <TestimonialSection />
      <EditorialServices />
      <NewsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default AppLayout;
