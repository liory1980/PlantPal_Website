import { LegalPage } from '@/components/plantpal/legal-page';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Privacy Policy', 'Read the AppsGiant privacy policy for PlantPal, including information use, your choices, and account deletion.', '/privacy');

export default function Privacy() {
  return <LegalPage title="Privacy Policy" path="/privacy">
    <p className="term-definition">PlantPal is covered by the AppsGiant Privacy Policy.</p>
    <p>This page summarizes the policy. Please read the full policy for its complete wording and any updates.</p>
    <a className="button" href="https://appsgiant.com/privacy-policy">Read the full AppsGiant Privacy Policy ↗</a>
    <h2>What the policy covers</h2>
    <p>The full policy explains information collection and use, cookies, service providers, retention, security, and privacy rights.</p>
    <h2>Your choices</h2>
    <p>For privacy questions or requests, contact <a href="mailto:support@appsgiant.com">support@appsgiant.com</a>.</p>
    <h2>Delete your PlantPal account</h2>
    <p>Account deletion is available inside PlantPal. See the <a href="/account-deletion">account-deletion instructions</a>, including an email option if you cannot access the app.</p>
    <p className="legal-note">Source: AppsGiant Privacy Policy, updated September 5, 2026.</p>
  </LegalPage>;
}
