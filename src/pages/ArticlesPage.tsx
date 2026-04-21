import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, Search, ChevronLeft, Calendar, User, ArrowLeft } from 'lucide-react';
import { useLang } from '../lib/i18n';

const categoryKeys = ['all', 'psychology', 'ai', 'childDev', 'mentalHealth'];

const allArticles = [
  {
    title: "مستقبل التقييم النفسي: كيف يعيد الذكاء الاصطناعي صياغة التشخيص؟",
    desc: "دراسة معمقة حول دور النماذج اللغوية الكبيرة في مساعدة المعالجين على رصد التغيرات السلوكية الدقيقة.",
    category: "ai",
    author: "د. سارة الأحمد",
    date: "12 مارس 2024",
    image: "https://picsum.photos/seed/art1/600/400",
    articleId: "article1"
  },
  {
    title: "بيئات التعلم الآمنة: خلق مساحة للنضج العاطفي",
    desc: "كيف يمكن للمؤسسات التعليمية في مناطق النزاع بناء بيئات تدعم الاستقرار النفسي للأطفال.",
    category: "childDev",
    author: "أ. عمر ياسين",
    date: "05 مارس 2024",
    image: "https://picsum.photos/seed/art2/600/400",
    articleId: "article2"
  },
  {
    title: "إدارة الاحتراق الوظيفي للمعالجين النفسيين",
    desc: "نصائح واستراتيجيات عملية للحفاظ على الصحة النفسية للمعالجين أثناء العمل في بيئات عالية الضغط.",
    category: "mentalHealth",
    author: "د. ليلى حسن",
    date: "28 فبراير 2024",
    image: "https://picsum.photos/seed/art3/600/400",
    articleId: "article3"
  },
  {
    title: "التعلّق والعلاقات المبكرة: أساس الصحة النفسية للطفل",
    desc: "كيف تُشكّل العلاقة بين الطفل ومقدم الرعاية في السنوات الأولى أساساً متيناً للصحة النفسية المستقبلية.",
    category: "psychology",
    author: "د. منى الشريف",
    date: "20 فبراير 2024",
    image: "https://picsum.photos/seed/art4/600/400",
    articleId: "article4"
  },
  {
    title: "اللعب العلاجي: أداة فعالة في معالجة صدمات الأطفال",
    desc: "استكشاف كيف يُستخدم اللعب كوسيلة علاجية لمساعدة الأطفال على التعبير عن مشاعرهم ومعالجة الصدمات.",
    category: "psychology",
    author: "د. رنا الخطيب",
    date: "15 فبراير 2024",
    image: "https://picsum.photos/seed/art5/600/400",
    articleId: "article5"
  },
  {
    title: "الذكاء العاطفي عند الأطفال: كيف ننمّيه في بيئات الأزمات؟",
    desc: "استراتيجيات عملية لتنمية الذكاء العاطفي لدى الأطفال في ظروف صعبة وتحديات بيئية.",
    category: "childDev",
    author: "أ. سعاد الناصر",
    date: "10 فبراير 2024",
    image: "https://picsum.photos/seed/art6/600/400",
    articleId: "article6"
  },
];

export default function ArticlesPage() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState('');

  const categoryMap: Record<string, string> = {
    all: t('articles_cat_all'),
    psychology: t('articles_cat_psychology'),
    ai: t('articles_cat_ai'),
    childDev: t('articles_cat_childDev'),
    mentalHealth: t('articles_cat_mentalHealth'),
  };

  const filteredArticles = allArticles.filter(article => {
    const matchCategory = activeCategory === "all" || article.category === activeCategory;
    const matchSearch = !searchQuery.trim() || article.title.includes(searchQuery.trim()) || article.desc.includes(searchQuery.trim());
    return matchCategory && matchSearch;
  });

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

      <header className="bg-white pt-20 pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-extrabold text-slate-900 mb-6">{t('articles_title')}</h1>
              <p className="text-xl text-slate-500 leading-relaxed">
                {t('articles_desc')}
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <input 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('articles_search')} 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm mb-20 group"
          onClick={() => navigate('/articles/featured', { state: { articleId: 'featured' } })}
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative overflow-hidden">
              <img 
                src="https://picsum.photos/seed/featured/1200/800" 
                alt="Featured" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-8 right-8 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold">{t('articles_featured')}</div>
            </div>
            <div className="p-12 lg:p-20 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-6">
                <span className="text-primary">{t('articles_featuredCategory')}</span>
                <span>•</span>
                <span>{t('articles_featuredReadTime')}</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">
                فهم لغة الصمت: التواصل غير اللفظي عند الأطفال
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                كيف يمكن للمعالجين والأهل فك رموز الإيماءات وتعبيرات الوجه لفهم الحالة النفسية للطفل قبل أن ينطق بكلمة واحدة؟ استكشاف لأحدث الدراسات في لغة الجسد الطفولية.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://picsum.photos/seed/author/100/100" className="w-10 h-10 rounded-full" />
                  <span className="font-bold text-slate-900">د. سمير المنصور</span>
                </div>
                <button className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                  {t('articles_readMore')}
                  <ArrowLeft size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-between mb-12">
          <h3 className="text-3xl font-bold text-slate-900">{t('articles_latest')}</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {categoryKeys.map((key) => (
              <button 
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCategory === key ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
              >
                {categoryMap[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredArticles.length > 0 ? filteredArticles.map((article, i) => (
            <motion.div 
              key={article.articleId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-primary">
                  {categoryMap[article.category]}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 mb-4">
                  <div className="flex items-center gap-1"><Calendar size={12} /> {article.date}</div>
                  <div className="flex items-center gap-1"><User size={12} /> {article.author}</div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-8">
                  {article.desc}
                </p>
                <button onClick={() => navigate(`/articles/${article.articleId}`, { state: { articleId: article.articleId } })} className="text-primary font-bold text-sm flex items-center gap-2">
                  {t('articles_readArticle')}
                  <ChevronLeft size={16} />
                </button>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-3 text-center py-16">
              <Search size={40} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-400 font-bold">{t('articles_noArticlesFound')}</p>
            </div>
          )}
        </div>

        <div className="mt-20 text-center">
          <Link to="/articles" className="inline-block bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
            {t('articles_browseAll')}
          </Link>
        </div>
      </main>
    </div>
  );
}
