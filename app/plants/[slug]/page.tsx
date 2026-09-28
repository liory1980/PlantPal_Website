import {notFound} from 'next/navigation';
import {PlantDetail,plantMetadata} from '@/components/plantpal/plants-pages';
import {plantBySlug,plants} from '@/lib/plants';

type Props={params:Promise<{slug:string}>};

export function generateStaticParams(){return plants.map(plant=>({slug:plant.slug}))}

export async function generateMetadata({params}:Props){const plant=plantBySlug((await params).slug);return plant?plantMetadata(plant,'he'):{title:'הצמח לא נמצא',robots:{index:false}}}

export default async function PlantPage({params}:Props){const plant=plantBySlug((await params).slug);if(!plant)notFound();return <main id="main" lang="he-IL" dir="rtl"><PlantDetail plant={plant} locale="he"/></main>}
