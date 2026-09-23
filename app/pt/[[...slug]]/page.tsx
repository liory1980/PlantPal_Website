import {LocalizedSite,localizedMetadata} from '@/components/plantpal/localized-site';
type P={params:Promise<{slug?:string[]}>;searchParams:Promise<{q?:string}>};
export async function generateMetadata({params}:P){return localizedMetadata('pt',(await params).slug)}
export default async function Page({params,searchParams}:P){return <LocalizedSite locale="pt" parts={(await params).slug} q={(await searchParams).q}/>}
