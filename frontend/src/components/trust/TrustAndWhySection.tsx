import React from 'react';
import { 
  CheckCircle2, 
  Shield, 
  Cross, 
  Award, 
  Star, 
  Activity, 
  Hexagon 
} from 'lucide-react';


export const TrustAndWhySection: React.FC = () => {
  const whyPoints = [
    'Innovative & Scalable Solutions',
    'Enterprise Grade Security',
    'User Friendly & Modern UI',
    '24/7 Dedicated Support',
    'Regular Updates & New Features'
  ];

  const trustedClients = [
    { name: 'WISDOM PUBLIC SCHOOL', icon: <Shield className="w-6 h-6 text-slate-700 dark:text-slate-300" /> },
    { name: 'City Hospital', icon: <Cross className="w-6 h-6 text-teal-600 dark:text-teal-400" /> },
    { name: 'Greenfield International', icon: <Award className="w-6 h-6 text-blue-700 dark:text-blue-400" /> },
    { name: 'SHINE GROUP', icon: <Star className="w-6 h-6 text-amber-500" /> },
    { name: 'LIFE CARE HOSPITAL', icon: <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" /> },
    { name: 'MAXWELL INDUSTRIES', icon: <Hexagon className="w-6 h-6 text-slate-800 dark:text-slate-200" /> }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Why Choose DezoCRM */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 text-left shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-['Plus_Jakarta_Sans']">
                WHY CHOOSE DEZOCRM?
              </span>
              <ul className="space-y-3.5 mt-6">
                {whyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 font-['Plus_Jakarta_Sans']">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Client Success Stories */}
          <div className="lg:col-span-4 bg-slate-50/80 dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 text-left shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-['Plus_Jakarta_Sans']">
                CLIENT SUCCESS STORIES
              </span>

              <div className="flex items-start gap-4 mt-6">
                {/* Executive Avatar */}
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" 
                  alt="Mr. Rajesh Sharma" 
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0 shadow-xs"
                />
                
                <div className="flex flex-col text-left">
                  <span className="text-xl text-blue-600 dark:text-blue-400 font-serif leading-none">“</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold italic -mt-2">
                    SchoolyCore has completely transformed our school management process. It's reliable, easy to use and feature rich.
                  </p>
                  <div className="mt-3">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block font-['Plus_Jakarta_Sans']">
                      - Mr. Rajesh Sharma
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                      Director, Wisdom Public School
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
          </div>

          {/* Column 3: Our Trusted Clients */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 text-left shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-['Plus_Jakarta_Sans']">
                OUR TRUSTED CLIENTS
              </span>

              <div className="grid grid-cols-2 gap-3 mt-6">
                {trustedClients.map((client, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col items-center justify-center text-center gap-1.5 hover:border-slate-200 dark:hover:border-slate-700 transition">
                    {client.icon}
                    <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300 tracking-tight leading-tight uppercase font-['Plus_Jakarta_Sans']">
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
