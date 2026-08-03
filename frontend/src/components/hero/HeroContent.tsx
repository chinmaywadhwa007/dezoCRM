import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { useNavigation } from '../../utils/NavigationContext';

// ─────────────────────────────────────────────────────────────
// STATS COUNTER COMPONENT (Counts up smoothly from 0)
// ─────────────────────────────────────────────────────────────
interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatCounterItem: React.FC<StatItemProps> = ({ value, suffix, label, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 1800; // 1.8s count up
      const steps = 40;
      const stepTime = duration / steps;
      const increment = value / steps;

      const counterInterval = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(counterInterval);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(counterInterval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay + 0.4 }}
      whileHover={{ y: -3, scale: 1.02 }}
      className="group relative flex flex-col p-3 sm:p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-400/60 dark:hover:border-cyan-500/60"
    >
      <div className="flex items-center gap-1">
        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
          {count}
          {suffix}
        </span>
      </div>
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
        {label}
      </span>

      {/* Tiny Animated Underline on Hover */}
      <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500 rounded-full transition-all duration-300 mt-2" />
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// ENTERPRISE HERO CTA BUTTON COMPONENT
// Premium Enterprise Color Hierarchy: Primary Royal Blue, Premium Violet Gradient, Cyan Outline
// ─────────────────────────────────────────────────────────────
interface EnterpriseCTAButtonProps {
  href?: string;
  variant: 'primary' | 'demo' | 'contact';
  children: React.ReactNode;
  icon?: React.ReactNode;
  showHoverArrow?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const EnterpriseCTAButton: React.FC<EnterpriseCTAButtonProps> = ({
  href: _href,
  variant,
  children,
  icon,
  showHoverArrow = false,
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [shineKey, setShineKey] = useState(0);

  // Framer Motion Spring Magnetic Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const maxTiltDeg = variant === 'primary' ? 2 : 1.5;
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTiltDeg, -maxTiltDeg]), { stiffness: 400, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTiltDeg, maxTiltDeg]), { stiffness: 400, damping: 25 });

  const spotX = useRef(50);
  const spotY = useRef(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const posX = (e.clientX - rect.left) / rect.width - 0.5;
    const posY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(posX);
    y.set(posY);

    spotX.current = ((e.clientX - rect.left) / rect.width) * 100;
    spotY.current = ((e.clientY - rect.top) / rect.height) * 100;

    if (spotlightRef.current) {
      const spotColor =
        variant === 'primary'
          ? 'rgba(255, 255, 255, 0.35)'
          : variant === 'demo'
          ? 'rgba(255, 255, 255, 0.30)'
          : 'rgba(6, 182, 212, 0.25)';

      spotlightRef.current.style.background = `radial-gradient(110px circle at ${spotX.current}% ${spotY.current}%, ${spotColor} 0%, transparent 80%)`;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShineKey((prev) => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    x.set(0);
    y.set(0);
  };

  const handleClickInternal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
  };

  // Distinct Color Classes based on Enterprise Color Hierarchy
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          glow: isHovered ? 'bg-cyan-400/40 blur-2xl scale-105 opacity-100' : 'bg-cyan-400/0 blur-md scale-95 opacity-0',
          button: 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-[length:200%_100%] bg-left hover:bg-right text-white border-blue-400/40 hover:border-cyan-300 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-[background-position,border-color,box-shadow] duration-500',
          arrowOffset: 6,
        };
      case 'demo':
        return {
          glow: isHovered ? 'bg-violet-500/40 blur-2xl scale-105 opacity-100' : 'bg-violet-500/0 blur-md scale-95 opacity-0',
          button: 'bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white border-purple-400/40 hover:border-violet-300 shadow-lg shadow-purple-900/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all duration-300',
          arrowOffset: 4,
        };
      case 'contact':
        return {
          glow: isHovered ? 'bg-cyan-400/25 dark:bg-cyan-400/30 blur-xl scale-105 opacity-100' : 'bg-cyan-400/0 blur-md scale-95 opacity-0',
          button: 'bg-white dark:bg-slate-900/90 text-slate-800 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 border-slate-300 dark:border-cyan-400/70 hover:border-cyan-500 dark:hover:border-cyan-300 hover:bg-cyan-50/80 dark:hover:bg-cyan-950/50 shadow-md hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-md transition-all duration-300',
          arrowOffset: 4,
        };
    }
  };

  const styleConfig = getButtonStyles();

  return (
    <div className="relative group/btn inline-flex">
      {/* ── SOFT AMBIENT GLOW BENEATH BUTTON ── */}
      <div className={`absolute inset-0 rounded-xl pointer-events-none transition-all duration-500 ${styleConfig.glow}`} />

      {/* ── SPRING-ANIMATED MAGNETIC BUTTON ── */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleClickInternal}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 600,
          willChange: 'transform',
        }}
        animate={{
          y: isPressed ? 0 : isHovered ? -2 : 0,
          scale: isPressed ? (variant === 'primary' ? 0.97 : 0.98) : isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
          mass: 0.6,
        }}
        className={`relative overflow-hidden inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-sm select-none cursor-pointer border ${styleConfig.button}`}
      >
        {/* ── CURSOR SPOTLIGHT LAYER ── */}
        <div
          ref={spotlightRef}
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* ── 650ms GLASS SHINE SWEEP ON HOVER ENTER ── */}
        {isHovered && (
          <motion.div
            key={shineKey}
            initial={{ x: '-150%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 dark:via-white/25 to-transparent skew-x-[-20deg] pointer-events-none z-20"
          />
        )}

        {/* ── BUTTON TEXT & ARROW ── */}
        <span className="relative z-10 flex items-center gap-2 tracking-tight">
          {children}
          {icon && (
            <motion.span
              animate={{
                x: isHovered ? styleConfig.arrowOffset : 0,
                opacity: showHoverArrow ? (isHovered ? 1 : 0) : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
              className="inline-block"
            >
              {icon}
            </motion.span>
          )}
        </span>
      </motion.button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// HERO CONTENT COMPONENT (Headline, Unique Accent Tags, Color Hierarchy CTAs)
// ─────────────────────────────────────────────────────────────
export const HeroContent: React.FC = () => {
  const { navigateTo } = useNavigation();

  // Feature Tag Chips with Unique Enterprise Accent Colors
  const tags = [
    {
      name: 'Smart Software',
      icon: <Zap className="w-3.5 h-3.5 text-cyan-500" />,
      style: 'border-cyan-500/30 dark:border-cyan-400/30 text-slate-800 dark:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]',
    },
    {
      name: 'SaaS Products',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" />,
      style: 'border-violet-500/30 dark:border-violet-400/30 text-slate-800 dark:text-violet-300 hover:border-violet-400 hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]',
    },
    {
      name: 'Cloud Solutions',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />,
      style: 'border-blue-500/30 dark:border-blue-400/30 text-slate-800 dark:text-blue-300 hover:border-blue-400 hover:shadow-[0_0_12px_rgba(37,99,235,0.3)]',
    },
    {
      name: 'IT Services',
      icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />,
      style: 'border-emerald-500/30 dark:border-emerald-400/30 text-slate-800 dark:text-emerald-300 hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]',
    },
  ];

  return (
    <div className="flex flex-col items-start text-left max-w-xl xl:max-w-2xl py-2 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Category Subtitle */}
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-xs sm:text-sm font-extrabold tracking-widest text-blue-600 dark:text-cyan-400 uppercase mb-3 flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        BUILDING THE FUTURE OF
      </motion.span>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-4 select-none"
      >
        <motion.span
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="inline-block hover:text-slate-800 dark:hover:text-cyan-100 transition-colors duration-300"
        >
          Digital
        </motion.span>{' '}
        <br />
        <motion.span
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="inline-block bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent drop-shadow-sm hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300"
        >
          Innovation
        </motion.span>
      </motion.h1>

      {/* Product Tag Chips Strip with Unique Enterprise Accent Colors */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-wrap items-center gap-2 mb-6"
      >
        {tags.map((tag, idx) => (
          <motion.div
            key={tag.name}
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 4 + idx * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.2,
            }}
            whileHover={{ y: -4, rotate: 1, scale: 1.03 }}
            onClick={() => navigateTo('/products')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/70 border text-xs font-extrabold shadow-sm backdrop-blur-md cursor-pointer transition-all duration-300 ${tag.style}`}
          >
            {tag.icon}
            <span>{tag.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Description Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-lg font-normal"
      >
        We build innovative, scalable and secure digital solutions to grow your business with unified enterprise AI infrastructure.
      </motion.p>

      {/* 3 Active Enterprise CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10"
      >
        {/* CTA 1: Explore Products -> Navigates to /products */}
        <EnterpriseCTAButton
          href="/products"
          variant="primary"
          icon={<ArrowRight className="w-4 h-4" />}
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/products');
          }}
        >
          Explore Products
        </EnterpriseCTAButton>

        {/* CTA 2: Book a Demo -> Navigates to /book-demo */}
        <EnterpriseCTAButton
          href="/book-demo"
          variant="demo"
          icon={<ArrowRight className="w-4 h-4" />}
          showHoverArrow={true}
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/book-demo');
          }}
        >
          Book a Demo
        </EnterpriseCTAButton>

        {/* CTA 3: Contact Sales -> Navigates to /contact-sales */}
        <EnterpriseCTAButton
          href="/contact-sales"
          variant="contact"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/contact-sales');
          }}
        >
          Contact Sales
        </EnterpriseCTAButton>
      </motion.div>

      {/* Enterprise Statistics Strip */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
        <StatCounterItem value={99.9} suffix="%" label="Uptime SLA" delay={0.4} />
        <StatCounterItem value={10} suffix="x" label="Processing Speed" delay={0.5} />
        <StatCounterItem value={500} suffix="+" label="Enterprise Clients" delay={0.6} />
      </div>
    </div>
  );
};
