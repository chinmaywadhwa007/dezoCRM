import React from 'react';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Share2,
  Send,
  MessageSquare
} from 'lucide-react';
import { useNavigation } from '../../utils/NavigationContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <footer className="bg-[#182232] dark:bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 transition-colors duration-300 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-14">

          {/* Column 1: Brand Info & Socials */}
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
                Dezo<span className="text-blue-500">CRM</span>
              </span>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed mb-5">
              DezoCRM Technology Pvt. Ltd. is a global IT solutions provider committed to delivering innovative, reliable and future-ready software products.
            </p>
            <div className="flex items-center gap-2.5">
              <button 
                type="button"
                onClick={() => navigateTo('/contact-sales')}
                aria-label="Share" 
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition border-none cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button 
                type="button"
                onClick={() => navigateTo('/about')}
                aria-label="Globe" 
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition border-none cursor-pointer"
              >
                <Globe className="w-4 h-4" />
              </button>
              <button 
                type="button"
                onClick={() => navigateTo('/contact-sales')}
                aria-label="Contact" 
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition border-none cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <button 
                type="button"
                onClick={() => navigateTo('/book-demo')}
                aria-label="Send" 
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition border-none cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
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
                <button type="button" onClick={() => navigateTo('/contact-sales')} className="hover:text-blue-400 transition cursor-pointer bg-transparent border-none p-0 text-left text-xs text-slate-400">
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
                <a href="mailto:support@dezocrm.com" className="hover:text-white transition text-slate-400">support@dezocrm.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <button type="button" onClick={() => navigateTo('/')} className="hover:text-white transition text-slate-400 bg-transparent border-none p-0 cursor-pointer text-xs">
                  www.dezocrm.com
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
          <p>© {new Date().getFullYear()} DezoCRM Technology Pvt. Ltd. All Rights Reserved.</p>
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
