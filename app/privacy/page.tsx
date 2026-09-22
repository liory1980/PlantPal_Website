import { LegalPage } from '@/components/plantpal/legal-page';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Privacy Policy', 'How PlantPal handles your information, including collection, use, cookies, security, privacy rights, and account deletion.', '/privacy');

export default function Privacy() {
  return <LegalPage title="Privacy Policy" path="/privacy">
    <p className="legal-note">Last updated: September 23, 2026</p>
    <p className="term-definition">This policy explains how PlantPal handles information when you visit our website or use PlantPal: AI Plant Care.</p>
    <h2>1. Information we collect</h2>
    <p>We may collect information you choose to provide, such as your name, email address, project details, feedback, or support messages. Our website may also receive basic technical information including browser type, device type, approximate location, referring pages, and interaction data.</p>
    <h2>2. How we use information</h2>
    <p>We use information to respond to requests, provide and improve our services, operate and secure our website and products, understand performance, and meet legal obligations. We do not sell personal information.</p>
    <h2>3. Cookies and analytics</h2>
    <p>We may use essential cookies and privacy-conscious analytics to keep our services working and understand how they are used. Where required, we will ask for consent before using optional cookies.</p>
    <h2>4. Sharing and service providers</h2>
    <p>We may share limited information with trusted providers that help us host, analyze, support, or secure our services. They may use that information only to perform services for us. We may also disclose information when required by law or to protect rights and safety.</p>
    <h2>5. Data retention and security</h2>
    <p>We retain personal information only for as long as needed for the purpose it was collected, including legal and security requirements. We use reasonable technical and organizational measures to protect it, although no online system can be guaranteed completely secure.</p>
    <h2 id="account-deletion">6. PlantPal account deletion</h2>
    <p>If you are signed in to PlantPal, you can permanently delete your account directly in the app. Open <strong>Settings</strong>, select <strong>Terminate my account</strong>, and confirm the deletion. This permanently deletes your PlantPal account and all information associated with it from our databases. The deletion cannot be undone.</p>
    <p>If you cannot access the app, you may request deletion by emailing <a href="mailto:support@appsgiant.com?subject=PlantPal%20account%20deletion">support@appsgiant.com</a> from the email address associated with your PlantPal account. We may ask you to verify account ownership before completing the request.</p>
    <p>You can also follow our <a href="/account-deletion">step-by-step account-deletion instructions</a>.</p>
    <h2>7. Your choices</h2>
    <p>Depending on where you live, you may have rights to access, correct, delete, restrict, or receive a copy of your personal information, and to object to certain processing. You may also withdraw consent where processing relies on consent.</p>
    <h2>8. Children</h2>
    <p>Our website and business services are not directed to children, and we do not knowingly collect personal information from children through this website.</p>
    <h2>9. Changes to this policy</h2>
    <p>We may update this policy as our services or legal obligations change. We will post the updated version here and revise the date above.</p>
    <h2>10. Contact</h2>
    <p>For privacy questions or requests, email PlantPal support at <a href="mailto:support@appsgiant.com">support@appsgiant.com</a>.</p>
  </LegalPage>;
}
