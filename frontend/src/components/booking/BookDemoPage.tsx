import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Building2, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Bot, 
  ShieldCheck, 
  Star, 
  ChevronDown,
  Database
} from 'lucide-react';
import { useNavigation } from '../../utils/NavigationContext';

export const BookDemoPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  // Form & Booking State
  const [productSelected, setProductSelected] = useState<string>('DezoCRM Sales Intelligence');
  const [teamSize, setTeamSize] = useState<string>('10-50');
  const [expectedUsers, setExpectedUsers] = useState<string>('25');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking = {
      id: `demo_${Date.now()}`,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      productSelected,
      teamSize,
      expectedUsers,
      notes: formData.notes,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save to browser localStorage
    try {
      const existing = localStorage.getItem('dezocrm_demo_bookings');
      const bookingsArray = existing ? JSON.parse(existing) : [];
      bookingsArray.unshift(newBooking);
      localStorage.setItem('dezocrm_demo_bookings', JSON.stringify(bookingsArray));
    } catch (err) {
      console.error('Error saving demo booking to localStorage:', err);
    }

    setIsSubmitted(true);
  };

  const faqs = [
    {
      q: 'How long does the product demo take?',
      a: 'A standard product demonstration takes 30 minutes. We tailor the walkthrough specifically to your organization’s workflow and requirements.'
    },
    {
      q: 'Can my engineering or security team join the call?',
      a: 'Absolutely. We encourage technical and leadership stakeholders to join so we can answer compliance, architecture, and deployment questions directly.'
    },
    {
      q: 'Is there any commitment required after booking a demo?',
      a: 'None at all. The demo is completely free. We will also provide custom trial access to your team after the walkthrough.'
    },
    {
      q: 'Will I get access to a sandbox environment?',
      a: 'Yes! Following the live demo, our solutions architect will provision a personalized trial sandbox loaded with sample data for your evaluation.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 lg:py-20 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden transition-colors duration-300">
      {/* Ambient Radial Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-500/10 via-cyan-500/10 dark:from-blue-600/15 dark:via-cyan-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* ── HERO BANNER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-400/30 text-xs font-extrabold text-blue-600 dark:text-cyan-400 mb-4"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400 animate-pulse" />
            <span>PERSONALIZED ENTERPRISE WALKTHROUGH</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4"
          >
            Book a Live <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 dark:from-blue-500 dark:via-cyan-400 dark:to-violet-400 bg-clip-text text-transparent">1-on-1 Product Demo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed"
          >
            Fill out the details below to request a personalized product walkthrough with our solutions engineering team.
          </motion.p>
        </div>

        {/* ── MAIN BOOKING SECTION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left Column: Direct Booking Form (8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-2xl backdrop-blur-xl relative transition-colors duration-300">
            
            {/* SUCCESS OVERLAY STATE */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-white/98 dark:bg-slate-950/98 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/30 text-[11px] font-extrabold text-cyan-600 dark:text-cyan-400 mb-3">
                    <Database className="w-3.5 h-3.5" /> Saved to Local Storage
                  </span>

                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Demo Request Received!</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mb-6">
                    Thank you, <span className="text-blue-600 dark:text-cyan-400 font-bold">{formData.fullName || 'Valued Partner'}</span>! Your demo request has been saved and dispatched to <span className="text-blue-600 dark:text-cyan-400 font-bold">{formData.email || 'your email'}</span>.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-left w-full max-w-md mb-8 space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                      <span className="text-slate-500 dark:text-slate-400">Company:</span>
                      <span className="text-slate-900 dark:text-white font-bold">{formData.company || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                      <span className="text-slate-500 dark:text-slate-400">Product Module:</span>
                      <span className="text-blue-600 dark:text-cyan-400 font-bold">{productSelected}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Expected CRM Seats:</span>
                      <span className="text-violet-600 dark:text-violet-400 font-bold">{expectedUsers}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ fullName: '', email: '', phone: '', company: '', notes: '' });
                      }}
                      className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs transition cursor-pointer border-none"
                    >
                      Book Another Demo
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateTo('/products')}
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition cursor-pointer border-none"
                    >
                      Explore Products
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                  Book a Product Demo
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Fill in your details below and our team will get in touch.
                </p>
              </div>

              {/* Personal & Business Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-600 dark:focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Work Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-600 dark:focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Company Name *</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-600 dark:focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-600 dark:focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Target Product</label>
                  <select
                    value={productSelected}
                    onChange={(e) => setProductSelected(e.target.value)}
                    className="w-full px-3 py-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:border-blue-600 dark:focus:border-cyan-400 focus:outline-none"
                  >
                    <option>DezoCRM Sales Intelligence</option>
                    <option>SchoolyCore ERP</option>
                    <option>Hospitality HMS</option>
                    <option>InventoryPro Suite</option>
                    <option>Entire Dezo Ecosystem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Company Team Size</label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-3 py-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:border-blue-600 dark:focus:border-cyan-400 focus:outline-none"
                  >
                    <option>1-10 Employees</option>
                    <option>10-50 Employees</option>
                    <option>50-250 Employees</option>
                    <option>250+ Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Expected Seats</label>
                  <select
                    value={expectedUsers}
                    onChange={(e) => setExpectedUsers(e.target.value)}
                    className="w-full px-3 py-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:border-blue-600 dark:focus:border-cyan-400 focus:outline-none"
                  >
                    <option>1 - 10 Users</option>
                    <option>10 - 50 Users</option>
                    <option>50 - 200 Users</option>
                    <option>200+ Enterprise Seats</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Additional Notes / Use Case (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your current CRM workflow or specific questions for the demo..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-600 dark:focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-cyan-500/35 transition-all duration-300 cursor-pointer inline-flex items-center gap-2 border-none"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: AI Assistant Card & Benefits (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live AI Booking Assistant Card */}
            <div className="bg-gradient-to-br from-blue-900/10 via-slate-900 to-slate-950 dark:from-slate-900 dark:to-slate-950 border border-blue-300 dark:border-cyan-500/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 dark:bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-cyan-500/20 border border-blue-300 dark:border-cyan-400/50 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                  <Bot className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">AI Demo Assistant</h4>
                  <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-semibold uppercase">Instant Local Storage Sync</span>
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                "Submit your request and our enterprise solutions architect will connect with you directly."
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl p-2.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Instant NDA & Security Guarantee</span>
              </div>
            </div>

            {/* Why Book a Demo List */}
            <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">What You'll Receive:</h4>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span>Custom walkthrough tailored to your industry verticals</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span>Live ROI & deal conversion calculator benchmark</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span>Free 14-day pre-configured sandbox trial access</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span>Dedicated enterprise pricing quote with bulk license discounts</span>
                </li>
              </ul>
            </div>

            {/* Testimonial Quote */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 relative shadow-sm">
              <div className="flex gap-1 text-amber-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic mb-4">
                "The 30-minute demo completely redefined how our sales reps manage leads. We closed 40% more enterprise deals in Q3 alone."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  MS
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Marcus Sterling</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">VP of Revenue, NexaCloud</div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ── DEMO FAQ SECTION ── */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Everything you need to know about our demo process</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between cursor-pointer border-none bg-transparent"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-blue-600 dark:text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
