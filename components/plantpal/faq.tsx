'use client';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@/components/ui/accordion';
export function FAQ(){return <Accordion type="single" collapsible className="faq">{[
 ['Can PlantPal identify a plant from a photo?','Yes. Take a photo to get an AI identification and related care information. Photo quality and similar-looking species can affect the result, so check the identification before making important care decisions.'],
 ['Does PlantPal remind me to water and fertilize?','You can create watering and fertilizing reminders for each plant. Check the plant and its potting mix when a reminder arrives, because its needs change with light, season, and growing conditions.'],
 ['What does the light meter measure?','PlantPal lets you check current brightness in lux and see guidance about the light around your plant. Phone measurements are estimates; compare readings at leaf height at different times of day.'],
 ['How does Plant Sitter help while I’m away?','Plant Sitter helps someone else care for your plants while you are away. Pair it with clear location notes and a practical handover so a friend, family member, or colleague knows what to check.'],
 ['Where can I download the app?','PlantPal: AI Plant Care is available on the App Store for iOS and Google Play for Android. Choose your store to open the official listing.'],
].map(([q,a],i)=><AccordionItem key={q} value={String(i)}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent><p>{a}</p></AccordionContent></AccordionItem>)}</Accordion>}
