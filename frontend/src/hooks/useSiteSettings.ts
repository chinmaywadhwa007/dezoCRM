import { useState, useEffect } from 'react';

const API = 'http://localhost:5000/api/v1/site-settings';

// Resolve relative /uploads/ paths to the backend server
function resolveMediaUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('/')) return `http://localhost:5000${url}`;
  return url;
}

export interface SiteSettings {
  websiteName: string;
  logoUrl: string;
  faviconUrl: string;
  domain: string;
  maintenanceMode: boolean;
  announcementBar: boolean;
  announcementText: string;
  announcementColor: string;
  language: string;
  timezone: string;
  currency: string;
  currencySymbol: string;
  googleAnalyticsId: string;
  metaTitle: string;
  metaDescription: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  websiteName: 'Dezoryn Technologies',
  logoUrl: '',
  faviconUrl: '',
  domain: 'https://dezoryn.com',
  maintenanceMode: false,
  announcementBar: false,
  announcementText: '',
  announcementColor: 'blue',
  language: 'en',
  timezone: 'Asia/Kolkata',
  currency: 'INR',
  currencySymbol: '₹',
  googleAnalyticsId: '',
  metaTitle: 'Dezoryn Technologies - Enterprise Business Automation',
  metaDescription: '',
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  const fetchAndApply = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (data.success && data.data) {
        const s: SiteSettings = {
          ...DEFAULT_SETTINGS,
          ...data.data,
          // Resolve local upload paths to backend URL so all consumers get full URLs
          logoUrl: resolveMediaUrl(data.data.logoUrl || ''),
          faviconUrl: resolveMediaUrl(data.data.faviconUrl || ''),
        };
        setSettings((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(s)) {
            return s;
          }
          return prev;
        });
        applyToDOM(s);
      }
    } catch {
      // keep defaults silently
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    fetchAndApply();
    // Re-fetch when the tab regains focus (so admin changes instantly reflect)
    window.addEventListener('focus', fetchAndApply);
    return () => window.removeEventListener('focus', fetchAndApply);
  }, []);

  return { settings, loaded };
}

function applyToDOM(s: SiteSettings) {
  // 1. Page title
  const title = s.metaTitle || s.websiteName || 'Dezoryn Technologies';
  document.title = title;

  // 2. Meta description
  let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  if (s.metaDescription) metaDesc.content = s.metaDescription;

  // 3. Favicon
  if (s.faviconUrl) {
    let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = resolveMediaUrl(s.faviconUrl);
  }

  // 4. Language attribute
  if (s.language) {
    document.documentElement.lang = s.language;
  }

  // 5. Google Analytics injection (only once per ID)
  if (s.googleAnalyticsId && !document.getElementById(`ga-script-${s.googleAnalyticsId}`)) {
    const existingGa = document.getElementById('ga-main-script');
    if (!existingGa) {
      const scriptSrc = document.createElement('script');
      scriptSrc.id = `ga-script-${s.googleAnalyticsId}`;
      scriptSrc.async = true;
      scriptSrc.src = `https://www.googletagmanager.com/gtag/js?id=${s.googleAnalyticsId}`;
      document.head.appendChild(scriptSrc);

      const scriptInline = document.createElement('script');
      scriptInline.id = 'ga-main-script';
      scriptInline.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${s.googleAnalyticsId}');
      `;
      document.head.appendChild(scriptInline);
    }
  }
}
