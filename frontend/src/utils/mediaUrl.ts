/**
 * Resolves a media URL to an absolute URL.
 * When the backend falls back to local storage (Cloudinary credentials are
 * missing/invalid), it stores files as relative paths like `/uploads/file.mp4`.
 * The frontend dev server (Vite, port 5173) cannot serve those files —
 * they live on the Express backend (port 5000).
 * This helper ensures all media URLs point to the correct server.
 */
const BACKEND_URL = 'http://localhost:5000';

export function resolveMediaUrl(url: string): string {
  if (!url) return '';
  // Relative paths need the backend prefix
  if (url.startsWith('/')) return `${BACKEND_URL}${url}`;
  return url;
}
