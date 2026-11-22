import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = new URL(import.meta.env.BASE_URL.replace(/\/?$/, '/'), site);
  return new Response(`User-agent: *\nDisallow: /admin/\n\nSitemap: ${new URL('sitemap.xml', base).href}\n`);
};
