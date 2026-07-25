import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database, Cpu, Layers, Server, Search, Image, Code, Zap } from 'lucide-react';

interface DiagnosticGuideProps {
  onSeed: () => void;
}

interface ChecklistItem {
  category: string;
  priority: 'critical' | 'high' | 'medium';
  title: string;
  expected_impact: string;
  tool: string;
  how: string;
}

const CHECKLIST: ChecklistItem[] = [
  {
    category: 'php', priority: 'critical', title: 'PHP Profiling — تحديد الدوال البطيئة',
    expected_impact: 'تحديد السبب الجذري لارتفاع TTFB',
    tool: 'New Relic APM أو Blackfire.io أو Tideways',
    how: 'ثبّت الأداة، شغّل اختبار على الصفحة الرئيسية وصفحة قسم، ابحث عن دوال تستغرق 200ms+، وراجع do_action/apply_filters البطيئة.',
  },
  {
    category: 'database', priority: 'critical', title: 'فحص wp_options autoload',
    expected_impact: 'تقليل 100-300ms من TTFB',
    tool: 'WP-CLI + phpMyAdmin',
    how: 'استخدم: SELECT SUM(LENGTH(option_value)) FROM wp_options WHERE autoload="yes"; — إذا تجاوز 500KB احذف خيارات autoload غير الضرورية.',
  },
  {
    category: 'database', priority: 'critical', title: 'تحليل الاستعلامات البطيئة (Slow Queries)',
    expected_impact: 'تحديد استعلامات تُبطّئ صفحات الأقسام',
    tool: 'Query Monitor + Slow Query Log',
    how: 'فعّل Query Monitor، تصفّح صفحة قسم، افتح لوحة "Queries by Component"، سجّل أي استعلام فوق 50ms وارفعه في تبويب "تحليل الاستعلامات".',
  },
  {
    category: 'cache', priority: 'critical', title: 'تفعيل Redis Object Cache',
    expected_impact: 'تقليل TTFB بـ 30-50%',
    tool: 'Redis + WP Redis أو Redis Object Cache',
    how: 'تأكد أن Redis يعمل: redis-cli ping. ثبّت إضافة Redis Object Cache وفعّلها. تحقق من wp cache info أن المفاتيح تُخزّن.',
  },
  {
    category: 'cache', priority: 'high', title: 'ضبط LiteSpeed Cache لـ WooCommerce',
    expected_impact: 'تفعيل كاش كامل للصفحات',
    tool: 'LiteSpeed Cache + WooCommerce Integration',
    how: 'فعّل ESI لعناصر السلة، اضبط Vary Group بشكل صحيح، أضف nonces إلى قائمة الاستثناءات، تأكد أن Checkout وMy Account مستثناة.',
  },
  {
    category: 'database', priority: 'high', title: 'فهرسة جداول WooCommerce',
    expected_impact: 'تسريع الفلاتر وصفحات الأقسام',
    tool: 'MySQL + phpMyAdmin',
    how: 'أضف فهارس على wp_wc_product_meta_lookup (price, stock_status, sku) وأعمدة الفلاتر في wp_postmeta. استخدم EXPLAIN للتحقق.',
  },
  {
    category: 'plugins', priority: 'high', title: 'مراجعة أداء الإضافات',
    expected_impact: 'تقليل تحميل PHP غير الضروري',
    tool: 'Query Monitor → Plugins',
    how: 'راجع قسم Plugins في Query Monitor، حدّد الإضافات التي تُحمّل CSS/JS على كل الصفحة، عطّل ما لا يلزم على Checkout باستخدام Asset CleanUp.',
  },
  {
    category: 'theme', priority: 'high', title: 'فحص أداء الثيم',
    expected_impact: 'تقليل DOM وCSS غير المستخدم',
    tool: 'Query Monitor → Theme + Lighthouse',
    how: 'افحص استعلامات wp_head وtemplate_redirect. إذا تستخدم Page Builder (Elementor/Divi) قلّل الـ widgets وفعّل Critical CSS.',
  },
  {
    category: 'search', priority: 'high', title: 'تحسين البحث الداخلي',
    expected_impact: 'تسريع نتائج البحث 10x',
    tool: 'SearchWP أو Jetpack Search أو ElasticPress',
    how: 'استبدل بحث WP الافتراضي (LIKE على wp_posts) بـ SearchWP للأسرع، أو Jetpack Search (Algolia) لو لديك +5000 منتج.',
  },
  {
    category: 'images', priority: 'medium', title: 'تحسين صور المنتجات',
    expected_impact: 'تحسين LCP وتقليل الحجم',
    tool: 'ShortPixel + WebP + LiteSpeed',
    how: 'حوّل الصور إلى WebP، اضبط أبعاد LCP preload، استخدم lazy loading للصور البعيدة، حدّد width/height لكل صورة.',
  },
  {
    category: 'frontend', priority: 'medium', title: 'تحسين CSS و JavaScript',
    expected_impact: 'تحسين TBT وCLS',
    tool: 'LiteSpeed Page Optimization + Lighthouse',
    how: 'فعّل Critical CSS inline، أجّل JS غير الحرج (defer)، أزل jQuery Migrate إن أمكن، قلّل CSS غير المستخدم.',
  },
  {
    category: 'frontend', priority: 'medium', title: 'تحسين تحميل الخطوط',
    expected_impact: 'تحسين FCP وLCP',
    tool: 'font-display: swap + preload',
    how: 'أضف font-display: swap، preload للخط الرئيسي فقط، استخدم self-hosted fonts بدل Google Fonts CDN.',
  },
  {
    category: 'tracking', priority: 'medium', title: 'تحسين أدوات التتبع (Meta Pixel / GA)',
    expected_impact: 'تقليل تأثير JS على الثبوت',
    tool: 'Server-side Tracking + async',
    how: 'حمّل Pixel وGA بـ async/defer، استخدم Conversion API (server-side) لتقليل الاعتماد على client-side، أجّل التحميل بعد التفاعل.',
  },
  {
    category: 'server', priority: 'high', title: 'ضبط PHP-FPM workers',
    expected_impact: 'منع queueing تحت الحمل',
    tool: 'Hostinger Cloud + SSH',
    how: 'افحص pm.max_children، ارفعه إذا رأيت "server reached pm.max_children" في السجلات. ترقية إلى PHP 8.2+ مع OPcache + JIT.',
  },
];

const CATEGORY_META: Record<string, { icon: React.ElementType; color: string }> = {
  php: { icon: Cpu, color: 'text-violet-400' },
  database: { icon: Database, color: 'text-sky-400' },
  cache: { icon: Zap, color: 'text-warning-400' },
  plugins: { icon: Layers, color: 'text-primary-400' },
  theme: { icon: Layers, color: 'text-primary-400' },
  search: { icon: Search, color: 'text-success-400' },
  images: { icon: Image, color: 'text-error-400' },
  frontend: { icon: Code, color: 'text-violet-400' },
  tracking: { icon: Code, color: 'text-violet-400' },
  server: { icon: Server, color: 'text-warning-400' },
};

const PRIORITY_BADGE: Record<string, string> = {
  critical: 'bg-error-500/15 text-error-400',
  high: 'bg-warning-500/15 text-warning-400',
  medium: 'bg-sky-500/15 text-sky-400',
};

export default function DiagnosticGuide({ onSeed }: DiagnosticGuideProps) {
  const [seeding, setSeeding] = useState(false);

  const seedAll = async () => {
    setSeeding(true);
    const rows = CHECKLIST.map((c) => ({
      title: c.title,
      category: c.category,
      priority: c.priority,
      status: 'pending',
      expected_impact: c.expected_impact,
      note: `الأداة: ${c.tool} | ${c.how}`,
    }));
    const { error } = await supabase.from('improvements').insert(rows);
    setSeeding(false);
    if (!error) onSeed();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-black text-2xl text-ink-50">دليل التشخيص والتحسين</h2>
          <p className="text-sm text-ink-400 mt-1">خطة احترافية مبنيّة على الأدلة لموقع WooCommerce على LiteSpeed</p>
        </div>
        <button onClick={seedAll} disabled={seeding} className="btn-primary">
          <Zap className="w-4 h-4" />
          {seeding ? 'جاري الإضافة...' : 'إضافة الكل لخطة التحسينات'}
        </button>
      </div>

      <div className="space-y-2">
        {CHECKLIST.map((item, i) => {
          const meta = CATEGORY_META[item.category];
          const Icon = meta?.icon ?? Code;
          return (
            <div key={i} className="card p-4 card-hover">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl bg-ink-800 flex items-center justify-center shrink-0 ${meta?.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm text-ink-100">{item.title}</h3>
                    <span className={`badge ${PRIORITY_BADGE[item.priority]}`}>
                      {item.priority === 'critical' ? 'حرجة' : item.priority === 'high' ? 'عالية' : 'متوسطة'}
                    </span>
                  </div>
                  <p className="text-xs text-success-400 font-semibold mb-1.5">الأثر: {item.expected_impact}</p>
                  <div className="grid sm:grid-cols-2 gap-2 mt-2">
                    <div className="text-xs">
                      <span className="text-ink-500 font-bold">الأداة: </span>
                      <span className="text-ink-300">{item.tool}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-ink-500 font-bold">الطريقة: </span>
                      <span className="text-ink-300">{item.how}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
