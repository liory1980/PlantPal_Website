import {z} from 'zod';
const text=z.string().trim().min(1).regex(/^[^<>]*$/,'Use plain text, not HTML');
export const postSchema=z.object({
 slug:z.string().min(3).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
 title:text.min(15).max(110),description:text.min(60).max(180),takeaway:text.min(30).max(400),
 category:z.enum(['plant-guides','plant-care','troubleshooting','soil-fertilizer','tips']),
 locale:z.enum(['he','en','ar']).default('he'),
 sections:z.array(z.object({heading:text.max(150),paragraphs:z.array(text.min(30).max(4000)).min(1).max(12),bullets:z.array(text.max(600)).max(15).optional()}).strict()).min(3).max(20),
 related:z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).max(8).default([]),
 sources:z.array(z.object({title:text.max(150),url:z.string().url().max(2000).refine(v=>new URL(v).protocol==='https:','Sources must use HTTPS')}).strict()).max(15).default([]),
 author:z.literal('PlantPal').default('PlantPal'),status:z.enum(['draft','published']).default('draft'),
 publishedAt:z.string().datetime({offset:true}).transform(v=>new Date(v).toISOString()).optional(),
}).strict().superRefine((p,ctx)=>{
 const words=p.sections.flatMap(s=>[...s.paragraphs,...(s.bullets||[])]).join(' ').split(/\s+/).length;
 if(words<300)ctx.addIssue({code:z.ZodIssueCode.custom,path:['sections'],message:'Add at least 300 words of substantive article content.'});
 const headings=p.sections.map(s=>s.heading.toLowerCase());if(new Set(headings).size!==headings.length)ctx.addIssue({code:z.ZodIssueCode.custom,path:['sections'],message:'Section headings must be distinct.'});
 if(p.related.includes(p.slug))ctx.addIssue({code:z.ZodIssueCode.custom,path:['related'],message:'An article cannot link to itself.'});
});

