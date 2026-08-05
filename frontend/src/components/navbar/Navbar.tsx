import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useNavigation, type AppRoute } from '../../utils/NavigationContext';

interface NavItemData {
  id: string;
  label: string;
  route: string;
  order: number;
  isVisible: boolean;
  isHighlight: boolean;
}

interface NavbarProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

const STATIC_NAV: NavItemData[] = [
  { id: '1', label: 'Home', route: '/', order: 0, isVisible: true, isHighlight: false },
  { id: '2', label: 'Products', route: '/products', order: 1, isVisible: true, isHighlight: false },
  { id: '3', label: 'Careers', route: '/careers', order: 2, isVisible: true, isHighlight: false },
  { id: '4', label: 'Pricing', route: '/pricing', order: 3, isVisible: true, isHighlight: false },
  { id: '5', label: 'About Us', route: '/about', order: 4, isVisible: true, isHighlight: false },
  { id: '6', label: 'Contact Sales', route: '/contact-sales', order: 5, isVisible: true, isHighlight: false },
];

export const Navbar: React.FC<NavbarProps> = ({
  theme = 'light',
  onToggleTheme
}) => {
  const { currentRoute, activeSection, navigateTo } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItemData[]>(STATIC_NAV);

  // Fetch navigation items from backend CMS API
  useEffect(() => {
    fetch('http://localhost:5000/api/v1/nav')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setNavItems(
            data.data
              .filter((item: NavItemData) => item.isVisible)
              .sort((a: NavItemData, b: NavItemData) => a.order - b.order)
          );
        }
      })
      .catch(() => {
        // Silently fallback to static nav
      });
  }, []);

  const isNavItemActive = (item: NavItemData) => {
    if (currentRoute === item.route && !activeSection) return true;
    return false;
  };

  const handleNavClick = (e: React.MouseEvent, route: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigateTo(route as AppRoute);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 py-2.5 px-4 sm:px-6 lg:px-8 pointer-events-none"
    >
      <div className="max-w-[1440px] mx-auto bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl backdrop-saturate-180 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-slate-950/60 px-6 lg:px-10 py-3 flex items-center justify-between pointer-events-auto transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10">

        {/* Left Brand Logo */}
        <button
          type="button"
          onClick={() => navigateTo('/')}
          className="flex items-center gap-3 group text-left cursor-pointer border-none bg-transparent"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-xl shadow-md shadow-blue-600/25 group-hover:scale-105 transition-transform duration-300">
            D
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
              Dezoryn <span className="text-blue-600">Technologies</span>
            </span>
            <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 tracking-wider mt-1 uppercase">
              Predictive Sales Platform
            </span>
          </div>
        </button>

        {/* Center Navigation Links — Dynamic from CMS */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px]">
          {navItems.map((item) => {
            const isActive = isNavItemActive(item);
            return (
              <button
                type="button"
                key={item.id}
                onClick={(e) => handleNavClick(e, item.route)}
                className={`transition-all duration-200 py-1 font-medium relative cursor-pointer border-none bg-transparent ${
                  item.isHighlight
                    ? 'text-amber-500 dark:text-amber-400 font-black'
                    : isActive
                    ? 'text-blue-600 dark:text-cyan-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 dark:bg-cyan-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button & Theme Toggle (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Theme Sliding Pill Switch */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onToggleTheme) onToggleTheme();
            }}
            aria-label="Toggle Theme Mode"
            className={`relative z-10 inline-flex items-center w-15 h-8 rounded-full p-1 transition-colors duration-200 cursor-pointer shadow-inner ${theme === 'dark'
                ? 'bg-slate-800 border border-slate-700 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'bg-slate-200 border border-slate-300/80 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
              }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white dark:bg-slate-900 shadow-md flex items-center justify-center transition-transform duration-200 ease-out transform-gpu ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                }`}
            >
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-sky-400" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
            </div>
          </button>

          {/* Primary Book Demo CTA */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigateTo('/book-demo')}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-cyan-500/35 transition-all duration-200 cursor-pointer border-none"
          >
            <span>Book Demo</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onToggleTheme) onToggleTheme();
            }}
            aria-label="Toggle Mobile Theme"
            className={`relative z-10 inline-flex items-center w-13 h-7 rounded-full p-0.5 transition-colors duration-200 cursor-pointer shadow-inner ${theme === 'dark'
                ? 'bg-slate-800 border border-slate-700 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                : 'bg-slate-200 border border-slate-300/80 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
              }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white dark:bg-slate-900 shadow-md flex items-center justify-center transition-transform duration-300 ease-out transform-gpu ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                }`}
            >
              {theme === 'dark' ? (
                <Moon className="w-3 h-3 text-sky-400" />
              ) : (
                <Sun className="w-3 h-3 text-amber-500" />
              )}
            </div>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden pointer-events-auto max-w-[1440px] mx-auto mt-2 bg-white/85 dark:bg-slate-950/85 backdrop-blur-2xl backdrop-saturate-180 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl px-8 py-5 flex flex-col gap-3 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
          >
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={(e) => handleNavClick(e, item.route)}
                className={`py-2 text-base font-medium transition-colors text-left border-none bg-transparent ${
                  item.isHighlight
                    ? 'text-amber-500 dark:text-amber-400 font-black'
                    : isNavItemActive(item)
                    ? 'text-blue-600 dark:text-cyan-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  navigateTo('/book-demo');
                  setMobileMenuOpen(false);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-md shadow-blue-500/20 cursor-pointer border-none"
              >
                <span>Book Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
