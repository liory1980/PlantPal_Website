import { LegalPage } from '@/components/plantpal/legal-page';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Delete your PlantPal account', 'Delete your PlantPal account in the app using Settings and Terminate my account, or contact PlantPal support if you cannot sign in.', '/account-deletion');

export default function AccountDeletion() {
  return <LegalPage title="Delete your account" path="/account-deletion">
    <p className="term-definition">You can delete your PlantPal account directly in the app.</p>
    <h2>In the PlantPal app</h2>
    <ol className="deletion-steps">
      <li>Open PlantPal and sign in to your account.</li>
      <li>Open <strong>Settings</strong>.</li>
      <li>Select <strong>Terminate my account</strong>.</li>
      <li>Confirm your choice to complete deletion.</li>
    </ol>
    <aside className="takeaway" aria-label="Before you confirm"><strong>Deletion is permanent</strong><p>Deletion removes your PlantPal account and all associated information from our databases and cannot be reversed.</p></aside>
    <h2>Cannot access the app?</h2>
    <p>Email <a href="mailto:support@appsgiant.com?subject=PlantPal%20account%20deletion">support@appsgiant.com</a> using the email address linked to your PlantPal account. Support may need to check that the account belongs to you.</p>
    <p className="legal-note">Read more in the <a href="/privacy#account-deletion">account-deletion section of our Privacy Policy</a>.</p>
  </LegalPage>;
}
