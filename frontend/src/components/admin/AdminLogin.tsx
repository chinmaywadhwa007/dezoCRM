import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useNavigation } from '../../utils/NavigationContext';

interface AdminLoginProps {
  onLoginSuccess?: (role: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const { navigateTo } = useNavigation();
  const [email, setEmail] = useState('superadmin@dezoryn.com');
  const [password, setPassword] = useState('SuperAdmin@2026!');
  const [role, setRole] = useState<'SUPER_ADMIN' | 'ADMIN' | 'EDITOR'>('SUPER_ADMIN');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleQuickSelectRole = (selectedRole: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR') => {
    setRole(selectedRole);
    if (selectedRole === 'SUPER_ADMIN') {
      setEmail('superadmin@dezoryn.com');
      setPassword('SuperAdmin@2026!');
    } else if (selectedRole === 'ADMIN') {
      setEmail('admin@dezoryn.com');
      setPassword('Admin@2026!');
    } else {
      setEmail('editor@dezoryn.com');
      setPassword('Editor@2026!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login validation & redirect to admin dashboard
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess(role);
      } else {
        navigateTo('/admin/dashboard');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/80 relative z-10 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div
            onClick={() => navigateTo('/')}
            className="inline-flex items-center justify-center gap-2.5 cursor-pointer group mb-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-600 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white">
            Dezoryn Admin
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to access your administrative dashboard & tools
          </p>
        </div>

        {/* Demo Quick Role Selector Buttons */}
        <div className="space-y-2">
          <label className="text-[11px] font-extrabold tracking-wider uppercase text-slate-400 flex items-center justify-between">
            <span>Select Demo Role Profile</span>
            <span className="text-cyan-400 font-mono text-[10px]">3 Roles Available</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['SUPER_ADMIN', 'ADMIN', 'EDITOR'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleQuickSelectRole(r)}
                className={`py-2 px-2 rounded-xl text-[11px] font-extrabold border transition cursor-pointer text-center truncate ${
                  role === r
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-cyan-400 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                {r === 'SUPER_ADMIN' ? 'Super Admin' : r === 'ADMIN' ? 'Admin' : 'Editor'}
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@dezoryn.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-bold text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition shadow-inner"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300">Password</label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] font-bold text-cyan-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-bold text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-cyan-500/50 cursor-pointer"
              />
              Remember session (7 days)
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Authenticating...
              </span>
            ) : (
              <>
                <span>Sign In to Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Info */}
        <div className="pt-2 border-t border-slate-800/80 text-center space-y-2">
          <p className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Protected by JWT Authentication & RBAC Rules
          </p>

          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
          >
            ← Return to Main Website
          </button>
        </div>
      </motion.div>
    </div>
  );
};
