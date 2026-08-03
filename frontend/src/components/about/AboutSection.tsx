import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useNavigation } from '../../utils/NavigationContext';

export const AboutSection: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <section id="about" className="py-16 sm:py-20 bg-white dark:bg-slate-950 relative transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-3 font-['Plus_Jakarta_Sans'] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              ABOUT DEZOCRM ENTERPRISE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Pioneering Predictive AI Workflows for Modern Enterprise
            </h2>
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-semibold mb-4">
              DezoCRM Enterprise is an innovation-driven CRM platform delivering next-generation intelligent automation software for Education, Healthcare, Business and Enterprises.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-6">
              We are committed to digital transformation through technology, AI workflows, and operational excellence across global markets.
            </p>

            <button
              type="button"
              onClick={() => navigateTo('/about')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition cursor-pointer"
            >
              <span>Learn More About Our Mission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Right Image Column with Arch Crop */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative w-full h-[320px] sm:h-[400px] rounded-tl-[120px] rounded-br-[40px] rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-2xl shadow-blue-900/10 dark:shadow-slate-950/60 border border-slate-200 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="DezoCRM Enterprise HQ Building"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400">
                  <ShieldCheck className="w-4 h-4" /> Global Enterprise HQ
                </span>
                <span className="text-slate-500 dark:text-slate-400">San Francisco, CA</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
