import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Sparkles,
  X,
  Send,
  MessageSquare,
  Calendar,
  PhoneCall,
  Ticket,
  BookOpen,
  HelpCircle,
  LayoutDashboard,
  GraduationCap,
  Tag,
  Store,
  Layers,
  FileText,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  Zap,
  CheckCircle2,
  GripVertical,
  Sun,
  Moon
} from 'lucide-react';
import { useNavigation } from '../../utils/NavigationContext';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickReplies?: { label: string; action: () => void }[];
  cta?: { label: string; route?: string; link?: string; onClick?: () => void };
}

export const openDezoAI = (query?: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-dezo-ai', { detail: { query } }));
  }
};

export const DezoAIWidget: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'ticket' | 'faq'>('home');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [widgetTheme, setWidgetTheme] = useState<'dark' | 'light'>('dark');

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  // Sync widget theme with document dark mode & window resize
  useEffect(() => {
    setMounted(true);

    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
      setWidgetTheme(isDark ? 'dark' : 'light');
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Listen for open-dezo-ai global trigger events across the app
  useEffect(() => {
    const handleOpenAI = (e: Event) => {
      setIsOpen(true);
      const detail = (e as CustomEvent)?.detail;
      if (detail?.query) {
        handleSendMessage(detail.query);
      }
    };

    window.addEventListener('open-dezo-ai', handleOpenAI);
    return () => window.removeEventListener('open-dezo-ai', handleOpenAI);
  }, []);

  const toggleWidgetTheme = () => {
    setWidgetTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = widgetTheme === 'dark';

  // Compute strict viewport drag constraints so widget cannot leave screen bounds
  const pillConstraints = {
    left: -(windowSize.width - 232 - 48),
    right: 0,
    top: -(windowSize.height - 64 - 48),
    bottom: 0
  };

  const panelWidth = Math.min(420, windowSize.width - 32);
  const panelHeight = Math.min(640, windowSize.height - 48);

  const panelConstraints = {
    left: -(windowSize.width - panelWidth - 48),
    right: 0,
    top: -(windowSize.height - panelHeight - 48),
    bottom: 0
  };

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard navigation & ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Initial typing welcome lines
  const welcomeLines = [
    "Hello 👋",
    "Welcome to DezoCRM.",
    "I'm DezoAI.",
    "How can I help you today?"
  ];
  const [visibleWelcomeLines, setVisibleWelcomeLines] = useState<number>(0);

  useEffect(() => {
    if (isOpen && visibleWelcomeLines < welcomeLines.length) {
      const timer = setTimeout(() => {
        setVisibleWelcomeLines(prev => prev + 1);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [isOpen, visibleWelcomeLines]);

  // Initial Chat Messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Welcome to DezoCRM! I'm DezoAI, your enterprise assistant. I can answer questions about CRM features, ERP modules, pricing, or help you schedule a demo.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: [
        { label: "Book a Demo", action: () => navigateTo('/book-demo') },
        { label: "View Pricing", action: () => navigateTo('/pricing') },
        { label: "Contact Sales", action: () => navigateTo('/contact-sales') }
      ]
    }
  ]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  // Quick Action items
  const quickActions = [
    {
      id: 'crm',
      title: 'CRM Platform',
      icon: LayoutDashboard,
      color: isDark ? 'from-blue-500/20 to-cyan-500/20 text-cyan-400' : 'from-blue-100 to-cyan-100 text-cyan-700',
      query: 'Tell me about the DezoCRM Platform features.'
    },
    {
      id: 'erp',
      title: 'School ERP',
      icon: GraduationCap,
      color: isDark ? 'from-purple-500/20 to-indigo-500/20 text-purple-400' : 'from-purple-100 to-indigo-100 text-purple-700',
      query: 'What modules are included in the Dezo School ERP?'
    },
    {
      id: 'pricing',
      title: 'Pricing',
      icon: Tag,
      color: isDark ? 'from-emerald-500/20 to-teal-500/20 text-emerald-400' : 'from-emerald-100 to-teal-100 text-emerald-700',
      query: 'What are the DezoCRM subscription plans and pricing details?'
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      icon: Store,
      color: isDark ? 'from-amber-500/20 to-orange-500/20 text-amber-400' : 'from-amber-100 to-orange-100 text-amber-700',
      query: 'What extensions and add-ons are in the Dezo Marketplace?'
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: Layers,
      color: isDark ? 'from-pink-500/20 to-rose-500/20 text-pink-400' : 'from-pink-100 to-rose-100 text-pink-700',
      query: 'Which third-party services and APIs does Dezo CRM integrate with?'
    },
    {
      id: 'docs',
      title: 'Documentation',
      icon: FileText,
      color: isDark ? 'from-sky-500/20 to-blue-500/20 text-sky-400' : 'from-sky-100 to-blue-100 text-sky-700',
      query: 'Where can I find developer API documentation and guides?'
    }
  ];

  // Popular Question chips
  const popularQuestions = [
    "How much does CRM cost?",
    "Can I schedule a demo?",
    "Do you offer API integrations?",
    "Which ERP modules are available?",
    "How do I migrate my existing CRM?"
  ];

  // Support Action cards
  const supportActions = [
    {
      id: 'live-chat',
      title: 'Live Chat',
      desc: 'Connect with DezoAI instant engine',
      icon: MessageSquare,
      color: isDark ? 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30' : 'text-cyan-600 bg-cyan-50 border-cyan-200',
      onClick: () => setActiveTab('chat')
    },
    {
      id: 'book-demo',
      title: 'Book Product Demo',
      desc: 'Schedule a 1-on-1 personalized walkthrough',
      icon: Calendar,
      color: isDark ? 'text-purple-400 bg-purple-950/40 border-purple-500/30' : 'text-purple-600 bg-purple-50 border-purple-200',
      onClick: () => navigateTo('/book-demo')
    },
    {
      id: 'contact-sales',
      title: 'Contact Sales',
      desc: 'Speak directly with our enterprise team',
      icon: PhoneCall,
      color: isDark ? 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30' : 'text-emerald-600 bg-emerald-50 border-emerald-200',
      onClick: () => navigateTo('/contact-sales')
    },
    {
      id: 'raise-ticket',
      title: 'Raise Support Ticket',
      desc: 'Submit a ticket to our 24/7 support desk',
      icon: Ticket,
      color: isDark ? 'text-amber-400 bg-amber-950/40 border-amber-500/30' : 'text-amber-600 bg-amber-50 border-amber-200',
      onClick: () => setActiveTab('ticket')
    },
    {
      id: 'help-center',
      title: 'Help Center',
      desc: 'Browse user guides and tutorials',
      icon: BookOpen,
      color: isDark ? 'text-blue-400 bg-blue-950/40 border-blue-500/30' : 'text-blue-600 bg-blue-50 border-blue-200',
      onClick: () => navigateTo('/products')
    },
    {
      id: 'faqs',
      title: 'FAQs',
      desc: 'Frequently asked questions',
      icon: HelpCircle,
      color: isDark ? 'text-pink-400 bg-pink-950/40 border-pink-500/30' : 'text-pink-600 bg-pink-50 border-pink-200',
      onClick: () => setActiveTab('faq')
    }
  ];

  // FAQ list
  const faqs = [
    {
      q: "What makes DezoCRM different from traditional CRMs?",
      a: "DezoCRM combines AI-driven lead scoring, automated sales pipelines, omnichannel communications, and built-in School ERP governance into a unified enterprise platform."
    },
    {
      q: "How does the free trial work?",
      a: "You get full enterprise access for 14 days with no credit card required. You can invite unlimited team members and test all automation workflows."
    },
    {
      q: "Can I migrate existing contacts and deal data?",
      a: "Yes! DezoCRM includes one-click migration wizards for Salesforce, HubSpot, Zoho, Excel/CSV, and SQL databases."
    },
    {
      q: "Is DezoCRM SOC-2 and GDPR compliant?",
      a: "Absolutely. We enforce end-to-end 256-bit encryption, role-based security control, automated daily backups, and strict data privacy compliance."
    }
  ];

  // Simulated AI Knowledge Base & Response Generator
  const generateAIResponse = (userQuery: string): { text: string; cta?: { label: string; route?: string } } => {
    const q = userQuery.toLowerCase();
    
    if (q.includes('cost') || q.includes('price') || q.includes('pricing') || q.includes('plan')) {
      return {
        text: "DezoCRM offers scalable plans tailored to growing teams and enterprises:\n\n• **Starter**: $29/user/mo (Essential CRM & Lead Tracking)\n• **Professional**: $79/user/mo (Advanced AI Pipeline & Automations)\n• **Enterprise**: Custom volume pricing with dedicated SLA, custom ERP integrations & 24/7 manager.",
        cta: { label: "Explore Detailed Pricing", route: "/pricing" }
      };
    }
    
    if (q.includes('demo') || q.includes('schedule') || q.includes('book')) {
      return {
        text: "You can schedule a personalized 1-on-1 live product demo with our solution architects! We'll walk you through automated pipelines, AI scoring, and custom ERP integration.",
        cta: { label: "Book a Demo Now", route: "/book-demo" }
      };
    }

    if (q.includes('erp') || q.includes('school') || q.includes('education')) {
      return {
        text: "Dezo School ERP includes 15+ specialized modules:\n\n• Student Information & Admissions\n• Fee Management & Billing\n• Examination & Report Cards\n• Parent-Teacher Portal\n• Transport & Asset Tracking",
        cta: { label: "View All ERP Products", route: "/products" }
      };
    }

    if (q.includes('api') || q.includes('integration') || q.includes('connect')) {
      return {
        text: "DezoCRM supports over 100+ native integrations including WhatsApp Business, Gmail, Outlook, Stripe, Zapier, Slack, and REST APIs for custom webhooks.",
        cta: { label: "Explore Marketplace", route: "/products" }
      };
    }

    if (q.includes('migrate') || q.includes('switch') || q.includes('import')) {
      return {
        text: "Migration to DezoCRM is effortless! Our automated import wizard lets you import CSV/Excel data or sync directly from Salesforce, HubSpot, and Zoho with zero downtime.",
        cta: { label: "Contact Migration Specialist", route: "/contact-sales" }
      };
    }

    return {
      text: `DezoAI has processed your request regarding "${userQuery}". DezoCRM delivers end-to-end sales pipeline automation, real-time analytics, and intelligent customer engagement tailored to high-growth organizations.`,
      cta: { label: "Contact Sales Specialist", route: "/contact-sales" }
    };
  };

  // Submit User Message
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setActiveTab('chat');
    setIsTyping(true);

    // Dynamic AI response stream delay
    setTimeout(() => {
      const responseData = generateAIResponse(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cta: responseData.cta ? {
          label: responseData.cta.label,
          onClick: () => responseData.cta?.route && navigateTo(responseData.cta.route as any)
        } : undefined
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  // Submit Support Ticket state
  const [ticketForm, setTicketForm] = useState({ name: '', email: '', subject: '', priority: 'Medium', message: '' });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketForm({ name: '', email: '', subject: '', priority: 'Medium', message: '' });
      setActiveTab('chat');
      setMessages(prev => [
        ...prev,
        {
          id: `ticket-confirm-${Date.now()}`,
          sender: 'bot',
          text: `✅ Support Ticket #${Math.floor(100000 + Math.random() * 900000)} has been created successfully! Our team will reach out to ${ticketForm.email || 'your email'} within 2 hours.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-8 right-8 z-[9999] font-['Plus_Jakarta_Sans',sans-serif] pointer-events-auto">
      {/* ---------------------------------------------------- */}
      {/* CLOSED STATE: FLOATING & DRAGGABLE PILL BUTTON        */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="dezo-pill"
            drag
            dragConstraints={pillConstraints}
            dragElastic={0.05}
            dragMomentum={true}
            whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -12, 4, -10, 0], // Continuous multi-axis levitation float
              x: [0, 6, -6, 4, 0],
              rotate: [0, 2, -2, 1, 0]
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 }
            }}
            onClick={() => setIsOpen(true)}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open DezoAI Help & Support Assistant (Drag anywhere)"
            className={`group relative flex items-center justify-between w-[232px] h-[64px] px-3.5 py-2 rounded-full cursor-grab select-none backdrop-blur-xl transition-all duration-300 overflow-hidden ${
              isDark
                ? 'bg-slate-900/85 border border-cyan-500/35 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:border-cyan-400/70'
                : 'bg-white/95 border border-cyan-500/40 shadow-[0_10px_35px_rgba(6,182,212,0.2)] hover:shadow-[0_15px_45px_rgba(6,182,212,0.35)] hover:border-cyan-500'
            }`}
          >
            {/* Ambient Background Gradient Beam */}
            <div className={`absolute inset-0 bg-gradient-to-r opacity-70 group-hover:opacity-100 transition-opacity duration-500 ${
              isDark ? 'from-cyan-500/15 via-blue-600/20 to-purple-600/15' : 'from-cyan-400/20 via-blue-400/15 to-purple-400/20'
            }`} />
            <div className={`absolute -inset-[1px] rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 ${
              isDark ? 'from-cyan-500/50 via-blue-500/40 to-purple-500/50' : 'from-cyan-400/60 via-blue-400/50 to-purple-400/60'
            }`} />

            {/* Left Drag Indicator Grip */}
            <div className={`relative z-10 transition-colors pr-0.5 ${
              isDark ? 'text-slate-500 group-hover:text-cyan-400' : 'text-slate-400 group-hover:text-cyan-600'
            }`} title="Drag me anywhere on screen">
              <GripVertical className="w-3.5 h-3.5" />
            </div>

            {/* Left Content: Glowing AI Avatar Icon */}
            <div className="relative z-10 flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                <div className={`w-full h-full rounded-full flex items-center justify-center transition-colors ${
                  isDark ? 'bg-slate-950 group-hover:bg-slate-900' : 'bg-slate-900 group-hover:bg-slate-800'
                }`}>
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 0.95, 1] }}
                    transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
                    className="group-hover:rotate-12 transition-transform duration-300"
                  >
                    <Bot className="w-5 h-5 text-cyan-300 group-hover:scale-110 transition-transform" />
                  </motion.div>
                </div>
                {/* Pulse Glow Ring */}
                <div className="absolute inset-0 rounded-full animate-pulse-glow bg-cyan-400/20 blur-md pointer-events-none" />
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col text-left">
                <span className={`text-sm font-bold tracking-tight transition-colors flex items-center gap-1 ${
                  isDark ? 'text-white group-hover:text-cyan-200' : 'text-slate-900 group-hover:text-cyan-600'
                }`}>
                  Ask DezoAI
                </span>
                <span className={`text-[11px] font-medium transition-colors flex items-center gap-1 ${
                  isDark ? 'text-cyan-400/80 group-hover:text-cyan-300' : 'text-cyan-600 group-hover:text-cyan-700'
                }`}>
                  Instant Help
                </span>
              </div>
            </div>

            {/* Right: Pulsing Green Online Status Dot */}
            <div className="relative z-10 flex items-center justify-center pr-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------- */}
      {/* EXPANDED ASSISTANT PANEL (DARK & LIGHT THEME)        */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dezo-panel"
            role="dialog"
            aria-label="DezoAI Assistant"
            drag
            dragConstraints={panelConstraints}
            dragElastic={0.05}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 28
            }}
            className={`w-[calc(100vw-2rem)] sm:w-[380px] md:w-[420px] h-[640px] max-h-[88vh] rounded-[24px] backdrop-blur-2xl flex flex-col relative overflow-hidden select-none ${
              isDark
                ? 'bg-slate-950/90 border border-cyan-500/35 shadow-[0_25px_65px_rgba(0,0,0,0.85),0_0_50px_rgba(6,182,212,0.2)]'
                : 'bg-white/95 border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.12),0_0_35px_rgba(6,182,212,0.18)] text-slate-800'
            }`}
          >
            {/* Top Drag Grip Bar */}
            <div className={`w-full py-1 cursor-grab active:cursor-grabbing flex justify-center border-b ${
              isDark ? 'bg-slate-950/80 border-slate-900' : 'bg-slate-100/90 border-slate-200'
            }`}>
              <div className={`w-12 h-1 rounded-full ${isDark ? 'bg-slate-700/60' : 'bg-slate-300'}`} />
            </div>

            {/* Ambient Background Aurora & Radial Effects */}
            <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none animate-pulse-glow ${
              isDark ? 'bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent' : 'bg-gradient-to-b from-cyan-400/20 via-blue-400/15 to-transparent'
            }`} />
            <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
              isDark ? 'bg-gradient-to-t from-purple-600/15 via-indigo-600/10 to-transparent' : 'bg-gradient-to-t from-purple-400/15 via-indigo-400/10 to-transparent'
            }`} />

            {/* Glowing Border Beam Effect */}
            <div className={`absolute inset-0 rounded-[24px] pointer-events-none border ${
              isDark ? 'border-cyan-400/20 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]' : 'border-cyan-500/20 shadow-[inset_0_0_15px_rgba(6,182,212,0.08)]'
            }`} />

            {/* ---------------------------------------------------- */}
            {/* PANEL HEADER                                         */}
            {/* ---------------------------------------------------- */}
            <div className={`relative z-20 flex items-center justify-between px-5 py-4 border-b backdrop-blur-md ${
              isDark ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-200/90 bg-white/80'
            }`}>
              <div className="flex items-center gap-3">
                {/* Bot Avatar with Halo */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${
                    isDark ? 'bg-slate-900' : 'bg-slate-900 text-white'
                  }`}>
                    <Sparkles className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className={`text-base font-bold bg-clip-text text-transparent ${
                      isDark
                        ? 'bg-gradient-to-r from-white via-slate-100 to-cyan-300'
                        : 'bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-600'
                    }`}>
                      DezoAI Assistant
                    </span>
                    {/* Live Online Badge */}
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full flex items-center gap-1 ${
                      isDark
                        ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/30'
                        : 'text-emerald-700 bg-emerald-50 border border-emerald-300'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Online
                    </span>
                  </div>
                  <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Enterprise Help & AI Support
                  </span>
                </div>
              </div>

              {/* Action Buttons: Theme Toggle, Reset & Close */}
              <div className="flex items-center gap-1.5">
                {/* Sun / Moon Light & Dark Theme Toggle Button */}
                <button
                  onClick={toggleWidgetTheme}
                  title={`Switch to ${isDark ? 'Light' : 'Dark'} Theme`}
                  className={`p-1.5 rounded-full transition-all ${
                    isDark
                      ? 'text-slate-400 hover:text-amber-300 hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-purple-600 hover:bg-slate-200/80'
                  }`}
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                </button>

                {activeTab === 'chat' && (
                  <button
                    onClick={() => {
                      setMessages([
                        {
                          id: `welcome-${Date.now()}`,
                          sender: 'bot',
                          text: "Conversation reset! How can DezoAI assist you now?",
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                    }}
                    title="Reset Conversation"
                    className={`p-1.5 rounded-full transition-all ${
                      isDark
                        ? 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60'
                        : 'text-slate-600 hover:text-cyan-600 hover:bg-slate-200/80'
                    }`}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant (ESC)"
                  className={`p-1.5 rounded-full transition-all hover:rotate-90 duration-200 ${
                    isDark
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* PANEL NAVIGATION TABS                                */}
            {/* ---------------------------------------------------- */}
            <div className={`relative z-20 flex items-center px-4 py-2 border-b gap-1 text-xs font-semibold ${
              isDark ? 'border-slate-800/50 bg-slate-900/40' : 'border-slate-200/80 bg-slate-100/60'
            }`}>
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'home'
                    ? isDark
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                      : 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-700 border border-cyan-500/40 shadow-sm'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'chat'
                    ? isDark
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                      : 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-700 border border-cyan-500/40 shadow-sm'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                AI Chat
              </button>
              <button
                onClick={() => setActiveTab('ticket')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'ticket'
                    ? isDark
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                      : 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-700 border border-cyan-500/40 shadow-sm'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Ticket className="w-3.5 h-3.5" />
                Ticket
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'faq'
                    ? isDark
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                      : 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-700 border border-cyan-500/40 shadow-sm'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                FAQ
              </button>
            </div>

            {/* ---------------------------------------------------- */}
            {/* MAIN CONTENT CONTAINER                               */}
            {/* ---------------------------------------------------- */}
            <div className="relative z-10 flex-1 overflow-y-auto px-5 py-4 scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-800 scrollbar-track-transparent">
              
              {/* TAB 1: HOME DASHBOARD */}
              {activeTab === 'home' && (
                <div className="space-y-6">
                  {/* Sequential Typing Welcome Animation */}
                  <div className={`p-4 rounded-2xl border shadow-md relative overflow-hidden ${
                    isDark
                      ? 'bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/30 border-cyan-500/25'
                      : 'bg-gradient-to-br from-cyan-50/90 via-slate-50 to-blue-50/60 border-cyan-200'
                  }`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
                    <div className="space-y-1.5">
                      {welcomeLines.slice(0, visibleWelcomeLines).map((line, idx) => (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`text-sm ${
                            idx === 0
                              ? isDark ? 'font-bold text-cyan-300 text-base' : 'font-bold text-cyan-600 text-base'
                              : idx === 3
                              ? isDark ? 'font-semibold text-white' : 'font-semibold text-slate-900'
                              : isDark ? 'text-slate-300' : 'text-slate-700'
                          }`}
                        >
                          {line}
                        </motion.p>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions Grid */}
                  <div>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <Zap className="w-3.5 h-3.5 text-cyan-500" />
                      Quick Actions
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {quickActions.map(qa => {
                        const Icon = qa.icon;
                        return (
                          <motion.button
                            key={qa.id}
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleSendMessage(qa.query)}
                            className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all text-left group ${
                              isDark
                                ? 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-850'
                                : 'bg-white/90 border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 shadow-sm'
                            }`}
                          >
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${qa.color} border border-slate-700/30 group-hover:scale-110 transition-transform`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className={`text-xs font-semibold transition-colors ${
                              isDark ? 'text-slate-200 group-hover:text-cyan-300' : 'text-slate-800 group-hover:text-cyan-600'
                            }`}>
                              {qa.title}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Popular Questions (Chips) */}
                  <div>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                      Popular Questions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {popularQuestions.map((q, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleSendMessage(q)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all shadow-sm ${
                            isDark
                              ? 'bg-slate-900/80 border-cyan-500/20 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-200'
                              : 'bg-white/90 border-slate-200 text-slate-700 hover:text-cyan-700 hover:border-cyan-400 hover:bg-cyan-50'
                          }`}
                        >
                          {q}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Support Actions Cards */}
                  <div>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                      Support Options
                    </h4>
                    <div className="space-y-2">
                      {supportActions.map(action => {
                        const Icon = action.icon;
                        return (
                          <motion.button
                            key={action.id}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={action.onClick}
                            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left group ${
                              isDark
                                ? 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-850/80'
                                : 'bg-white/90 border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/40 shadow-sm'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl border ${action.color}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col">
                                <span className={`text-xs font-bold transition-colors ${
                                  isDark ? 'text-slate-100 group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-600'
                                }`}>
                                  {action.title}
                                </span>
                                <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                  {action.desc}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className={`w-4 h-4 transition-all ${
                              isDark
                                ? 'text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1'
                                : 'text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1'
                            }`} />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: AI CHAT FEED */}
              {activeTab === 'chat' && (
                <div className="space-y-4">
                  {messages.map(msg => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-end gap-2 max-w-[88%]">
                        {msg.sender === 'bot' && (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] flex-shrink-0">
                            <div className={`w-full h-full rounded-full flex items-center justify-center ${
                              isDark ? 'bg-slate-950' : 'bg-slate-900 text-white'
                            }`}>
                              <Bot className="w-3.5 h-3.5 text-cyan-300" />
                            </div>
                          </div>
                        )}

                        <div
                          className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                              : isDark
                              ? 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                              : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>

                          {/* Quick CTA button in bot response */}
                          {msg.cta && (
                            <button
                              onClick={msg.cta.onClick}
                              className={`mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                isDark
                                  ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                                  : 'bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-300'
                              }`}
                            >
                              {msg.cta.label}
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <span className={`text-[10px] mt-1 px-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        {msg.timestamp}
                      </span>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
                        <div className={`w-full h-full rounded-full flex items-center justify-center ${
                          isDark ? 'bg-slate-950' : 'bg-slate-900 text-white'
                        }`}>
                          <Bot className="w-3.5 h-3.5 text-cyan-300" />
                        </div>
                      </div>
                      <div className={`p-3 rounded-2xl text-xs flex items-center gap-1.5 border ${
                        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600 shadow-sm'
                      }`}>
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping delay-150" />
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-300" />
                        <span className={`ml-1 font-medium text-[11px] ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}>
                          DezoAI is analyzing...
                        </span>
                      </div>
                    </motion.div>
                  )}

                  <div ref={chatEndRef} />
                </div>
              )}

              {/* TAB 3: RAISE SUPPORT TICKET */}
              {activeTab === 'ticket' && (
                <div className="space-y-4">
                  <div className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-slate-900/80 border-cyan-500/20' : 'bg-white border-cyan-300 shadow-sm'
                  }`}>
                    <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <Ticket className="w-4 h-4 text-cyan-500" />
                      Submit a Support Ticket
                    </h4>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Our enterprise support team responds within 2 business hours.
                    </p>
                  </div>

                  {ticketSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-6 rounded-2xl border text-center space-y-3 ${
                        isDark ? 'bg-emerald-950/40 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
                      }`}
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                      <h4 className={`text-sm font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                        Ticket Submitted!
                      </h4>
                      <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        We have received your ticket request. Confirmation details sent to your inbox.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleTicketSubmit} className="space-y-3 text-xs">
                      <div>
                        <label className={`block font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Your Name</label>
                        <input
                          type="text"
                          required
                          value={ticketForm.name}
                          onChange={e => setTicketForm({ ...ticketForm, name: e.target.value })}
                          placeholder="John Doe"
                          className={`w-full px-3 py-2 rounded-xl border transition-all focus:outline-none ${
                            isDark
                              ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400'
                              : 'bg-white border-slate-200 text-slate-900 focus:border-cyan-500 shadow-sm'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Work Email</label>
                        <input
                          type="email"
                          required
                          value={ticketForm.email}
                          onChange={e => setTicketForm({ ...ticketForm, email: e.target.value })}
                          placeholder="john@company.com"
                          className={`w-full px-3 py-2 rounded-xl border transition-all focus:outline-none ${
                            isDark
                              ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400'
                              : 'bg-white border-slate-200 text-slate-900 focus:border-cyan-500 shadow-sm'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Subject</label>
                        <input
                          type="text"
                          required
                          value={ticketForm.subject}
                          onChange={e => setTicketForm({ ...ticketForm, subject: e.target.value })}
                          placeholder="Issue description..."
                          className={`w-full px-3 py-2 rounded-xl border transition-all focus:outline-none ${
                            isDark
                              ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400'
                              : 'bg-white border-slate-200 text-slate-900 focus:border-cyan-500 shadow-sm'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Message</label>
                        <textarea
                          rows={3}
                          required
                          value={ticketForm.message}
                          onChange={e => setTicketForm({ ...ticketForm, message: e.target.value })}
                          placeholder="Provide details about your query..."
                          className={`w-full px-3 py-2 rounded-xl border transition-all focus:outline-none resize-none ${
                            isDark
                              ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400'
                              : 'bg-white border-slate-200 text-slate-900 focus:border-cyan-500 shadow-sm'
                          }`}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/25 transition-all"
                      >
                        Submit Ticket
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 4: FREQUENTLY ASKED QUESTIONS */}
              {activeTab === 'faq' && (
                <div className="space-y-3">
                  <div className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-900/80 border-cyan-500/20' : 'bg-white border-cyan-300 shadow-sm'
                  }`}>
                    <h4 className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                      <HelpCircle className="w-4 h-4" />
                      Frequently Asked Questions
                    </h4>
                  </div>
                  {faqs.map((item, idx) => (
                    <div key={idx} className={`p-3.5 rounded-xl border space-y-1.5 ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <h5 className={`text-xs font-bold flex items-start gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        <span className="text-cyan-500">Q:</span> {item.q}
                      </h5>
                      <p className={`text-[11px] leading-relaxed pl-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* ---------------------------------------------------- */}
            {/* BOTTOM STICKY CHAT INPUT                             */}
            {/* ---------------------------------------------------- */}
            <div className={`relative z-20 p-4 border-t backdrop-blur-md ${
              isDark ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-200/90 bg-white/95'
            }`}>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-center"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="Ask anything..."
                  className={`w-full py-3 pl-4 pr-12 text-xs rounded-full border transition-all duration-300 focus:outline-none ${
                    isInputFocused
                      ? isDark
                        ? 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] bg-slate-900 text-slate-100'
                        : 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)] bg-white text-slate-900'
                      : isDark
                      ? 'bg-slate-900/90 border-slate-800 text-slate-100 placeholder:text-slate-500 hover:border-slate-700'
                      : 'bg-slate-100 border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300'
                  }`}
                />

                {/* Send Button: Gradient circle + Paper plane icon */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={!inputValue.trim()}
                  className={`absolute right-1.5 p-2 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md transition-opacity ${
                    inputValue.trim() ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default DezoAIWidget;
