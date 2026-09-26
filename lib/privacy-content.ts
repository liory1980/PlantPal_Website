import type {NewLocale} from './multilingual';

export type PrivacyCopy={
  title:string;
  eyebrow:string;
  updated:string;
  intro:string;
  sections:{heading:string;paragraphs:string[]}[];
};

export const privacyContent:Record<NewLocale,PrivacyCopy>={
  fr:{
    title:'Politique de confidentialité',eyebrow:'PLANTPAL · INFORMATIONS ET ASSISTANCE',updated:'Dernière mise à jour : 23 septembre 2026',intro:'Cette politique explique comment PlantPal traite les informations lorsque vous utilisez notre site web et l’application PlantPal: AI Plant Care.',
    sections:[
      {heading:'1. Informations que nous collectons',paragraphs:['Nous pouvons collecter les informations que vous choisissez de nous fournir, telles que votre nom, votre adresse e-mail, vos commentaires et vos demandes d’assistance. Le site peut également recevoir des informations techniques de base, notamment le type de navigateur et d’appareil, une localisation approximative, la page de provenance et des données d’utilisation.']},
      {heading:'2. Utilisation des informations',paragraphs:['Nous utilisons ces informations pour fournir le service, répondre aux demandes, améliorer le produit, protéger le site et l’application, analyser leurs performances et respecter nos obligations légales. Nous ne vendons pas les informations personnelles.']},
      {heading:'3. Cookies et outils d’analyse',paragraphs:['Nous pouvons utiliser des cookies essentiels et des outils d’analyse respectueux de la vie privée afin de faire fonctionner le service et de comprendre son utilisation. Lorsque la loi l’exige, nous demandons votre consentement avant d’utiliser des cookies non essentiels.']},
      {heading:'4. Prestataires de services et partage',paragraphs:['Des informations limitées peuvent être transmises à des prestataires de confiance qui nous aident pour l’hébergement, l’analyse, l’assistance ou la sécurité. Ils ne peuvent les utiliser que pour nous fournir leurs services. Nous pouvons également communiquer des informations lorsque la loi l’exige ou pour protéger des droits et la sécurité.']},
      {heading:'5. Conservation et sécurité',paragraphs:['Nous ne conservons les informations personnelles que pendant la durée nécessaire à la finalité pour laquelle elles ont été collectées, y compris pour répondre à des exigences légales et de sécurité. Nous appliquons des mesures techniques et organisationnelles raisonnables, mais aucun système en ligne ne peut garantir une sécurité absolue.']},
      {heading:'6. Suppression du compte PlantPal',paragraphs:['Vous pouvez supprimer définitivement votre compte depuis l’application : ouvrez Settings, choisissez Terminate my account, puis confirmez. Cette action supprime le compte et les informations qui lui sont associées de nos bases de données et ne peut pas être annulée.','Si vous n’avez pas accès à l’application, écrivez à support@appsgiant.com depuis l’adresse e-mail associée au compte. Nous pourrons vous demander de vérifier que le compte vous appartient.']},
      {heading:'7. Vos droits et vos choix',paragraphs:['Selon votre lieu de résidence, vous pouvez avoir le droit d’accéder à vos informations, de les corriger ou de les supprimer, d’en limiter l’utilisation, d’en recevoir une copie ou de vous opposer à certains traitements. Lorsque le traitement repose sur votre consentement, vous pouvez le retirer.']},
      {heading:'8. Enfants',paragraphs:['Notre site et nos services professionnels ne sont pas destinés aux enfants, et nous ne collectons pas sciemment leurs informations personnelles par l’intermédiaire du site.']},
      {heading:'9. Modifications de cette politique',paragraphs:['Nous pouvons mettre cette politique à jour lorsque le service ou les exigences légales évoluent. La version en vigueur et sa date de mise à jour seront publiées sur cette page.']},
      {heading:'10. Nous contacter',paragraphs:['Pour toute question ou demande relative à la confidentialité, écrivez à support@appsgiant.com.']},
    ]
  },
  it:{
    title:'Informativa sulla privacy',eyebrow:'PLANTPAL · INFORMAZIONI E ASSISTENZA',updated:'Ultimo aggiornamento: 23 settembre 2026',intro:'Questa informativa spiega come PlantPal tratta le informazioni quando utilizzi il nostro sito web e l’app PlantPal: AI Plant Care.',
    sections:[
      {heading:'1. Informazioni che raccogliamo',paragraphs:['Possiamo raccogliere le informazioni che scegli di fornirci, come nome, indirizzo e-mail, feedback e richieste di assistenza. Il sito può inoltre ricevere informazioni tecniche di base, tra cui tipo di browser e dispositivo, posizione approssimativa, pagina di provenienza e dati di utilizzo.']},
      {heading:'2. Come utilizziamo le informazioni',paragraphs:['Utilizziamo le informazioni per fornire il servizio, rispondere alle richieste, migliorare il prodotto, proteggere il sito e l’app, analizzarne le prestazioni e rispettare gli obblighi di legge. Non vendiamo informazioni personali.']},
      {heading:'3. Cookie e strumenti di analisi',paragraphs:['Possiamo utilizzare cookie essenziali e strumenti di analisi rispettosi della privacy per far funzionare il servizio e capire come viene utilizzato. Ove richiesto dalla legge, chiederemo il consenso prima di utilizzare cookie non essenziali.']},
      {heading:'4. Fornitori di servizi e condivisione',paragraphs:['Informazioni limitate possono essere condivise con fornitori fidati che ci assistono con hosting, analisi, supporto o sicurezza. Possono utilizzarle solo per fornirci tali servizi. Le informazioni possono inoltre essere comunicate quando richiesto dalla legge o per proteggere diritti e sicurezza.']},
      {heading:'5. Conservazione e sicurezza',paragraphs:['Conserviamo le informazioni personali solo per il tempo necessario allo scopo per cui sono state raccolte, inclusi gli obblighi legali e di sicurezza. Adottiamo misure tecniche e organizzative ragionevoli, ma nessun sistema online può garantire una sicurezza assoluta.']},
      {heading:'6. Eliminazione dell’account PlantPal',paragraphs:['Puoi eliminare definitivamente il tuo account dall’app: apri Settings, scegli Terminate my account e conferma. L’operazione elimina l’account e le informazioni associate dai nostri database e non può essere annullata.','Se non puoi accedere all’app, scrivi a support@appsgiant.com dall’indirizzo e-mail associato all’account. Potremmo chiederti di verificarne la titolarità.']},
      {heading:'7. I tuoi diritti e le tue scelte',paragraphs:['A seconda del luogo in cui vivi, potresti avere il diritto di accedere alle informazioni, correggerle o eliminarle, limitarne l’uso, riceverne una copia o opporti a determinati trattamenti. Quando il trattamento si basa sul consenso, puoi revocarlo.']},
      {heading:'8. Minori',paragraphs:['Il sito e i nostri servizi professionali non sono destinati ai minori e non raccogliamo consapevolmente informazioni personali di minori tramite il sito.']},
      {heading:'9. Modifiche a questa informativa',paragraphs:['Possiamo aggiornare questa informativa quando cambiano il servizio o i requisiti legali. La versione aggiornata e la data di revisione saranno pubblicate su questa pagina.']},
      {heading:'10. Contatti',paragraphs:['Per domande o richieste sulla privacy, scrivi a support@appsgiant.com.']},
    ]
  },
  hi:{
    title:'गोपनीयता नीति',eyebrow:'PLANTPAL · जानकारी और सहायता',updated:'अंतिम अपडेट: 23 सितंबर 2026',intro:'यह नीति बताती है कि हमारी वेबसाइट और PlantPal: AI Plant Care ऐप का उपयोग करते समय PlantPal आपकी जानकारी को कैसे संभालता है।',
    sections:[
      {heading:'1. हम कौन-सी जानकारी एकत्र करते हैं',paragraphs:['हम वह जानकारी एकत्र कर सकते हैं जो आप हमें देना चुनते हैं, जैसे आपका नाम, ईमेल पता, प्रतिक्रिया और सहायता संदेश। वेबसाइट को ब्राउज़र और डिवाइस का प्रकार, अनुमानित स्थान, रेफ़र करने वाला पेज और उपयोग से जुड़ी बुनियादी तकनीकी जानकारी भी मिल सकती है।']},
      {heading:'2. हम जानकारी का उपयोग कैसे करते हैं',paragraphs:['हम जानकारी का उपयोग सेवा देने, अनुरोधों का उत्तर देने, उत्पाद को बेहतर बनाने, वेबसाइट और ऐप को सुरक्षित रखने, प्रदर्शन का विश्लेषण करने और कानूनी दायित्वों को पूरा करने के लिए करते हैं। हम व्यक्तिगत जानकारी नहीं बेचते।']},
      {heading:'3. कुकीज़ और विश्लेषण उपकरण',paragraphs:['सेवा चलाने और उसके उपयोग को समझने के लिए हम आवश्यक कुकीज़ और गोपनीयता का सम्मान करने वाले विश्लेषण उपकरणों का उपयोग कर सकते हैं। जहाँ कानून की आवश्यकता होगी, गैर-आवश्यक कुकीज़ के उपयोग से पहले हम आपकी सहमति माँगेंगे।']},
      {heading:'4. सेवा प्रदाता और जानकारी साझा करना',paragraphs:['सीमित जानकारी उन विश्वसनीय प्रदाताओं के साथ साझा की जा सकती है जो होस्टिंग, विश्लेषण, सहायता या सुरक्षा में हमारी मदद करते हैं। वे इसका उपयोग केवल हमें अपनी सेवा देने के लिए कर सकते हैं। कानून की माँग होने पर या अधिकारों और सुरक्षा की रक्षा के लिए भी जानकारी साझा की जा सकती है।']},
      {heading:'5. जानकारी रखना और सुरक्षा',paragraphs:['हम व्यक्तिगत जानकारी को केवल उतने समय तक रखते हैं जितना उसे एकत्र करने के उद्देश्य, कानूनी आवश्यकताओं और सुरक्षा के लिए ज़रूरी है। हम उचित तकनीकी और संगठनात्मक उपाय अपनाते हैं, लेकिन कोई भी ऑनलाइन प्रणाली पूरी सुरक्षा की गारंटी नहीं दे सकती।']},
      {heading:'6. PlantPal खाता हटाना',paragraphs:['आप ऐप में अपना खाता हमेशा के लिए हटा सकते हैं: Settings खोलें, Terminate my account चुनें और पुष्टि करें। इससे खाता और उससे जुड़ी जानकारी हमारे डेटाबेस से हट जाती है और इसे वापस नहीं किया जा सकता।','यदि आप ऐप नहीं खोल सकते, तो खाते से जुड़े ईमेल पते से support@appsgiant.com पर लिखें। हम खाते के स्वामित्व की पुष्टि माँग सकते हैं।']},
      {heading:'7. आपके अधिकार और विकल्प',paragraphs:['आप जहाँ रहते हैं उसके आधार पर, आपको अपनी जानकारी देखने, सुधारने या हटाने, उसके उपयोग को सीमित करने, उसकी प्रति पाने या कुछ प्रकार की प्रोसेसिंग पर आपत्ति करने का अधिकार हो सकता है। जहाँ प्रोसेसिंग सहमति पर आधारित है, आप अपनी सहमति वापस ले सकते हैं।']},
      {heading:'8. बच्चे',paragraphs:['हमारी वेबसाइट और व्यावसायिक सेवाएँ बच्चों के लिए नहीं हैं और हम वेबसाइट के माध्यम से जानबूझकर बच्चों की व्यक्तिगत जानकारी एकत्र नहीं करते।']},
      {heading:'9. इस नीति में बदलाव',paragraphs:['सेवा या कानूनी आवश्यकताओं में बदलाव होने पर हम इस नीति को अपडेट कर सकते हैं। नवीनतम संस्करण और अपडेट की तारीख इसी पेज पर प्रकाशित की जाएगी।']},
      {heading:'10. संपर्क',paragraphs:['गोपनीयता से जुड़े प्रश्न या अनुरोध के लिए support@appsgiant.com पर ईमेल करें।']},
    ]
  },
  zh:{
    title:'隐私政策',eyebrow:'PLANTPAL · 信息与支持',updated:'最后更新：2026 年 9 月 23 日',intro:'本政策说明您使用我们的网站和 PlantPal: AI Plant Care 应用时，PlantPal 如何处理相关信息。',
    sections:[
      {heading:'1. 我们收集的信息',paragraphs:['我们可能收集您主动提供的信息，例如姓名、电子邮箱地址、反馈和支持请求。网站也可能接收基本技术和使用信息，例如浏览器及设备类型、大致位置、来源页面和使用数据。']},
      {heading:'2. 我们如何使用信息',paragraphs:['我们使用这些信息来提供服务、回复请求、改进产品、保护网站和应用、分析性能并履行法律义务。我们不会出售个人信息。']},
      {heading:'3. Cookie 与分析工具',paragraphs:['我们可能使用必要的 Cookie 和尊重隐私的分析工具，以运行服务并了解服务的使用情况。在法律要求的地区，我们会在使用非必要 Cookie 前征得您的同意。']},
      {heading:'4. 服务提供商与信息共享',paragraphs:['有限的信息可能会提供给协助我们进行托管、分析、支持或安全工作的可信服务商。他们只能为向我们提供相关服务而使用这些信息。法律要求时，或为保护权利与安全，我们也可能披露信息。']},
      {heading:'5. 保留与安全',paragraphs:['我们仅在实现收集目的所需的期限内保留个人信息，包括满足法律和安全要求。我们采取合理的技术和组织措施，但任何在线系统都无法保证绝对安全。']},
      {heading:'6. 删除 PlantPal 账户',paragraphs:['您可以在应用内永久删除账户：打开 Settings，选择 Terminate my account，然后确认。此操作会从我们的数据库中删除账户及其相关信息，且无法撤销。','如果您无法访问应用，请使用与账户关联的电子邮箱地址发送邮件至 support@appsgiant.com。我们可能会要求您验证账户所有权。']},
      {heading:'7. 您的权利与选择',paragraphs:['根据您所在地区，您可能有权访问、更正或删除信息，限制其使用，获取信息副本，或反对某些处理方式。当处理基于您的同意时，您可以撤回同意。']},
      {heading:'8. 儿童',paragraphs:['我们的网站和商业服务不面向儿童，我们不会故意通过网站收集儿童的个人信息。']},
      {heading:'9. 政策变更',paragraphs:['当服务或法律要求发生变化时，我们可能更新本政策。最新版本及更新日期将发布在本页面。']},
      {heading:'10. 联系我们',paragraphs:['如有隐私相关问题或请求，请发送邮件至 support@appsgiant.com。']},
    ]
  },
  ar:{
    title:'سياسة الخصوصية',eyebrow:'PLANTPAL · المعلومات والدعم',updated:'آخر تحديث: 23 سبتمبر 2026',intro:'توضح هذه السياسة كيفية تعامل PlantPal مع المعلومات عند استخدام موقعنا الإلكتروني وتطبيق PlantPal: AI Plant Care.',
    sections:[
      {heading:'1. المعلومات التي نجمعها',paragraphs:['قد نجمع المعلومات التي تختار تقديمها، مثل الاسم وعنوان البريد الإلكتروني والملاحظات ورسائل الدعم. وقد يتلقى الموقع أيضًا معلومات تقنية واستخدام أساسية، مثل نوع المتصفح والجهاز والموقع التقريبي والصفحة المُحيلة وبيانات الاستخدام.']},
      {heading:'2. كيفية استخدام المعلومات',paragraphs:['نستخدم المعلومات لتقديم الخدمة والرد على الطلبات وتحسين المنتج وحماية الموقع والتطبيق وتحليل الأداء والوفاء بالالتزامات القانونية. نحن لا نبيع المعلومات الشخصية.']},
      {heading:'3. ملفات تعريف الارتباط وأدوات التحليل',paragraphs:['قد نستخدم ملفات تعريف الارتباط الضرورية وأدوات تحليل تراعي الخصوصية لتشغيل الخدمة وفهم كيفية استخدامها. وحيثما يقتضي القانون، سنطلب موافقتك قبل استخدام ملفات تعريف الارتباط غير الضرورية.']},
      {heading:'4. مزودو الخدمات ومشاركة المعلومات',paragraphs:['قد نشارك معلومات محدودة مع مزودين موثوقين يساعدوننا في الاستضافة أو التحليل أو الدعم أو الأمان. ولا يجوز لهم استخدامها إلا لتقديم خدماتهم لنا. وقد نكشف عن المعلومات أيضًا عندما يقتضي القانون ذلك أو لحماية الحقوق والسلامة.']},
      {heading:'5. الاحتفاظ والأمان',paragraphs:['نحتفظ بالمعلومات الشخصية فقط للمدة اللازمة للغرض الذي جُمعت من أجله، بما في ذلك المتطلبات القانونية والأمنية. نطبق تدابير تقنية وتنظيمية معقولة، لكن لا يمكن لأي نظام عبر الإنترنت أن يضمن أمانًا مطلقًا.']},
      {heading:'6. حذف حساب PlantPal',paragraphs:['يمكنك حذف حسابك نهائيًا من داخل التطبيق: افتح Settings، واختر Terminate my account، ثم أكّد الاختيار. يؤدي ذلك إلى حذف الحساب والمعلومات المرتبطة به من قواعد بياناتنا، ولا يمكن التراجع عنه.','إذا تعذر عليك الوصول إلى التطبيق، فأرسل رسالة إلى support@appsgiant.com من عنوان البريد الإلكتروني المرتبط بالحساب. وقد نطلب منك إثبات ملكية الحساب.']},
      {heading:'7. حقوقك وخياراتك',paragraphs:['بحسب مكان إقامتك، قد يكون لك الحق في الوصول إلى معلوماتك أو تصحيحها أو حذفها أو تقييد استخدامها أو الحصول على نسخة منها أو الاعتراض على بعض عمليات المعالجة. وإذا كانت المعالجة قائمة على الموافقة، يمكنك سحب موافقتك.']},
      {heading:'8. الأطفال',paragraphs:['موقعنا وخدماتنا التجارية غير موجهة للأطفال، ولا نجمع عن علم معلومات شخصية عن الأطفال من خلال الموقع.']},
      {heading:'9. التغييرات على هذه السياسة',paragraphs:['قد نحدّث هذه السياسة عند تغيّر الخدمة أو المتطلبات القانونية. وسيُنشر الإصدار المحدّث وتاريخ التحديث في هذه الصفحة.']},
      {heading:'10. التواصل معنا',paragraphs:['للأسئلة أو الطلبات المتعلقة بالخصوصية، راسلنا على support@appsgiant.com.']},
    ]
  },
  pt:{
    title:'Política de Privacidade',eyebrow:'PLANTPAL · INFORMAÇÕES E SUPORTE',updated:'Última atualização: 23 de setembro de 2026',intro:'Esta política explica como o PlantPal trata informações quando você usa nosso site e o aplicativo PlantPal: AI Plant Care.',
    sections:[
      {heading:'1. Informações que coletamos',paragraphs:['Podemos coletar informações que você decide fornecer, como nome, endereço de e-mail, feedback e mensagens ao suporte. O site também pode receber informações técnicas e de uso básicas, como tipo de navegador e dispositivo, localização aproximada, página de referência e dados de uso.']},
      {heading:'2. Como usamos as informações',paragraphs:['Usamos as informações para prestar o serviço, responder a solicitações, melhorar o produto, proteger o site e o aplicativo, analisar o desempenho e cumprir obrigações legais. Não vendemos informações pessoais.']},
      {heading:'3. Cookies e ferramentas de análise',paragraphs:['Podemos usar cookies essenciais e ferramentas de análise que respeitam a privacidade para operar o serviço e entender como ele é usado. Quando exigido por lei, pediremos seu consentimento antes de usar cookies não essenciais.']},
      {heading:'4. Prestadores de serviço e compartilhamento',paragraphs:['Informações limitadas podem ser compartilhadas com prestadores confiáveis que nos auxiliam com hospedagem, análise, suporte ou segurança. Eles só podem usá-las para prestar esses serviços a nós. As informações também podem ser divulgadas quando exigido por lei ou para proteger direitos e a segurança.']},
      {heading:'5. Retenção e segurança',paragraphs:['Mantemos informações pessoais apenas pelo tempo necessário à finalidade para a qual foram coletadas, inclusive para atender a requisitos legais e de segurança. Adotamos medidas técnicas e organizacionais razoáveis, mas nenhum sistema on-line pode garantir segurança absoluta.']},
      {heading:'6. Exclusão da conta PlantPal',paragraphs:['Você pode excluir sua conta permanentemente pelo aplicativo: abra Settings, selecione Terminate my account e confirme. A ação remove a conta e as informações associadas de nossos bancos de dados e não pode ser desfeita.','Se não conseguir acessar o aplicativo, envie uma mensagem para support@appsgiant.com usando o endereço de e-mail associado à conta. Podemos solicitar uma confirmação de titularidade.']},
      {heading:'7. Seus direitos e escolhas',paragraphs:['Dependendo de onde você mora, pode ter o direito de acessar, corrigir ou excluir informações, restringir seu uso, receber uma cópia ou se opor a determinados tratamentos. Quando o tratamento for baseado em consentimento, você poderá retirá-lo.']},
      {heading:'8. Crianças',paragraphs:['Nosso site e nossos serviços comerciais não são destinados a crianças, e não coletamos intencionalmente informações pessoais de crianças por meio do site.']},
      {heading:'9. Alterações nesta política',paragraphs:['Podemos atualizar esta política quando o serviço ou os requisitos legais mudarem. A versão atualizada e a data da revisão serão publicadas nesta página.']},
      {heading:'10. Contato',paragraphs:['Para dúvidas ou solicitações sobre privacidade, escreva para support@appsgiant.com.']},
    ]
  },
  ru:{
    title:'Политика конфиденциальности',eyebrow:'PLANTPAL · ИНФОРМАЦИЯ И ПОДДЕРЖКА',updated:'Последнее обновление: 23 сентября 2026 г.',intro:'В этой политике описано, как PlantPal обрабатывает информацию при использовании нашего сайта и приложения PlantPal: AI Plant Care.',
    sections:[
      {heading:'1. Какую информацию мы собираем',paragraphs:['Мы можем собирать информацию, которую вы решите предоставить, например имя, адрес электронной почты, отзывы и обращения в службу поддержки. Сайт также может получать основные технические сведения и данные об использовании, включая тип браузера и устройства, приблизительное местоположение, страницу-источник и данные об использовании.']},
      {heading:'2. Как мы используем информацию',paragraphs:['Мы используем информацию для предоставления сервиса, ответа на запросы, улучшения продукта, защиты сайта и приложения, анализа работы и выполнения юридических обязательств. Мы не продаём персональную информацию.']},
      {heading:'3. Файлы cookie и аналитика',paragraphs:['Мы можем использовать необходимые файлы cookie и аналитические инструменты, учитывающие требования конфиденциальности, чтобы обеспечивать работу сервиса и понимать, как им пользуются. Там, где это требуется законом, мы запросим согласие до использования необязательных файлов cookie.']},
      {heading:'4. Поставщики услуг и передача информации',paragraphs:['Ограниченная информация может передаваться надёжным поставщикам, которые помогают нам с хостингом, аналитикой, поддержкой или безопасностью. Они могут использовать её только для оказания услуг нам. Информация также может раскрываться по требованию закона или для защиты прав и безопасности.']},
      {heading:'5. Хранение и безопасность',paragraphs:['Мы храним персональную информацию только столько, сколько необходимо для цели её сбора, в том числе с учётом юридических требований и требований безопасности. Мы применяем разумные технические и организационные меры, однако ни одна онлайн-система не может гарантировать абсолютную безопасность.']},
      {heading:'6. Удаление учётной записи PlantPal',paragraphs:['Вы можете навсегда удалить учётную запись в приложении: откройте Settings, выберите Terminate my account и подтвердите действие. Учётная запись и связанная с ней информация будут удалены из наших баз данных без возможности восстановления.','Если у вас нет доступа к приложению, напишите на support@appsgiant.com с адреса электронной почты, связанного с учётной записью. Мы можем попросить подтвердить, что учётная запись принадлежит вам.']},
      {heading:'7. Ваши права и возможности выбора',paragraphs:['В зависимости от места проживания вы можете иметь право получить доступ к информации, исправить или удалить её, ограничить её использование, получить копию или возразить против отдельных видов обработки. Если обработка основана на согласии, вы можете отозвать его.']},
      {heading:'8. Дети',paragraphs:['Наш сайт и коммерческие сервисы не предназначены для детей, и мы сознательно не собираем персональную информацию детей через сайт.']},
      {heading:'9. Изменения политики',paragraphs:['Мы можем обновлять эту политику при изменении сервиса или юридических требований. Актуальная версия и дата обновления будут опубликованы на этой странице.']},
      {heading:'10. Связь с нами',paragraphs:['По вопросам и запросам о конфиденциальности пишите на support@appsgiant.com.']},
    ]
  },
  es:{
    title:'Política de privacidad',eyebrow:'PLANTPAL · INFORMACIÓN Y ASISTENCIA',updated:'Última actualización: 23 de septiembre de 2026',intro:'Esta política explica cómo PlantPal trata la información cuando utilizas nuestro sitio web y la aplicación PlantPal: AI Plant Care.',
    sections:[
      {heading:'1. Información que recopilamos',paragraphs:['Podemos recopilar la información que decidas facilitarnos, como tu nombre, dirección de correo electrónico, comentarios y mensajes de asistencia. El sitio también puede recibir información técnica y de uso básica, como el tipo de navegador y dispositivo, la ubicación aproximada, la página de referencia y datos de uso.']},
      {heading:'2. Cómo utilizamos la información',paragraphs:['Utilizamos la información para prestar el servicio, responder a solicitudes, mejorar el producto, proteger el sitio y la aplicación, analizar su rendimiento y cumplir obligaciones legales. No vendemos información personal.']},
      {heading:'3. Cookies y herramientas de análisis',paragraphs:['Podemos utilizar cookies esenciales y herramientas de análisis respetuosas con la privacidad para hacer funcionar el servicio y entender cómo se utiliza. Cuando la ley lo exija, solicitaremos tu consentimiento antes de usar cookies no esenciales.']},
      {heading:'4. Proveedores de servicios e intercambio de información',paragraphs:['Podemos compartir información limitada con proveedores de confianza que nos ayudan con el alojamiento, el análisis, la asistencia o la seguridad. Solo pueden utilizarla para prestarnos esos servicios. También podemos divulgar información cuando lo exija la ley o para proteger derechos y la seguridad.']},
      {heading:'5. Conservación y seguridad',paragraphs:['Conservamos la información personal solo durante el tiempo necesario para la finalidad con la que se recopiló, incluidos los requisitos legales y de seguridad. Aplicamos medidas técnicas y organizativas razonables, pero ningún sistema en línea puede garantizar una seguridad absoluta.']},
      {heading:'6. Eliminación de la cuenta de PlantPal',paragraphs:['Puedes eliminar tu cuenta de forma permanente desde la aplicación: abre Settings, selecciona Terminate my account y confirma. La acción elimina la cuenta y la información asociada de nuestras bases de datos y no se puede deshacer.','Si no puedes acceder a la aplicación, escribe a support@appsgiant.com desde la dirección de correo electrónico asociada a la cuenta. Es posible que te pidamos verificar que la cuenta te pertenece.']},
      {heading:'7. Tus derechos y opciones',paragraphs:['Dependiendo de dónde vivas, puedes tener derecho a acceder a tu información, corregirla o eliminarla, limitar su uso, recibir una copia u oponerte a determinados tratamientos. Cuando el tratamiento se base en el consentimiento, puedes retirarlo.']},
      {heading:'8. Menores',paragraphs:['Nuestro sitio y nuestros servicios comerciales no están dirigidos a menores, y no recopilamos deliberadamente información personal de menores a través del sitio.']},
      {heading:'9. Cambios en esta política',paragraphs:['Podemos actualizar esta política cuando cambien el servicio o los requisitos legales. La versión actualizada y su fecha de revisión se publicarán en esta página.']},
      {heading:'10. Contacto',paragraphs:['Para preguntas o solicitudes sobre privacidad, escribe a support@appsgiant.com.']},
    ]
  },
};

