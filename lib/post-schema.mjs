import {z} from 'zod';
const text=z.string().trim().min(1).regex(/^[^<>]*$/,'Use plain text, not HTML');
export const contentLocales=['en','he','fr','it','hi','zh','ar','pt','ru','es'];
const sectionSchema=z.object({heading:text.max(150),paragraphs:z.array(text.min(30).max(4000)).min(1).max(12),bullets:z.array(text.max(600)).max(15).optional()}).strict();
const bodySchema=z.object({title:text.min(15).max(110),description:text.min(60).max(180),takeaway:text.min(30).max(400),sections:z.array(sectionSchema).min(3).max(20)}).strict();
const translationsSchema=z.object(Object.fromEntries(contentLocales.map(locale=>[locale,bodySchema.optional()]))).strict().default({});
function checkBody(body,locale,ctx,path){
 const prose=body.sections.flatMap(s=>[...s.paragraphs,...(s.bullets||[])]).join(' ');
 const count=locale==='zh'?Array.from(prose.replace(/\s/g,'')).length:prose.split(/\s+/).length;
 if(count<(locale==='zh'?500:300))ctx.addIssue({code:z.ZodIssueCode.custom,path:[...path,'sections'],message:'Add a substantive full-length localized article.'});
 const headings=body.sections.map(s=>s.heading.toLocaleLowerCase());
 if(new Set(headings).size!==headings.length)ctx.addIssue({code:z.ZodIssueCode.custom,path:[...path,'sections'],message:'Section headings must be distinct.'});
}
export const postSchema=z.object({
 slug:z.string().min(3).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
 title:text.min(15).max(110),description:text.min(60).max(180),takeaway:text.min(30).max(400),
 category:z.enum(['plant-guides','plant-care','troubleshooting','soil-fertilizer','tips']),
 locale:z.enum(contentLocales).default('he'),
 sections:z.array(sectionSchema).min(3).max(20),
 translations:translationsSchema,
 related:z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).max(8).default([]),
 sources:z.array(z.object({title:text.max(150),url:z.string().url().max(2000).refine(v=>new URL(v).protocol==='https:','Sources must use HTTPS')}).strict()).max(15).default([]),
 author:z.literal('PlantPal').default('PlantPal'),status:z.enum(['draft','published']).default('draft'),
 publishedAt:z.string().datetime({offset:true}).transform(v=>new Date(v).toISOString()).optional(),
}).strict().superRefine((p,ctx)=>{
 checkBody(p,p.locale,ctx,[]);
 for(const locale of contentLocales){const copy=p.translations[locale];if(copy)checkBody(copy,locale,ctx,['translations',locale]);}
 if(p.translations[p.locale])ctx.addIssue({code:z.ZodIssueCode.custom,path:['translations',p.locale],message:'The source locale belongs in the top-level article.'});
 if(p.status==='published')for(const locale of contentLocales){if(locale!==p.locale&&!p.translations[locale])ctx.addIssue({code:z.ZodIssueCode.custom,path:['translations',locale],message:'A full translation is required before publication.'});}
 if(p.related.includes(p.slug))ctx.addIssue({code:z.ZodIssueCode.custom,path:['related'],message:'An article cannot link to itself.'});
});

