import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Activity, Users, FileText, ArrowLeft, CheckCircle2, MessageSquare } from 'lucide-react';
import { useLang } from '../lib/i18n';

export default function LandingPage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Activity size={24} />
              </div>
              <span className="text-2xl font-bold text-primary tracking-tight">{t('appName')}</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
              <Link to="/" className="text-primary">{t('nav_home')}</Link>
              <Link to="/about" className="hover:text-primary transition-colors">{t('nav_about')}</Link>
              <Link to="/articles" className="hover:text-primary transition-colors">{t('nav_articles')}</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">{t('nav_contact')}</Link>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-600 font-medium hover:text-primary transition-colors">{t('nav_login')}</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary font-bold text-sm mb-6 border border-primary/10">
                <Heart size={16} fill="currentColor" />
                <span>{t('landing_futureCare')}</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.2] mb-6">
                {t('landing_heroTitle1')}<span className="text-primary">{t('landing_heroTitle2')}</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
                {t('landing_heroDesc')}
              </p>

            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://picsum.photos/seed/child-care/800/600" 
                  alt="Child Psychological Support" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 right-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-slate-500">{t('landing_currentAnalysis')}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">{t('landing_stableInterested')}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-3/4" />
                  </div>
                  <div className="mt-4 flex justify-between text-xs font-bold text-slate-400">
                    <span>{t('landing_positiveResponse')}</span>
                    <span>75%</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full -z-10" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-[3rem] rotate-12 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('landing_featuresTitle')}</h2>
            <p className="text-lg text-slate-600">{t('landing_featuresDesc')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('landing_feature1Title'),
                desc: t('landing_feature1Desc'),
                icon: <Activity className="text-white" />,
                color: "bg-primary"
              },
              {
                title: t('landing_feature2Title'),
                desc: t('landing_feature2Desc'),
                icon: <Activity className="text-white" />,
                color: "bg-slate-900"
              },
              {
                title: t('landing_feature3Title'),
                desc: t('landing_feature3Desc'),
                icon: <FileText className="text-white" />,
                color: "bg-amber-700"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: t('landing_stat1'), value: "95%" },
              { label: t('landing_stat2'), value: "12k+" },
              { label: t('landing_stat3'), value: "24/7" },
              { label: t('landing_stat4'), value: "+50" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl lg:text-5xl font-extrabold mb-2">{stat.value}</div>
                <div className="text-primary-light/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full" />
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 relative z-10">
              {t('landing_ctaTitle')}
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto relative z-10">
              {t('landing_ctaDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <button className="bg-primary text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all">
                {t('landing_ctaExpert')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <Activity size={18} />
                </div>
                <span className="text-xl font-bold text-primary">{t('appName')}</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                {t('landing_footerDesc')}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">{t('landing_quickLinks')}</h4>
              <ul className="space-y-4 text-slate-500">
                <li><Link to="/about" className="hover:text-primary">{t('nav_about')}</Link></li>
                <li><Link to="/articles" className="hover:text-primary">{t('landing_coreArticles')}</Link></li>
                <li><Link to="/contact" className="hover:text-primary">{t('landing_successStories')}</Link></li>
                <li><Link to="/pricing" className="hover:text-primary">{t('landing_pricing')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">{t('landing_supportHelp')}</h4>
              <ul className="space-y-4 text-slate-500">
                <li><Link to="/help" className="hover:text-primary">{t('landing_helpCenter')}</Link></li>
                <li><Link to="/privacy" className="hover:text-primary">{t('landing_privacyPolicy')}</Link></li>
                <li><Link to="/terms" className="hover:text-primary">{t('landing_terms')}</Link></li>
                <li><Link to="/faq" className="hover:text-primary">{t('landing_safety')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">{t('landing_newsletter')}</h4>
              <p className="text-slate-500 mb-6">{t('landing_newsletterDesc')}</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder={t('landing_emailPlaceholder')} 
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button className="bg-primary text-white p-2 rounded-xl hover:bg-primary-dark transition-colors">
                  <ArrowLeft size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>{t('landing_copyright')}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary">Twitter</a>
              <a href="#" className="hover:text-primary">LinkedIn</a>
              <a href="#" className="hover:text-primary">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
