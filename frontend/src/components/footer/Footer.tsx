import React from 'react';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Send,
  MessageSquare
} from 'lucide-react';
import { useNavigation } from '../../utils/NavigationContext';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const TwitterIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export const Footer: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <footer className="bg-[#182232] dark:bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 transition-colors duration-300 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-14">

          {/* Column 1: Brand Info & Social Media CTAs */}
          <div className="lg:col-span-1 flex flex-col items-start text-left">
            <button 
              type="button"
              onClick={() => navigateTo('/')}
              className="flex items-center gap-2.5 mb-4 border-none bg-transparent cursor-pointer p-0"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-xl shadow-md shadow-blue-600/30">
                D
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Dezoryn <span className="text-blue-500">Technologies</span>
              </span>
            </button>

            <p className="text-xs text-slate-400 leading-relaxed mb-5">
              Dezoryn Technologies Pvt. Ltd. is a global IT solutions provider committed to delivering innovative, reliable and future-ready software products.
            </p>

            {/* Social Media CTA Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">Connect With Us</span>
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow Dezoryn Technologies on LinkedIn"
                  className="p-2 rounded-xl bg-slate-800/90 hover:bg-[#0A66C2] text-slate-300 hover:text-white transition-all duration-300 border border-slate-700/80 hover:border-[#0A66C2] hover:scale-110 shadow-md flex items-center justify-center group"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow Dezoryn Technologies on X / Twitter"
                  className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-900 text-slate-300 hover:text-white transition-all duration-300 border border-slate-700/80 hover:border-slate-500 hover:scale-110 shadow-md flex items-center justify-center group"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View Dezoryn Technologies on GitHub"
                  className="p-2 rounded-xl bg-slate-800/90 hover:bg-[#24292e] text-slate-300 hover:text-white transition-all duration-300 border border-slate-700/80 hover:border-slate-500 hover:scale-110 shadow-md flex items-center justify-center group"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Subscribe to Dezoryn Technologies on YouTube"
                  className="p-2 rounded-xl bg-slate-800/90 hover:bg-[#FF0000] text-slate-300 hover:text-white transition-all duration-300 border border-slate-700/80 hover:border-[#FF0000] hover:scale-110 shadow-md flex items-center justify-center group"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow Dezoryn Technologies on Instagram"
                  className="p-2 rounded-xl bg-slate-800/90 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-slate-300 hover:text-white transition-all duration-300 border border-slate-700/80 hover:border-pink-500 hover:scale-110 shadow-md flex items-center justify-center group"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: COMPANY */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">COMPANY</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              <li>
                <button type="button" onClick={() => navigateTo('/about')} className="hover:text-blue-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  About Us
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/about')} className="hover:text-blue-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  Our Leadership
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/careers')} className="hover:text-blue-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  Careers & Hiring
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/contact-sales')} className="hover:text-blue-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  Partner Network
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/about')} className="hover:text-blue-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  Company Milestones
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: PRODUCTS */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">PRODUCTS</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              <li>
                <button type="button" onClick={() => navigateTo('/products')} className="hover:text-cyan-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  SchoolyCore ERP
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/products')} className="hover:text-cyan-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  Hospitality HMS
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/products')} className="hover:text-cyan-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  Enterprise HRMS
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/products')} className="hover:text-cyan-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  InventoryPro Suite
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/products')} className="hover:text-cyan-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  All Product Modules
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: SUPPORT & RESOURCES */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">SUPPORT & DEMOS</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              <li>
                <button type="button" onClick={() => navigateTo('/book-demo')} className="hover:text-blue-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  Book Live Demo
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/contact-sales')} className="hover:text-blue-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  Contact Sales Team
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/products')} className="hover:text-blue-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  Product FAQs
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/book-demo')} className="hover:text-blue-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  Interactive Walkthrough
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('/contact-sales')} className="hover:text-blue-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
                  24/7 SLA Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: CONTACT US */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">CONTACT US</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="tel:+917777804850" className="hover:text-white transition text-slate-400">+91 77778 04850</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="mailto:support@dezoryn.com" className="hover:text-white transition text-slate-400">support@dezoryn.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <button type="button" onClick={() => navigateTo('/')} className="hover:text-white transition text-slate-400 bg-transparent border-none p-0 cursor-pointer text-xs">
                  www.dezoryn.com
                </button>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Indore, Madhya Pradesh, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dezoryn Technologies Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <button type="button" onClick={() => navigateTo('/contact-sales')} className="hover:text-slate-400 transition bg-transparent border-none p-0 cursor-pointer text-xs text-slate-500">
              Privacy Policy
            </button>
            <span>|</span>
            <button type="button" onClick={() => navigateTo('/contact-sales')} className="hover:text-slate-400 transition bg-transparent border-none p-0 cursor-pointer text-xs text-slate-500">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
