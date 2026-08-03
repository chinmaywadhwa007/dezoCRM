import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Building, 
  Layers, 
  Headphones, 
  ShieldCheck, 
  Bot 
} from 'lucide-react';

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      icon: <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      value: '2020',
      label: 'Year Established'
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      value: '10,000+',
      label: 'Happy Users'
    },
    {
      icon: <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      value: '100+',
      label: 'Clients'
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      value: '15+',
      label: 'Products'
    },
    {
      icon: <Headphones className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      value: '24/7',
      label: 'Support'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      value: '99.9%',
      label: 'Uptime'
    }
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 mt-10 mb-24">
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-[28px] p-6 lg:p-8 shadow-2xl shadow-blue-900/10 dark:shadow-slate-950/70 flex flex-col xl:flex-row items-center justify-between gap-6 lg:gap-8 transition-colors duration-300 overflow-hidden"
      >
        {/* Stats items grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 flex-1 w-full min-w-0">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 sm:gap-3.5 min-w-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50/90 dark:bg-slate-800/90 border border-blue-100/90 dark:border-slate-700/80 flex items-center justify-center shrink-0 shadow-xs">
                {stat.icon}
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-tight font-['Plus_Jakarta_Sans'] truncate">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 leading-tight truncate">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Far Right: AI Assistant Badge */}
        <div className="xl:pl-8 border-t xl:border-t-0 xl:border-l border-slate-200/80 dark:border-slate-800 flex items-center gap-4 sm:gap-6 w-full xl:w-auto justify-between xl:justify-start pt-6 xl:pt-0 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 relative shrink-0">
              <Bot className="w-6 h-6 sm:w-7 sm:h-7" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans'] flex items-center gap-1.5 truncate">
                AI Assistant
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                Hello! How can I help you today?
              </span>
            </div>
          </div>

          <button className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/25 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap shrink-0">
            Chat Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};


