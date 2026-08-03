import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Cross,
  Users,
  Boxes,
  LayoutDashboard,
  Cpu,
  CheckCircle,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// 1. EXACT FIXED BUSINESS MODULES (Physical PCB Mounts)
// ─────────────────────────────────────────────────────────────
interface PCBModule {
  id: string;
  slot: 'top-left' | 'top-right' | 'middle-left' | 'middle-right' | 'bottom-left' | 'bottom-right';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  borderColor: string;
  accentColor: string;
  glowRgb: string;
  positionClasses: string;
  parallaxMultiplier: number;
  floatDelay: number;
  floatDuration: number;
  mainPath: string;
  secondaryPath: string;
  statusText: string;
}

const PCB_MODULES: PCBModule[] = [
  {
    id: 'crm-platform',
    slot: 'top-left',
    title: 'CRM Platform',
    subtitle: 'Predictive Sales Engine',
    icon: <LayoutDashboard className="w-4 h-4 text-white" />,
    iconBg: 'bg-gradient-to-tr from-sky-500 to-blue-600 shadow-md shadow-sky-500/20',
    borderColor: 'rgba(56, 189, 248, 0.6)',
    accentColor: '#38bdf8',
    glowRgb: '56, 189, 248',
    positionClasses: 'top-[7%] left-[4%]',
    parallaxMultiplier: 0.8,
    floatDelay: 0.0,
    floatDuration: 5.5,
    mainPath: 'M 40 35 L 40 18 L 18 18 L 18 13',
    secondaryPath: 'M 40 18 L 6 18 L 6 32 L 2 32',
    statusText: 'AI Engine • Active 99.9%',
  },
  {
    id: 'school-erp',
    slot: 'top-right',
    title: 'School ERP',
    subtitle: 'Campus Intelligence',
    icon: <GraduationCap className="w-4 h-4 text-white" />,
    iconBg: 'bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20',
    borderColor: 'rgba(59, 130, 246, 0.6)',
    accentColor: '#3b82f6',
    glowRgb: '59, 130, 246',
    positionClasses: 'top-[7%] right-[4%]',
    parallaxMultiplier: 1.1,
    floatDelay: 0.8,
    floatDuration: 6.2,
    mainPath: 'M 60 35 L 60 18 L 82 18 L 82 13',
    secondaryPath: 'M 60 18 L 94 18 L 94 32 L 98 32',
    statusText: 'Campus OS • Synced',
  },
  {
    id: 'hospital-management',
    slot: 'middle-right',
    title: 'Hospital Management',
    subtitle: 'Healthcare OS',
    icon: <Cross className="w-4 h-4 text-white" />,
    iconBg: 'bg-gradient-to-tr from-purple-600 to-fuchsia-500 shadow-md shadow-purple-500/20',
    borderColor: 'rgba(168, 85, 247, 0.6)',
    accentColor: '#a855f7',
    glowRgb: '168, 85, 247',
    positionClasses: 'top-[44%] right-[2%]',
    parallaxMultiplier: 1.0,
    floatDelay: 2.2,
    floatDuration: 6.5,
    mainPath: 'M 65 50 L 84 50',
    secondaryPath: 'M 75 50 L 75 36 L 96 36',
    statusText: 'Healthcare • 0ms Latency',
  },
  {
    id: 'hrms',
    slot: 'bottom-left',
    title: 'HRMS',
    subtitle: 'Human Resource Suite',
    icon: <Users className="w-4 h-4 text-white" />,
    iconBg: 'bg-gradient-to-tr from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/20',
    borderColor: 'rgba(16, 185, 129, 0.6)',
    accentColor: '#10b981',
    glowRgb: '16, 185, 129',
    positionClasses: 'bottom-[9%] left-[4%]',
    parallaxMultiplier: 1.2,
    floatDelay: 3.0,
    floatDuration: 6.0,
    mainPath: 'M 40 65 L 40 82 L 18 82 L 18 88',
    secondaryPath: 'M 40 82 L 6 82 L 6 68 L 2 68',
    statusText: 'HR Suite • Secure',
  },
  {
    id: 'inventory-management',
    slot: 'bottom-right',
    title: 'Inventory Management',
    subtitle: 'Stock & Supply Chain',
    icon: <Boxes className="w-4 h-4 text-white" />,
    iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-500 shadow-md shadow-amber-500/20',
    borderColor: 'rgba(245, 158, 11, 0.6)',
    accentColor: '#f59e0b',
    glowRgb: '245, 158, 11',
    positionClasses: 'bottom-[9%] right-[4%]',
    parallaxMultiplier: 0.75,
    floatDelay: 3.8,
    floatDuration: 6.8,
    mainPath: 'M 60 65 L 60 82 L 82 82 L 82 88',
    secondaryPath: 'M 60 82 L 94 82 L 94 68 L 98 68',
    statusText: 'Stock Engine • Live',
  },
];

// ─────────────────────────────────────────────────────────────
// 2. REFINED SUBTLE PCB HARDWARE BACKGROUND TRACES & LEDS
// ─────────────────────────────────────────────────────────────
const SprawlingMotherboardTraces: React.FC = () => {
  const leds = useMemo(() => {
    return [
      { cx: '12%', cy: '25%', color: '#38bdf8', delay: '0s' },
      { cx: '88%', cy: '25%', color: '#3b82f6', delay: '0.4s' },
      { cx: '32%', cy: '65%', color: '#ec4899', delay: '0.8s' },
      { cx: '68%', cy: '65%', color: '#a855f7', delay: '1.2s' },
      { cx: '50%', cy: '10%', color: '#10b981', delay: '1.6s' },
      { cx: '50%', cy: '90%', color: '#f59e0b', delay: '2.0s' },
    ];
  }, []);

  return (
    <g className="opacity-25 stroke-cyan-500/40 dark:stroke-cyan-400/30" strokeWidth="0.5" fill="none">
      <path d="M 2 5 L 98 5 M 2 8 L 98 8" />
      <path d="M 2 92 L 98 92 M 2 95 L 98 95" />
      <path d="M 4 2 L 4 98 M 96 2 L 96 98" />
      <path d="M 12 25 L 32 25 L 32 35 M 68 25 L 88 25 L 88 35" />
      <path d="M 12 75 L 32 75 L 32 65 M 68 75 L 88 75 L 88 65" />

      {/* Tiny Blinking Hardware LEDs */}
      {leds.map((led, idx) => (
        <circle
          key={idx}
          cx={led.cx}
          cy={led.cy}
          r="0.8"
          fill={led.color}
          className="animate-pulse"
          style={{ animationDelay: led.delay, animationDuration: '2s' }}
        />
      ))}
    </g>
  );
};

// ─────────────────────────────────────────────────────────────
// 3. REFINED DUST PARTICLES (Responds to Processor Hover)
// ─────────────────────────────────────────────────────────────
const FloatingBackgroundParticles: React.FC<{ isProcessorHovered: boolean }> = ({ isProcessorHovered }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 10 + (i * 18) % 80,
      top: 12 + (i * 22) % 76,
      size: i % 2 === 0 ? 2 : 2.5,
      duration: 6 + (i % 4) * 1.8,
      delay: i * 0.4,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -12, 0],
            opacity: isProcessorHovered ? [0.4, 0.85, 0.4] : [0.15, 0.4, 0.15],
            scale: isProcessorHovered ? [1, 1.4, 1] : [1, 1, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            willChange: 'transform, opacity',
          }}
          className={`absolute rounded-full transition-colors duration-700 ${
            isProcessorHovered ? 'bg-cyan-300 shadow-[0_0_8px_#00f0ff] blur-[0.3px]' : 'bg-cyan-400/40 blur-[0.5px]'
          }`}
        />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 4. SEQUENTIAL CLOCKWISE PROCESSOR PINS COMPONENT
// ─────────────────────────────────────────────────────────────
const ProcessorPins: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <div className="absolute -inset-3.5 pointer-events-none z-10">
      {/* TOP EDGE: Pins 0..7 (Left to Right) */}
      <div className="absolute top-0 left-6 right-6 flex justify-between">
        {Array.from({ length: 8 }).map((_, i) => {
          const pinIndex = i;
          return (
            <div
              key={i}
              className={`w-1.5 h-3.5 rounded-sm transition-all duration-300 ${
                isHovered
                  ? 'animate-pin-sequential-pulse bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
                  : 'bg-gradient-to-b from-cyan-400/80 via-slate-400 to-slate-800'
              }`}
              style={{
                animationDelay: isHovered ? `${(pinIndex / 32) * 1.5}s` : '0s',
              }}
            />
          );
        })}
      </div>

      {/* RIGHT EDGE: Pins 8..15 (Top to Bottom) */}
      <div className="absolute right-0 top-6 bottom-6 flex flex-col justify-between">
        {Array.from({ length: 8 }).map((_, i) => {
          const pinIndex = 8 + i;
          return (
            <div
              key={i}
              className={`h-1.5 w-3.5 rounded-sm transition-all duration-300 ${
                isHovered
                  ? 'animate-pin-sequential-pulse bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
                  : 'bg-gradient-to-l from-cyan-400/80 via-slate-400 to-slate-800'
              }`}
              style={{
                animationDelay: isHovered ? `${(pinIndex / 32) * 1.5}s` : '0s',
              }}
            />
          );
        })}
      </div>

      {/* BOTTOM EDGE: Pins 16..23 (Right to Left) */}
      <div className="absolute bottom-0 left-6 right-6 flex justify-between flex-row-reverse">
        {Array.from({ length: 8 }).map((_, i) => {
          const pinIndex = 16 + i;
          return (
            <div
              key={i}
              className={`w-1.5 h-3.5 rounded-sm transition-all duration-300 ${
                isHovered
                  ? 'animate-pin-sequential-pulse bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
                  : 'bg-gradient-to-t from-cyan-400/80 via-slate-400 to-slate-800'
              }`}
              style={{
                animationDelay: isHovered ? `${(pinIndex / 32) * 1.5}s` : '0s',
              }}
            />
          );
        })}
      </div>

      {/* LEFT EDGE: Pins 24..31 (Bottom to Top) */}
      <div className="absolute left-0 top-6 bottom-6 flex flex-col-reverse justify-between">
        {Array.from({ length: 8 }).map((_, i) => {
          const pinIndex = 24 + i;
          return (
            <div
              key={i}
              className={`h-1.5 w-3.5 rounded-sm transition-all duration-300 ${
                isHovered
                  ? 'animate-pin-sequential-pulse bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
                  : 'bg-gradient-to-r from-cyan-400/80 via-slate-400 to-slate-800'
              }`}
              style={{
                animationDelay: isHovered ? `${(pinIndex / 32) * 1.5}s` : '0s',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 5. MAIN ENTERPRISE AI MOTHERBOARD VISUALIZATION
// ─────────────────────────────────────────────────────────────
export const HeroEarth3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const processorRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});

  // LERP Mouse Values
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  // Processor 3D Tilt Values (±1° max rotation toward cursor)
  const procRotX = useRef(0);
  const procRotY = useRef(0);

  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);
  const [isProcessorHovered, setIsProcessorHovered] = useState(false);
  const isProcessorHoveredRef = useRef(false);
  const [cardPulseActive, setCardPulseActive] = useState(false);
  const cycleIndex = useRef(0);

  // Keep ref in sync with state for zero-rerender rAF loop
  useEffect(() => {
    isProcessorHoveredRef.current = isProcessorHovered;
  }, [isProcessorHovered]);

  // Periodic Card Wave Reaction every 2 seconds while hovering processor
  useEffect(() => {
    if (!isProcessorHovered) {
      setCardPulseActive(false);
      return;
    }

    setCardPulseActive(true);
    const initialOffTimer = setTimeout(() => setCardPulseActive(false), 350);

    const interval = setInterval(() => {
      setCardPulseActive(true);
      setTimeout(() => setCardPulseActive(false), 350);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialOffTimer);
    };
  }, [isProcessorHovered]);

  // ZERO RE-RENDER LERP LOOP (Direct DOM Mutation in rAF for 60 FPS)
  useEffect(() => {
    let animId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const loop = () => {
      currentMouse.current.x = lerp(currentMouse.current.x, targetMouse.current.x, 0.035);
      currentMouse.current.y = lerp(currentMouse.current.y, targetMouse.current.y, 0.035);

      const mx = currentMouse.current.x;
      const my = currentMouse.current.y;

      // 1. Container 3D Tilt (Max 4px shift)
      if (parallaxLayerRef.current) {
        parallaxLayerRef.current.style.transform = `rotateX(${-my * 6}deg) rotateY(${mx * 6}deg) translate3d(${mx * 4}px, ${my * 4}px, 0)`;
      }

      // 2. AI Processor Depth + Precise Mouse Follow Tilt (±1° max rotation)
      const isHovered = isProcessorHoveredRef.current;
      const targetRotX = isHovered ? Math.max(-1, Math.min(1, -my * 2.5)) : 0;
      const targetRotY = isHovered ? Math.max(-1, Math.min(1, mx * 2.5)) : 0;
      procRotX.current = lerp(procRotX.current, targetRotX, 0.08);
      procRotY.current = lerp(procRotY.current, targetRotY, 0.08);

      if (processorRef.current) {
        processorRef.current.style.transform = `translate3d(-50%, -50%, 0) translate3d(${mx * 8}px, ${my * 8}px, 15px) rotateX(${procRotX.current}deg) rotateY(${procRotY.current}deg)`;
      }

      // 3. Card Parallax (Max 10px shift)
      PCB_MODULES.forEach((mod) => {
        const el = cardRefs.current[mod.id];
        if (el) {
          const cardX = mx * 10 * mod.parallaxMultiplier;
          const cardY = my * 10 * mod.parallaxMultiplier;
          el.style.transform = `translate3d(${cardX}px, ${cardY}px, 0)`;
        }
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Idle Auto-Pulse Highlight Every 3.5s
  useEffect(() => {
    const timer = setInterval(() => {
      if (!hoveredModuleId && !isProcessorHovered) {
        cycleIndex.current = (cycleIndex.current + 1) % PCB_MODULES.length;
        const nextId = PCB_MODULES[cycleIndex.current].id;
        setActiveModuleId(nextId);

        setTimeout(() => {
          setActiveModuleId((curr) => (curr === nextId ? null : curr));
        }, 2000);
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [hoveredModuleId, isProcessorHovered]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetMouse.current.x = (e.clientX - rect.left) / rect.width - 0.5;
    targetMouse.current.y = (e.clientY - rect.top) / rect.height - 0.5;
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetMouse.current.x = 0;
    targetMouse.current.y = 0;
    setHoveredModuleId(null);
    setIsProcessorHovered(false);
  }, []);

  const currentHighlightedId = hoveredModuleId || activeModuleId;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
        willChange: 'transform',
      }}
      className="w-full h-[420px] sm:h-[520px] lg:h-[600px] relative overflow-hidden bg-slate-950 dark:bg-[#020612] rounded-[24px] border border-slate-800 dark:border-blue-950/80 shadow-xl shadow-blue-900/10 dark:shadow-cyan-950/40 select-none font-sans flex items-center justify-center cursor-default transition-colors duration-500"
    >
      {/* ── Keyframe Animations for Clockwise Pin Wave ── */}
      <style>{`
        @keyframes pinSequentialPulse {
          0%, 100% {
            background-color: rgba(148, 163, 184, 0.4);
            box-shadow: none;
            opacity: 0.5;
          }
          15%, 35% {
            background-color: #00f0ff;
            box-shadow: 0 0 10px #00f0ff, 0 0 4px #38bdf8;
            opacity: 1;
          }
          50% {
            background-color: rgba(148, 163, 184, 0.4);
            box-shadow: none;
            opacity: 0.5;
          }
        }
        .animate-pin-sequential-pulse {
          animation: pinSequentialPulse 1.5s linear infinite;
        }
      `}</style>

      {/* ── 3D PARALLAX CONTAINER LAYER (Direct Ref Mutation) ── */}
      <div
        ref={parallaxLayerRef}
        className="w-full h-full relative flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* ── Background Ambient Backlight Glows (Expands on Processor Hover) ── */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[130px] transition-all duration-700 ease-out ${
              isProcessorHovered ? 'w-[520px] h-[520px] bg-cyan-400/35 blur-[140px]' : 'w-[420px] h-[420px]'
            }`}
          />
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[90px] transition-all duration-700 ease-out ${
              isProcessorHovered ? 'w-[320px] h-[320px] bg-blue-500/30' : 'w-[260px] h-[260px]'
            }`}
          />
        </div>

        {/* ── 10s DIGITAL SCANNING BEAM PASS ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            animate={{
              y: ['-100%', '200%'],
            }}
            transition={{
              duration: 10.0,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="w-full h-[60px] bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent blur-sm pointer-events-none"
          />
        </div>

        {/* ── Low-Count Dust Particles ── */}
        <FloatingBackgroundParticles isProcessorHovered={isProcessorHovered} />

        {/* ── Subtle Background Grid Pattern ── */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-60" />

        {/* ── SVG MOTHERBOARD PCB TRACES LAYER ── */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <filter id="pcbGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <SprawlingMotherboardTraces />

          {/* ── PERMANENT NEON SVG PCB TRACES WITH MOVING ENERGY PACKETS ── */}
          {PCB_MODULES.map((mod) => {
            const isHighlighted = isProcessorHovered || currentHighlightedId === mod.id;

            return (
              <g key={mod.id}>
                {/* 1. Permanent Main Circuit Path */}
                <path
                  d={mod.mainPath}
                  fill="none"
                  stroke={isHighlighted ? mod.accentColor : '#00f0ff'}
                  strokeWidth={isProcessorHovered ? '1.8' : isHighlighted ? '1.4' : '0.8'}
                  strokeOpacity={isHighlighted ? '1' : '0.75'}
                  className="transition-colors duration-500"
                  style={{
                    filter: isProcessorHovered
                      ? 'drop-shadow(0 0 8px #00f0ff)'
                      : isHighlighted
                      ? `drop-shadow(0 0 5px ${mod.accentColor})`
                      : 'drop-shadow(0 0 2px #00f0ff)',
                  }}
                />

                {/* 2. Secondary Branch Circuit Path */}
                <path
                  d={mod.secondaryPath}
                  fill="none"
                  stroke={isHighlighted ? mod.accentColor : '#00f0ff'}
                  strokeWidth="0.5"
                  strokeOpacity={isHighlighted ? '0.85' : '0.45'}
                  className="transition-colors duration-500"
                />

                {/* 3. Moving Data Packets (Accelerates & Brightens Outward on Processor Hover) */}
                <path
                  d={mod.mainPath}
                  fill="none"
                  stroke={isProcessorHovered ? '#ffffff' : isHighlighted ? mod.accentColor : '#00f0ff'}
                  strokeWidth={isProcessorHovered ? '2.2' : '1.2'}
                  strokeDasharray={isProcessorHovered ? '4 12' : '2 7'}
                  filter="url(#pcbGlow)"
                  className="opacity-95"
                  style={{ willChange: 'stroke-dashoffset' }}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="18"
                    to="0"
                    dur={isProcessorHovered ? '0.5s' : isHighlighted ? '0.8s' : '2.2s'}
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            );
          })}
        </svg>

        {/* ── CENTERPIECE: AI PROCESSOR CHIP (180px × 180px) ── */}
        <div
          ref={processorRef}
          style={{
            willChange: 'transform',
            transformStyle: 'preserve-3d',
          }}
          className="absolute top-1/2 left-1/2 w-[180px] h-[180px] z-30 pointer-events-auto"
          onMouseEnter={() => setIsProcessorHovered(true)}
          onMouseLeave={() => setIsProcessorHovered(false)}
        >
          {/* Subtle 4px Floating Levitation */}
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 6.0,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full relative"
            style={{ willChange: 'transform' }}
          >
            {/* 32 Metallic Pins with Clockwise Sequential Lighting */}
            <ProcessorPins isHovered={isProcessorHovered} />

            {/* Heatsink Frame with Premium Soft Cyan Glow */}
            <div
              className={`w-full h-full rounded-[28px] p-2.5 bg-gradient-to-br from-[#102046] via-[#09152e] to-[#040a17] border-2 relative overflow-hidden backdrop-blur-2xl flex items-center justify-center cursor-pointer group transition-all duration-600 ease-out ${
                isProcessorHovered
                  ? 'border-cyan-400 shadow-[0_0_65px_rgba(0,240,255,0.75),0_0_20px_rgba(0,240,255,0.4),inset_0_0_30px_rgba(0,240,255,0.45)]'
                  : 'border-cyan-400/80 shadow-[0_0_30px_rgba(0,240,255,0.35),inset_0_0_15px_rgba(0,240,255,0.2)]'
              }`}
            >
              {/* Rotating Holographic Ring (Speeds up on hover) */}
              <div
                className={`absolute inset-2 rounded-[22px] border border-dashed border-cyan-400/50 pointer-events-none transition-all duration-500 ${
                  isProcessorHovered ? 'animate-[spin_15s_linear_infinite]' : 'animate-[spin_45s_linear_infinite]'
                }`}
              />

              {/* Center AI Core */}
              <div className="w-full h-full rounded-[20px] bg-gradient-to-br from-[#07132e] via-[#030b1c] to-[#01050e] border border-cyan-400/50 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-102 transition-transform duration-500 ease-out">
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-400" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-400" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-400" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-400" />

                {/* Center Icon (Rotates 360° linearly on hover, scales to 1.05) */}
                <motion.div
                  animate={{
                    rotate: isProcessorHovered ? 360 : 0,
                    scale: isProcessorHovered ? 1.05 : 1,
                  }}
                  transition={{
                    rotate: isProcessorHovered
                      ? { duration: 7, repeat: Infinity, ease: 'linear' }
                      : { duration: 0.6, ease: 'easeOut' },
                    scale: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                  className={`w-14 h-14 rounded-full bg-cyan-500/15 border border-cyan-400/60 flex items-center justify-center relative transition-shadow duration-500 ${
                    isProcessorHovered
                      ? 'shadow-[0_0_28px_#00f0ff,inset_0_0_12px_#00f0ff]'
                      : 'shadow-[0_0_20px_#00f0ff]'
                  }`}
                >
                  <Cpu className="w-7 h-7 text-cyan-400" />
                </motion.div>

                <span className="text-lg font-black tracking-widest text-white mt-1 drop-shadow-[0_0_10px_#00f0ff]">
                  AI
                </span>
                <span className="text-[8.5px] font-bold text-cyan-400 tracking-wider uppercase opacity-85">
                  PROCESSOR
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── FIXED BUSINESS MODULE CARDS ── */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {PCB_MODULES.map((mod) => {
            const isHovered = hoveredModuleId === mod.id;
            const isHighlighted = isProcessorHovered || currentHighlightedId === mod.id;

            return (
              <div
                key={mod.id}
                ref={(el) => {
                  cardRefs.current[mod.id] = el;
                }}
                style={{
                  willChange: 'transform',
                }}
                className={`absolute pointer-events-auto ${mod.positionClasses}`}
              >
                {/* Active Hover Status Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: -24, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 top-0 px-2.5 py-1 rounded-lg bg-slate-950/95 border border-cyan-400/60 text-[10px] font-bold text-cyan-300 shadow-lg shadow-cyan-950/80 whitespace-nowrap flex items-center gap-1.5 pointer-events-none z-40"
                    >
                      <CheckCircle className="w-3 h-3 text-cyan-400" />
                      <span>{mod.statusText}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  animate={{
                    y: isHovered ? -8 : [0, -4, 0],
                    scale: isHovered ? 1.03 : 1,
                  }}
                  transition={{
                    y: isHovered
                      ? { type: 'spring', stiffness: 350, damping: 24, mass: 0.8 }
                      : { duration: mod.floatDuration, repeat: Infinity, ease: 'easeInOut', delay: mod.floatDelay },
                    scale: { type: 'spring', stiffness: 350, damping: 24, mass: 0.8 },
                  }}
                  onMouseEnter={() => {
                    setHoveredModuleId(mod.id);
                    setActiveModuleId(mod.id);
                  }}
                  onMouseLeave={() => setHoveredModuleId(null)}
                  className="w-[185px] sm:w-[195px] h-[64px] px-3.5 py-2.5 rounded-2xl bg-slate-900/90 dark:bg-[#070e20]/95 border backdrop-blur-xl flex items-center gap-2.5 cursor-pointer transition-colors duration-300"
                  style={{
                    borderColor: isHovered
                      ? mod.accentColor
                      : isProcessorHovered && cardPulseActive
                      ? 'rgba(0, 240, 255, 0.85)'
                      : isHighlighted
                      ? mod.accentColor
                      : mod.borderColor,
                    boxShadow: isHovered
                      ? `0 0 30px rgba(${mod.glowRgb}, 0.65), 0 0 12px rgba(${mod.glowRgb}, 0.35)`
                      : isProcessorHovered && cardPulseActive
                      ? '0 0 24px rgba(0, 240, 255, 0.55), inset 0 0 8px rgba(0, 240, 255, 0.25)'
                      : isHighlighted
                      ? `0 0 18px rgba(${mod.glowRgb}, 0.35)`
                      : `0 4px 18px rgba(0, 0, 0, 0.4)`,
                    filter: isProcessorHovered && cardPulseActive ? 'brightness(1.12)' : 'brightness(1)',
                    willChange: 'transform, border-color, box-shadow, filter',
                  }}
                >
                  <div
                    className={`w-8 h-8 rounded-xl ${mod.iconBg} flex items-center justify-center shrink-0 transition-transform duration-300 ease-out`}
                    style={{
                      transform: isHovered || (isProcessorHovered && cardPulseActive) ? 'scale(1.15)' : 'scale(1)',
                      boxShadow: isProcessorHovered && cardPulseActive ? '0 0 12px #00f0ff' : undefined,
                    }}
                  >
                    {mod.icon}
                  </div>

                  <div className="flex flex-col text-left min-w-0 flex-1">
                    <span className="text-[12.5px] font-extrabold text-white leading-tight truncate">
                      {mod.title}
                    </span>
                    <span
                      className="text-[10px] font-semibold mt-0.5 truncate"
                      style={{ color: mod.accentColor }}
                    >
                      {mod.subtitle}
                    </span>
                  </div>

                  <div className="shrink-0 pl-0.5">
                    <span className="relative flex h-2 w-2">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: mod.accentColor }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2 w-2"
                        style={{ backgroundColor: mod.accentColor }}
                      />
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export const HeroMotherboard = HeroEarth3D;
export default HeroEarth3D;
