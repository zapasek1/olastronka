import type { APIRoute } from 'astro';

const pages = ['', 'oferta/', 'opinie/', 'kontakt/', 'polityka-prywatnosci/'];

export const GET: APIRoute = ({ site }) => {
  const base = new URL(import.meta.env.BASE_URL.replace(/\/?$/, '/'), site);
  const urls = pages.map((p) => `  <url><loc>${new URL(p, base).href}</loc></url>`).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
