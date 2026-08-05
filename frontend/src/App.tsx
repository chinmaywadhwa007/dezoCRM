import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationContext, type AppRoute } from './utils/NavigationContext';
import { getRouteFromPath, navigateToRoute } from './utils/router';
import {
  Navbar,
  BackgroundParticles,
  HeroSection,
  ProductsPage,
  BookDemoPage,
  ContactSalesPage,
  AboutUsPage,
  PricingPage,
  CareersPage,
  StatsBanner,
  AboutSection,
  MiddleGridSection,
  TrustAndWhySection,
  BottomFeatureStrip,
  FinalCTABanner,
  Footer,
  DezoAIWidget
} from './components';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => getRouteFromPath(window.location.pathname));
  const [activeSection, setActiveSection] = useState<string | undefined>(() => window.location.hash.replace('#', '') || undefined);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Listen to popstate (browser back/forward & pushState events)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getRouteFromPath(window.location.pathname));
      setActiveSection(window.location.hash.replace('#', '') || undefined);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((route: AppRoute, sectionId?: string) => {
    setCurrentRoute(route);
    setActiveSection(sectionId);
    navigateToRoute(route, sectionId);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  // Page Transition Variants (Fade & Slide Up - 500ms)
  const pageVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 }
  };

  return (
    <NavigationContext.Provider value={{ currentRoute, activeSection, navigateTo }}>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-800'} relative selection:bg-cyan-500 selection:text-white font-['Plus_Jakarta_Sans',sans-serif] overflow-x-clip transition-colors duration-300`}>

        {/* Ambient background particles & lighting */}
        <BackgroundParticles />

        {/* 1. Sticky Navbar */}
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Dynamic Page Router with Framer Motion AnimatePresence Transitions */}
        <AnimatePresence mode="wait">
          {currentRoute === '/products' && (
            <motion.main
              key="products-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductsPage />
            </motion.main>
          )}

          {currentRoute === '/book-demo' && (
            <motion.main
              key="book-demo-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <BookDemoPage />
            </motion.main>
          )}

          {currentRoute === '/contact-sales' && (
            <motion.main
              key="contact-sales-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactSalesPage />
            </motion.main>
          )}

          {currentRoute === '/about' && (
            <motion.main
              key="about-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <AboutUsPage />
            </motion.main>
          )}

          {currentRoute === '/pricing' && (
            <motion.main
              key="pricing-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <PricingPage />
            </motion.main>
          )}

          {currentRoute === '/careers' && (
            <motion.main
              key="careers-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <CareersPage />
            </motion.main>
          )}

          {currentRoute === '/' && (
            <motion.main
              key="home-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              id="home"
            >
              {/* 2. Hero Section */}
              <HeroSection />

              {/* 3. Statistics Section */}
              <StatsBanner />

              {/* 4. About Section */}
              <AboutSection />

              {/* 5, 6, 7. Industries We Serve + Demo Center + Get Free Demo Form */}
              <MiddleGridSection />

              {/* 9, 10, 11. Why Choose Dezoryn Technologies + Client Success Stories + Our Trusted Clients */}
              <TrustAndWhySection />

              {/* 12. Bottom Feature Strip */}
              <BottomFeatureStrip />

              {/* 13. Final CTA Banner */}
              <FinalCTABanner />
            </motion.main>
          )}
        </AnimatePresence>

        {/* 14. Footer */}
        <Footer />

        {/* 15. Floating DezoAI Help & Support Widget */}
        <DezoAIWidget />
      </div>
    </NavigationContext.Provider>
  );
};

export default App;
