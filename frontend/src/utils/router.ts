export type AppRoute = '/' | '/products' | '/book-demo' | '/contact-sales' | '/about' | '/pricing';

export const getRouteFromPath = (path: string): AppRoute => {
  const cleanPath = path.toLowerCase().replace(/\/$/, '') || '/';
  if (cleanPath === '/products') return '/products';
  if (cleanPath === '/book-demo' || cleanPath === '/demo') return '/book-demo';
  if (cleanPath === '/contact-sales' || cleanPath === '/contact') return '/contact-sales';
  if (cleanPath === '/about' || cleanPath === '/about-us') return '/about';
  if (cleanPath === '/pricing' || cleanPath === '/plans') return '/pricing';
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
