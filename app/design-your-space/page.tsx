import {GardenDesignFeature} from '@/components/plantpal/garden-design-feature';
import {SITE_URL} from '@/lib/config';

const title='עיצוב גינה וחלל בעזרת AI: מצילום להדמיה | PlantPal';
const description='צלמו גינה, מרפסת או חדר. PlantPal בוחנת את החלל והמיקום, ממליצה על צמחים ועצים מתאימים ומציגה הדמיה של החלל לאחר השתילה.';
export const metadata={title,description,alternates:{canonical:`${SITE_URL}/he/design-your-space`,languages:{'he-IL':`${SITE_URL}/he/design-your-space`,en:`${SITE_URL}/design-your-space`,'x-default':`${SITE_URL}/design-your-space`}},openGraph:{title,description,url:`${SITE_URL}/he/design-your-space`,locale:'he_IL',type:'website' as const},twitter:{card:'summary' as const,title,description}};

export default function DesignYourSpacePage(){return <main id="main" lang="he-IL" dir="rtl"><GardenDesignFeature locale="he"/></main>}
