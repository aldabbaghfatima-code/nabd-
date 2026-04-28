import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Video, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  HelpCircle,
  User,
  X,
  ChevronLeft,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLang } from '../../lib/i18n';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const searchItems = [
  { label: 'فهد خالد العمري', type: 'child', path: '/dashboard/profiles', icon: <User size={16} /> },
  { label: 'سارة جاسم التميمي', type: 'child', path: '/dashboard/profiles', icon: <User size={16} /> },
  { label: 'يوسف علي المنصور', type: 'child', path: '/dashboard/profiles', icon: <User size={16} /> },
  { label: 'ريان عمر السقاف', type: 'child', path: '/dashboard/profiles', icon: <User size={16} /> },
  { label: 'ياسين عمر', type: 'child', path: '/dashboard/profiles', icon: <User size={16} /> },
  { label: 'نور الهدى', type: 'child', path: '/dashboard/profiles', icon: <User size={16} /> },
  { label: 'ريان خالد', type: 'child', path: '/dashboard/profiles', icon: <User size={16} /> },
  { label: 'أمير زايد', type: 'child', path: '/dashboard/profiles', icon: <User size={16} /> },
  { label: 'ليث منصور', type: 'child', path: '/dashboard/profiles', icon: <User size={16} /> },
  { label: 'صوفيا أحمد', type: 'child', path: '/dashboard/profiles', icon: <User size={16} /> },
  { label: 'لوحة التحكم', type: 'page', path: '/dashboard', icon: <LayoutDashboard size={16} /> },
  { label: 'التحليل اللحظي', type: 'page', path: '/dashboard/real-time', icon: <Activity size={16} /> },
  { label: 'تحليل الفيديو', type: 'page', path: '/dashboard/video-analysis', icon: <Video size={16} /> },
  { label: 'التقارير', type: 'page', path: '/dashboard/reports', icon: <FileText size={16} /> },
  { label: 'ملفات الأطفال', type: 'page', path: '/dashboard/profiles', icon: <Users size={16} /> },
  { label: 'الإعدادات', type: 'page', path: '/dashboard/settings', icon: <Settings size={16} /> },
];

const notifications = [
  { id: 1, title: 'تنبيه حرج', desc: 'يوسف علي - نوبة قلق مُكتشفة', time: 'منذ 5 دقائق', type: 'critical' as const, icon: <AlertTriangle size={16} /> },
  { id: 2, title: 'جلسة مكتملة', desc: 'تم إنهاء تحليل فيديو سارة التميمي', time: 'منذ 30 دقيقة', type: 'success' as const, icon: <FileText size={16} /> },
  { id: 3, title: 'تقرير جديد', desc: 'تقرير تقييم أمير زايد جاهز للمراجعة', time: 'منذ ساعة', type: 'info' as const, icon: <FileText size={16} /> },
];

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLang();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filteredResults = searchQuery.trim()
    ? searchItems.filter(item => item.label.includes(searchQuery.trim()))
    : [];

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: t('sidebar_dashboard'), path: '/dashboard' },
    { icon: <Activity size={20} />, label: t('sidebar_realtime'), path: '/dashboard/real-time' },
    { icon: <Video size={20} />, label: t('sidebar_video'), path: '/dashboard/video-analysis' },
    { icon: <FileText size={20} />, label: t('sidebar_reports'), path: '/dashboard/reports' },
    { icon: <Users size={20} />, label: t('sidebar_profiles'), path: '/dashboard/profiles' },
    { icon: <Settings size={20} />, label: t('sidebar_settings'), path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <aside className="w-72 bg-white border-l border-slate-200 flex flex-col sticky top-0 h-screen z-40">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Activity size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary leading-none">{t('appName')}</span>
              <span className="text-[10px] text-slate-400 font-bold mt-1">{t('appSubtitle')}</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all group",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                )}
              >
                <span className={cn(isActive ? "text-white" : "text-slate-400 group-hover:text-primary")}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all w-full"
          >
            <LogOut size={20} />
            {t('sidebar_logout')}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1 max-w-xl relative" ref={searchRef}>
            <div className="relative w-full">
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setShowSearch(true); }}
                onFocus={() => setShowSearch(true)}
                placeholder={t('header_search')} 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-10 pl-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); setShowSearch(false); }} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              )}
            </div>

            {showSearch && searchQuery.trim() && (
              <div className="absolute top-full mt-2 right-0 left-0 bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden z-50">
                {filteredResults.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto">
                    {(() => {
                      const children = filteredResults.filter(r => r.type === 'child');
                      const pages = filteredResults.filter(r => r.type === 'page');
                      return (
                        <>
                          {children.length > 0 && (
                            <div>
                              <div className="px-4 py-2 text-[10px] font-bold text-slate-400 bg-slate-50 flex items-center gap-2">
                                <Users size={12} />
                                ملفات الأطفال ({children.length})
                              </div>
                              {children.map((item, i) => (
                                <button
                                  key={`child-${i}`}
                                  onClick={() => { navigate(item.path, { state: { openChildName: item.label } }); setShowSearch(false); setSearchQuery(''); }}
                                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-right"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                    {item.label[0]}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-slate-700 truncate">{item.label}</div>
                                    <div className="text-[10px] text-slate-400">ملف طفل</div>
                                  </div>
                                  <ChevronLeft size={14} className="text-slate-300" />
                                </button>
                              ))}
                            </div>
                          )}
                          {pages.length > 0 && (
                            <div>
                              <div className="px-4 py-2 text-[10px] font-bold text-slate-400 bg-slate-50 flex items-center gap-2">
                                <LayoutDashboard size={12} />
                                الصفحات ({pages.length})
                              </div>
                              {pages.map((item, i) => (
                                <button
                                  key={`page-${i}`}
                                  onClick={() => { navigate(item.path); setShowSearch(false); setSearchQuery(''); }}
                                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-right"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0">
                                    {item.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-slate-700">{item.label}</div>
                                    <div className="text-[10px] text-slate-400">صفحة</div>
                                  </div>
                                  <ChevronLeft size={14} className="text-slate-300" />
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <Search size={24} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-sm text-slate-400 font-bold">لا توجد نتائج لـ "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
                className={cn("transition-colors relative", showNotifications ? "text-primary" : "text-slate-400 hover:text-primary")}
              >
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full text-[10px] text-white flex items-center justify-center font-bold">3</span>
              </button>

              {showNotifications && (
                <div className="absolute top-full mt-3 left-0 w-80 bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">الإشعارات</span>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">3 جديد</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map(notif => (
                      <button
                        key={notif.id}
                        onClick={() => setShowNotifications(false)}
                        className="w-full flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors text-right border-b border-slate-50 last:border-0"
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                          notif.type === 'critical' ? 'bg-red-100 text-red-500' : notif.type === 'success' ? 'bg-green-100 text-green-500' : 'bg-blue-100 text-blue-500'
                        )}>
                          {notif.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-800">{notif.title}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{notif.desc}</div>
                          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                            <Clock size={10} />
                            {notif.time}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-slate-100">
                    <button onClick={() => { navigate('/dashboard/reports'); setShowNotifications(false); }} className="w-full text-center text-xs font-bold text-primary hover:underline">
                      عرض جميع الإشعارات
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="text-slate-400 hover:text-primary transition-colors">
              <HelpCircle size={22} />
            </button>
            <div className="h-8 w-[1px] bg-slate-200" />
            
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
                className="flex items-center gap-3 hover:bg-slate-50 rounded-xl px-2 py-1.5 transition-colors"
              >
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900">{user?.name || t('header_doctorName')}</div>
                  <div className="text-[10px] text-slate-400 font-bold text-right">{user?.organization || t('header_doctorRole')}</div>
                </div>
                <img 
                  src={user?.avatar || "https://picsum.photos/seed/doctor/100/100"} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-xl object-cover border-2 border-primary/10"
                  referrerPolicy="no-referrer"
                />
              </button>

              {showProfile && (
                <div className="absolute top-full mt-3 left-0 w-56 bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-100">
                    <div className="text-sm font-bold text-slate-900">{user?.name || t('header_doctorName')}</div>
                    <div className="text-[11px] text-slate-400">{user?.organization || t('header_doctorRole')}</div>
                    <div className="text-[11px] text-primary mt-1">{user?.email || 'dr.sara@nabd.com'}</div>
                  </div>
                  <div>
                    <button
                      onClick={() => { navigate('/dashboard/settings'); setShowProfile(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-right text-sm font-bold text-slate-600"
                    >
                      <Settings size={16} className="text-slate-400" />
                      الإعدادات
                    </button>
                    <button
                      onClick={() => { handleLogout(); setShowProfile(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-right text-sm font-bold text-red-500"
                    >
                      <LogOut size={16} />
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
