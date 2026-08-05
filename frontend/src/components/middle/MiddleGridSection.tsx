import React from 'react';
import { 
  GraduationCap, 
  Cross, 
  Hotel, 
  Building, 
  ShoppingBag, 
  Factory, 
  Truck, 
  Landmark,
  Play,
  Monitor
} from 'lucide-react';
import { useNavigation } from '../../utils/NavigationContext';

export const MiddleGridSection: React.FC = () => {
  const { navigateTo } = useNavigation();


  const industries = [
    { name: 'Education', icon: <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" /> },
    { name: 'Healthcare', icon: <Cross className="w-5 h-5 text-blue-600 dark:text-blue-400" /> },
    { name: 'Hospitality', icon: <Hotel className="w-5 h-5 text-blue-600 dark:text-blue-400" /> },
    { name: 'Real Estate', icon: <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" /> },
    { name: 'Retail', icon: <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" /> },
    { name: 'Manufacturing', icon: <Factory className="w-5 h-5 text-blue-600 dark:text-blue-400" /> },
    { name: 'Logistics', icon: <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" /> },
    { name: 'Government', icon: <Landmark className="w-5 h-5 text-blue-600 dark:text-blue-400" /> }
  ];

  const demoList = [
    'SchoolyCore Demo',
    'Hospital Management Demo',
    'HRMS Demo',
    'InventoryPro Demo'
  ];

  return (
    <section id="solutions" className="py-16 bg-slate-50/70 dark:bg-slate-900/60 border-t border-slate-200/60 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Column 1: Industries We Serve */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 text-left shadow-xs">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-['Plus_Jakarta_Sans']">
              INDUSTRIES WE SERVE
            </span>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {industries.map((ind, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shrink-0">
                    {ind.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-['Plus_Jakarta_Sans']">
                    {ind.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Demo Center */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 text-left shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-['Plus_Jakarta_Sans']">
                DEMO CENTER
              </span>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 mb-6">
                Watch Our Product Demos
              </p>

              {/* Laptop Graphic Mockup */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mb-6">
                <div className="sm:col-span-7 relative group cursor-pointer">
                  <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-md aspect-video flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
                      alt="Product Demo Video"
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-500"
                    />
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/40 group-hover:scale-110 transition">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-5 flex flex-col gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {demoList.map((demo, idx) => (
                    <div key={idx} className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer">
                      <Monitor className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="truncate">{demo}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigateTo('/book-demo')}
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition cursor-pointer"
            >
              View All Demos
            </button>
          </div>

          {/* Column 3: Get Free Demo Form */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 text-left shadow-xs">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-['Plus_Jakarta_Sans']">
              GET FREE DEMO
            </span>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Fill the form and our team will connect with you.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); navigateTo('/book-demo'); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                />
                <select className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:border-blue-600 focus:outline-none">
                  <option>Select Product</option>
                  <option>Dezoryn Sales</option>
                  <option>SchoolyCore</option>
                  <option>HMS</option>
                  <option>HRMS</option>
                  <option>InventoryPro</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Organization / School / Company"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Number of Users"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition cursor-pointer"
              >
                Submit Request & Schedule Demo
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
