export const SITE_URL = 'https://www.plantpal.ai';
export const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.plantpalcare.app';
export const APP_STORE_URL = 'https://apps.apple.com/us/app/plantpal-ai-plant-care/id6811434296';
export const categories = [
  {slug:'plant-guides', name:'מדריכי צמחים', short:'מכירים כל צמח', description:'מדריכי טיפול ברורים לצמחי הבית שאתם מגדלים.', icon:'Sprout'},
  {slug:'plant-care', name:'טיפול בצמחים', short:'בונים הרגלים טובים', description:'השקיה, אור וטיפול יומיומי בצורה פשוטה ומדויקת.', icon:'Droplets'},
  {slug:'troubleshooting', name:'בעיות בצמחים', short:'מבינים מה השתבש', description:'מזהים עלים צהובים, מזיקים ובעיות שורשים ופועלים נכון.', icon:'Stethoscope'},
  {slug:'soil-fertilizer', name:'אדמה ודישון', short:'מתחילים בשורשים', description:'עושים סדר בתערובות שתילה, חומרי הזנה ומועדי דישון.', icon:'Shovel'},
  {slug:'tips', name:'טיפים שימושיים', short:'מגדלים בביטחון', description:'שינויים קטנים ומעשיים שיעזרו לצמחים לשגשג בבית.', icon:'Lightbulb'},
] as const;
export type Category = typeof categories[number]['slug'];
