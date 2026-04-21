import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, Mail, Phone, MapPin, Send, MessageSquare, Clock, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { useLang } from '../lib/i18n';

export default function ContactPage() {
  const { t } = useLang();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

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
              <Link to="/contact" className="text-primary">{t('nav_contact')}</Link>
            </div>
            <Link to="/login" className="text-slate-600 font-medium hover:text-primary transition-colors">{t('nav_login')}</Link>
          </div>
        </div>
      </nav>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/10">
              <MessageSquare size={16} />
              <span>{t('contact_heroBadge')}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">{t('contact_title')}</h1>
            <p className="text-lg text-slate-500 leading-relaxed">{t('contact_desc')}</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              { icon: <Mail className="text-primary" size={24} />, title: t('contact_emailTitle'), value: 'support@nabd.ai', desc: t('contact_emailDesc') },
              { icon: <Phone className="text-primary" size={24} />, title: t('contact_phoneTitle'), value: '+966 50 123 4567', desc: t('contact_phoneDesc') },
              { icon: <MapPin className="text-primary" size={24} />, title: t('contact_locationTitle'), value: t('contact_locationValue'), desc: t('contact_locationDesc') },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-primary font-bold mb-1">{item.value}</p>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('contact_formTitle')}</h2>
              <p className="text-slate-400 text-sm mb-8">{t('contact_formDesc')}</p>

              {submitted && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
                  <Send size={18} className="text-green-500" />
                  <p className="text-green-700 font-bold text-sm">{t('contact_successMessage')}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">{t('contact_nameLabel')}</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder={t('contact_namePlaceholder')} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">{t('contact_emailFormLabel')}</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="example@email.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">{t('contact_phoneFormLabel')}</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} placeholder="0501234567" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">{t('contact_subjectLabel')}</label>
                    <input type="text" value={formData.subject} onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))} placeholder={t('contact_subjectPlaceholder')} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">{t('contact_messageLabel')}</label>
                  <textarea required value={formData.message} onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))} rows={5} placeholder={t('contact_messagePlaceholder')} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                </div>
                <button type="submit" disabled={!formData.name.trim() || !formData.email.trim() || !formData.message.trim()} className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send size={20} />
                  {t('contact_sendButton')}
                </button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="bg-primary rounded-[2.5rem] p-10 text-white">
                <h3 className="text-2xl font-bold mb-4">{t('contact_workingHours')}</h3>
                <div className="space-y-4">
                  {[
                    { day: t('contact_sunThu'), time: t('contact_sunThuTime') },
                    { day: t('contact_friday'), time: t('contact_fridayTime') },
                    { day: t('contact_saturday'), time: t('contact_saturdayTime') },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/20 last:border-0">
                      <span className="font-bold">{item.day}</span>
                      <span className="text-white/80 flex items-center gap-2"><Clock size={14} />{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-[2.5rem] p-10">
                <h3 className="text-xl font-bold text-slate-900 mb-6">{t('contact_faqTitle')}</h3>
                <div className="space-y-4">
                  {[
                    { q: t('contact_faq1Q'), a: t('contact_faq1A') },
                    { q: t('contact_faq2Q'), a: t('contact_faq2A') },
                    { q: t('contact_faq3Q'), a: t('contact_faq3A') },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700 text-sm">{item.q}</span>
                        <ChevronRight size={16} className="text-primary" />
                      </div>
                      <p className="text-xs text-slate-400 mt-2">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-50 pt-12 pb-8 border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>{t('landing_copyright')}</p>
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
