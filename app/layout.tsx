import type { Metadata } from 'next';
import {headers} from 'next/headers';
import {Header,Footer,SkipLink,LocaleLinkGuard} from '@/components/plantpal/shared';
import {SITE_URL} from '@/lib/config';
import {locales,type Locale} from '@/lib/i18n';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(SITE_URL),title:{default:'PlantPal: AI Plant Care | Less guessing, more growing',template:'%s | PlantPal'},description:'Practical houseplant guides and PlantPal tools for plant identification, reminders, light measurement, and personalized care.',icons:{icon:'/images/app-icon.webp'},openGraph:{type:'website',siteName:'PlantPal',locale:'en_US'},twitter:{card:'summary'}};
export default async function RootLayout({children}:{children:React.ReactNode}){const code=(await headers()).get('x-plantpal-locale') as Locale|null;const active=code&&code in locales?locales[code]:locales.en;return <html lang={active.lang} dir={active.dir}><body><LocaleLinkGuard/><SkipLink/><Header/>{children}<Footer/></body></html>}

