export const SITE_URL = 'https://plantpal-ai-plant-care.track360-8139.chatgpt.site';
export const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.plantpalcare.app';
export const APP_STORE_URL = 'https://apps.apple.com/us/app/plantpal-ai-plant-care/id6811434296';
export const categories = [
  {slug:'plant-guides', name:'Plant guides', short:'Meet your plants', description:'Get to know your leafy companions, one plant at a time.', icon:'Sprout'},
  {slug:'plant-care', name:'Plant care', short:'Build good habits', description:'Water, light, and everyday care made a little simpler.', icon:'Droplets'},
  {slug:'troubleshooting', name:'Plant problems', short:'Find a little help', description:'Understand yellow leaves, unwelcome guests, and unhappy roots.', icon:'Stethoscope'},
  {slug:'soil-fertilizer', name:'Soil & fertilizer', short:'Start at the roots', description:'Make sense of potting mixes, nutrients, and what to use when.', icon:'Shovel'},
  {slug:'tips', name:'Tips & tricks', short:'Grow your confidence', description:'Small, practical changes for a happier indoor jungle.', icon:'Lightbulb'},
] as const;
export type Category = typeof categories[number]['slug'];
