import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Mail, Lock, Eye, EyeOff, ArrowLeft, ShieldCheck, User, Building2, Phone } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { t } = useLang();
  const { login, register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '', organization: '' });
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'بيانات الاعتماد غير صحيحة');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password || formData.password !== formData.confirmPassword) return;
    setIsLoading(true);
    setError('');
    try {
      await register(formData.name, formData.email, formData.password, formData.confirmPassword);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء التسجيل');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '', phone: '', organization: '' });
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <Link to="/" className="flex items-center gap-2 mb-10">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Activity size={24} />
              </div>
              <span className="text-2xl font-bold text-primary tracking-tight">{t('appName')}</span>
            </Link>
            <AnimatePresence mode="wait">
              {isRegister ? (
                <motion.div key="register-header" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('login_createAccountTitle')}</h1>
                  <p className="text-slate-500">{t('login_createAccountDesc')}</p>
                </motion.div>
              ) : (
                <motion.div key="login-header" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('login_welcome')}</h1>
                  <p className="text-slate-500">{t('login_subtitle')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-bold">{error}</div>
          )}

          <AnimatePresence mode="wait">
            {isRegister ? (
              <motion.form key="register-form" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('login_fullNameLabel')}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={t('login_fullNamePlaceholder')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('login_email')}</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="example@clinic.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('login_phoneLabel')}</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder={t('login_phonePlaceholder')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('login_organizationLabel')}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formData.organization}
                      onChange={e => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                      placeholder={t('login_organizationPlaceholder')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('login_password')}</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={formData.password}
                      onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('login_confirmPassword')}</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={formData.confirmPassword}
                      onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="••••••••"
                      className={`w-full bg-slate-50 border rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${formData.confirmPassword && formData.confirmPassword !== formData.password ? 'border-red-300 focus:ring-red-20 focus:border-red-400' : 'border-slate-200'}`}
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  </div>
                  {formData.confirmPassword && formData.confirmPassword !== formData.password && (
                    <p className="text-red-500 text-xs font-bold mt-2">{t('login_passwordMismatch')}</p>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={isLoading || formData.password !== formData.confirmPassword || !formData.name.trim() || !formData.email.trim()}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> : <><ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />{t('login_createButton')}</>}
                </button>
              </motion.form>
            ) : (
              <motion.form key="login-form" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('login_email')}</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      required
                      placeholder="example@clinic.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-slate-700">{t('login_password')}</label>
                    <a href="#" className="text-sm font-bold text-primary hover:underline">{t('login_forgotPassword')}</a>
                  </div>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg border-slate-300 text-primary focus:ring-primary" />
                  <label htmlFor="remember" className="text-sm text-slate-600 font-medium cursor-pointer">{t('login_remember')}</label>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> : <><ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />{t('login_button')}</>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            {isRegister ? (
              <>
                <p className="text-slate-500 mb-4">{t('login_alreadyHaveAccount')}</p>
                <button 
                  onClick={() => { setIsRegister(false); resetForm(); }}
                  className="w-full bg-slate-100 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  {t('login_button')}
                </button>
              </>
            ) : (
              <>
                <p className="text-slate-500 mb-4">{t('login_noAccountYet')}</p>
                <button 
                  onClick={() => { setIsRegister(true); resetForm(); }}
                  className="w-full bg-slate-100 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  {t('login_createNewAccount')}
                </button>
              </>
            )}
          </div>

          <div className="mt-8 flex justify-center gap-6 text-xs font-bold text-slate-400">
            <a href="#" className="hover:text-primary">{t('login_privacy')}</a>
            <a href="#" className="hover:text-primary">{t('login_terms')}</a>
            <a href="#" className="hover:text-primary">{t('login_support')}</a>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative overflow-hidden bg-slate-900">
        <img 
          src="https://picsum.photos/seed/psychology/1200/1600" 
          alt="Psychology Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-slate-900/80" />
        
        <div className="absolute bottom-12 right-12 left-12 bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
              <Activity size={28} />
            </div>
            <span className="text-2xl font-bold text-white">{t('appName')}</span>
          </div>
          <p className="text-2xl font-medium text-white leading-relaxed mb-8">
            {t('login_quote')}
          </p>
          <div className="flex items-center gap-2 text-primary-light font-bold">
            <ShieldCheck size={20} />
            <span>{t('login_secure')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
