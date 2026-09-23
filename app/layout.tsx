import type { Metadata } from 'next';
import {Header,Footer} from '@/components/plantpal/shared';
import {SITE_URL} from '@/lib/config';
import {locale} from '@/lib/i18n';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(SITE_URL),title:{default:'PlantPal: טיפול חכם בצמחים | פחות ניחושים, יותר ירוק',template:'%s | PlantPal'},description:'מדריכים מעשיים לצמחי בית, מידע על אדמה ודישון ואפליקציית PlantPal לזיהוי צמחים, תזכורות וטיפול חכם.',icons:{icon:'/images/app-icon.webp'},openGraph:{type:'website',siteName:'PlantPal',locale:'he_IL'},twitter:{card:'summary'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang={locale.lang} dir={locale.dir}><body><a className="skip-link" href="#main">דילוג לתוכן</a><Header/>{children}<Footer/></body></html>}

