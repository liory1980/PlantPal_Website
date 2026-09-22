import type { Metadata } from 'next';
import {Header,Footer} from '@/components/plantpal/shared';
import {SITE_URL} from '@/lib/config';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(SITE_URL),title:{default:'PlantPal: AI Plant Care | A Little Care. A Lot More Green.',template:'%s | PlantPal'},description:'Grow healthier houseplants with practical plant care guides, soil and fertilizer advice, and PlantPal, your AI plant identifier and care companion.',icons:{icon:'/images/app-icon.webp'},openGraph:{type:'website',siteName:'PlantPal',locale:'en_US'},twitter:{card:'summary'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header/>{children}<Footer/></body></html>}

