import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, Heart, Shield, Users, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLang } from '../lib/i18n';

export default function AboutPage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-white">
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
              <Link to="/about" className="text-primary">{t('nav_about')}</Link>
              <Link to="/articles" className="hover:text-primary transition-colors">{t('nav_articles')}</Link>
              <Link to="/login" className="hover:text-primary transition-colors">{t('nav_login')}</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                {t('about_title1')}<span className="text-primary underline decoration-primary/20 underline-offset-8">{t('about_title2')}</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-10">
                {t('about_desc')}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">+50k</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{t('about_evaluatedChildren')}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{t('about_techSupport')}</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <img 
                src="https://picsum.photos/seed/about-child/800/800" 
                alt="About Nabd" 
                className="rounded-[3rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 max-w-xs">
                <p className="text-slate-600 font-medium italic">
                  {t('about_quote')}
                </p>
                <div className="mt-4 font-bold text-primary">{t('about_quoteAuthor')}</div>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-32">
            <div className="bg-primary text-white p-12 rounded-[3rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
              <h3 className="text-3xl font-bold mb-6">{t('about_mission')}</h3>
              <p className="text-lg text-primary-light/90 leading-relaxed">
                {t('about_missionText')}
              </p>
            </div>
            <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">{t('about_vision')}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('about_visionText')}
              </p>
            </div>
          </div>

          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('about_methodology')}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('about_methodologyDesc')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t('about_method1Title'), desc: t('about_method1Desc'), icon: <Activity /> },
              { title: t('about_method2Title'), desc: t('about_method2Desc'), icon: <Heart /> },
              { title: t('about_method3Title'), desc: t('about_method3Desc'), icon: <Shield /> }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-primary-light text-primary rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
