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
    intro: 'A climbing aroid from Central American forests, grown for leaves that split and perforate as the plant matures. Splits usually start once leaves pass about 30 cm (12 in) and the light is strong.',
    introHe: 'ארואיד מטפס מיערות מרכז אמריקה, שמגדלים אותו בזכות עלים שמתפצלים ומתנקבים עם התבגרות הצמח. הפיצולים מתחילים בדרך כלל כשהעלים עוברים אורך של כ־30 ס״מ והאור חזק.',
    lightCare: 'Aim for 10,000–20,000 lux, within about 1 m of an east or west window, with no more than a few hours of morning sun. Below about 2,500 lux, new leaves come in small and unsplit; a moss or coir pole encourages larger ones.',
    lightCareHe: 'כוונו ל־10,000–20,000 לוקס, עד כמטר מחלון מזרחי או מערבי, עם לא יותר מכמה שעות של שמש בוקר. מתחת לכ־2,500 לוקס העלים החדשים יוצאים קטנים ושלמים; עמוד טחב או קוקוס מעודד עלים גדולים יותר.',
    waterCare: 'Water when the top 3–5 cm (1–2 in) of a chunky bark-and-perlite mix is dry, then let 10–20% drain away and empty the cachepot. Keep it above 12 °C (54 °F); cold, wet roots rot quickly.',
    waterCareHe: 'השקו כש־3–5 הס״מ העליונים של מצע גס מקליפות עץ ופרלייט יבשים, תנו ל־10–20% מהמים להתנקז החוצה ורוקנו את כלי הנוי. שמרו על טמפרטורה מעל 12 °C; שורשים קרים ורטובים נרקבים מהר.',
    tip: 'Unsplit new leaves on a young or dimly lit plant are normal; more light and a pole, not more fertilizer, bring on the splits.',
    tipHe: 'עלים חדשים ללא חריצים בצמח צעיר או במקום מוצל הם תופעה רגילה; יותר אור ועמוד טיפוס – ולא עוד דשן – הם שמביאים את החריצים.',
    guide: 'monstera-deliciosa-care', source: 'https://www.rhs.org.uk/plants/swiss-cheese-plants',
  },
  {
    slug: 'pothos', name: 'Golden pothos', nameHe: 'פוטוס זהוב', scientific: 'Epipremnum aureum', image: '/images/plants/pothos.webp', group: 'trailing',
    light: 'Medium to bright, indirect', lightHe: 'אור בינוני עד בהיר, עקיף', water: 'Allow partial drying', waterHe: 'לאפשר למצע להתייבש חלקית',
    intro: 'A vigorous aroid vine that stays small-leaved while trailing indoors but makes far bigger leaves when it climbs. Green forms cope with dim rooms; heavily variegated ones need more light.',
    introHe: 'מטפס ארואידי נמרץ, שעליו נשארים קטנים כשהוא משתלשל בבית אך גדלים בהרבה כשהוא מטפס. הזנים הירוקים מסתדרים בחדרים מעומעמים; זנים רבגוניים מאוד זקוקים ליותר אור.',
    lightCare: 'Green ‘Jade’ manages on about 2,500 lux, but most pothos fill out best at 5,000–15,000 lux, 1–2 m from an east window; ‘Marble Queen’ wants 10,000 lux or more. In dim spots the vines stretch, with long bare gaps between leaves.',
    lightCareHe: 'הזן הירוק Jade מסתדר בכ־2,500 לוקס, אבל רוב הפוטוסים מתמלאים בצורה הטובה ביותר ב־5,000–15,000 לוקס, 1–2 מטרים מחלון מזרחי; Marble Queen זקוק ל־10,000 לוקס ומעלה. במקומות מעומעמים השלוחות מתארכות, עם מרווחים חשופים ארוכים בין העלים.',
    waterCare: 'Water when the top quarter of the pot has dried, and check hanging baskets twice as often, since warm air near the ceiling dries them faster. Soft, limp leaves that firm up within hours of watering signal simple thirst; keep it above 12–15 °C (54–59 °F).',
    waterCareHe: 'השקו כשהרבע העליון של העציץ התייבש, ובדקו עציצים תלויים בתדירות כפולה, כי האוויר החם ליד התקרה מייבש אותם מהר יותר. עלים רכים ורפויים שמתקשחים בתוך שעות מההשקיה מעידים על צמא פשוט; שמרו על טמפרטורה מעל 12–15 °C.',
    tip: 'Cut vines 1 cm above a node to make them branch, and root the single-node pieces: they form roots in 2–4 weeks at 20–25 °C.',
    tipHe: 'חתכו שלוחות כ־1 ס״מ מעל מפרק כדי לעודד הסתעפות, והשרישו את הקטעים בעלי המפרק האחד: הם מפתחים שורשים בתוך 2–4 שבועות ב־20–25 °C.',
    guide: 'pothos-care', source: 'https://www.rhs.org.uk/plants/types/houseplants',
  },
  {
    slug: 'snake-plant', name: 'Snake plant', nameHe: 'סנסיווריה', scientific: 'Dracaena trifasciata', image: '/images/plants/snake-plant.webp', group: 'easy',
    light: 'Low to bright, indirect', lightHe: 'אור חלש עד בהיר, עקיף', water: 'Dry well between waterings', waterHe: 'ייבוש משמעותי בין השקיות',
    intro: 'A rhizomatous West African succulent with stiff, upright leaves that uses CAM photosynthesis, opening its stomata at night to save water. It tolerates dim rooms but grows and colors best in brighter light.',
    introHe: 'סוקולנט בעל קני שורש ממערב אפריקה, עם עלים זקופים ונוקשים, שמבצע פוטוסינתזת CAM ופותח את הפיוניות בלילה כדי לחסוך במים. הוא סובל חדרים מעומעמים, אבל גדל ומקבל צבע עז יותר באור חזק.',
    lightCare: 'It survives on 500–2,500 lux in a hallway, but grows faster and keeps ‘Laurentii’ margins bright at 5,000–20,000 lux. After 1–2 weeks of acclimation it takes several hours of direct sun.',
    lightCareHe: 'היא שורדת ב־500–2,500 לוקס במסדרון, אבל גדלה מהר יותר ושומרת על שוליים צהובים בוהקים בזן Laurentii ב־5,000–20,000 לוקס. אחרי 1–2 שבועות של התאקלמות היא מקבלת כמה שעות של שמש ישירה.',
    waterCare: 'Water only when 75–100% of the mix is dry, typically every 2–3 weeks in summer and 3–6 weeks in winter, and keep water out of the center of the rosette. Below 10 °C (50 °F) in wet mix, the leaf bases rot.',
    waterCareHe: 'השקו רק כש־75–100% מהמצע יבש, בדרך כלל אחת ל־2–3 שבועות בקיץ ואחת ל־3–6 שבועות בחורף, והרחיקו מים ממרכז השושנת. מתחת ל־10 °C במצע רטוב, בסיסי העלים נרקבים.',
    tip: 'Soft, translucent leaf bases with damp mix mean rot: cut back to firm tissue and reroot the healthy part instead of adding water.',
    tipHe: 'בסיסי עלים רכים ושקופים לצד מצע לח פירושם ריקבון: חתכו עד לרקמה מוצקה והשרישו מחדש את החלק הבריא, במקום להוסיף מים.',
    guide: 'snake-plant-care', source: 'https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/lighting-for-indoor-plants',
  },
  {
    slug: 'zz-plant', name: 'ZZ plant', nameHe: 'זמיה קוקוס', scientific: 'Zamioculcas zamiifolia', image: '/images/plants/zz-plant.webp', group: 'easy',
    light: 'Low to bright, indirect', lightHe: 'אור חלש עד בהיר, עקיף', water: 'Dry well between waterings', waterHe: 'ייבוש משמעותי בין השקיות',
    intro: 'An East African aroid that stores water in potato-like rhizomes and grows in sudden flushes of new stems. Its glossy leaflets tolerate office light and neglect better than almost any houseplant.',
    introHe: 'ארואיד ממזרח אפריקה שאוגר מים בקני שורש דמויי תפוחי אדמה וגדל בגלים פתאומיים של גבעולים חדשים. עלעליו המבריקים סובלים תאורת משרד והזנחה טוב יותר כמעט מכל צמח בית אחר.',
    lightCare: 'It holds on at 500–1,000 lux under office lighting, but produces more and sturdier stems at 5,000–15,000 lux near an east window. Turn the pot a quarter each month so stems don’t lean, and keep it out of afternoon sun.',
    lightCareHe: 'היא מחזיקה מעמד ב־500–1,000 לוקס בתאורת משרד, אבל מצמיחה יותר גבעולים, וחזקים יותר, ב־5,000–15,000 לוקס ליד חלון מזרחי. סובבו את העציץ ברבע סיבוב כל חודש כדי שהגבעולים לא ייטו, והרחיקו אותה משמש אחר הצהריים.',
    waterCare: 'Wait until the mix is dry through most of the pot, often every 2–4 weeks in summer and 4–6 weeks in winter, then soak and drain. The rhizomes tolerate 10 °C (50 °F) only when dry; cold and wet together is how most ZZs die.',
    waterCareHe: 'חכו עד שהמצע יבש ברוב עומק העציץ, לרוב אחת ל־2–4 שבועות בקיץ ואחת ל־4–6 שבועות בחורף, ואז השקו בנדיבות ותנו להתנקז. קני השורש סובלים 10 °C רק כשהם יבשים; השילוב של קור ורטיבות הוא מה שהורג את רוב הזמיות.',
    tip: 'Months without a new stem are normal between flushes; extra water only risks rotting the rhizomes.',
    tipHe: 'חודשים בלי גבעול חדש בין גל צימוח אחד למשנהו הם דבר רגיל; מים נוספים רק מסכנים את קני השורש בריקבון.',
    guide: 'zz-plant-care', source: 'https://www.rhs.org.uk/plants/types/houseplants',
  },
  {
    slug: 'peace-lily', name: 'Peace lily', nameHe: 'ספטיפיליום', scientific: 'Spathiphyllum', image: '/images/plants/peace-lily.webp', group: 'easy',
    light: 'Medium to bright, indirect', lightHe: 'אור בינוני עד בהיר, עקיף', water: 'Keep evenly, lightly moist', waterHe: 'לשמור על לחות קלה ואחידה',
    intro: 'A rainforest understory aroid with dark, glossy leaves and white spathes wrapped around its flower spikes. It needs steadier moisture than most houseplants and wilts dramatically when dry.',
    introHe: 'ארואיד מתת־היער של יערות הגשם, עם עלים כהים ומבריקים ומתחלים לבנים העוטפים את תפרחותיו. הוא זקוק ללחות יציבה יותר מרוב צמחי הבית, ונובל בצורה דרמטית כשהמצע מתייבש.',
    lightCare: 'Leaves stay healthy at 2,500–5,000 lux, but reliable flowering needs 5,000–15,000 lux, about 1–2 m from an east window. Direct sun through glass bleaches the leaves, and temperatures below 15 °C (59 °F) mark them.',
    lightCareHe: 'העלים נשארים בריאים ב־2,500–5,000 לוקס, אבל פריחה סדירה דורשת 5,000–15,000 לוקס, כמטר עד שניים מחלון מזרחי. שמש ישירה דרך הזכוכית מלבינה את העלים, וטמפרטורות מתחת ל־15 °C מכתימות אותם.',
    waterCare: 'Water when the top 1–2 cm (½ in) of mix is dry, before the leaves droop; in a warm room that is often every 4–7 days. The leaf tips burn from fluoride and salts, so use rainwater or filtered water where tap water is hard or fluoridated.',
    waterCareHe: 'השקו כש־1–2 הס״מ העליונים של המצע יבשים, לפני שהעלים צונחים; בחדר חם זה לרוב אחת ל־4–7 ימים. קצות העלים נצרבים מפלואוריד וממלחים, ולכן השתמשו במי גשם או במים מסוננים כשמי הברז קשים (כמו ברוב אזורי ישראל) או מופלרים.',
    tip: 'The white “flower” is a spathe around the tiny true flowers; good light, not extra fertilizer, brings new ones.',
    tipHe: 'ה״פרח״ הלבן הוא מתחל העוטף את הפרחים האמיתיים הזעירים; אור טוב, ולא עוד דשן, הוא שמביא פריחה חדשה.',
    guide: 'peace-lily-care', source: 'https://www.rhs.org.uk/plants/types/houseplants',
  },
  {
    slug: 'rubber-plant', name: 'Rubber plant', nameHe: 'פיקוס גומי', scientific: 'Ficus elastica', image: '/images/plants/rubber-plant.webp', group: 'statement',
    light: 'Bright, indirect', lightHe: 'אור בהיר ועקיף', water: 'Allow partial drying', waterHe: 'לאפשר למצע להתייבש חלקית',
    intro: 'An Asian fig grown for thick, glossy leaves on a strong single stem that can be pruned to branch. It sheds leaves when conditions change suddenly, so a stable spot matters.',
    introHe: 'פיקוס אסייתי שמגדלים בזכות עלים עבים ומבריקים על גזע יחיד וחזק, שאפשר לגזום כדי לעודד הסתעפות. הוא משיר עלים כשהתנאים משתנים בפתאומיות, ולכן מקום יציב חשוב לו.',
    lightCare: 'Give it 10,000–20,000 lux close to an east or west window, with a few hours of gentle sun once acclimated. Variegated ‘Tineke’ and ‘Ruby’ need the top of that range to keep their cream and pink.',
    lightCareHe: 'תנו לו 10,000–20,000 לוקס קרוב לחלון מזרחי או מערבי, עם כמה שעות של שמש רכה לאחר התאקלמות. הזנים הרבגוניים Tineke ו־Ruby זקוקים לקצה העליון של הטווח כדי לשמור על גוני הקרם והוורוד.',
    waterCare: 'Water when the top 3–5 cm is dry, probing 10–15 cm deep in large floor pots where the core stays wet longer. Keep it above 12 °C (54 °F) and away from cold drafts, which trigger leaf drop.',
    waterCareHe: 'השקו כש־3–5 הס״מ העליונים יבשים, ובעציצי רצפה גדולים, שבהם הליבה נשארת רטובה זמן רב יותר, בדקו לעומק של 10–15 ס״מ. שמרו על טמפרטורה מעל 12 °C והרחיקו את הצמח מרוחות קרות, שגורמות לנשירת עלים.',
    tip: 'Cut the top 1 cm above a node in spring to make it branch; wear gloves, as the milky latex irritates skin.',
    tipHe: 'באביב, חתכו את הצמרת כ־1 ס״מ מעל מפרק כדי לעודד הסתעפות; לבשו כפפות, כי השרף החלבי מגרה את העור.',
    guide: 'rubber-plant-care', source: 'https://www.rhs.org.uk/plants/ornamental-figs/growing-guide/',
  },
  {
    slug: 'spider-plant', name: 'Spider plant', nameHe: 'ירקה מצויצת', scientific: 'Chlorophytum comosum', image: '/images/plants/spider-plant.webp', group: 'easy',
    light: 'Bright, indirect', lightHe: 'אור בהיר ועקיף', water: 'Water after the top dries', waterHe: 'להשקות אחרי ייבוש השכבה העליונה',
    intro: 'A southern African clump-former whose fleshy, tuberous roots store water and whose arching runners carry baby plantlets. The ASPCA lists it as non-toxic to cats and dogs.',
    introHe: 'צמח גושי מדרום היבשת האפריקנית, ששורשיו הבשרניים והפקעתיים אוגרים מים ושלוחותיו הקשתיות נושאות צמחי־בת קטנים. ה־ASPCA מגדירה אותו כלא רעיל לחתולים ולכלבים.',
    lightCare: 'Stripes stay crisp at 5,000–15,000 lux, within 1–2 m of a bright window. It tolerates about 2,500 lux but fades and rarely makes plantlets there, while hot summer sun through glass scorches the leaf tips.',
    lightCareHe: 'הפסים נשארים חדים ב־5,000–15,000 לוקס, במרחק 1–2 מטרים מחלון מואר. הצמח סובל כ־2,500 לוקס, אבל שם הפסים דוהים והוא כמעט אינו מוציא צמחי־בת, ואילו שמש קיץ חמה דרך הזכוכית צורבת את קצות העלים.',
    waterCare: 'Water when the top 2–3 cm (about 1 in) of mix is dry; the tuberous roots buffer short dry spells. Brown tips often come from fluoride or salts, so flush the pot with 2–3 times its volume of water every few months or use rainwater.',
    waterCareHe: 'השקו כש־2–3 הס״מ העליונים של המצע יבשים; השורשים הפקעתיים מגשרים על תקופות יובש קצרות. קצות עלים חומים נובעים לעיתים קרובות מפלואוריד או ממלחים, שמצטברים מהר במי הברז הקשים בישראל, ולכן שטפו את העציץ במים בנפח של פי 2–3 מנפחו אחת לכמה חודשים, או השתמשו במי גשם.',
    tip: 'Pin a plantlet with visible root nubs onto moist mix while still attached, then cut the runner once it has rooted in 2–3 weeks.',
    tipHe: 'הצמידו צמח־בת שכבר נראים בו ניצני שורשים אל מצע לח כשהוא עדיין מחובר לצמח האם, וחתכו את השלוחה לאחר שהשריש, בתוך 2–3 שבועות.',
    source: 'https://www.rhs.org.uk/plants/spider-plants/growing-guide',
  },
  {
    slug: 'fiddle-leaf-fig', name: 'Fiddle-leaf fig', nameHe: 'פיקוס כינורי', scientific: 'Ficus lyrata', image: '/images/plants/fiddle-leaf-fig.webp', group: 'statement',
    light: 'Bright, indirect', lightHe: 'אור בהיר ועקיף', water: 'Allow partial drying', waterHe: 'לאפשר למצע להתייבש חלקית',
    intro: 'A West African fig with large, violin-shaped leaves that sulks after moves and drafts. Consistent light, temperature, and watering matter more to it than to almost any other houseplant.',
    introHe: 'פיקוס ממערב אפריקה עם עלים גדולים בצורת כינור, שמגיב רע להעברות ולרוחות פרצים. עקביות באור, בטמפרטורה ובהשקיה חשובה לו יותר מכמעט לכל צמח בית אחר.',
    lightCare: 'It needs at least 10,000–20,000 lux, right beside an east window or about 1 m from a south one, and benefits from a few hours of acclimated direct sun. Find that spot once and leave it there, turning the pot only slightly every few weeks.',
    lightCareHe: 'הוא זקוק ל־10,000–20,000 לוקס לפחות, צמוד לחלון מזרחי או כמטר מחלון דרומי, ונהנה מכמה שעות של שמש ישירה לאחר התאקלמות. מצאו את המקום הזה פעם אחת והשאירו אותו שם, וסובבו את העציץ רק מעט אחת לכמה שבועות.',
    waterCare: 'Water when the top 3–5 cm, about a third of the pot, is dry, and keep that rhythm steady. Irregular soaking and drying causes edema, red-brown spots on new leaves; keep it above 15 °C (59 °F).',
    waterCareHe: 'השקו כש־3–5 הס״מ העליונים, כשליש מהעציץ, יבשים, ושמרו על קצב קבוע. הרטבה וייבוש לא סדירים גורמים לבצקת – נקודות אדמדמות־חומות בעלים החדשים; שמרו על טמפרטורה מעל 15 °C.',
    tip: 'Red-brown speckles on young leaves usually mean irregular watering (edema), not disease; steady the routine rather than spraying.',
    tipHe: 'נקודות אדמדמות־חומות בעלים צעירים מעידות בדרך כלל על השקיה לא סדירה (בצקת, edema) ולא על מחלה; ייצבו את השגרה במקום לרסס.',
    source: 'https://www.rhs.org.uk/plants/ornamental-figs/growing-guide/',
  },
  {
    slug: 'heartleaf-philodendron', name: 'Heartleaf philodendron', nameHe: 'פילודנדרון לבבי', scientific: 'Philodendron hederaceum', image: '/images/plants/heartleaf-philodendron.webp', group: 'trailing',
    light: 'Bright, indirect', lightHe: 'אור בהיר ועקיף', water: 'Let the top layer dry', waterHe: 'כשהשכבה העליונה מתייבשת',
    intro: 'A fast, forgiving vine from Central and South American forests with soft, heart-shaped leaves. It trails from shelves or climbs a pole, and makes bigger leaves when it climbs.',
    introHe: 'מטפס מהיר וסלחני מיערות מרכז ודרום אמריקה, עם עלים רכים בצורת לב. הוא משתלשל ממדפים או מטפס על עמוד, ומצמיח עלים גדולים יותר כשהוא מטפס.',
    lightCare: 'It grows steadily at 2,500–10,000 lux, 1–2 m from a bright window, and tolerates dimmer rooms with longer gaps between leaves. Midday summer sun through glass yellows and scorches its thin leaves.',
    lightCareHe: 'הוא גדל בקצב יציב ב־2,500–10,000 לוקס, 1–2 מטרים מחלון מואר, וסובל גם חדרים מעומעמים יותר, עם מרווחים ארוכים יותר בין העלים. שמש צהריים של קיץ דרך הזכוכית מצהיבה וצורבת את עליו הדקים.',
    waterCare: 'Water when the top 2–5 cm, about a quarter of the pot, is dry; slightly curled, limp leaves are its thirst signal. Drain fully, never leave it standing in water, and keep it above 13 °C (55 °F).',
    waterCareHe: 'השקו כש־2–5 הס״מ העליונים, כרבע מהעציץ, יבשים; עלים מעט מסולסלים ורפויים הם סימן הצמא שלו. תנו להתנקז עד הסוף, לעולם אל תשאירו אותו עומד במים, ושמרו על טמפרטורה מעל 13 °C.',
    tip: 'Cuttings with one or two nodes root in water in 2–3 weeks; pot several together for a fuller plant.',
    tipHe: 'ייחורים עם מפרק אחד או שניים משתרשים במים בתוך 2–3 שבועות; שתלו כמה יחד לצמח מלא יותר.',
    source: 'https://www.rhs.org.uk/plants/philodendron/growing-guide',
  },
  {
    slug: 'aloe-vera', name: 'Aloe vera', nameHe: 'אלוורה', scientific: 'Aloe vera', image: '/images/plants/aloe-vera.webp', group: 'easy',
    light: 'Bright light', lightHe: 'אור בהיר', water: 'Dry well between waterings', waterHe: 'ייבוש משמעותי בין השקיות',
    intro: 'A CAM succulent from the Arabian Peninsula that stores water in gel-filled leaves. It needs far more light than most houseplants and rots quickly in wet mix.',
    introHe: 'סוקולנט CAM מחצי האי ערב, שאוגר מים בעלים מלאי ג׳ל. הוא זקוק להרבה יותר אור מרוב צמחי הבית ונרקב מהר במצע רטוב.',
    lightCare: 'Give it at least 4–6 hours of bright light a day, ideally on a south or west sill (north in the Southern Hemisphere). In low light it stretches and flattens; move it into sun over 1–2 weeks or it sunburns red-brown.',
    lightCareHe: 'תנו לה לפחות 4–6 שעות של אור חזק ביום, רצוי על אדן חלון דרומי או מערבי. באור חלש היא מתארכת ועליה משתטחים; העבירו אותה לשמש בהדרגה במשך 1–2 שבועות, אחרת העלים נצרבים ומקבלים גוון אדום־חום.',
    waterCare: 'Water only when the gritty mix is completely dry, then soak and drain; in winter that can stretch to every 3–6 weeks. It tolerates 5–10 °C (41–50 °F) if kept dry, but cold and wet together rot the base.',
    waterCareHe: 'השקו רק כשהמצע החצצי יבש לגמרי, ואז השקו בנדיבות ותנו להתנקז; בחורף המרווח יכול להתארך לאחת ל־3–6 שבועות. היא סובלת 5–10 °C אם היא יבשה, אבל קור ורטיבות יחד מרקיבים את הבסיס.',
    tip: 'Thin, flat, pale leaves mean too little light; plump, firm, grey-green leaves mean the light and watering are right.',
    tipHe: 'עלים דקים, שטוחים וחיוורים מעידים על מחסור באור; עלים מלאים, מוצקים ובגוון ירוק־אפרפר מעידים שהאור וההשקיה נכונים.',
    source: 'https://www.rhs.org.uk/plants/aloe',
  },
];

export const plantBySlug = (slug: string) => plants.find(plant => plant.slug === slug);
