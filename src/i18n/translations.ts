export type Lang = 'en' | 'ar' | 'fr' | 'es' | 'de' | 'zh';
export const languages: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export interface Translation {
  dir: 'ltr' | 'rtl';
  nav: { home: string; about: string; skills: string; projects: string; experience: string; contact: string; letsTalk: string };
  hero: { available: string; hiIm: string; role: string; role2: string; desc: string; location: string; viewWork: string; getInTouch: string; };
  about: { label: string; title: string; quote: string; p1: string; p2: string; highlights: string[]; statProjects: string; statYears: string; statPassion: string; statDedicated: string; servicesTitle: string; servicesDesc: string; specialization: string; emailLabel: string; phoneLabel: string; locationLabel: string; openRemote: string; };
  services: { title: string; desc: string }[];
  skills: { label: string; title: string; desc: string; alsoWith: string };
  projects: { label: string; title: string; desc: string; liveDemo: string; viewProject: string; githubCta: string; githubDesc: string; all: string; featured: string; modal: { overview: string; features: string; technologies: string; visitSite: string; close: string; liveDemo: string; keyHighlights: string; }; };
  projectCategories: Record<string, string>;
  experience: { label: string; title: string; desc: string };
  contact: { label: string; title: string; desc: string; nameLabel: string; emailLabel: string; messageLabel: string; namePlaceholder: string; emailPlaceholder: string; messagePlaceholder: string; send: string; sending: string; sent: string; error: string; findMe: string; availableNow: string; openTo: string; };
  contactInfo: { email: string; phone: string; location: string };
  footer: { tagline: string; quickLinks: string; getInTouch: string; madeWith: string; backToTop: string };
  experiences: { role: string; company: string; period: string; description: string; achievements: string[] }[];
  skillNames: string[];
  projectContent: { overview: string[]; features: string[]; highlights: string[] }[];
}

const en: Translation = {
  dir: 'ltr',
  nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', experience: 'Experience', contact: 'Contact', letsTalk: "Let's Talk" },
  hero: { available: 'Available for new projects', hiIm: "Hi there, I'm", role: 'Frontend Developer', role2: 'UI Craftsman', desc: 'I build beautiful, responsive, and fast web experiences using modern frontend technologies. Passionate about clean code, thoughtful design, and bringing ideas to life in the browser.', location: 'Egypt — Open to Remote', viewWork: 'View My Work', getInTouch: 'Get In Touch' },
  about: { label: 'About Me', title: 'Who I Am', quote: 'I believe every great product starts with a great frontend.', p1: "I'm Abd Elftah Ebrahem, a passionate Frontend Developer from Egypt. My journey into web development started with curiosity and quickly turned into a deep love for crafting clean, responsive, and visually polished user interfaces.", p2: 'I focus on writing semantic HTML, maintainable CSS, and modern JavaScript. I enjoy turning complex design challenges into simple, beautiful, and intuitive web experiences that users love.', highlights: ['Responsive & Mobile-First', 'Clean, Maintainable Code', 'Cross-Browser Compatibility', 'Performance Optimisation', 'Pixel-Perfect UI', 'Continuous Learner'], statProjects: 'Projects Built', statYears: 'Years Learning', statPassion: 'Passion', statDedicated: 'Dedicated', servicesTitle: 'What I Do', servicesDesc: 'Services I offer to help you build and launch your digital product', specialization: 'Frontend Development', emailLabel: 'Email', phoneLabel: 'Phone', locationLabel: 'Location', openRemote: 'Open to remote opportunities' },
  services: [
    { title: 'Responsive Web Design', desc: 'Crafting pixel-perfect websites that look great on every device, from mobile to large desktop screens.' },
    { title: 'UI Development', desc: 'Translating designs into clean, interactive, and maintainable HTML, CSS, and JavaScript code.' },
    { title: 'React Applications', desc: 'Building dynamic, component-based React applications with a focus on performance and UX.' },
    { title: 'UI/UX Design', desc: 'Designing intuitive user interfaces with attention to visual hierarchy, color, and user flows.' },
  ],
  skills: { label: 'My Skills', title: 'Tools I Work With', desc: 'A curated set of frontend technologies I use to build modern, fast, and accessible web experiences', alsoWith: 'Also working with' },
  projects: { label: 'Portfolio', title: "Projects I'm Proud Of", desc: "A selection of real-world projects I've built and deployed. Click any project to see full details.", liveDemo: 'Live Demo', viewProject: 'Show Project', githubCta: 'Visit My GitHub', githubDesc: 'Want to see more of my code?', all: 'All', featured: 'Featured', modal: { overview: 'Overview', features: 'Key Features', technologies: 'Technologies', visitSite: 'Visit Website', close: 'Close', liveDemo: 'View Live Demo', keyHighlights: 'Project Highlights' } },
  projectCategories: { Website: 'Website', Healthcare: 'Healthcare', 'UI Component': 'UI Component' },
  experience: { label: 'Experience', title: 'My Journey', desc: 'Key milestones in my path as a frontend developer' },
  contact: { label: 'Contact', title: "Let's Build Something Together", desc: "Have a project in mind or just want to say hi? I'd love to hear from you", nameLabel: 'Name', emailLabel: 'Email', messageLabel: 'Message', namePlaceholder: 'Your name', emailPlaceholder: 'you@example.com', messagePlaceholder: 'Tell me about your project...', send: 'Send Message', sending: 'Sending...', sent: 'Message Sent!', error: 'Failed to send. Please try again.', findMe: 'Find me on', availableNow: 'Available Now', openTo: 'Open to new opportunities' },
  contactInfo: { email: 'Email', phone: 'Phone', location: 'Location' },
  footer: { tagline: 'Frontend Developer passionate about building responsive, beautiful, and user-friendly web experiences.', quickLinks: 'Quick Links', getInTouch: 'Get In Touch', madeWith: 'Made with', backToTop: 'Back to top' },
  experiences: [
    { role: 'Frontend Developer', company: 'Freelance', period: '2024 — Present', description: 'Building responsive websites and web applications for clients across different industries.', achievements: ['Delivered 3+ client projects on time', 'Focused on mobile-first responsive design', 'Integrated modern CSS frameworks and libraries'] },
    { role: 'Frontend Developer (Trainee)', company: 'Self-Learning & Projects', period: '2023 — 2024', description: 'Intensively learned modern frontend technologies and built real-world projects to reinforce skills.', achievements: ['Mastered HTML5, CSS3, and JavaScript fundamentals', 'Learned React.js and component-based architecture', 'Built multiple projects deployed on GitHub Pages'] },
  ],
  skillNames: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS', 'Responsive Design', 'UI/UX Design', 'Git & GitHub', 'Bootstrap', 'Figma', 'REST APIs', 'TypeScript', 'Next.js'],
  projectContent: [
    { overview: ['A modern, fully responsive company website for Gammal Tech, a technology company. The site showcases the company services, team members, and portfolio with a clean, professional design and smooth scroll animations.', 'Built from scratch with a mobile-first approach, ensuring pixel-perfect rendering across all screen sizes.'], features: ['Fully responsive layout', 'Smooth scroll animations', 'Hero section with call-to-action', 'Services grid with icons', 'Team showcase section', 'Contact form with validation', 'SEO-optimised HTML', 'Fast loading'], highlights: ['Mobile-first responsive design', 'Clean and modern UI', 'Smooth scroll animations', 'Cross-browser compatible'] },
    { overview: ['A healthcare-focused website for a blood laboratory care service. The platform provides information about lab services, enables appointment booking, and presents test categories in a clean, trustworthy medical interface.'], features: ['Appointment booking interface', 'Service categories', 'Health packages section', 'Clean medical-themed UI', 'Responsive layout', 'Contact information', 'Bootstrap-based grid', 'Accessible form elements'], highlights: ['Healthcare-grade clean design', 'Appointment booking flow', 'Service categorisation', 'Trust-building visual design'] },
    { overview: ['A beautifully crafted sign-up / authentication page with full form validation, clean layout, and polished visual design.'], features: ['Real-time form validation', 'Password strength indicator', 'Floating label inputs', 'Show/hide password toggle', 'Responsive centred layout', 'Accessible ARIA labels', 'Smooth focus states', 'Social sign-in buttons'], highlights: ['Real-time validation feedback', 'Accessible form design', 'Polished micro-interactions', 'Reusable component pattern'] },
  ],
};

const ar: Translation = {
  dir: 'rtl',
  nav: { home: 'الرئيسية', about: 'من أنا', skills: 'مهاراتي', projects: 'أعمالي', experience: 'خبرتي', contact: 'تواصل', letsTalk: 'لنتحدث' },
  hero: { available: 'متاح لمشاريع جديدة', hiIm: 'مرحباً، أنا', role: 'مطوّر واجهات أمامية', role2: 'صانع واجهات', desc: 'أبني تجارب ويب جميلة وسريعة ومتجاوبة باستخدام أحدث تقنيات الواجهات الأمامية. شغوف بالكود النظيف والتصميم المدروس وتجسيد الأفكار في المتصفح.', location: 'مصر — متاح للعمل عن بُعد', viewWork: 'شاهد أعمالي', getInTouch: 'تواصل معي' },
  about: { label: 'من أنا', title: 'قصتي', quote: 'أؤمن أن كل منتج عظيم يبدأ بواجهة أمامية عظيمة.', p1: 'أنا عبد الفتاح إبراهيم، مطوّر واجهات أمامية شغوف من مصر. بدأت رحلتي مع تطوير الويب بالفضول وتحولت سريعاً إلى حب عميق لبناء واجهات نظيفة ومتجاوبة ومصقولة بصرياً.', p2: 'أركز على كتابة HTML دلالي وCSS قابل للصيانة وJavaScript حديث. أستمتع بتحويل تحديات التصميم المعقدة إلى تجارب ويب بسيطة وجميلة وبديهية يحبها المستخدمون.', highlights: ['تصميم متجاوب وسهل الجوال', 'كود نظيف وقابل للصيانة', 'توافق بين المتصفحات', 'تحسين الأداء', 'واجهات دقيقة بكسل بكسل', 'متعلم مستمر'], statProjects: 'مشروع منجز', statYears: 'سنوات تعلّم', statPassion: 'شغف', statDedicated: 'تفاني', servicesTitle: 'ماذا أقدّم', servicesDesc: 'خدمات أقدّمها لمساعدتك على بناء وإطلاق منتجك الرقمي', specialization: 'تطوير الواجهات الأمامية', emailLabel: 'البريد', phoneLabel: 'الهاتف', locationLabel: 'الموقع', openRemote: 'متاح للعمل عن بُعد' },
  services: [
    { title: 'تصميم ويب متجاوب', desc: 'صناعة مواقع دقيقة تبدو رائعة على كل جهاز، من الجوال إلى الشاشات الكبيرة.' },
    { title: 'تطوير الواجهات', desc: 'ترجمة التصاميم إلى كود HTML وCSS وJavaScript نظيف وتفاعلي وقابل للصيانة.' },
    { title: 'تطبيقات React', desc: 'بناء تطبيقات React ديناميكية قائمة على المكوّنات مع التركيز على الأداء وتجربة المستخدم.' },
    { title: 'تصميم UI/UX', desc: 'تصميم واجهات بديهية مع اهتمام بالتسلسل البصري والألوان ومسارات المستخدم.' },
  ],
  skills: { label: 'مهاراتي', title: 'أدواتي التي أبدع بها', desc: 'مجموعة مختارة من تقنيات الواجهات الأمامية لبناء تجارب ويب حديثة وسريعة ومتاحة', alsoWith: 'أعمل أيضاً بـ' },
  projects: { label: 'أعمالي', title: 'مشاريع أفتخر بها', desc: 'مجموعة من المشاريع الحقيقية التي بنيتها ونشرتها. اضغط على أي مشروع لرؤية التفاصيل الكاملة.', liveDemo: 'نسخة حية', viewProject: 'إظهار المشروع', githubCta: 'زر GitHub', githubDesc: 'تريد رؤية المزيد من كودي؟', all: 'الكل', featured: 'مميز', modal: { overview: 'نظرة عامة', features: 'المميزات الرئيسية', technologies: 'التقنيات', visitSite: 'زيارة الموقع', close: 'إغلاق', liveDemo: 'عرض النسخة الحية', keyHighlights: 'أبرز النقاط' } },
  projectCategories: { Website: 'موقع', Healthcare: 'رعاية صحية', 'UI Component': 'مكوّن واجهة' },
  experience: { label: 'الخبرة', title: 'مسيرتي', desc: 'محطات رئيسية في طريقي كمطوّر واجهات أمامية' },
  contact: { label: 'تواصل', title: 'لنصنع شيئاً رائعاً معاً', desc: 'لديك مشروع في ذهنك أو تريد فقط إلقاء التحية؟ يسعدني أن أسمع منك', nameLabel: 'الاسم', emailLabel: 'البريد', messageLabel: 'رسالتك', namePlaceholder: 'اسمك', emailPlaceholder: 'you@example.com', messagePlaceholder: 'أخبرني عن مشروعك...', send: 'إرسال الرسالة', sending: 'جارٍ الإرسال...', sent: 'تم إرسال الرسالة!', error: 'فشل الإرسال. حاول مرة أخرى.', findMe: 'تجدني على', availableNow: 'متاح الآن', openTo: 'منفتح على فرص جديدة' },
  contactInfo: { email: 'البريد', phone: 'الهاتف', location: 'الموقع' },
  footer: { tagline: 'مطوّر واجهات أمامية شغوف ببناء تجارب ويب متجاوبة وجميلة وسهلة الاستخدام.', quickLinks: 'روابط سريعة', getInTouch: 'تواصل', madeWith: 'صُنع بـ', backToTop: 'العودة للأعلى' },
  experiences: [
    { role: 'مطوّر واجهات أمامية', company: 'عمل حر', period: '٢٠٢٤ — الآن', description: 'بناء مواقع وتطبيقات ويب متجاوبة لعملاء في صناعات مختلفة.', achievements: ['تسليم ٣+ مشاريع في الوقت المحدد', 'التركيز على التصميم المتجاوب أولاً للجوال', 'دمج أطر CSS حديثة ومكتبات'] },
    { role: 'مطوّر واجهات أمامية (متدرب)', company: 'تعلّم ذاتي ومشاريع', period: '٢٠٢٣ — ٢٠٢٤', description: 'تعلم مكثف لتقنيات الواجهات الأمامية الحديثة وبناء مشاريع حقيقية لتعزيز المهارات.', achievements: ['إتقان أساسيات HTML5 وCSS3 وJavaScript', 'تعلم React.js وبنية المكوّنات', 'بناء عدة مشاريع منشورة على GitHub Pages'] },
  ],
  skillNames: ['HTML5 و CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS', 'تصميم متجاوب', 'تصميم UI/UX', 'Git و GitHub', 'Bootstrap', 'Figma', 'REST APIs', 'TypeScript', 'Next.js'],
  projectContent: [
    { overview: ['موقع شركة حديث ومتجاوب بالكامل لشركة Gammal Tech التقنية. يعرض الموقع خدمات الشركة وأعضاء الفريق وأعمالها بتصميم نظيف ومهني مع حركات تمرير سلسة.', 'بُني من الصفر بمنهج الجوال أولاً، مع ضمان عرض دقيق على جميع أحجام الشاشات.'], features: ['تخطيط متجاوب بالكامل', 'حركات تمرير سلسة', 'قسم رئيسي مع دعوة لاتخاذ إجراء', 'شبكة خدمات بأيقونات', 'قسم عرض الفريق', 'نموذج تواصل مع تحقق', 'HTML دلالي محسّن', 'تحميل سريع'], highlights: ['تصميم الجوال أولاً', 'واجهة نظيفة وحديثة', 'حركات سلسة', 'متوافق بين المتصفحات'] },
    { overview: ['موقع مركز لرعاية مختبرات الدم. يقدّم معلومات عن خدمات المختبر ويتيح حجز المواعيد.', 'صُمم بلوحة ألوان مهدّئة وبنية معلومات واضحة لبناء الثقة مع المرضى.'], features: ['واجهة حجز المواعيد', 'فئات الخدمات', 'قسم الباقات الصحية', 'تصميم طبي نظيف', 'تخطيط متجاوب', 'معلومات التواصل', 'شبكة Bootstrap', 'عناصر متاحة'], highlights: ['تصميم طبي', 'حجز المواعيد', 'تصنيف الخدمات', 'تصميم يبني الثقة'] },
    { overview: ['صفحة تسجيل مصقولة بتحقق كامل وتصميم بصري متقن.', 'تتضمن حقول بتسميات عائمة وتحقق فوري ومؤشر قوة كلمة المرور.'], features: ['تحقق فوري', 'مؤشر قوة كلمة المرور', 'تسميات عائمة', 'إظهار/إخفاء كلمة المرور', 'تخطيط متجاوب', 'تسميات ARIA', 'حالات سلسة', 'أزرار اجتماعية'], highlights: ['تحقق فوري', 'تصميم متاح', 'تفاعلات مصقولة', 'مكوّن قابل لإعادة الاستخدام'] },
  ],
};

const fr: Translation = {
  dir: 'ltr',
  nav: { home: 'Accueil', about: 'À propos', skills: 'Compétences', projects: 'Projets', experience: 'Expérience', contact: 'Contact', letsTalk: 'Discutons' },
  hero: { available: 'Disponible pour de nouveaux projets', hiIm: "Salut, je suis", role: 'Développeur Frontend', role2: 'Artisan UI', desc: 'Je crée des expériences web belles, responsives et rapides.', location: 'Égypte — Ouvert au télétravail', viewWork: 'Voir mes travaux', getInTouch: 'Me contacter' },
  about: { label: 'À propos', title: 'Qui je suis', quote: 'Je crois que chaque grand produit commence par un grand frontend.', p1: "Je suis Abd Elftah Ebrahem, un développeur frontend passionné d'Égypte.", p2: "Je me concentre sur le HTML sémantique, le CSS maintenable et le JavaScript moderne.", highlights: ['Responsive & Mobile-First', 'Code propre', 'Compatibilité multi-navigateurs', 'Optimisation des performances', 'UI pixel-perfect', 'Apprenant continu'], statProjects: 'Projets réalisés', statYears: "Années d'apprentissage", statPassion: 'Passion', statDedicated: 'Dévoué', servicesTitle: 'Ce que je fais', servicesDesc: 'Services pour vous aider à construire votre produit numérique', specialization: 'Développement Frontend', emailLabel: 'Email', phoneLabel: 'Téléphone', locationLabel: 'Localisation', openRemote: 'Ouvert au télétravail' },
  services: [
    { title: 'Design Web Responsive', desc: 'Création de sites web parfaits au pixel près.' },
    { title: 'Développement UI', desc: 'Traduction de designs en code HTML, CSS et JavaScript propre.' },
    { title: 'Applications React', desc: 'Création d\'applications React dynamiques.' },
    { title: 'Design UI/UX', desc: 'Conception d\'interfaces intuitives.' },
  ],
  skills: { label: 'Compétences', title: 'Outils que j\'utilise', desc: 'Technologies frontend pour des expériences web modernes', alsoWith: 'Aussi avec' },
  projects: { label: 'Portfolio', title: 'Projets dont je suis fier', desc: 'Une sélection de projets réels. Cliquez pour voir tous les détails.', liveDemo: 'Démo en direct', viewProject: 'Afficher le projet', githubCta: 'Visiter mon GitHub', githubDesc: 'Envie de voir plus de mon code?', all: 'Tous', featured: 'Vedette', modal: { overview: 'Aperçu', features: 'Fonctionnalités clés', technologies: 'Technologies', visitSite: 'Visiter le site', close: 'Fermer', liveDemo: 'Voir la démo', keyHighlights: 'Points forts' } },
  projectCategories: { Website: 'Site web', Healthcare: 'Santé', 'UI Component': 'Composant UI' },
  experience: { label: 'Expérience', title: 'Mon parcours', desc: 'Étapes clés de mon chemin' },
  contact: { label: 'Contact', title: 'Construisons quelque chose ensemble', desc: 'Un projet en tête? J\'adorerais vous entendre', nameLabel: 'Nom', emailLabel: 'Email', messageLabel: 'Message', namePlaceholder: 'Votre nom', emailPlaceholder: 'vous@exemple.com', messagePlaceholder: 'Parlez-moi de votre projet...', send: 'Envoyer', sending: 'Envoi...', sent: 'Message envoyé!', error: 'Échec de l\'envoi. Réessayez.', findMe: 'Trouvez-moi sur', availableNow: 'Disponible maintenant', openTo: 'Ouvert aux nouvelles opportunités' },
  contactInfo: { email: 'Email', phone: 'Téléphone', location: 'Localisation' },
  footer: { tagline: 'Développeur frontend passionné par la création d\'expériences web responsives.', quickLinks: 'Liens rapides', getInTouch: 'Contact', madeWith: 'Fait avec', backToTop: 'Retour en haut' },
  experiences: [
    { role: 'Développeur Frontend', company: 'Freelance', period: '2024 — Présent', description: 'Création de sites web responsives.', achievements: ['Livraison de 3+ projets à temps', 'Focus sur le design mobile-first', 'Intégration de frameworks CSS'] },
    { role: 'Développeur Frontend (Stagiaire)', company: 'Auto-apprentissage', period: '2023 — 2024', description: 'Apprentissage intensif des technologies frontend.', achievements: ['Maîtrise de HTML5, CSS3, JavaScript', 'Apprentissage de React.js', 'Projets sur GitHub Pages'] },
  ],
  skillNames: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS', 'Design Responsive', 'UI/UX Design', 'Git & GitHub', 'Bootstrap', 'Figma', 'REST APIs', 'TypeScript', 'Next.js'],
  projectContent: en.projectContent,
};

const es: Translation = {
  dir: 'ltr',
  nav: { home: 'Inicio', about: 'Acerca', skills: 'Habilidades', projects: 'Proyectos', experience: 'Experiencia', contact: 'Contacto', letsTalk: 'Hablemos' },
  hero: { available: 'Disponible para nuevos proyectos', hiIm: 'Hola, soy', role: 'Desarrollador Frontend', role2: 'Artesano UI', desc: 'Creo experiencias web hermosas, responsives y rápidas.', location: 'Egipto — Abierto a remoto', viewWork: 'Ver mi trabajo', getInTouch: 'Contáctame' },
  about: { label: 'Acerca de mí', title: 'Quién soy', quote: 'Creo que cada gran producto comienza con un gran frontend.', p1: 'Soy Abd Elftah Ebrahem, un desarrollador frontend apasionado de Egipto.', p2: 'Me enfoco en HTML semántico, CSS mantenible y JavaScript moderno.', highlights: ['Responsive & Mobile-First', 'Código limpio', 'Compatibilidad cross-browser', 'Optimización de rendimiento', 'UI pixel-perfect', 'Aprendiz continuo'], statProjects: 'Proyectos construidos', statYears: 'Años aprendiendo', statPassion: 'Pasión', statDedicated: 'Dedicado', servicesTitle: 'Lo que hago', servicesDesc: 'Servicios para ayudarte a construir tu producto digital', specialization: 'Desarrollo Frontend', emailLabel: 'Correo', phoneLabel: 'Teléfono', locationLabel: 'Ubicación', openRemote: 'Abierto a trabajo remoto' },
  services: [
    { title: 'Diseño Web Responsive', desc: 'Creación de sitios web perfectos al píxel.' },
    { title: 'Desarrollo UI', desc: 'Traducción de diseños en código limpio.' },
    { title: 'Aplicaciones React', desc: 'Construcción de aplicaciones React dinámicas.' },
    { title: 'Diseño UI/UX', desc: 'Diseño de interfaces intuitivas.' },
  ],
  skills: { label: 'Mis habilidades', title: 'Herramientas que uso', desc: 'Tecnologías frontend para experiencias web modernas', alsoWith: 'También con' },
  projects: { label: 'Portafolio', title: 'Proyectos de los que estoy orgulloso', desc: 'Una selección de proyectos reales. Haz clic para ver todos los detalles.', liveDemo: 'Demo en vivo', viewProject: 'Mostrar proyecto', githubCta: 'Visitar mi GitHub', githubDesc: '¿Quieres ver más de mi código?', all: 'Todos', featured: 'Destacado', modal: { overview: 'Resumen', features: 'Características clave', technologies: 'Tecnologías', visitSite: 'Visitar sitio', close: 'Cerrar', liveDemo: 'Ver demo', keyHighlights: 'Puntos destacados' } },
  projectCategories: { Website: 'Sitio web', Healthcare: 'Salud', 'UI Component': 'Componente UI' },
  experience: { label: 'Experiencia', title: 'Mi trayectoria', desc: 'Hitos clave en mi camino' },
  contact: { label: 'Contacto', title: 'Construyamos algo juntos', desc: '¿Tienes un proyecto en mente? Me encantaría escucharte', nameLabel: 'Nombre', emailLabel: 'Correo', messageLabel: 'Mensaje', namePlaceholder: 'Tu nombre', emailPlaceholder: 'tu@ejemplo.com', messagePlaceholder: 'Cuéntame sobre tu proyecto...', send: 'Enviar', sending: 'Enviando...', sent: '¡Mensaje enviado!', error: 'Error al enviar. Inténtalo de nuevo.', findMe: 'Encuéntrame en', availableNow: 'Disponible ahora', openTo: 'Abierto a nuevas oportunidades' },
  contactInfo: { email: 'Correo', phone: 'Teléfono', location: 'Ubicación' },
  footer: { tagline: 'Desarrollador frontend apasionado por crear experiencias web responsives.', quickLinks: 'Enlaces rápidos', getInTouch: 'Contacto', madeWith: 'Hecho con', backToTop: 'Volver arriba' },
  experiences: [
    { role: 'Desarrollador Frontend', company: 'Freelance', period: '2024 — Presente', description: 'Construcción de sitios web responsives.', achievements: ['Entrega de 3+ proyectos a tiempo', 'Enfoque en diseño mobile-first', 'Integración de frameworks CSS'] },
    { role: 'Desarrollador Frontend (Aprendiz)', company: 'Autoaprendizaje', period: '2023 — 2024', description: 'Aprendizaje intensivo de tecnologías frontend.', achievements: ['Dominio de HTML5, CSS3, JavaScript', 'Aprendizaje de React.js', 'Proyectos en GitHub Pages'] },
  ],
  skillNames: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS', 'Diseño Responsive', 'UI/UX Design', 'Git & GitHub', 'Bootstrap', 'Figma', 'REST APIs', 'TypeScript', 'Next.js'],
  projectContent: en.projectContent,
};

const de: Translation = {
  dir: 'ltr',
  nav: { home: 'Start', about: 'Über mich', skills: 'Fähigkeiten', projects: 'Projekte', experience: 'Erfahrung', contact: 'Kontakt', letsTalk: 'Sprechen wir' },
  hero: { available: 'Verfügbar für neue Projekte', hiIm: 'Hallo, ich bin', role: 'Frontend Entwickler', role2: 'UI Handwerker', desc: 'Ich erstelle schöne, responsive und schnelle Web-Erlebnisse.', location: 'Ägypten — Offen für Remote', viewWork: 'Meine Arbeiten ansehen', getInTouch: 'Kontakt aufnehmen' },
  about: { label: 'Über mich', title: 'Wer ich bin', quote: 'Ich glaube, dass jedes große Produkt mit einem großen Frontend beginnt.', p1: 'Ich bin Abd Elftah Ebrahem, ein leidenschaftlicher Frontend-Entwickler aus Ägypten.', p2: 'Ich konzentriere mich auf semantisches HTML, wartbares CSS und modernes JavaScript.', highlights: ['Responsive & Mobile-First', 'Saubarer Code', 'Browser-Kompatibilität', 'Performance-Optimierung', 'Pixel-perfekte UI', 'Kontinuierlicher Lerner'], statProjects: 'Erstellte Projekte', statYears: 'Lernjahre', statPassion: 'Leidenschaft', statDedicated: 'Engagiert', servicesTitle: 'Was ich tue', servicesDesc: 'Services um dein digitales Produkt zu bauen', specialization: 'Frontend-Entwicklung', emailLabel: 'E-Mail', phoneLabel: 'Telefon', locationLabel: 'Standort', openRemote: 'Offen für Remote-Arbeit' },
  services: [
    { title: 'Responsives Webdesign', desc: 'Erstellung pixelgenauer Websites.' },
    { title: 'UI-Entwicklung', desc: 'Übersetzung von Designs in sauberen Code.' },
    { title: 'React-Anwendungen', desc: 'Erstellung dynamischer React-Anwendungen.' },
    { title: 'UI/UX-Design', desc: 'Gestaltung intuitiver Benutzeroberflächen.' },
  ],
  skills: { label: 'Meine Fähigkeiten', title: 'Werkzeuge die ich nutze', desc: 'Frontend-Technologien für moderne Web-Erlebnisse', alsoWith: 'Auch mit' },
  projects: { label: 'Portfolio', title: 'Projekte auf die ich stolz bin', desc: 'Eine Auswahl echter Projekte. Klicke für alle Details.', liveDemo: 'Live-Demo', viewProject: 'Projekt anzeigen', githubCta: 'Mein GitHub besuchen', githubDesc: 'Willst du mehr von meinem Code sehen?', all: 'Alle', featured: 'Hervorgehoben', modal: { overview: 'Übersicht', features: 'Hauptfunktionen', technologies: 'Technologien', visitSite: 'Website besuchen', close: 'Schließen', liveDemo: 'Live-Demo ansehen', keyHighlights: 'Highlights' } },
  projectCategories: { Website: 'Website', Healthcare: 'Gesundheit', 'UI Component': 'UI-Komponente' },
  experience: { label: 'Erfahrung', title: 'Mein Werdegang', desc: 'Meilensteine auf meinem Weg' },
  contact: { label: 'Kontakt', title: 'Lass uns etwas zusammen bauen', desc: 'Ein Projekt im Sinn? Ich freue mich von dir zu hören', nameLabel: 'Name', emailLabel: 'E-Mail', messageLabel: 'Nachricht', namePlaceholder: 'Dein Name', emailPlaceholder: 'du@beispiel.com', messagePlaceholder: 'Erzähl mir von deinem Projekt...', send: 'Senden', sending: 'Wird gesendet...', sent: 'Nachricht gesendet!', error: 'Senden fehlgeschlagen. Erneut versuchen.', findMe: 'Finde mich auf', availableNow: 'Jetzt verfügbar', openTo: 'Offen für neue Möglichkeiten' },
  contactInfo: { email: 'E-Mail', phone: 'Telefon', location: 'Standort' },
  footer: { tagline: 'Frontend-Entwickler mit Leidenschaft für responsive Web-Erlebnisse.', quickLinks: 'Schnelllinks', getInTouch: 'Kontakt', madeWith: 'Gemacht mit', backToTop: 'Nach oben' },
  experiences: [
    { role: 'Frontend-Entwickler', company: 'Freelance', period: '2024 — Heute', description: 'Erstellung responsiver Websites.', achievements: ['3+ Projekte rechtzeitig geliefert', 'Fokus auf Mobile-First-Design', 'Integration moderner CSS-Frameworks'] },
    { role: 'Frontend-Entwickler (Praktikant)', company: 'Selbstlernen', period: '2023 — 2024', description: 'Intensives Lernen moderner Frontend-Technologien.', achievements: ['Beherrschung von HTML5, CSS3, JavaScript', 'React.js gelernt', 'Projekte auf GitHub Pages'] },
  ],
  skillNames: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS', 'Responsive Design', 'UI/UX Design', 'Git & GitHub', 'Bootstrap', 'Figma', 'REST APIs', 'TypeScript', 'Next.js'],
  projectContent: en.projectContent,
};

const zh: Translation = {
  dir: 'ltr',
  nav: { home: '首页', about: '关于', skills: '技能', projects: '项目', experience: '经历', contact: '联系', letsTalk: '聊聊' },
  hero: { available: '可接新项目', hiIm: '你好，我是', role: '前端开发工程师', role2: 'UI工匠', desc: '我用现代前端技术打造美观、响应式、快速的网页体验。', location: '埃及 — 接受远程', viewWork: '查看作品', getInTouch: '联系我' },
  about: { label: '关于我', title: '我是谁', quote: '我相信每个伟大的产品都始于一个伟大的前端。', p1: '我是 Abd Elftah Ebrahem，来自埃及的前端开发工程师。', p2: '我专注于语义化HTML、可维护CSS和现代JavaScript。', highlights: ['响应式与移动优先', '简洁可维护的代码', '跨浏览器兼容', '性能优化', '像素级UI', '持续学习者'], statProjects: '已建项目', statYears: '学习年限', statPassion: '热情', statDedicated: '专注', servicesTitle: '我做什么', servicesDesc: '帮助你构建和发布数字产品的服务', specialization: '前端开发', emailLabel: '邮箱', phoneLabel: '电话', locationLabel: '位置', openRemote: '接受远程工作' },
  services: [
    { title: '响应式网页设计', desc: '打造在每台设备上都完美呈现的网站。' },
    { title: 'UI开发', desc: '将设计转化为简洁的代码。' },
    { title: 'React应用', desc: '构建基于组件的动态React应用。' },
    { title: 'UI/UX设计', desc: '设计直观的用户界面。' },
  ],
  skills: { label: '我的技能', title: '我使用的工具', desc: '用于构建现代网页体验的前端技术', alsoWith: '同时使用' },
  projects: { label: '作品集', title: '我引以为豪的项目', desc: '我构建的真实项目精选。点击查看完整详情。', liveDemo: '在线演示', viewProject: '显示项目', githubCta: '访问我的GitHub', githubDesc: '想看更多代码？', all: '全部', featured: '精选', modal: { overview: '概览', features: '主要功能', technologies: '技术栈', visitSite: '访问网站', close: '关闭', liveDemo: '查看在线演示', keyHighlights: '项目亮点' } },
  projectCategories: { Website: '网站', Healthcare: '医疗', 'UI Component': 'UI组件' },
  experience: { label: '经历', title: '我的旅程', desc: '我作为前端开发工程师的关键里程碑' },
  contact: { label: '联系', title: '让我们一起创造', desc: '有项目想法？我很乐意收到你的消息', nameLabel: '姓名', emailLabel: '邮箱', messageLabel: '留言', namePlaceholder: '你的名字', emailPlaceholder: 'you@example.com', messagePlaceholder: '告诉我你的项目...', send: '发送', sending: '发送中...', sent: '已发送！', error: '发送失败。请重试。', findMe: '在以下平台找到我', availableNow: '现在可用', openTo: '欢迎新机会' },
  contactInfo: { email: '邮箱', phone: '电话', location: '位置' },
  footer: { tagline: '热衷于构建响应式、美观网页体验的前端开发工程师。', quickLinks: '快速链接', getInTouch: '联系', madeWith: '用心制作', backToTop: '回到顶部' },
  experiences: [
    { role: '前端开发工程师', company: '自由职业', period: '2024 — 至今', description: '为不同行业的客户构建响应式网站。', achievements: ['按时交付3+项目', '专注移动优先设计', '集成现代CSS框架'] },
    { role: '前端开发实习生', company: '自学', period: '2023 — 2024', description: '密集学习现代前端技术。', achievements: ['掌握HTML5、CSS3、JavaScript', '学习React.js', '项目部署在GitHub Pages'] },
  ],
  skillNames: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS', '响应式设计', 'UI/UX设计', 'Git & GitHub', 'Bootstrap', 'Figma', 'REST APIs', 'TypeScript', 'Next.js'],
  projectContent: en.projectContent,
};

export const translations: Record<Lang, Translation> = { en, ar, fr, es, de, zh };
