import {LocalizedSite,localizedMetadata} from '@/components/plantpal/localized-site';
export const dynamic='force-dynamic';
type P={params:Promise<{slug?:string[]}>;searchParams:Promise<{q?:string}>};
export async function generateMetadata({params}:P){return localizedMetadata('ar',(await params).slug)}
export default async function Page({params,searchParams}:P){return <LocalizedSite locale="ar" parts={(await params).slug} q={(await searchParams).q}/>}
