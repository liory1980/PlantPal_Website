'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="main" className="shell empty-state"><h1>The library needs a moment.</h1><p>We couldn’t load the content right now. Please try again shortly.</p><button className="button" onClick={()=>reset()}>Try again</button><a className="text-link" href="/">Back to PlantPal</a></main>}
