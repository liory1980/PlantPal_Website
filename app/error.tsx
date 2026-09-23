'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="main" className="shell empty-state"><h1>הספרייה צריכה רגע.</h1><p>לא הצלחנו לטעון את התוכן כרגע. נסו שוב בעוד רגע.</p><button className="button" onClick={()=>reset()}>ניסיון נוסף</button><a className="text-link" href="/">חזרה ל־PlantPal</a></main>}
