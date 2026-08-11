import React, { useState, useEffect } from 'react';
import { AdminNavbar } from './AdminNavbar';
import { AdminSidebar } from './AdminSidebar';
import { AdminOverview } from './AdminOverview';
import { AdminHeroCMS } from './AdminHeroCMS';
import { AdminNavCMS } from './AdminNavCMS';
import { AdminMarketplaceManager } from './AdminMarketplaceManager';
import { AdminPricingManager } from './AdminPricingManager';
import { AdminTestimonialManager } from './AdminTestimonialManager';
import { AdminFAQManager } from './AdminFAQManager';
import { AdminJobManager } from './AdminJobManager';
import { AdminContactManager } from './AdminContactManager';
import { AdminFooterManager } from './AdminFooterManager';
import { AdminMediaLibrary } from './AdminMediaLibrary';
import { AdminDemoManager } from './AdminDemoManager';
import { AdminThemeManager } from './AdminThemeManager';
import { AdminWebsiteSettings } from './AdminWebsiteSettings';
import { AdminAboutCMS } from './AdminAboutCMS';
import { AdminAIAssistantModal } from './AdminAIAssistantModal';
import type { AIGenerateType } from './AdminAIAssistantModal';
import { useNavigation } from '../../utils/NavigationContext';

export interface openAIModalDetail {
  type?: AIGenerateType;
  topic?: string;
  onInsert?: (fieldType: string, value: any) => void;
}

export const openAdminAIAssistant = (detail?: openAIModalDetail) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-admin-ai-assistant', { detail }));
  }
};

interface AdminLayoutProps {
  initialRole?: string;
  onLogout?: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  initialRole = 'ADMIN',
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('admin-theme');
    return saved !== null ? saved === 'dark' : true;
  });
  const [role, setRole] = useState(initialRole);
  const { navigateTo } = useNavigation();

  // AI Assistant Modal State
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiModalType, setAiModalType] = useState<AIGenerateType>('hero');
  const [aiModalTopic, setAiModalTopic] = useState('');
  const [aiInsertCallback, setAiInsertCallback] = useState<((fieldType: string, value: any) => void) | null>(null);

  useEffect(() => {
    const handleOpenAI = (e: Event) => {
      const customEv = e as CustomEvent<openAIModalDetail>;
      if (customEv.detail?.type) setAiModalType(customEv.detail.type);
      if (customEv.detail?.topic) setAiModalTopic(customEv.detail.topic);
      if (customEv.detail?.onInsert) setAiInsertCallback(() => customEv.detail.onInsert);
      setIsAIModalOpen(true);
    };

    window.addEventListener('open-admin-ai-assistant', handleOpenAI);
    return () => window.removeEventListener('open-admin-ai-assistant', handleOpenAI);
  }, []);

  useEffect(() => {
    if (initialRole) {
      setRole(initialRole);
    }
  }, [initialRole]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('admin-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const handleThemeUpdated = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (detail?.defaultMode) {
        setIsDark(detail.defaultMode === 'dark');
      }
    };
    window.addEventListener('dezo-theme-updated', handleThemeUpdated);
    return () => window.removeEventListener('dezo-theme-updated', handleThemeUpdated);
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigateTo('/admin/login');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview setActiveTab={setActiveTab} userRole={role} />;
      case 'users':
        return (
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">User Management</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage system user accounts, role-based access control (RBAC: Admin), and JWT session revocations.
            </p>
            <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">
              👥 User Management Module UI ready for API integration (`/api/v1/users`).
            </div>
          </div>
        );
      case 'pages':
        return <AdminHeroCMS />;
      case 'about':
        return <AdminAboutCMS />;
      case 'navigation':
        return <AdminNavCMS />;
      case 'products':
        return <AdminMarketplaceManager />;
      case 'pricing':
        return <AdminPricingManager />;
      case 'testimonials':
        return <AdminTestimonialManager />;
      case 'faqs':
        return <AdminFAQManager />;
      case 'jobs':
        return <AdminJobManager />;
      case 'contact':
        return <AdminContactManager />;
      case 'footer':
        return <AdminFooterManager />;
      case 'demos':
        return <AdminDemoManager />;
      case 'blog':
        return (
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Blog & Article Manager</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Write, schedule, and curate enterprise tech articles and news.
            </p>
            <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">
              📝 Blog & Articles Module UI ready for API integration.
            </div>
          </div>
        );
      case 'media':
        return <AdminMediaLibrary />;

      case 'site-settings':
        return <AdminWebsiteSettings />;

      case 'settings':
        return <AdminThemeManager />;

      case 'audit':
        return (
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Audit Logs</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review full historical security audit logs, login events, and API request traces.
            </p>
            <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">
              🛡️ Audit Logs UI ready for API integration.
            </div>
          </div>
        );
      default:
        return <AdminOverview setActiveTab={setActiveTab} userRole={role} />;
    }
  };

  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  return (
    <div className={`admin-scope min-h-screen font-['Plus_Jakarta_Sans',sans-serif] ${isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userRole={role}
        onLogout={handleLogout}
        isDark={isDark}
        onHoverChange={setIsSidebarHovered}
      />

      {/* Main Container Area - Dynamically adjusts according to sidebar state */}
      <div className={`pl-0 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
        isSidebarHovered ? 'lg:pl-64' : 'lg:pl-20'
      }`}>
        {/* Top Navbar */}
        <AdminNavbar
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          activeTab={activeTab}
          userRole={role}
          onLogout={handleLogout}
          onOpenAI={() => setIsAIModalOpen(true)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
      </div>

      {/* AI Content Assistant Modal */}
      <AdminAIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        initialType={aiModalType}
        initialTopic={aiModalTopic}
        onInsertField={(fieldType, value) => {
          if (aiInsertCallback) {
            aiInsertCallback(fieldType, value);
          }
        }}
      />
    </div>
  );
};
