import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/lib/seo';

export function LegalPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return <main id="main" className="shell article-shell">
    <Breadcrumbs items={[{ name: title, href: path }]} />
    <article className="term-article legal-content">
      <span className="eyebrow">PLANTPAL · INFORMATION & SUPPORT</span>
      <h1>{title}</h1>
      {children}
      <nav className="legal-related" aria-label="Related legal information">
        <a href="/terms" aria-current={path === '/terms' ? 'page' : undefined}>Terms & Conditions</a>
        <a href="/privacy" aria-current={path === '/privacy' ? 'page' : undefined}>Privacy Policy</a>
        <a href="/account-deletion" aria-current={path === '/account-deletion' ? 'page' : undefined}>Account deletion</a>
      </nav>
    </article>
  </main>;
}
