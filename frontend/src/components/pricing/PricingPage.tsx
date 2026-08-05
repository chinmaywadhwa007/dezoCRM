import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  ChevronDown,
  GraduationCap,
  Hotel,
  Building,
  ShoppingBag,
  Star
} from 'lucide-react';
import { useNavigation } from '../../utils/NavigationContext';

// ── CMS Dynamic Plan type ─────────────────────
interface CmsPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonUrl: string;
  isHighlight: boolean;
  ribbon: string | null;
  colorTheme: string;
  order: number;
  isEnabled: boolean;
}

const COLOR_GRADIENT: Record<string, string> = {
  blue: 'from-blue-600 to-cyan-500',
  violet: 'from-violet-600 to-purple-500',
  emerald: 'from-emerald-600 to-teal-500',
  rose: 'from-rose-600 to-pink-500',
  amber: 'from-amber-500 to-orange-500',
  slate: 'from-slate-600 to-slate-700',
  indigo: 'from-indigo-600 to-blue-600',
  cyan: 'from-cyan-500 to-blue-500',
};

const COLOR_RING: Record<string, string> = {
  blue: 'ring-blue-500', violet: 'ring-violet-500', emerald: 'ring-emerald-500',
  rose: 'ring-rose-500', amber: 'ring-amber-500', slate: 'ring-slate-500',
  indigo: 'ring-indigo-500', cyan: 'ring-cyan-500',
};

const COLOR_BADGE: Record<string, string> = {
  blue: 'bg-blue-600', violet: 'bg-violet-600', emerald: 'bg-emerald-600',
  rose: 'bg-rose-600', amber: 'bg-amber-500', slate: 'bg-slate-600',
  indigo: 'bg-indigo-600', cyan: 'bg-cyan-500',
};


interface PricingTier {
  name: string;
  desc: string;
  monthlyPrice: number | 'Custom';
  annualPrice: number | 'Custom';
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  ctaAction: 'demo' | 'contact';
}

interface ProductPricing {
  id: string;
  name: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
  accentBg: string;
  tiers: PricingTier[];
}

const marketplacePricingData: ProductPricing[] = [
  {
    id: 'dezocrm',
    name: 'Dezoryn Sales',
    badge: 'CRM PLATFORM',
    icon: <Zap className="w-5 h-5 text-blue-600 dark:text-cyan-400" />,
    color: 'text-blue-600 dark:text-cyan-400',
    accentBg: 'bg-blue-50 dark:bg-cyan-500/10 border-blue-200 dark:border-cyan-400/30',
    tiers: [
      {
        name: 'Starter',
        desc: 'Essential pipeline management & basic lead scoring for small sales teams.',
        monthlyPrice: 29,
        annualPrice: 24,
        features: [
          'Up to 10 Sales Rep Seats',
          'Basic AI Lead Quality Scoring',
          'Automated Email & SMS Cadences',
          'Standard Kanban Deal Pipelines',
          '99.5% SLA Uptime Guarantee'
        ],
        ctaText: 'Start 14-Day Free Trial',
        ctaAction: 'demo'
      },
      {
        name: 'Professional',
        desc: 'Advanced predictive intelligence, multi-channel cadences & forecasting.',
        monthlyPrice: 79,
        annualPrice: 64,
        isPopular: true,
        features: [
          'Unlimited Sales Rep Seats',
          '50+ Behavioral Intent Lead Scoring',
          'Multi-Channel Cadence Automation',
          'AI Quarterly Revenue Forecasting',
          'Multi-Currency & Custom Fields',
          'Dedicated Onboarding Specialist'
        ],
        ctaText: 'Schedule Live Walkthrough',
        ctaAction: 'demo'
      },
      {
        name: 'Enterprise',
        desc: 'Dedicated cloud cluster, custom AI model training & SOC2 compliance.',
        monthlyPrice: 'Custom',
        annualPrice: 'Custom',
        features: [
          'Isolated Enterprise Cloud Cluster',
          'SOC2 Type II, GDPR & HIPAA Security',
          'Custom AI Model Fine-Tuning',
          '24/7 Priority Support & 15 Min SLA',
          'Dedicated Technical Account Manager',
          'Custom SSO (Okta, Azure AD, SAML)'
        ],
        ctaText: 'Contact Enterprise Sales',
        ctaAction: 'contact'
      }
    ]
  },
  {
    id: 'schoolycore',
    name: 'SchoolyCore ERP',
    badge: 'CAMPUS SUITE',
    icon: <GraduationCap className="w-5 h-5 text-violet-600 dark:text-violet-400" />,
    color: 'text-violet-600 dark:text-violet-400',
    accentBg: 'bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-400/30',
    tiers: [
      {
        name: 'Academy',
        desc: 'Single campus management for K-12 schools & coaching centers.',
        monthlyPrice: 49,
        annualPrice: 39,
        features: [
          'Up to 500 Active Students',
          'Student Admission & Fee Management',
          'Automated Attendance & SMS Alerts',
          'Report Card Generator & Exams',
          'Parent Portal Web App'
        ],
        ctaText: 'Book Campus Demo',
        ctaAction: 'demo'
      },
      {
        name: 'Institution',
        desc: 'Multi-branch ERP for growing colleges & educational groups.',
        monthlyPrice: 129,
        annualPrice: 99,
        isPopular: true,
        features: [
          'Up to 3,000 Active Students',
          'Multi-Branch Campus Management',
          'Biometric & RFID Attendance Sync',
          'Online Fee Gateway Integration',
          'Library & Hostel Operations',
          'Dedicated School Support Team'
        ],
        ctaText: 'Request Institutional Quote',
        ctaAction: 'demo'
      },
      {
        name: 'University Cloud',
        desc: 'Custom university system with unlimited students & AI proctoring.',
        monthlyPrice: 'Custom',
        annualPrice: 'Custom',
        features: [
          'Unlimited Campuses & Students',
          'AI-Powered Exam Proctoring',
          'Custom University ERP Modules',
          'Alumni & Placement Portal',
          '24/7 Priority Support & On-Site Setup',
          'White-Label Mobile App'
        ],
        ctaText: 'Talk to Education Advisor',
        ctaAction: 'contact'
      }
    ]
  },
  {
    id: 'hms',
    name: 'Hospitality HMS',
    badge: 'HOTEL OS',
    icon: <Hotel className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
    color: 'text-rose-600 dark:text-rose-400',
    accentBg: 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-400/30',
    tiers: [
      {
        name: 'Boutique',
        desc: 'Front desk & booking management for boutique hotels & B&Bs.',
        monthlyPrice: 69,
        annualPrice: 55,
        features: [
          'Up to 25 Rooms / Units',
          'Front Desk Check-In & Check-Out',
          'Direct Booking Engine & Invoicing',
          'Housekeeping Task Management',
          'Basic Revenue Analytics'
        ],
        ctaText: 'Start Free Demo',
        ctaAction: 'demo'
      },
      {
        name: 'Resort & Chain',
        desc: 'Full PMS & channel manager for multi-property hotels & resorts.',
        monthlyPrice: 189,
        annualPrice: 149,
        isPopular: true,
        features: [
          'Up to 150 Rooms / Properties',
          '2-Way Channel Manager (Booking, Agoda)',
          'Restaurant POS & Room Service',
          'Dynamic AI Room Rate Pricing',
          'Guest WhatsApp Automated Messaging',
          'Multi-Currency Payment Processing'
        ],
        ctaText: 'Explore Hotel OS Demo',
        ctaAction: 'demo'
      },
      {
        name: 'Global Enterprise',
        desc: 'Unlimited hotel properties with central reservation system (CRS).',
        monthlyPrice: 'Custom',
        annualPrice: 'Custom',
        features: [
          'Unlimited Hotel Chains & Rooms',
          'Central Reservation System (CRS)',
          'Spa, Golf & Convention Management',
          'Custom Oracle / SAP Integration',
          'Dedicated Hotel Solutions Architect',
          '99.99% Guaranteed SLA'
        ],
        ctaText: 'Contact Hospitality Team',
        ctaAction: 'contact'
      }
    ]
  },
  {
    id: 'hrms',
    name: 'Enterprise HRMS',
    badge: 'HUMAN CAPITAL',
    icon: <Building className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    color: 'text-emerald-600 dark:text-emerald-400',
    accentBg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-400/30',
    tiers: [
      {
        name: 'Team',
        desc: 'Automated payroll, leave & attendance for growing companies.',
        monthlyPrice: 39,
        annualPrice: 31,
        features: [
          'Up to 50 Employees',
          '1-Click Automated Payroll Processing',
          'Leave & Holiday Tracker',
          'Employee Self-Service Portal',
          'Tax & Statutory Compliance'
        ],
        ctaText: 'Schedule HR Walkthrough',
        ctaAction: 'demo'
      },
      {
        name: 'Growth',
        desc: 'Performance appraisal, recruiting ATS & employee onboarding.',
        monthlyPrice: 99,
        annualPrice: 79,
        isPopular: true,
        features: [
          'Up to 250 Employees',
          'Applicant Tracking System (ATS)',
          '360-Degree Performance Appraisals',
          'Expense Reimbursement Approval',
          'Biometric Geo-Fenced Check-In',
          'Custom HR Workflows & Analytics'
        ],
        ctaText: 'Request Growth Demo',
        ctaAction: 'demo'
      },
      {
        name: 'Enterprise HR',
        desc: 'Global payroll across 50+ countries with custom compliance.',
        monthlyPrice: 'Custom',
        annualPrice: 'Custom',
        features: [
          'Unlimited Global Employees',
          'Multi-Country Payroll & Tax Sync',
          'Custom Organization Chart Builder',
          'Whistleblower & Anonymous Feedback',
          'Dedicated HR Success Manager',
          'Custom HRIS API Integration'
        ],
        ctaText: 'Contact HR Sales',
        ctaAction: 'contact'
      }
    ]
  },
  {
    id: 'inventorypro',
    name: 'InventoryPro Suite',
    badge: 'SUPPLY CHAIN',
    icon: <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    color: 'text-amber-600 dark:text-amber-400',
    accentBg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-400/30',
    tiers: [
      {
        name: 'Standard',
        desc: 'Stock tracking & purchase order automation for retail & wholesale.',
        monthlyPrice: 59,
        annualPrice: 47,
        features: [
          'Up to 2 Warehouses / Stores',
          'Barcode Scanning & SKU Generator',
          'Purchase Order & Vendor Tracking',
          'Low Stock Automated Alerts',
          'Basic Sales & Inventory Reports'
        ],
        ctaText: 'Try Inventory Demo',
        ctaAction: 'demo'
      },
      {
        name: 'Pro Supply',
        desc: 'Multi-warehouse batch, serial & expiry tracking with AI reorder.',
        monthlyPrice: 149,
        annualPrice: 119,
        isPopular: true,
        features: [
          'Up to 10 Warehouses & Outlets',
          'Batch, Serial Number & Expiry Tracking',
          'AI Demand Forecasting & Auto-Reorder',
          'Shopify, Amazon & WooCommerce Sync',
          'Return & RMA Logistics Workflow',
          'Dedicated Warehouse Onboarding'
        ],
        ctaText: 'Book Supply Chain Demo',
        ctaAction: 'demo'
      },
      {
        name: 'Enterprise Supply',
        desc: 'Custom WMS, 3PL logistics & RFID manufacturing tracking.',
        monthlyPrice: 'Custom',
        annualPrice: 'Custom',
        features: [
          'Unlimited Global Warehouses',
          'Warehouse Management System (WMS)',
          '3PL & Fleet Tracking Integration',
          'Custom Bill of Materials (BOM)',
          '24/7 Priority Support & 15 Min SLA',
          'Dedicated Logistics Architect'
        ],
        ctaText: 'Talk to Supply Chain Sales',
        ctaAction: 'contact'
      }
    ]
  }
];

export const PricingPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [selectedProduct, setSelectedProduct] = useState<string>('dezocrm');
  const [isAnnual, setIsAnnual] = useState<boolean>(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [cmsPlans, setCmsPlans] = useState<CmsPlan[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/pricing?enabled=true')
      .then(r => r.json())
      .then(data => { if (data.success && data.data.length > 0) setCmsPlans(data.data); })
      .catch(() => {});
  }, []);

  const activeProduct = marketplacePricingData.find(p => p.id === selectedProduct) || marketplacePricingData[0];


  const faqs = [
    {
      q: 'Can I switch products or upgrade my plan later?',
      a: 'Yes! You can upgrade, downgrade, or add modules at any time. Prorated credits will be applied automatically to your invoice.'
    },
    {
      q: 'Is there a free trial available for each marketplace module?',
      a: 'Yes, we offer a 14-day full-featured free trial for Dezoryn Technologies, SchoolyCore, HMS, HRMS, and InventoryPro with no credit card required.'
    },
    {
      q: 'How does the 20% annual discount work?',
      a: 'When you choose annual billing, you receive an immediate 20% discount on every license seat across all product modules.'
    },
    {
      q: 'Do you offer non-profit or educational institution discounts?',
      a: 'We offer special volume licensing and up to 30% discounts for registered non-profits, schools, and healthcare institutions. Contact our sales team for details.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 lg:py-20 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden transition-colors duration-300">
      {/* Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-500/10 via-cyan-500/10 dark:from-blue-600/15 dark:via-cyan-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── HERO BANNER ── */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-400/30 text-xs font-extrabold text-blue-600 dark:text-cyan-400 mb-4"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400 animate-pulse" />
            <span>TRANSPARENT MARKETPLACE PRICING</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4"
          >
            Simple, Predictable Plans for <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 dark:from-blue-500 dark:via-cyan-400 dark:to-violet-400 bg-clip-text text-transparent">Every Enterprise Module</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 font-normal"
          >
            Choose your product module below to view tailored pricing options. No hidden fees, cancel anytime.
          </motion.p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                !isAnnual
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                isAnnual
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-black uppercase">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* ── CMS DYNAMIC PLANS ── */}
        {cmsPlans.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 text-xs font-extrabold text-violet-600 dark:text-violet-400">
                <Sparkles className="w-3.5 h-3.5" />Our Plans
              </span>
            </div>
            <div className={`grid gap-6 ${cmsPlans.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' : cmsPlans.length >= 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-sm mx-auto'}`}>
              {cmsPlans.map((plan) => {
                const grad = COLOR_GRADIENT[plan.colorTheme] || COLOR_GRADIENT.blue;
                const ring = COLOR_RING[plan.colorTheme] || COLOR_RING.blue;
                const badge = COLOR_BADGE[plan.colorTheme] || COLOR_BADGE.blue;
                return (
                  <motion.div key={plan.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className={`relative flex flex-col rounded-3xl bg-white dark:bg-slate-900 border overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${plan.isHighlight ? `ring-2 ${ring} border-transparent shadow-xl` : 'border-slate-200 dark:border-slate-800'}`}>
                    <div className={`h-1.5 w-full bg-gradient-to-r ${grad}`} />
                    {plan.ribbon && (
                      <div className={`absolute top-5 right-0 ${badge} text-white text-[10px] font-black px-3 py-1 rounded-l-lg shadow`}>
                        {plan.ribbon}
                      </div>
                    )}
                    <div className="p-7 flex flex-col gap-5 flex-1">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-black text-slate-900 dark:text-white">{plan.name}</h3>
                          {plan.isHighlight && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                        </div>
                        <div className={`text-3xl font-black bg-gradient-to-r ${grad} bg-clip-text text-transparent`}>{plan.price}</div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{plan.description}</p>
                      </div>
                      <div className="space-y-2.5 flex-1">
                        {plan.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                            <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center shrink-0`}>
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                            {feat}
                          </div>
                        ))}
                      </div>
                      <button type="button"
                        onClick={() => navigateTo(plan.buttonUrl as any)}
                        className={`w-full py-3 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r ${grad} hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md cursor-pointer`}>
                        {plan.buttonText}<ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── MARKETPLACE PRODUCT SELECTOR TABS ── */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-14 flex-wrap">
          {marketplacePricingData.map((prod) => {
            const isSelected = selectedProduct === prod.id;
            return (
              <button
                key={prod.id}
                type="button"
                onClick={() => setSelectedProduct(prod.id)}
                className={`px-4 py-3 rounded-2xl border flex items-center gap-2.5 transition duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-blue-600 dark:border-cyan-400 text-slate-900 dark:text-white shadow-lg shadow-blue-500/10 dark:shadow-cyan-500/20 scale-105 font-extrabold'
                    : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white font-semibold'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${prod.accentBg}`}>
                  {prod.icon}
                </div>
                <span className="text-xs">{prod.name}</span>
              </button>
            );
          })}
        </div>

        {/* ── PRICING CARDS FOR SELECTED PRODUCT ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {activeProduct.tiers.map((tier, idx) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            const priceDisplay = typeof price === 'number' ? `$${price}` : price;
            const periodDisplay = typeof price === 'number' ? (isAnnual ? '/user/mo (billed annually)' : '/user/month') : 'Billed Annually';

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className={`p-8 rounded-3xl border flex flex-col justify-between relative transition duration-300 ${
                  tier.isPopular
                    ? 'bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-blue-600 dark:border-cyan-400 shadow-xl dark:shadow-2xl shadow-blue-500/10 dark:shadow-cyan-500/25 scale-105'
                    : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                {tier.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 dark:bg-cyan-400 text-white dark:text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                    MOST POPULAR
                  </span>
                )}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{tier.name}</h3>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-widest">
                      {activeProduct.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">{tier.desc}</p>

                  <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">{priceDisplay}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-1.5">{periodDisplay}</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    {tier.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigateTo(tier.ctaAction === 'contact' ? '/contact-sales' : '/book-demo')}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-2 ${
                    tier.isPopular
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/20 dark:shadow-cyan-500/30'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* ── FEATURE MATRIX COMPARISON TABLE ── */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 lg:p-12 mb-20 shadow-xl overflow-x-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold tracking-wider text-blue-600 dark:text-cyan-400 uppercase">FEATURE COMPARISON</span>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Full Module Capabilities</h3>
          </div>

          <table className="w-full text-left text-xs border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm">
                <th className="py-4 font-extrabold">Feature / Capability</th>
                <th className="py-4 font-extrabold text-center">Starter</th>
                <th className="py-4 font-extrabold text-center text-blue-600 dark:text-cyan-400">Professional</th>
                <th className="py-4 font-extrabold text-center text-violet-600 dark:text-violet-400">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-600 dark:text-slate-300">
              <tr>
                <td className="py-3.5 font-semibold">Real-Time Data Sync</td>
                <td className="py-3.5 text-center font-bold">Standard (5m)</td>
                <td className="py-3.5 text-center font-bold text-blue-600 dark:text-cyan-400">Instant (50ms)</td>
                <td className="py-3.5 text-center font-bold text-violet-600 dark:text-violet-400">Dedicated Stream</td>
              </tr>
              <tr>
                <td className="py-3.5 font-semibold">AI Lead & Demand Scoring</td>
                <td className="py-3.5 text-center">Basic</td>
                <td className="py-3.5 text-center text-emerald-600 font-bold">✓ 50+ Signals</td>
                <td className="py-3.5 text-center text-emerald-600 font-bold">✓ Custom Models</td>
              </tr>
              <tr>
                <td className="py-3.5 font-semibold">Multi-Currency & FX Sync</td>
                <td className="py-3.5 text-center text-slate-400">-</td>
                <td className="py-3.5 text-center text-emerald-600 font-bold">✓ Included</td>
                <td className="py-3.5 text-center text-emerald-600 font-bold">✓ Unlimited FX</td>
              </tr>
              <tr>
                <td className="py-3.5 font-semibold">SOC2 & GDPR Compliance</td>
                <td className="py-3.5 text-center text-emerald-600 font-bold">✓ Included</td>
                <td className="py-3.5 text-center text-emerald-600 font-bold">✓ Included</td>
                <td className="py-3.5 text-center text-emerald-600 font-bold">✓ Isolated Cluster</td>
              </tr>
              <tr>
                <td className="py-3.5 font-semibold">Guaranteed Support SLA</td>
                <td className="py-3.5 text-center">24 Hours</td>
                <td className="py-3.5 text-center font-bold">2 Hours</td>
                <td className="py-3.5 text-center font-bold text-emerald-600">&lt; 15 Minutes</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── PRICING FAQ ACCORDION ── */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Pricing FAQs</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Common questions about licensing, trials, and billing</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
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

        {/* ── CONVERSION CTA BANNER ── */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl p-10 lg:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Need a Custom Enterprise Volume Quote?
          </h2>
          <p className="text-base text-blue-100 max-w-2xl mx-auto mb-8 font-normal">
            Our enterprise solutions team will build a tailored package with custom SLAs, dedicated infrastructure, and bulk seat discounts.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('/contact-sales')}
              className="px-8 py-4 rounded-full bg-white text-blue-600 font-extrabold text-sm shadow-xl hover:bg-slate-100 transition cursor-pointer flex items-center gap-2 border-none"
            >
              <span>Contact Sales Team</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/book-demo')}
              className="px-8 py-4 rounded-full bg-slate-900 text-white font-extrabold text-sm shadow-xl hover:bg-slate-800 transition cursor-pointer border-none"
            >
              Book a Live Demo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
