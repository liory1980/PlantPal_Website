export type Plant = {
  slug: string;
  name: string;
  nameHe: string;
  scientific: string;
  image: string;
  group: 'easy' | 'statement' | 'trailing';
  light: string;
  lightHe: string;
  water: string;
  waterHe: string;
  intro: string;
  introHe: string;
  lightCare: string;
  lightCareHe: string;
  waterCare: string;
  waterCareHe: string;
  tip: string;
  tipHe: string;
  guide?: string;
  source: string;
};

// A curated starter collection, not a sales or search-volume ranking.
// Add future species here; the catalog, detail routes, and sitemap use this list.
export const plants: Plant[] = [
  {
    slug: 'monstera', name: 'Monstera', nameHe: 'מונסטרה', scientific: 'Monstera deliciosa', image: '/images/plants/monstera.webp', group: 'statement',
    light: 'Bright, indirect', lightHe: 'אור בהיר ועקיף', water: 'Let the top layer dry', waterHe: 'כשהשכבה העליונה מתייבשת',
    intro: 'The dramatic split leaves make monstera a room-defining climber. Young leaves can be whole; splits develop as the plant matures in good conditions.',
    introHe: 'העלים המחורצים הופכים את המונסטרה לצמח בולט בחדר. עלים צעירים עשויים להיות שלמים; החריצים מופיעים עם ההתבגרות ובתנאים מתאימים.',
    lightCare: 'Place it near a bright window, away from harsh midday sun. Give the stems room and a stable support as they climb.',
    lightCareHe: 'מקמו ליד חלון מואר, בלי שמש צהריים חזקה. השאירו מקום לצמיחה ותנו לגבעולים תמיכה יציבה.',
    waterCare: 'Check below the surface before watering. Use a draining pot and empty any water left in the outer container.',
    waterCareHe: 'בדקו לחות מתחת לפני המצע לפני השקיה. השתמשו בעציץ מנוקז ורוקנו מים שנשארו בכלי החיצוני.',
    tip: 'New leaves without splits are not automatically a sign of trouble; age and light both matter.',
    tipHe: 'עלה חדש בלי חריצים אינו בהכרח סימן לבעיה; גם גיל הצמח וגם התאורה משפיעים.',
    guide: 'monstera-deliciosa-care', source: 'https://www.rhs.org.uk/plants/swiss-cheese-plants',
  },
  {
    slug: 'pothos', name: 'Golden pothos', nameHe: 'פוטוס זהוב', scientific: 'Epipremnum aureum', image: '/images/plants/pothos.webp', group: 'trailing',
    light: 'Medium to bright, indirect', lightHe: 'אור בינוני עד בהיר, עקיף', water: 'Allow partial drying', waterHe: 'לאפשר למצע להתייבש חלקית',
    intro: 'An adaptable vine that softens shelves and hanging planters with heart-shaped leaves. More useful light usually means fuller growth.',
    introHe: 'מטפס גמיש שמרכך מדפים ועציצים תלויים בעלים דמויי לב. אור מתאים יעזור לו לצמוח בצפיפות רבה יותר.',
    lightCare: 'Bright indirect light is a good starting point, especially for variegated leaves. Very dim rooms can lead to smaller leaves and long bare gaps.',
    lightCareHe: 'אור בהיר ועקיף הוא נקודת פתיחה טובה, בעיקר לזנים מגוונים. בחדר חשוך מאוד העלים עלולים להקטין והמרווחים בין העלים להתארך.',
    waterCare: 'Feel the mix rather than judging by the vine length. Water thoroughly when part of the upper mix has dried and let the pot drain.',
    waterCareHe: 'בדקו את המצע במקום להסתמך על אורך השלוחות. השקו היטב לאחר שחלקו העליון התייבש ותנו לעודפים להתנקז.',
    tip: 'Trim above a node to encourage a neater plant; a cutting needs a node to root.',
    tipHe: 'גיזום מעל מפרק יעזור לשמור על מראה מלא; ייחור זקוק למפרק כדי להשריש.',
    guide: 'pothos-care', source: 'https://www.rhs.org.uk/plants/types/houseplants',
  },
  {
    slug: 'snake-plant', name: 'Snake plant', nameHe: 'סנסיווריה', scientific: 'Dracaena trifasciata', image: '/images/plants/snake-plant.webp', group: 'easy',
    light: 'Low to bright, indirect', lightHe: 'אור חלש עד בהיר, עקיף', water: 'Dry well between waterings', waterHe: 'ייבוש משמעותי בין השקיות',
    intro: 'Architectural upright leaves and a patient growth habit make this a favorite for compact spaces. It tolerates lower light, but still needs usable light.',
    introHe: 'עלים זקופים ומראה פיסולי הופכים את הסנסיווריה לבחירה נוחה לחללים קטנים. היא סובלת אור חלש, אבל עדיין זקוקה לאור שימושי.',
    lightCare: 'Choose indirect light when possible. If moving it into direct sun, acclimate it gradually to avoid marked leaves.',
    lightCareHe: 'עדיף לבחור באור עקיף. אם מעבירים לשמש ישירה, עשו זאת בהדרגה כדי למנוע צריבה בעלים.',
    waterCare: 'Let the mix dry substantially, including deeper in the pot. The thick leaves store water; frequent small drinks can leave roots too wet.',
    waterCareHe: 'תנו למצע להתייבש היטב, גם בעומק העציץ. העלים העבים אוגרים מים והשקיות קטנות ותכופות עלולות להשאיר את השורשים רטובים מדי.',
    tip: 'Soft, collapsing leaves with damp soil call for a root check, not more water.',
    tipHe: 'עלים רכים וקורסים לצד מצע לח מצריכים בדיקת שורשים, לא עוד מים.',
    guide: 'snake-plant-care', source: 'https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/lighting-for-indoor-plants',
  },
  {
    slug: 'zz-plant', name: 'ZZ plant', nameHe: 'זמיה קוקוס', scientific: 'Zamioculcas zamiifolia', image: '/images/plants/zz-plant.webp', group: 'easy',
    light: 'Low to bright, indirect', lightHe: 'אור חלש עד בהיר, עקיף', water: 'Dry well between waterings', waterHe: 'ייבוש משמעותי בין השקיות',
    intro: 'Glossy leaflets and graceful stems bring calm structure to a room. Its underground rhizomes store water, so patience is part of its care.',
    introHe: 'עלעלים מבריקים וגבעולים קשתיים מוסיפים לחדר צורה רגועה. קני השורש שמתחת למצע אוגרים מים, ולכן סבלנות היא חלק מהטיפול.',
    lightCare: 'It copes with dimmer spots, though bright indirect light supports stronger growth. Keep it away from sudden intense sun.',
    lightCareHe: 'הצמח מסתדר גם במקומות פחות מוארים, אך אור בהיר ועקיף מעודד צמיחה טובה יותר. הימנעו מחשיפה פתאומית לשמש חזקה.',
    waterCare: 'Wait until the mix has dried substantially. Water evenly, let excess drain, and never leave water hidden in a cover pot.',
    waterCareHe: 'חכו לייבוש משמעותי של המצע. השקו באופן אחיד, הניחו לעודפים להתנקז ואל תשאירו מים בכלי החיצוני.',
    tip: 'A quiet month without a new shoot is normal; extra water will not speed up its growth.',
    tipHe: 'חודש שקט בלי גבעול חדש הוא דבר רגיל; עוד מים לא יזרזו את הצמיחה.',
    guide: 'zz-plant-care', source: 'https://www.rhs.org.uk/plants/types/houseplants',
  },
  {
    slug: 'peace-lily', name: 'Peace lily', nameHe: 'ספטיפיליום', scientific: 'Spathiphyllum', image: '/images/plants/peace-lily.webp', group: 'easy',
    light: 'Medium to bright, indirect', lightHe: 'אור בינוני עד בהיר, עקיף', water: 'Keep evenly, lightly moist', waterHe: 'לשמור על לחות קלה ואחידה',
    intro: 'Deep green leaves and elegant white spathes give peace lilies a quietly lush look. They appreciate steadier moisture than many other favorites here.',
    introHe: 'עלים ירוקים עמוקים ומתחלים לבנים מעניקים לספטיפיליום מראה שופע ועדין. הוא מעדיף לחות יציבה יותר מרבים מהצמחים האחרים כאן.',
    lightCare: 'Give it indirect light; a very dark corner can limit flowering. Avoid sudden strong sun and drafts.',
    lightCareHe: 'בחרו אור עקיף; פינה חשוכה מאוד עלולה לצמצם פריחה. הימנעו משמש חזקה ופתאומית ומרוחות פרצים.',
    waterCare: 'Check the mix before it becomes bone dry. Keep it gently moist, not saturated, and investigate drooping if the mix is already wet.',
    waterCareHe: 'בדקו את המצע לפני שהוא מתייבש לגמרי. שמרו על לחות קלה בלי הצפה, ואם הצמח שמוט כשהמצע כבר רטוב — בדקו את השורשים.',
    tip: 'The white “flower” is a spathe around the small true flowers; it naturally ages and changes color.',
    tipHe: 'ה״פרח״ הלבן הוא מתחַל העוטף פרחים קטנים; הוא משנה צבע עם התבגרותו באופן טבעי.',
    guide: 'peace-lily-care', source: 'https://www.rhs.org.uk/plants/types/houseplants',
  },
  {
    slug: 'rubber-plant', name: 'Rubber plant', nameHe: 'פיקוס גומי', scientific: 'Ficus elastica', image: '/images/plants/rubber-plant.webp', group: 'statement',
    light: 'Bright, indirect', lightHe: 'אור בהיר ועקיף', water: 'Allow partial drying', waterHe: 'לאפשר למצע להתייבש חלקית',
    intro: 'Bold, glossy leaves lend a room a polished, sculptural feel. A stable position and gentle changes suit this ficus.',
    introHe: 'העלים הגדולים והמבריקים מעניקים לחדר מראה פיסולי ומוקפד. לפיקוס הזה מתאים מקום קבוע ושינויים הדרגתיים.',
    lightCare: 'Offer bright light and gradually acclimate it to any direct sun. Keep leaves away from cold glass and strong drafts.',
    lightCareHe: 'ספקו אור בהיר והרגילו אותו בהדרגה לשמש ישירה, אם יש. הרחיקו את העלים מזכוכית קרה ומרוחות חזקות.',
    waterCare: 'Check moisture below the surface. Water after some drying and let runoff escape fully from the pot.',
    waterCareHe: 'בדקו לחות מתחת לשכבה העליונה. השקו לאחר ייבוש חלקי ותנו לכל עודפי המים לצאת מהעציץ.',
    tip: 'Wipe broad leaves gently with a damp cloth; it is also a good moment to inspect for pests.',
    tipHe: 'נגבו בעדינות את העלים הרחבים במטלית לחה; זו גם הזדמנות לבדוק אם יש מזיקים.',
    guide: 'rubber-plant-care', source: 'https://www.rhs.org.uk/plants/ornamental-figs/growing-guide/',
  },
  {
    slug: 'spider-plant', name: 'Spider plant', nameHe: 'ירקה מצויצת', scientific: 'Chlorophytum comosum', image: '/images/plants/spider-plant.webp', group: 'easy',
    light: 'Bright, indirect', lightHe: 'אור בהיר ועקיף', water: 'Water after the top dries', waterHe: 'להשקות אחרי ייבוש השכבה העליונה',
    intro: 'A cheerful fountain of striped leaves that often grows dangling baby plants. It is an approachable choice for a shelf or hanging pot.',
    introHe: 'מזרקה עליזה של עלים מפוספסים, שלעתים מוציאה צמחי־בת משתלשלים. בחירה נוחה למדף או לעציץ תלוי.',
    lightCare: 'Bright indirect light shows off its stripes. It tolerates less light, but strong summer sun may scorch the leaves.',
    lightCareHe: 'אור בהיר ועקיף מדגיש את הפסים. הצמח סובל גם פחות אור, אך שמש קיץ חזקה עלולה לצרוב את העלים.',
    waterCare: 'Water when the top of the mix has dried, then let it drain. Avoid keeping the pot constantly soggy.',
    waterCareHe: 'השקו כשהשכבה העליונה של המצע מתייבשת ותנו למים להתנקז. אל תשאירו את העציץ ספוג בקביעות.',
    tip: 'Baby plants can be rooted to start a new pot once they are developed enough.',
    tipHe: 'אפשר להשריש צמחי־בת מפותחים ולהתחיל מהם עציץ חדש.',
    source: 'https://www.rhs.org.uk/plants/spider-plants/growing-guide',
  },
  {
    slug: 'fiddle-leaf-fig', name: 'Fiddle-leaf fig', nameHe: 'פיקוס כינורי', scientific: 'Ficus lyrata', image: '/images/plants/fiddle-leaf-fig.webp', group: 'statement',
    light: 'Bright, indirect', lightHe: 'אור בהיר ועקיף', water: 'Allow partial drying', waterHe: 'לאפשר למצע להתייבש חלקית',
    intro: 'Large violin-shaped leaves turn this small indoor tree into a striking focal point. It does best when its light and location stay consistent.',
    introHe: 'עלים גדולים בצורת כינור הופכים את העץ הביתי הזה למוקד בולט. הוא מצליח יותר כשהאור והמיקום נשארים יציבים.',
    lightCare: 'Place near a bright window with filtered light. Rotate gently for balanced growth and avoid repeated abrupt moves.',
    lightCareHe: 'מקמו ליד חלון מואר עם אור מסונן. סובבו בעדינות לצמיחה מאוזנת והימנעו מהעברות חדות ותכופות.',
    waterCare: 'Check deeper in the mix before watering. Thoroughly moisten the root ball when needed and let all excess drain.',
    waterCareHe: 'בדקו לחות עמוק יותר במצע לפני השקיה. כשצריך, הרטיבו את בית השורשים היטב ותנו לכל העודפים להתנקז.',
    tip: 'A fallen leaf is a clue to review recent changes, light, and root moisture before changing everything at once.',
    tipHe: 'עלה שנשר הוא רמז לבדוק שינויים אחרונים, אור ולחות בשורשים לפני שמשנים הכול בבת אחת.',
    source: 'https://www.rhs.org.uk/plants/ornamental-figs/growing-guide/',
  },
  {
    slug: 'heartleaf-philodendron', name: 'Heartleaf philodendron', nameHe: 'פילודנדרון לבבי', scientific: 'Philodendron hederaceum', image: '/images/plants/heartleaf-philodendron.webp', group: 'trailing',
    light: 'Bright, indirect', lightHe: 'אור בהיר ועקיף', water: 'Let the top layer dry', waterHe: 'כשהשכבה העליונה מתייבשת',
    intro: 'Soft, heart-shaped leaves cascade from shelves or climb a support. A warm, bright position keeps the vine looking full.',
    introHe: 'עלים רכים בצורת לב משתלשלים ממדפים או מטפסים על תמיכה. מקום חמים ומואר עוזר לשלוחות להישאר מלאות.',
    lightCare: 'Give bright indirect light; hot direct summer sun can scorch leaves. A support is optional if you prefer it to climb.',
    lightCareHe: 'תנו אור בהיר ועקיף; שמש קיץ ישירה וחמה עלולה לצרוב עלים. אפשר להוסיף תמיכה אם רוצים שיעלה לגובה.',
    waterCare: 'Wait until the top of the mix dries, then water and drain well. Do not leave the pot standing in water.',
    waterCareHe: 'חכו לייבוש השכבה העליונה, ואז השקו ותנו לעודפים להתנקז. אל תשאירו את העציץ עומד במים.',
    tip: 'Prune a leggy stem just after a leaf node to encourage a fuller shape.',
    tipHe: 'גזמו שלוחה דלילה מיד אחרי מפרק עלה כדי לעודד מראה מלא יותר.',
    source: 'https://www.rhs.org.uk/plants/philodendron/growing-guide',
  },
  {
    slug: 'aloe-vera', name: 'Aloe vera', nameHe: 'אלוורה', scientific: 'Aloe vera', image: '/images/plants/aloe-vera.webp', group: 'easy',
    light: 'Bright light', lightHe: 'אור בהיר', water: 'Dry well between waterings', waterHe: 'ייבוש משמעותי בין השקיות',
    intro: 'A sculptural succulent with water-storing leaves. Its compact rosette is well suited to a bright windowsill with a draining pot.',
    introHe: 'סוקולנט פיסולי בעל עלים שאוגרים מים. שושנת העלים הקומפקטית מתאימה לאדן חלון מואר ולעציץ מנוקז.',
    lightCare: 'Choose a very bright position and introduce stronger direct sun gradually, especially after a move from a shaded shop.',
    lightCareHe: 'בחרו מקום מואר מאוד והרגילו אותו לשמש ישירה חזקה בהדרגה, במיוחד אחרי שהגיע מחנות מוצלת.',
    waterCare: 'Let the mix dry well between waterings and use a free-draining pot. Reduce watering further when light and growth slow.',
    waterCareHe: 'תנו למצע להתייבש היטב בין השקיות והשתמשו בעציץ עם ניקוז. כשהאור והצמיחה נחלשים, צמצמו השקיה עוד יותר.',
    tip: 'Firm leaves and sound roots matter more than a fixed weekly watering schedule.',
    tipHe: 'עלים מוצקים ושורשים בריאים חשובים יותר מלוח השקיה שבועי קבוע.',
    source: 'https://www.rhs.org.uk/plants/aloe',
  },
];

export const plantBySlug = (slug: string) => plants.find(plant => plant.slug === slug);
