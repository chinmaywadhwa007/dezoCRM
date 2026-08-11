import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Play,
  Zap,
  ChevronDown,
  Sparkles,
  ArrowLeft,
  Calendar,
  MessageSquare,
  Cpu,
  Check,
  FileText
} from 'lucide-react';
import { useNavigation } from '../../utils/NavigationContext';

export interface ProductDetailData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  industry: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  price: string;
  priceValue: number;
  aiPowered: boolean;
  shortDesc: string;
  overviewText: string;
  impactMetrics: { label: string; value: string; desc: string }[];
  galleryScreenshots: { id: string; title: string; subtitle: string; tag: string }[];
  videoTour: { title: string; duration: string; thumbnail: string };
  featuresList: { title: string; desc: string; icon: string }[];
  pricingTiers: { name: string; price: string; period: string; popular?: boolean; features: string[]; ctaText: string }[];
  technicalSpecs: { category: string; specs: { name: string; value: string }[] }[];
  faqs: { question: string; answer: string }[];
  customerReviews: { name: string; role: string; company: string; rating: number; date: string; title: string; review: string; verified: boolean }[];
  relatedProducts: { id: string; title: string; category: string; price: string; rating: number; shortDesc: string }[];
}

// ── DEFAULT CMS-READY PRODUCT DATASET ──
export const SAMPLE_PRODUCT_DETAIL: ProductDetailData = {
  id: 'schoolycore',
  title: 'SchoolyCore ERP',
  subtitle: 'K-12 & Higher-Education Automated Operations Suite',
  category: 'industry',
  categoryLabel: 'Education & Academics',
  industry: 'Education & Academics',
  badge: 'FEATURED SOLUTION',
  rating: 4.9,
  reviewsCount: 1420,
  price: 'From ₹49/mo',
  priceValue: 49,
  aiPowered: true,
  shortDesc: 'Complete K-12 and Higher-Ed Institute Management platform with automated fee collection, exams, grading, and multi-tenant parent & student portals.',
  overviewText: 'SchoolyCore ERP is designed specifically for modern academic institutions seeking to unify admissions, fee collection, attendance, examination grading, and parent communications into a single zero-friction cloud OS.',
  impactMetrics: [
    { label: 'Operational Time Saved', value: '+45%', desc: 'Reduction in administrative overhead and report generation' },
    { label: 'Fee Payment Recovery', value: '99.2%', desc: 'Automated WhatsApp & SMS payment gateway reminders' },
    { label: 'Parent Engagement', value: '4.8/5.0', desc: 'Active mobile app adoption rate across iOS and Android' }
  ],
  galleryScreenshots: [
    { id: '1', title: 'Executive Operations Dashboard', subtitle: 'Real-time student attendance, fee collections, and academic progress graphs.', tag: 'OVERVIEW' },
    { id: '2', title: 'Automated Fee Collection Engine', subtitle: 'Instant auto-generated invoices with multi-payment gateway reconciliation.', tag: 'FINANCE' },
    { id: '3', title: 'Exams & Automated Report Cards', subtitle: 'Configurable grading scales, transcript generators, and board compliance.', tag: 'ACADEMICS' },
    { id: '4', title: 'Parent & Student iOS / Android App', subtitle: 'Push notifications for homework, attendance alerts, and exam schedules.', tag: 'MOBILE' }
  ],
  videoTour: {
    title: 'Watch SchoolyCore 3-Minute Guided Product Demo',
    duration: '3:20 mins',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
  },
  featuresList: [
    { title: 'Online Admissions & Student Lifecycle', desc: 'Digital application portal with document verification, fee deposits, and enrollment numbers.', icon: 'GraduationCap' },
    { title: 'Automated Fee Billing & Auto-Receipts', desc: 'Schedule recurring fee cycles with SMS & WhatsApp payment links and instant GST receipts.', icon: 'BadgeDollarSign' },
    { title: 'Biometric & Geo-Fenced Mobile Attendance', desc: 'Real-time staff and student attendance logging with automatic parent SMS notifications.', icon: 'Users2' },
    { title: 'Exam Grading & Transcript Generator', desc: 'Customizable grading formulas, GPA calculation, and instant print-ready report cards.', icon: 'FileText' },
    { title: 'Transport & GPS Fleet Live Tracking', desc: 'Real-time route tracking for school buses with parent ETA notifications.', icon: 'Truck' },
    { title: 'Library & Asset Inventory Management', desc: 'Barcode scanner integration for book checkouts, fines, and lab equipment tracking.', icon: 'Boxes' }
  ],
  pricingTiers: [
    {
      name: 'Starter Institute',
      price: '₹29',
      period: '/month',
      features: [
        'Up to 500 Students',
        'Student & Staff Records',
        'Basic Fee Billing & Receipts',
        'Exam Grading Engine',
        'Email Support'
      ],
      ctaText: 'Start 14-Day Free Trial'
    },
    {
      name: 'Professional Campus',
      price: '₹49',
      period: '/month',
      popular: true,
      features: [
        'Up to 2,000 Students',
        'Parent & Student Mobile Apps',
        'WhatsApp Payment Reminders',
        'Biometric Attendance Sync',
        'Transport GPS Fleet Tracker',
        '24/7 Priority Support'
      ],
      ctaText: 'Start Free Trial'
    },
    {
      name: 'Enterprise Network',
      price: '₹99',
      period: '/month',
      features: [
        'Unlimited Students & Campuses',
        'Dedicated Private Cloud Cluster',
        'Custom Webhooks & REST API',
        'Single Sign-On (SSO / SAML 2.0)',
        'Custom Board Report Cards',
        'Dedicated Success Manager'
      ],
      ctaText: 'Contact Enterprise Team'
    }
  ],
  technicalSpecs: [
    {
      category: 'Deployment & Hosting',
      specs: [
        { name: 'Architecture', value: 'Multi-tenant Isolated Microservices' },
        { name: 'Cloud Infrastructure', value: 'AWS / Azure High-Availability Regions' },
        { name: 'Uptime SLA Guarantee', value: '99.99% Financial Backed SLA' }
      ]
    },
    {
      category: 'API & Integrations',
      specs: [
        { name: 'API Standards', value: 'RESTful API & GraphQL Connectors' },
        { name: 'Authentication', value: 'OAuth 2.0, SAML 2.0, Okta, Azure AD' },
        { name: 'Webhooks', value: 'Real-time Webhook Event Triggers' }
      ]
    },
    {
      category: 'Security & Governance',
      specs: [
        { name: 'Compliance Certifications', value: 'SOC 2 Type II, GDPR, ISO 27001' },
        { name: 'Data Encryption', value: 'AES-256 at Rest, TLS 1.3 in Transit' },
        { name: 'Audit Logging', value: 'Immutable User Activity Log History' }
      ]
    }
  ],
  faqs: [
    { question: 'How long does implementation take for a new school?', answer: 'Most institutions complete full data migration and onboarding within 3 to 5 business days using our automated Excel/CSV import tool.' },
    { question: 'Can we customize report cards according to our education board rules?', answer: 'Yes! SchoolyCore includes a drag-and-drop template designer supporting CBSE, ICSE, IB, State Board, and university grading scales.' },
    { question: 'Does the mobile app support offline attendance logging?', answer: 'Yes. Staff can record attendance offline, and the mobile app automatically synchronizes records as soon as internet connectivity is restored.' },
    { question: 'Is my student data secure and compliant with privacy regulations?', answer: 'Absolutely. We maintain bank-grade AES-256 encryption, strict role-based access control, and complete GDPR and SOC2 compliance.' }
  ],
  customerReviews: [
    {
      name: 'Dr. Robert Sterling',
      role: 'Principal & Academic Director',
      company: 'St. Jude International Academy',
      rating: 5,
      date: 'August 2, 2026',
      title: 'Transformed our fee collection and parent trust',
      review: 'Implementing SchoolyCore reduced our uncollected fee ratio from 14% down to under 1% in just two quarters. The WhatsApp automated reminders are a game changer.',
      verified: true
    },
    {
      name: 'Elena Rostova',
      role: 'Head of IT & Operations',
      company: 'Apex Global Education Network',
      rating: 5,
      date: 'July 24, 2026',
      title: 'Seamless rollout across 8 campuses',
      review: 'We migrated 12,000 student records in less than a week. The API webhooks enabled seamless integration with our custom accounting software.',
      verified: true
    }
  ],
  relatedProducts: [
    { id: 'dezoryn-hrms', title: 'Dezoryn HRMS Pulse', category: 'HR & Payroll', price: 'From ₹2,999/mo', rating: 4.9, shortDesc: 'Automated staff payroll, biometric attendance, and performance appraisals.' },
    { id: 'fintrack-erp', title: 'FinTrack Enterprise ERP', category: 'Finance & Tax', price: 'From ₹3,499/mo', rating: 4.8, shortDesc: 'General ledger, multi-currency accounting, and automated GST billing.' },
    { id: 'hms-health', title: 'Dezo Care HMS', category: 'Healthcare', price: 'From ₹6,999/mo', rating: 4.8, shortDesc: 'Enterprise Hospital Management System covering OPD/IPD and EHR.' }
  ]
};

export const ProductDetailPage: React.FC<{ productId?: string }> = ({ productId }) => {
  const { navigateTo } = useNavigation();
  const [product, setProduct] = useState<ProductDetailData>(SAMPLE_PRODUCT_DETAIL);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState<number>(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [productId]);

  // Fetch product detail from backend API if available
  useEffect(() => {
    if (!productId) return;
    const fetchBackendProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/products/${productId}`);
        const result = await res.json();
        if (result.success && result.data) {
          // Merge with sample schema fallback
          setProduct({
            ...SAMPLE_PRODUCT_DETAIL,
            ...result.data,
            id: result.data.id || productId,
            title: result.data.title || SAMPLE_PRODUCT_DETAIL.title,
            shortDesc: result.data.description || result.data.shortDesc || SAMPLE_PRODUCT_DETAIL.shortDesc,
            rating: result.data.rating || SAMPLE_PRODUCT_DETAIL.rating,
            reviewsCount: result.data.reviewsCount || SAMPLE_PRODUCT_DETAIL.reviewsCount,
            customerReviews: (result.data.customerReviews && result.data.customerReviews.length > 0)
              ? result.data.customerReviews
              : SAMPLE_PRODUCT_DETAIL.customerReviews
          });
        }
      } catch (_err) {
        // Fallback to CMS sample product
      }
    };
    fetchBackendProduct();
  }, [productId]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden transition-colors duration-300">
      
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-gradient-to-b from-blue-600/15 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b05_1px,transparent_1px),linear-gradient(to_bottom,#1e293b05_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />

      <main className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        
        {/* ── BREADCRUMBS & BACK BUTTON ── */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800/80 text-xs font-extrabold">
          <button
            type="button"
            onClick={() => navigateTo('/marketplace')}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace Catalog</span>
          </button>

          <div className="flex items-center gap-2 text-slate-400">
            <span onClick={() => navigateTo('/marketplace')} className="hover:underline cursor-pointer">Marketplace</span>
            <span>/</span>
            <span className="text-slate-600 dark:text-slate-300">{product.categoryLabel}</span>
            <span>/</span>
            <span className="text-blue-600 dark:text-cyan-400 font-black">{product.title}</span>
          </div>
        </div>

        {/* ── SECTION 1: HERO SECTION ── */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-400/30 text-blue-600 dark:text-cyan-400 font-black text-xs uppercase tracking-wider">
                  {product.badge}
                </span>

                {product.aiPowered && (
                  <span className="px-3 py-1 rounded-full bg-slate-900 dark:bg-slate-800 border border-cyan-400/50 text-cyan-300 font-extrabold text-xs flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>AI Powered OS</span>
                  </span>
                )}

                <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-medium">({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3 leading-tight">
                {product.title}
              </h1>
              
              <p className="text-lg font-bold text-blue-600 dark:text-cyan-300 mb-4">
                {product.subtitle}
              </p>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-6">
                {product.shortDesc}
              </p>

              {/* Quick Highlight Pills */}
              <div className="flex flex-wrap gap-3">
                {['1-Click Deploy', '99.99% Uptime SLA', 'SOC2 Certified', '14-Day Free Trial'].map((pill) => (
                  <span key={pill} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-extrabold text-slate-700 dark:text-slate-300 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT (2-COLUMN GRID WITH STICKY RIGHT SIDEBAR) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── LEFT MAIN SECTION COLUMN (8 COLS) ── */}
          <div className="lg:col-span-8 space-y-14">

            {/* ── SECTION 2 & 3: GALLERY & VIDEO TOUR ── */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl backdrop-blur-xl">
              
              {/* Main Screenshot Stage */}
              <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden mb-4 group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/10 to-transparent pointer-events-none" />
                
                {/* Simulated High-Res Dashboard Screenshot */}
                <div className="w-full h-full p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="ml-2 text-xs font-mono text-slate-400">https://app.dezoryn.com/{product.id}/preview</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsVideoModalOpen(true)}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 hover:scale-105 transition cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch Product Tour</span>
                    </button>
                  </div>

                  <div className="my-auto text-center p-6 bg-slate-900/90 rounded-2xl border border-slate-800/90 max-w-xl mx-auto backdrop-blur-md shadow-2xl">
                    <span className="px-2.5 py-1 rounded bg-blue-500/20 text-cyan-300 font-extrabold text-[10px] uppercase border border-cyan-400/30">
                      {product.galleryScreenshots[activeScreenshotIdx]?.tag}
                    </span>
                    <h3 className="text-xl font-black text-white mt-2 mb-1">
                      {product.galleryScreenshots[activeScreenshotIdx]?.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {product.galleryScreenshots[activeScreenshotIdx]?.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Live Production Cluster</span>
                    <span>HD 4K Interface Preview</span>
                  </div>
                </div>
              </div>

              {/* Gallery Thumbnails Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {product.galleryScreenshots.map((shot, idx) => {
                  const isActive = idx === activeScreenshotIdx;
                  return (
                    <button
                      key={shot.id}
                      type="button"
                      onClick={() => setActiveScreenshotIdx(idx)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 dark:bg-cyan-500/10 border-blue-600 dark:border-cyan-400 shadow-md'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-[10px] font-black text-blue-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
                        {shot.tag}
                      </div>
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1">
                        {shot.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ── SECTION 4: OVERVIEW & IMPACT METRICS ── */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
                <span>Executive Overview</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-8">
                {product.overviewText}
              </p>

              {/* Impact Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {product.impactMetrics.map((metric, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-left">
                    <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-cyan-300 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white mb-1">
                      {metric.label}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal font-normal">
                      {metric.desc}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SECTION 5: FEATURES GRID ── */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-cyan-400" />
                <span>Core Capabilities & Features</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.featuresList.map((feat, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition text-left flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-400/30 text-blue-600 dark:text-cyan-300 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SECTION 6: PRICING TIERS ── */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                  Transparent Subscription Pricing
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Select the ideal plan for your institution. Upgrade, downgrade, or cancel anytime.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.pricingTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`rounded-3xl p-6 flex flex-col justify-between text-left transition-all ${
                      tier.popular
                        ? 'bg-gradient-to-b from-blue-900/40 via-slate-900 to-slate-900 border-2 border-blue-500 dark:border-cyan-400 shadow-2xl scale-102 relative'
                        : 'bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                        MOST POPULAR
                      </span>
                    )}

                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">{tier.name}</h3>
                      <div className="flex items-baseline gap-1 my-3">
                        <span className="text-3xl font-black text-slate-900 dark:text-white">{tier.price}</span>
                        <span className="text-xs text-slate-400 font-bold">{tier.period}</span>
                      </div>

                      <div className="space-y-2.5 my-6 pt-4 border-t border-slate-200 dark:border-slate-700/80">
                        {tier.features.map((f, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigateTo('/book-demo')}
                      className={`w-full py-3 rounded-2xl font-extrabold text-xs shadow-md transition cursor-pointer ${
                        tier.popular
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white'
                      }`}
                    >
                      {tier.ctaText}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SECTION 7: TECHNICAL SPECIFICATIONS ── */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-purple-400" />
                <span>Technical Specifications & Compliance</span>
              </h2>

              <div className="space-y-6">
                {product.technicalSpecs.map((cat, idx) => (
                  <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <div className="bg-slate-100 dark:bg-slate-800/80 px-5 py-3 text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      {cat.category}
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {cat.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="grid grid-cols-1 sm:grid-cols-2 p-4 text-xs">
                          <span className="font-bold text-slate-500 dark:text-slate-400">{spec.name}</span>
                          <span className="font-extrabold text-slate-900 dark:text-white">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SECTION 9: PRODUCT FAQS ── */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                {product.faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden text-left">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full p-4 flex items-center justify-between text-sm font-extrabold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── SECTION 10: CUSTOMER REVIEWS ── */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                    Verified Customer Reviews
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Based on verified enterprise buyer ratings
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-2xl border border-amber-500/20">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-xl font-black text-amber-500">{product.rating}</span>
                  <span className="text-xs font-bold text-slate-400">/ 5.0 Rating</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.customerReviews.map((rev, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-left flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, rIdx) => (
                            <Star key={rIdx} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold">{rev.date}</span>
                      </div>

                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">{rev.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-4">
                        "{rev.review}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-extrabold text-slate-900 dark:text-white">{rev.name}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{rev.role} • {rev.company}</div>
                      </div>
                      {rev.verified && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-[9px] uppercase border border-emerald-500/20">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SECTION 11: RELATED PRODUCTS ── */}
            <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
                Related Software Products
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.relatedProducts.map((rel) => (
                  <div key={rel.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-left flex flex-col justify-between hover:border-blue-500/50 transition">
                    <div>
                      <span className="text-[10px] font-extrabold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">{rel.category}</span>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-1 mb-2">{rel.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4 font-normal">{rel.shortDesc}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{rel.price}</span>
                      <button
                        type="button"
                        onClick={() => navigateTo('/marketplace')}
                        className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SECTION 12: BOOK DEMO CTA BANNER ── */}
            <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl p-10 text-white text-center shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                Experience {product.title} Live
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto mb-6">
                Schedule a 1-on-1 walkthrough with a software architect to see custom workflows and data migration options.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => navigateTo('/book-demo')}
                  className="px-6 py-3 rounded-full bg-white text-blue-600 font-extrabold text-xs shadow-lg hover:bg-slate-100 transition cursor-pointer flex items-center gap-2 border-none"
                >
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Book 1-on-1 Live Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('/contact-sales')}
                  className="px-6 py-3 rounded-full bg-blue-700/60 hover:bg-blue-700 text-white font-bold text-xs border border-blue-400/40 transition cursor-pointer"
                >
                  Contact Architect
                </button>
              </div>
            </section>

          </div>

          {/* ── RIGHT STICKY SIDEBAR (4 COLS) ── */}
          <div className="lg:col-span-4 sticky top-24 z-20 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xl backdrop-blur-xl text-left space-y-6">
              
              {/* Sidebar Header & Price */}
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Starting Subscription</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white text-emerald-600 dark:text-emerald-400">{product.price}</span>
                  <span className="text-xs text-slate-400 font-semibold">billed monthly</span>
                </div>
              </div>

              {/* Action Buttons Stack */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition cursor-pointer flex items-center justify-center gap-2 border-none"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Interactive Demo</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('/book-demo')}
                  className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2 border-none"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book 1-on-1 Live Demo</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('/contact-sales')}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Architect</span>
                </button>
              </div>

              {/* Quick Spec List */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Instant Sandbox Access</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>14-Day Risk-Free Trial</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>SOC 2 Type II Certified</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* ── DEMO VIDEO MODAL ── */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl z-10 text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="font-extrabold text-white text-base flex items-center gap-2">
                  <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                  <span>{product.title} Guided Interactive Tour</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="text-slate-400 hover:text-white font-bold text-sm px-2 py-1 rounded-lg bg-slate-800 cursor-pointer"
                >
                  Close ✕
                </button>
              </div>

              <div className="relative w-full h-[400px] bg-slate-950 rounded-2xl overflow-hidden flex flex-col items-center justify-center border border-slate-800">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30 animate-pulse mb-4 cursor-pointer">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
                <div className="text-base font-extrabold text-white">Playing Product Walkthrough</div>
                <div className="text-xs text-slate-400 mt-1">Duration: {product.videoTour.duration}</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage;
