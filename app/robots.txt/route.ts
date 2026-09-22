import {SITE_URL} from '@/lib/config';
export function GET(){return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /*?q=\nSitemap: ${SITE_URL}/sitemap.xml\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}})}
