import React from 'react';
import { 
  MessageSquare, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Smartphone 
} from 'lucide-react';

export const BottomFeatureStrip: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: 'Live Chat Support',
      subtitle: 'Talk to our experts'
    },
    {
      icon: <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: 'Easy Subscription',
      subtitle: 'Flexible Pricing Plans'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: 'Secure Payments',
      subtitle: '100% Secure Gateway'
    },
    {
      icon: <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: 'Instant Access',
      subtitle: 'Get Started Immediately'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: 'Mobile Friendly',
      subtitle: 'Access Anywhere'
    }
  ];

  return (
    <section className="py-8 bg-slate-50/70 dark:bg-slate-900/60 border-t border-slate-200/60 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {features.map((f, idx) => (
            <div key={idx} className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shrink-0">
                {f.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-tight font-['Plus_Jakarta_Sans'] whitespace-nowrap">
                  {f.title}
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap mt-0.5">
                  {f.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
