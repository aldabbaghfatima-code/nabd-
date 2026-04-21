import DashboardLayout from '../components/layout/DashboardLayout';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Lock, 
  Shield,
  Settings as SettingsIcon
} from 'lucide-react';
import { useState } from 'react';
import { useLang } from '../lib/i18n';

export default function Settings() {
  const { lang, setLang, darkMode, setDarkMode, t } = useLang();
  const [notifications, setNotifications] = useState(true);

  return (
    <DashboardLayout title={t('settings_title')}>
      <p className="text-slate-500 text-sm mb-8 max-w-2xl">
        {t('settings_desc')}
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary-light text-primary rounded-xl flex items-center justify-center">
                <SettingsIcon size={20} />
              </div>
              <h3 className="font-bold text-slate-900">{t('settings_appPrefs')}</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-700">{t('settings_langLabel')}</div>
                  <div className="text-[10px] text-slate-400 font-bold">{lang === 'ar' ? t('settings_langDesc') : t('settings_langDescEn')}</div>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${lang === 'en' ? 'bg-primary text-white shadow-sm' : ''}`}
                  >EN</button>
                  <button 
                    onClick={() => setLang('ar')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${lang === 'ar' ? 'bg-primary text-white shadow-sm' : ''}`}
                  >AR</button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-700">{t('settings_darkLabel')}</div>
                  <div className="text-[10px] text-slate-400 font-bold">{t('settings_darkDesc')}</div>
                </div>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? 'bg-primary' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${darkMode ? 'right-7' : 'right-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-700">{t('settings_notifLabel')}</div>
                  <div className="text-[10px] text-slate-400 font-bold">{t('settings_notifDesc')}</div>
                </div>
                <button 
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-all relative ${notifications ? 'bg-primary' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications ? 'right-7' : 'right-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary-light text-primary rounded-xl flex items-center justify-center">
                <User size={20} />
              </div>
              <h3 className="font-bold text-slate-900">{t('settings_profileSettings')}</h3>
            </div>

            <form className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">{t('settings_fullName')}</label>
                <div className="relative">
                  <input 
                    type="text" 
                    defaultValue={t('settings_doctorName')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:border-primary"
                  />
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">{t('settings_emailLabel')}</label>
                <div className="relative">
                  <input 
                    type="email" 
                    defaultValue={t('settings_doctorEmail')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:border-primary"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="button" className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                  {t('settings_save')}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary-light text-primary rounded-xl flex items-center justify-center">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-slate-900">{t('settings_security')}</h3>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {t('settings_securityDesc')}
                </p>
                <button className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center gap-2">
                  <Lock size={18} />
                  {t('settings_enable2fa')}
                </button>
              </div>
              <div className="w-full md:w-48 aspect-square bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center text-slate-300">
                <Shield size={64} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
