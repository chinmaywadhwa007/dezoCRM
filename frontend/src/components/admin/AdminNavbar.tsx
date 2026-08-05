import React from 'react';
import { Menu, Search, Moon, Sun } from 'lucide-react';
import { AdminNotifications } from './AdminNotifications';
import { AdminProfileMenu } from './AdminProfileMenu';
import { AdminBreadcrumbs } from './AdminBreadcrumbs';

interface AdminNavbarProps {
  onToggleSidebar: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  activeTab: string;
  userRole?: string;
  onLogout?: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({
  onToggleSidebar,
  isDark,
  onToggleTheme,
  activeTab,
  userRole = 'SUPER_ADMIN',
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 px-4 lg:px-6 flex items-center justify-between font-['Plus_Jakarta_Sans',sans-serif] transition-colors">
      {/* Left: Mobile Sidebar Trigger & Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Open Mobile Menu"
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 lg:hidden transition cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <AdminBreadcrumbs activeTab={activeTab} />
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search pages, users, media, logs... (Press '/')"
            className="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 transition shadow-inner"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400">
            /
          </span>
        </div>
      </div>

      {/* Right: Actions (Theme Toggle, Notifications, Profile) */}
      <div className="flex items-center gap-2.5">
        {/* Dark Mode Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle Dark Mode"
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 transition cursor-pointer"
        >
          {isDark ? (
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
          )}
        </button>

        {/* Notifications Dropdown */}
        <AdminNotifications />

        {/* Profile Dropdown Menu */}
        <AdminProfileMenu
          user={{
            name: userRole === 'SUPER_ADMIN' ? 'Super Admin' : userRole === 'ADMIN' ? 'System Admin' : 'Content Editor',
            email: `${userRole.toLowerCase()}@dezoryn.com`,
            role: userRole,
          }}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
};
