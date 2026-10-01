import type {ReactNode} from 'react';
import styles from './app-showcase.module.css';

// These are the owner's real app captures. Keep captions tied to the visible UI.
const copy = {
  en: ['Inside PlantPal', 'A closer look at your plant companion.', 'Actual app screens, shown in English.', 'Your daily garden', 'See your progress and upcoming care reminders at a glance.', 'Small steps, real progress', 'Your plants, care medals and Ask Plant AI, together on the Garden screen.', 'Every plant in its place', 'Browse your collection, search by species and filter by room.', 'View full screenshot'],
  he: ['בתוך PlantPal', 'מכירים את האפליקציה מקרוב.', 'צילומי מסך אמיתיים מהאפליקציה, באנגלית.', 'הגינה היומית שלכם', 'רואים את ההתקדמות ואת תזכורות הטיפול הקרובות במבט אחד.', 'צעדים קטנים, התקדמות אמיתית', 'הצמחים, מדליות הטיפול ו־Ask Plant AI יחד במסך הגינה.', 'לכל צמח יש מקום', 'מעיינים באוסף, מחפשים לפי מין ומסננים לפי חדר.', 'לצפייה בצילום המסך המלא'],
  fr: ['Dans PlantPal', 'Découvrez votre compagnon végétal.', 'Captures réelles de l’application, en anglais.', 'Votre jardin au quotidien', 'Retrouvez votre progression et les prochains rappels de soin.', 'De petits gestes qui comptent', 'Vos plantes, vos médailles et Ask Plant AI sur l’écran Jardin.', 'Chaque plante à sa place', 'Parcourez la collection, recherchez une espèce et filtrez par pièce.', 'Voir la capture complète'],
  it: ['Dentro PlantPal', 'Scopri il tuo compagno per le piante.', 'Schermate reali dell’app, in inglese.', 'Il tuo giardino quotidiano', 'Controlla i progressi e i prossimi promemoria di cura.', 'Piccoli passi, veri progressi', 'Piante, medaglie e Ask Plant AI nella schermata Giardino.', 'Ogni pianta al suo posto', 'Sfoglia la collezione, cerca per specie e filtra per stanza.', 'Visualizza la schermata completa'],
  hi: ['PlantPal के अंदर', 'अपने पौधों के साथी को करीब से जानें।', 'ऐप के असली स्क्रीनशॉट, अंग्रेज़ी में।', 'आपका रोज़ का बगीचा', 'अपनी प्रगति और आने वाली देखभाल की याद दिलाने वाली सूचनाएँ देखें।', 'छोटे कदम, असली प्रगति', 'गार्डन स्क्रीन पर आपके पौधे, देखभाल के पदक और Ask Plant AI।', 'हर पौधा अपनी जगह', 'संग्रह देखें, प्रजाति से खोजें और कमरे के अनुसार छाँटें।', 'पूरा स्क्रीनशॉट देखें'],
  zh: ['走进 PlantPal', '近距离了解你的植物伙伴。', '真实应用截图，以英语显示。', '你的日常花园', '一眼查看成长进度和即将到来的养护提醒。', '小小行动，点滴进步', '在花园页面查看植物、养护奖章和 Ask Plant AI。', '每株植物，各有其位', '浏览收藏，按品种搜索，按房间筛选。', '查看完整截图'],
  ar: ['داخل PlantPal', 'تعرّف عن قرب على رفيق نباتاتك.', 'لقطات حقيقية من التطبيق باللغة الإنجليزية.', 'حديقتك اليومية', 'تابع تقدمك وتذكيرات العناية القادمة بنظرة واحدة.', 'خطوات صغيرة وتقدم ملموس', 'نباتاتك وميداليات العناية وAsk Plant AI في شاشة الحديقة.', 'لكل نبتة مكانها', 'تصفح مجموعتك وابحث حسب النوع وصفِّ حسب الغرفة.', 'عرض لقطة الشاشة كاملة'],
  pt: ['Por dentro do PlantPal', 'Conheça melhor o seu companheiro de plantas.', 'Telas reais do aplicativo, em inglês.', 'Seu jardim todos os dias', 'Veja seu progresso e os próximos lembretes de cuidados.', 'Pequenos passos, progresso real', 'Plantas, medalhas de cuidado e Ask Plant AI na tela Jardim.', 'Cada planta no seu lugar', 'Explore a coleção, pesquise por espécie e filtre por cômodo.', 'Ver captura completa'],
  ru: ['Внутри PlantPal', 'Познакомьтесь с помощником для ваших растений.', 'Настоящие снимки экрана приложения на английском языке.', 'Ваш сад каждый день', 'Следите за прогрессом и ближайшими напоминаниями об уходе.', 'Маленькие шаги, заметный прогресс', 'Растения, медали за уход и Ask Plant AI на экране сада.', 'Каждому растению своё место', 'Просматривайте коллекцию, ищите по виду и выбирайте комнату.', 'Посмотреть полный снимок экрана'],
  es: ['Dentro de PlantPal', 'Conoce de cerca a tu compañero de plantas.', 'Capturas reales de la aplicación, en inglés.', 'Tu jardín cada día', 'Consulta tu progreso y los próximos recordatorios de cuidado.', 'Pequeños pasos, progreso real', 'Tus plantas, medallas de cuidado y Ask Plant AI en la pantalla Jardín.', 'Cada planta en su sitio', 'Explora la colección, busca por especie y filtra por habitación.', 'Ver captura completa'],
} satisfies Record<string, readonly string[]>;

type Locale = keyof typeof copy;
const screens = ['/images/app-garden.webp', '/images/app-plants.webp', '/images/app-care.webp'];

export function AppProductHero({locale = 'en', eyebrow, title, description, children}: {
  locale?: Locale; eyebrow: string; title: ReactNode; description: string; children: ReactNode;
}) {
  const t = copy[locale];
  return <section className={styles.hero}>
    <div className={`shell ${styles.heroInner}`}>
      <div className={styles.heroCopy}>
        <span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p>
        {children}
        <a className={styles.explore} href="#inside-plantpal">{t[0]}</a>
      </div>
      <div className={styles.heroScreens} dir="ltr">
        <img className={styles.secondaryScreen} src={screens[2]} alt={t[7]} width="650" height="1408" />
        <img className={styles.primaryScreen} src={screens[0]} alt={t[3]} width="650" height="1408" fetchPriority="high" />
      </div>
    </div>
  </section>;
}

export function AppScreenshots({locale = 'en'}: {locale?: Locale}) {
  const t = copy[locale];
  return <section className={`shell ${styles.gallery}`} id="inside-plantpal" aria-labelledby="app-screens-title">
    <header className={styles.galleryHeading}><span className="eyebrow">{t[0]}</span><h2 id="app-screens-title">{t[1]}</h2><p>{t[2]}</p></header>
    <div className={styles.screenGrid}>{screens.map((src, i) => <figure className={styles.screenCard} key={src}>
      <a className={styles.screenLink} href={src} target="_blank" rel="noopener noreferrer" aria-label={`${t[9]}: ${t[3+i*2]}`}>
        <img src={src} alt={t[3+i*2]} width="650" height="1408" loading="lazy" />
      </a>
      <figcaption><span className={styles.screenNumber} aria-hidden="true">0{i+1}</span><h3>{t[3+i*2]}</h3><p>{t[4+i*2]}</p><a href={src} target="_blank" rel="noopener noreferrer">{t[9]}</a></figcaption>
    </figure>)}</div>
  </section>;
}
