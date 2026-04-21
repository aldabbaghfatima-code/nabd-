import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, Check, ArrowLeft } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { useState } from 'react';

const plans = {
  ar: [
    {
      name: 'أساسي',
      price: '0',
      period: 'مجاناً',
      desc: 'للمعالجين المستقلين والتجربة الأولية',
      features: ['5 تقييمات شهرياً', 'تحليل فيديو أساسي', 'تقارير بسيطة', 'دعم بالبريد الإلكتروني'],
      popular: false,
    },
    {
      name: 'احترافي',
      price: '299',
      period: 'ل.س / شهرياً',
      desc: 'للعيادات والمؤسسات الصغيرة',
      features: ['تقييمات غير محدودة', 'تحليل لحظي + فيديو', 'تقارير متقدمة مع PDF', 'إدارة ملفات الأطفال', 'دعم فني على مدار الساعة', 'لوحة تحكم متعددة المستخدمين'],
      popular: true,
    },
    {
      name: 'مؤسسي',
      price: '799',
      period: 'ل.س / شهرياً',
      desc: 'للمستشفيات والمنظمات الكبيرة',
      features: ['كل مميزات الاحترافي', 'واجهة برمجة تطبيقات (API)', 'تقارير تحليلية متقدمة', 'تدريب وتأهيل الفريق', 'مدير حساب مخصص', 'تخصيص كامل للنظام', 'أولوية في الدعم الفني'],
      popular: false,
    },
  ],
  en: [
    {
      name: 'Basic',
      price: '0',
      period: 'Free',
      desc: 'For independent therapists and initial trial',
      features: ['5 assessments per month', 'Basic video analysis', 'Simple reports', 'Email support'],
      popular: false,
    },
    {
      name: 'Professional',
      price: '299',
      period: 'SYP / monthly',
      desc: 'For clinics and small organizations',
      features: ['Unlimited assessments', 'Real-time + Video analysis', 'Advanced reports with PDF', 'Child profile management', '24/7 technical support', 'Multi-user dashboard'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '799',
      period: 'SYP / monthly',
      desc: 'For hospitals and large organizations',
      features: ['All Professional features', 'API access', 'Advanced analytics reports', 'Team training & onboarding', 'Dedicated account manager', 'Full system customization', 'Priority support'],
      popular: false,
    },
  ],
};

export default function PricingPage() {
  const { lang, t } = useLang();
  const [annual, setAnnual] = useState(false);
  const planData = plans[lang] || plans.ar;

  return (
    <div className="min-h-screen flex flex-col">
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
              <Link to="/articles" className="hover:text-primary transition-colors">{t('nav_articles')}</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">{t('nav_contact')}</Link>
            </div>
            <Link to="/login" className="text-slate-600 font-medium hover:text-primary transition-colors">{t('nav_login')}</Link>
          </div>
        </div>
      </nav>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
              {lang === 'ar' ? 'خطط تسعير تناسب احتياجاتك' : 'Pricing plans that fit your needs'}
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              {lang === 'ar' ? 'اختر الخطة المناسبة لك وابدأ رحلة التقييم النفسي الذكي' : 'Choose the right plan for you and start your smart psychological assessment journey'}
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-bold ${!annual ? 'text-slate-900' : 'text-slate-400'}`}>
                {lang === 'ar' ? 'شهري' : 'Monthly'}
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`w-14 h-7 rounded-full transition-all relative ${annual ? 'bg-primary' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${annual ? 'right-8' : 'right-1'}`} />
              </button>
              <span className={`text-sm font-bold ${annual ? 'text-slate-900' : 'text-slate-400'}`}>
                {lang === 'ar' ? 'سنوي' : 'Annual'}
                <span className="text-primary text-xs mr-1">(-20%)</span>
              </span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {planData.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`relative rounded-[2.5rem] p-8 ${plan.popular ? 'bg-primary text-white shadow-2xl shadow-primary/30 scale-105' : 'bg-white border border-slate-100 shadow-sm'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-primary px-5 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    {lang === 'ar' ? 'الأكثر طلباً' : 'Most Popular'}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                  <p className={`text-sm ${plan.popular ? 'text-white/70' : 'text-slate-400'}`}>{plan.desc}</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold">{annual ? Math.round(Number(plan.price) * 0.8) : plan.price}</span>
                  <span className={`text-sm font-bold ${plan.popular ? 'text-white/70' : 'text-slate-400'}`}> {plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-white/20' : 'bg-primary/10'}`}>
                        <Check size={12} className={plan.popular ? 'text-white' : 'text-primary'} />
                      </div>
                      <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-slate-600'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/login"
                  className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${plan.popular ? 'bg-white text-primary hover:bg-slate-100' : 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20'}`}
                >
                  {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                  <ArrowLeft size={16} />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-slate-400 text-sm mb-4">
              {lang === 'ar' ? 'هل تحتاج خطة مخصصة؟' : 'Need a custom plan?'}
            </p>
            <Link to="/contact" className="text-primary font-bold hover:underline">
              {lang === 'ar' ? 'تواصل معنا' : 'Contact us'} →
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-slate-50 pt-12 pb-8 border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>© 2026 {t('appName')}. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
            <div className="flex gap-6">
              <Link to="/about" className="hover:text-primary">{t('nav_about')}</Link>
              <Link to="/articles" className="hover:text-primary">{t('nav_articles')}</Link>
              <Link to="/contact" className="hover:text-primary">{t('nav_contact')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
