import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, Calendar, User, ArrowLeft, Clock, Share2, Bookmark, ChevronLeft } from 'lucide-react';
import { useLang } from '../lib/i18n';

const articlesData: Record<string, {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string[];
}> = {
  featured: {
    title: 'فهم لغة الصمت: التواصل غير اللفظي عند الأطفال',
    author: 'د. سمير المنصور',
    date: '18 مارس 2024',
    readTime: '15 دقيقة قراءة',
    category: 'علم النفس',
    image: 'https://picsum.photos/seed/featured/1200/800',
    content: [
      'يعتبر التواصل غير اللفظي من أهم الوسائل التي يستخدمها الأطفال للتعبير عن مشاعرهم واحتياجاتهم، خاصة في المراحل العمرية المبكرة التي لم تتطور فيها القدرة اللغوية بشكل كامل. وفي بيئات الأزمات والنزاعات، يصبح هذا النوع من التواصل أكثر أهمية حيث يجد الأطفال صعوبة في التعبير اللفظي عما يمرون به.',
      'أظهرت الدراسات الحديثة أن أكثر من 70% من التواصل عند الأطفال دون سن السابعة يتم عبر لغة الجسد وتعبيرات الوجه. وهذا يعني أن المعالج النفسي يحتاج إلى تطوير مهارات خاصة في قراءة هذه الإشارات غير اللفظية لفهم الحالة النفسية الحقيقية للطفل.',
      'من أهم المؤشرات غير اللفظية التي يجب الانتباه لها: وضعية الجسد أثناء الجلوس، حركة اليدين، التلامس البصري، ونبرة الصوت. كل هذه العناصر تشكل معاً صورة متكاملة عن الحالة العاطفية للطفل.',
      'في هذا المقال، نستعرض أحدث الأبحاث في مجال التواصل غير اللفظي عند الأطفال المتضررين من النزاعات، ونقدم نصائح عملية للمعالجين والأهل حول كيفية فك رموز هذه الإشارات وفهمها بشكل صحيح.',
      'كما نتناول دور التكنولوجيا الحديثة، وتحديداً أنظمة الذكاء الاصطناعي مثل "نبض"، في تحليل هذه الإشارات بشكل موضوعي ودقيق، مما يساعد المعالجين على اتخاذ قرارات علاجية أفضل.',
    ],
  },
  article1: {
    title: 'مستقبل التقييم النفسي: كيف يعيد الذكاء الاصطناعي صياغة التشخيص؟',
    author: 'د. سارة الأحمد',
    date: '12 مارس 2024',
    readTime: '10 دقائق قراءة',
    category: 'تكنولوجيا',
    image: 'https://picsum.photos/seed/art1/600/400',
    content: [
      'يشهد مجال التقييم النفسي تحولاً جذرياً بفضل التطورات المتسارعة في تقنيات الذكاء الاصطناعي. فالنماذج اللغوية الكبيرة وخوارزميات تحليل السلوك أصبحت قادرة على مساعدة المعالجين في رصد التغيرات السلوكية الدقيقة التي قد تفوت العين البشرية.',
      'تعتمد هذه التقنيات على تحليل آلاف ساعات الجلسات العلاجية المسجلة، واستخراج أنماط سلوكية متكررة يمكن استخدامها كمؤشرات للتشخيص المبكر للاضطرابات النفسية عند الأطفال.',
      'من أبرز التطبيقات العملية لهذه التقنية: تحليل تعبيرات الوجه في الوقت الحقيقي، ومراقبة أنماط النطق والصوت، وتتبع حركة الجسد أثناء الجلسات العلاجية. كل هذه البيانات يتم معالجتها بشكل فوري لتقديم رؤى قيمة للمعالج.',
      'لكن من المهم التأكيد على أن الذكاء الاصطناعي لا يهدف إلى استبدال المعالج البشري، بل يعمل كأداة مساعدة تعزز قدراته التشخيصية. القرار النهائي يبقى دائماً بيد المعالج المختص.',
    ],
  },
  article2: {
    title: 'بيئات التعلم الآمنة: خلق مساحة للنضج العاطفي',
    author: 'أ. عمر ياسين',
    date: '05 مارس 2024',
    readTime: '8 دقائق قراءة',
    category: 'تربية',
    image: 'https://picsum.photos/seed/art2/600/400',
    content: [
      'تعتبر بيئة التعلم من أهم العوامل المؤثرة في النمو العاطفي والنفسي للطفل. وفي مناطق النزاعات، يصبح إنشاء بيئات تعليمية آمنة ضرورة ملحة لحماية الأطفال من الآثار النفسية للصدمات.',
      'تشير الدراسات إلى أن الأطفال الذين يتعلمون في بيئات آمنة وداعمة يظهرون تحسناً بنسبة 40% في مؤشرات الاستقرار النفسي مقارنة بأقرانهم في بيئات تقليدية.',
      'من أهم عناصر بيئة التعلم الآمنة: المساحة الجسدية المريحة، والعلاقات الإيجابية بين المعلمين والطلاب، والأنشطة التعبيرية مثل الرسم والتمثيل، والدعم النفسي المتواصل.',
      'يتناول هذا المقال استراتيجيات عملية لبناء هذه البيئات، مع أمثلة من تجارب ناجحة في مناطق نزاع مختلفة حول العالم.',
    ],
  },
  article3: {
    title: 'إدارة الاحتراق الوظيفي للمعالجين النفسيين',
    author: 'د. ليلى حسن',
    date: '28 فبراير 2024',
    readTime: '12 دقيقة قراءة',
    category: 'صحة نفسية',
    image: 'https://picsum.photos/seed/art3/600/400',
    content: [
      'يواجه المعالجون النفسيون العاملون في بيئات الأزمات تحديات فريدة تزيد من خطر الإصابة بالاحتراق الوظيفي. فالتعامل المستمر مع حالات الصدمات والفواجع يمكن أن يترك آثاراً عميقة على الصحة النفسية للمعالج نفسه.',
      'تظهر الإحصائيات أن ما يزيد عن 60% من المعالجين النفسيين في مناطق النزاع يعانون من أعراض الاحتراق الوظيفي بدرجات متفاوتة. هذه الأعراض تشمل: الإرهاق العاطفي، التبلد المشاعري، وانخفاض الشعور بالإنجاز المهني.',
      'من أهم استراتيجيات المواجهة: الحفاظ على توازن صحي بين العمل والحياة الشخصية، والمشاركة في جلسات الإشراف المهني المنتظمة، وممارسة تقنيات الرعاية الذاتية.',
      'كما تلعب المؤسسات دوراً محورياً في حماية معالجيها من خلال توفير بيئات عمل داعمة، وتقليص ساعات العمل الميداني، وتوفير برامج الدعم النفسي المتخصصة.',
    ],
  },
};

export default function ArticleDetailPage() {
  const { t } = useLang();
  const location = useLocation();
  const state = location.state as { articleId?: string } | null;
  const articleId = state?.articleId || 'featured';
  const article = articlesData[articleId] || articlesData.featured;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Activity size={24} />
              </div>
              <span className="text-2xl font-bold text-primary tracking-tight">{t('appName')}</span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
              <Link to="/" className="hover:text-primary transition-colors">{t('nav_home')}</Link>
              <Link to="/about" className="hover:text-primary transition-colors">{t('nav_about')}</Link>
              <Link to="/articles" className="text-primary">{t('nav_articles')}</Link>
              <Link to="/login" className="hover:text-primary transition-colors">{t('nav_login')}</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/articles" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors mb-8">
          <ChevronLeft size={16} />
          {t('articleDetail_backToArticles')}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold mb-6">{article.category}</span>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-6">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 font-bold">
              <div className="flex items-center gap-2">
                <img src="https://picsum.photos/seed/author/100/100" className="w-8 h-8 rounded-full" />
                <User size={14} />
                {article.author}
              </div>
              <div className="flex items-center gap-2"><Calendar size={14} />{article.date}</div>
              <div className="flex items-center gap-2"><Clock size={14} />{article.readTime}</div>
            </div>
          </div>

          <div className="relative rounded-[2.5rem] overflow-hidden mb-12">
            <img src={article.image} alt={article.title} className="w-full h-80 object-cover" />
          </div>

          <article className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 shadow-sm">
            <div className="space-y-6">
              {article.content.map((para, i) => (
                <p key={i} className="text-lg text-slate-600 leading-[1.9]">{para}</p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="https://picsum.photos/seed/author/100/100" className="w-12 h-12 rounded-xl" />
                <div>
                  <div className="font-bold text-slate-900">{article.author}</div>
                  <div className="text-xs text-slate-400">{t('articleDetail_authorRole')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all">
                  <Share2 size={18} />
                </button>
                <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all">
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </div>
  );
}
