import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Activity,
  FolderOpen,
  Zap,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Plus,
  Lock,
  Layers,
  Database
} from 'lucide-react';

interface AdminOverviewProps {
  setActiveTab: (tab: string) => void;
  userRole?: string;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ setActiveTab, userRole = 'SUPER_ADMIN' }) => {
  const stats = [
    {
      id: 'users',
      title: 'Total System Users',
      value: '24',
      change: '+12% this month',
      isPositive: true,
      icon: Users,
      color: 'from-cyan-500 to-blue-600',
      badge: 'RBAC Active',
    },
    {
      id: 'sessions',
      title: 'Active JWT Sessions',
      value: '8',
      change: '100% Secure',
      isPositive: true,
      icon: Activity,
      color: 'from-blue-600 to-indigo-600',
      badge: '7d Rotation',
    },
    {
      id: 'media',
      title: 'Media Files Uploaded',
      value: '142',
      change: '1.2 GB Storage',
      isPositive: true,
      icon: FolderOpen,
      color: 'from-indigo-600 to-purple-600',
      badge: 'Multer Ready',
    },
    {
      id: 'health',
      title: 'PostgreSQL Database',
      value: 'Online',
      change: 'Prisma Client v5',
      isPositive: true,
      icon: Database,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Connected',
    },
  ];

  const recentLogs = [
    { id: '1', action: 'User Created', detail: 'sarah.editor@dezoryn.com added as EDITOR', time: '10 mins ago', user: 'Admin' },
    { id: '2', action: 'Token Refreshed', detail: 'JWT Access token rotated for superadmin@dezoryn.com', time: '25 mins ago', user: 'Super Admin' },
    { id: '3', action: 'Media Upload', detail: 'hero_3d_component.png uploaded (2.8 MB)', time: '1 hour ago', user: 'Editor' },
    { id: '4', action: 'Schema Seed', detail: 'Prisma seed database execution finished cleanly', time: '3 hours ago', user: 'System' },
  ];

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950 p-6 md:p-8 border border-blue-500/30 dark:border-slate-800 shadow-xl shadow-blue-500/10 text-white">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 dark:bg-cyan-500/10 border border-white/30 dark:border-cyan-500/30 text-white dark:text-cyan-400 text-xs font-black">
              <Zap className="w-3.5 h-3.5" />
              Website Control Hub
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Welcome back, <span className="text-cyan-200 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-400">{userRole}</span>
            </h2>
            <p className="text-xs md:text-sm text-blue-50 dark:text-slate-300 max-w-xl leading-relaxed">
              Manage website content, user roles, database models, and security settings seamlessly from your centralized Dezoryn admin console.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('users')}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-600 dark:hover:from-blue-500 dark:hover:to-cyan-500 dark:text-white font-black text-xs transition shadow-lg shadow-black/10 flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              Manage Users
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className="px-4 py-2.5 rounded-xl bg-blue-700/60 hover:bg-blue-700 dark:bg-slate-800 dark:hover:bg-slate-700 border border-white/20 dark:border-slate-700 text-white dark:text-slate-200 font-extrabold text-xs transition flex items-center gap-2 cursor-pointer"
            >
              <FolderOpen className="w-4 h-4" />
              Upload Asset
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {stat.title}
                </span>
                <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${stat.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-slate-800 text-[10px] font-extrabold text-cyan-600 dark:text-cyan-400 border border-cyan-100 dark:border-slate-700">
                  {stat.badge}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{stat.change}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Split: System Health & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity List (2 Columns) */}
        <div className="lg:col-span-2 p-5 md:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Recent Audit Trail & Activity
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live system event logging and authentication events
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('audit')}
              className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              View Logs <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {recentLogs.map((log) => (
              <div key={log.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {log.action}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {log.user}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {log.detail}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-slate-400 shrink-0">
                  {log.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Status & Placeholder Modules (1 Column) */}
        <div className="p-5 md:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            System Architecture
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="font-bold text-slate-700 dark:text-slate-300">REST API v1</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-500 font-bold">200 OK</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-cyan-500" />
                <span className="font-bold text-slate-700 dark:text-slate-300">JWT Auth + Cookies</span>
              </div>
              <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-500 font-bold">Active</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-indigo-500" />
                <span className="font-bold text-slate-700 dark:text-slate-300">RBAC Permissions</span>
              </div>
              <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-500 font-bold">3 Roles</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="p-4 rounded-xl bg-cyan-50/80 dark:bg-gradient-to-br dark:from-blue-900/30 dark:to-cyan-900/30 border border-cyan-200 dark:border-cyan-500/30 text-cyan-950 dark:text-cyan-300 text-xs font-semibold space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                Modules Ready for Connection
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Frontend dashboard structure, top navbar, responsive sidebar, breadcrumbs, and profile menu foundation are ready to connect to backend APIs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
