export type AppRoute = '/' | '/products' | '/book-demo' | '/contact-sales' | '/about' | '/pricing' | '/careers';

export const getRouteFromPath = (path: string): AppRoute => {
  const cleanPath = path.toLowerCase().split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
  if (cleanPath.startsWith('/product')) return '/products';
  if (cleanPath.startsWith('/book-demo') || cleanPath.startsWith('/demo')) return '/book-demo';
  if (cleanPath.startsWith('/contact')) return '/contact-sales';
  if (cleanPath.startsWith('/about')) return '/about';
  if (cleanPath.startsWith('/pricing') || cleanPath.startsWith('/plan')) return '/pricing';
  if (cleanPath.startsWith('/career') || cleanPath.startsWith('/job')) return '/careers';
  return '/';
};

export const navigateToRoute = (route: AppRoute, sectionId?: string) => {
  const hash = sectionId ? `#${sectionId}` : '';
  const targetUrl = `${route}${hash}`;

  if (window.location.pathname !== route || window.location.hash !== hash) {
    window.history.pushState({}, '', targetUrl);
  }
  
  window.dispatchEvent(new Event('popstate'));

  if (sectionId) {
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }, 150);
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
};
