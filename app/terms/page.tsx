import { LegalPage } from '@/components/plantpal/legal-page';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Terms & Conditions', 'Terms for using the PlantPal promotional website, plant care articles, glossary, and other educational resources.', '/terms');

export default function Terms() {
  return <LegalPage title="Terms & Conditions" path="/terms">
    <p className="legal-note">Last updated: September 23, 2026</p>
    <p className="term-definition">These terms apply to this PlantPal website and its educational resources.</p>
    <h2>Using this website</h2>
    <p>By using this website, you agree to these terms. You may browse our plant guides, glossary, product explanations, and app information for lawful purposes. If you do not agree, please stop using the website.</p>
    <p>Do not damage or disrupt the site, introduce malicious code, attempt to access restricted systems, or use it to infringe another person’s rights.</p>
    <h2>Plant care information</h2>
    <p>Our articles and guides offer general education. Plant needs vary with species, growing conditions, season, and the products you use. We cannot guarantee that a suggestion will resolve a particular plant problem or produce a specific result.</p>
    <p>Follow the label and safety instructions on fertilizers, pesticides, and other products. Do not rely on this website or AI plant identification alone to decide whether a plant is edible or safe for people or pets.</p>
    <h2>PlantPal app and store terms</h2>
    <p>This website introduces PlantPal: AI Plant Care. Using the app, downloading it, or purchasing anything through an app store may involve additional terms shown in the app or by the store. Those terms govern the relevant service or transaction. Website descriptions do not replace the information displayed when you download or use the app.</p>
    <h2>Content and ownership</h2>
    <p>The PlantPal name, site design, and original content belong to their respective rights holders. You may read and link to our pages. Republishing or commercially reusing protected material requires permission unless the law allows it. References to third-party brands do not imply sponsorship or endorsement.</p>
    <h2>External links</h2>
    <p>Links may take you to app stores, product manufacturers, or other websites. Their operators control their content and services, and their own terms and privacy policies apply.</p>
    <h2>Availability and your rights</h2>
    <p>We aim to keep the site useful and accurate, but pages may contain errors, change, or become temporarily unavailable. Nothing in these terms excludes rights or protections that applicable law does not allow to be excluded.</p>
    <h2>Privacy and account deletion</h2>
    <p>See our <a href="/privacy">Privacy Policy</a> for the official AppsGiant policy. To close your PlantPal account, follow the <a href="/account-deletion">account-deletion instructions</a>.</p>
    <h2>Updates and contact</h2>
    <p>We may revise these website terms and will show the updated date here. For questions about this site or permission to reuse content, email <a href="mailto:support@appsgiant.com">support@appsgiant.com</a>. You can also read the <a href="https://appsgiant.com/terms">AppsGiant website terms</a>.</p>
  </LegalPage>;
}
