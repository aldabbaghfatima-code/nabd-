import DashboardLayout from '../components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLang } from '../lib/i18n';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  CheckCircle2, 
  Clock,
  ChevronRight,
  ChevronLeft,
  X,
  User,
  Phone,
  Mail,
  FileText,
  Activity,
  Heart,
  AlertTriangle,
  ArrowRight,
  Trash2,
  Video,
  Camera,
  Download,
  Printer,
  Share2,
  Smile,
  Frown,
  Meh,
  Brain,
  Target,
  Mic
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts';

interface ChildProfile {
  id: number;
  name: string;
  age: string;
  ageNumber: number;
  gender: string;
  status: string;
  lastUpdate: string;
  tag: string;
  image: string;
  phone: string;
  email: string;
  guardian: string;
  guardianPhone: string;
  notes: string;
  sessions: number;
  completedSessions: number;
  startDate: string;
  severity: string;
}

const profileStatusKeyMap: Record<string, string> = {
  'قيد التقييم': 'profiles_underEvaluation',
  'تقييم مكتمل': 'profiles_evalComplete',
};

const profileSeverityKeyMap: Record<string, string> = {
  'خفيف': 'profiles_mild',
  'متوسط': 'profiles_moderate',
  'شديد': 'profiles_severe',
};

const profileGenderKeyMap: Record<string, string> = {
  'ذكر': 'profiles_male',
  'أنثى': 'profiles_female',
};

const profileNoteTypeKeyMap: Record<string, string> = {
  'استجابة بصرية': 'profiles_note_visualResponse',
  'سلوك تكراري': 'profiles_note_repetitive',
  'تفاعل اجتماعي': 'profiles_note_social',
};

const initialProfiles: ChildProfile[] = [
  { id: 1, name: 'فهد خالد العمري', age: '5 سنوات', ageNumber: 5, gender: 'ذكر', status: 'قيد التقييم', lastUpdate: '15 يونيو 2024', tag: 'فرط حركة', image: 'https://picsum.photos/seed/child1/200/200', phone: '0501234567', email: 'father@email.com', guardian: 'خالد العمري', guardianPhone: '0501234567', notes: 'يُظهر الطفل علامات فرط الحركة وصعوبة التركيز. يُنصح بجلسات علاج معرفي سلوكي.', sessions: 8, completedSessions: 5, startDate: '10 يناير 2024', severity: 'متوسط' },
  { id: 2, name: 'سارة جاسم التميمي', age: '4 سنوات', ageNumber: 4, gender: 'أنثى', status: 'تقييم مكتمل', lastUpdate: '01 فبراير 2024', tag: 'تأخر نطق', image: 'https://picsum.photos/seed/child2/200/200', phone: '0507654321', email: 'mother@email.com', guardian: 'فاطمة التميمي', guardianPhone: '0507654321', notes: 'تأخر في النطق بمقدار سنة عن المتوقع. تم تحسن ملحوظ بعد الجلسات الأخيرة.', sessions: 12, completedSessions: 12, startDate: '15 سبتمبر 2023', severity: 'خفيف' },
  { id: 3, name: 'يوسف علي المنصور', age: '6 سنوات', ageNumber: 6, gender: 'ذكر', status: 'قيد التقييم', lastUpdate: '12 مايو 2024', tag: 'توحد - مستوى 1', image: 'https://picsum.photos/seed/child3/200/200', phone: '0509876543', email: 'parents@email.com', guardian: 'علي المنصور', guardianPhone: '0509876543', notes: 'تشخيص مبدئي بطيف التوحد مستوى 1. يحتاج متابعة دورية وجلسات تأهيل.', sessions: 15, completedSessions: 9, startDate: '01 نوفمبر 2023', severity: 'متوسط' },
  { id: 4, name: 'ريان عمر السقاف', age: '8 سنوات', ageNumber: 8, gender: 'ذكر', status: 'تقييم مكتمل', lastUpdate: '20 مارس 2024', tag: 'صعوبات تعلم', image: 'https://picsum.photos/seed/child4/200/200', phone: '0501112233', email: 'family@email.com', guardian: 'عمر السقاف', guardianPhone: '0501112233', notes: 'صعوبات في القراءة والكتابة. تم إعداد خطة تعليمية فردية.', sessions: 10, completedSessions: 10, startDate: '05 أكتوبر 2023', severity: 'خفيف' },
];

export default function ChildProfiles() {
  const { t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [profiles, setProfiles] = useState<ChildProfile[]>(initialProfiles);
  const [selectedProfile, setSelectedProfile] = useState<ChildProfile | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSessionOptions, setShowSessionOptions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('الكل');
  const [filterSeverity, setFilterSeverity] = useState<string>('الكل');
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setShowFilter(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'ذكر',
    tag: '',
    guardian: '',
    guardianPhone: '',
    email: '',
    notes: '',
    severity: 'خفيف',
  });

  useEffect(() => {
    const state = location.state as { openChildName?: string } | null;
    if (state?.openChildName) {
      const child = profiles.find(p => p.name === state.openChildName);
      if (child) setSelectedProfile(child);
      window.history.replaceState({}, '');
    }
  }, [location.state, profiles]);

  const handleAddChild = () => {
    if (!formData.name.trim() || !formData.age.trim() || !formData.guardian.trim()) return;

    const newChild: ChildProfile = {
      id: Date.now(),
      name: formData.name,
      age: `${formData.age} ${t('profiles_yearsOld')}`,
      ageNumber: parseInt(formData.age) || 0,
      gender: formData.gender,
      status: 'قيد التقييم',
      lastUpdate: new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }),
      tag: formData.tag || t('profiles_undetermined'),
      image: `https://picsum.photos/seed/child${Date.now()}/200/200`,
      phone: formData.guardianPhone,
      email: formData.email,
      guardian: formData.guardian,
      guardianPhone: formData.guardianPhone,
      notes: formData.notes,
      sessions: 0,
      completedSessions: 0,
      startDate: new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }),
      severity: formData.severity,
    };

    setProfiles(prev => [newChild, ...prev]);
    setShowAddModal(false);
    setFormData({ name: '', age: '', gender: 'ذكر', tag: '', guardian: '', guardianPhone: '', email: '', notes: '', severity: 'خفيف' });
  };

  const handleDeleteChild = (id: number) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
    setDeleteConfirmId(null);
    setSelectedProfile(null);
  };

  const closeViewModal = () => {
    setSelectedProfile(null);
    setDeleteConfirmId(null);
    setShowSessionOptions(false);
    setShowReportModal(false);
  };

  const filteredProfiles = profiles.filter(p => {
    const matchStatus = filterStatus === 'الكل' || p.status === filterStatus;
    const matchSeverity = filterSeverity === 'الكل' || p.severity === filterSeverity;
    return matchStatus && matchSeverity;
  });

  const filterStatusOptions = ['الكل', 'قيد التقييم', 'تقييم مكتمل'];
  const filterSeverityOptions = ['الكل', 'خفيف', 'متوسط', 'شديد'];

  const getFilterStatusDisplay = (opt: string) => {
    if (opt === 'الكل') return t('reports_all');
    return t(profileStatusKeyMap[opt] || opt);
  };

  const getFilterSeverityDisplay = (opt: string) => {
    if (opt === 'الكل') return t('reports_all');
    return t(profileSeverityKeyMap[opt] || opt);
  };

  return (
    <DashboardLayout title={t('profiles_title')}>
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <p className="text-slate-500 text-sm max-w-md">
          {t('profiles_desc')}
        </p>
        <div className="flex gap-3 w-full md:w-auto relative" ref={filterRef}>
          <div className="relative">
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className={`flex-1 md:flex-none px-4 py-2.5 border rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${showFilter ? 'bg-primary text-white border-primary' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <Filter size={18} />
              {t('profiles_filter')}
            </button>
            {showFilter && (
              <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-2xl border border-slate-100 shadow-2xl z-50 p-4 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">{t('profiles_evalStatusLabel')}</label>
                  <div className="flex flex-wrap gap-2">
                    {filterStatusOptions.map(opt => (
                      <button key={opt} onClick={() => setFilterStatus(opt)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === opt ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>{getFilterStatusDisplay(opt)}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">{t('profiles_severityFilterLabel')}</label>
                  <div className="flex flex-wrap gap-2">
                    {filterSeverityOptions.map(opt => (
                      <button key={opt} onClick={() => setFilterSeverity(opt)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterSeverity === opt ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>{getFilterSeverityDisplay(opt)}</button>
                    ))}
                  </div>
                </div>
                {(filterStatus !== 'الكل' || filterSeverity !== 'الكل') && (
                  <button onClick={() => { setFilterStatus('الكل'); setFilterSeverity('الكل'); }} className="w-full py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all">{t('profiles_reset')}</button>
                )}
              </div>
            )}
          </div>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="flex-1 md:flex-none px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            {t('profiles_addNew')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: t('profiles_totalFiles'), value: profiles.length.toString().padStart(2, '0'), icon: <Users size={18} />, color: 'bg-blue-50 text-blue-600' },
          { label: t('profiles_underEval'), value: profiles.filter(p => p.status === 'قيد التقييم').length.toString().padStart(2, '0'), icon: <Clock size={18} />, color: 'bg-amber-50 text-amber-600' },
          { label: t('profiles_completedEvals'), value: profiles.filter(p => p.status === 'تقييم مكتمل').length.toString().padStart(2, '0'), icon: <CheckCircle2 size={18} />, color: 'bg-green-50 text-green-600' },
          { label: t('profiles_todaySessions'), value: '06', icon: <Calendar size={18} />, color: 'bg-primary-light text-primary' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }}
            className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400">{stat.label}</div>
              <div className="text-xl font-extrabold text-slate-900">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredProfiles.map((profile, i) => (
          <motion.div 
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <img 
                  src={profile.image} 
                  alt={profile.name} 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-50"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-bold text-slate-900">{profile.name}</h3>
                  <p className="text-xs text-slate-400 font-bold">{t('profiles_ageLabel')} {profile.age}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded-lg text-[10px] font-bold ${profile.status === 'تقييم مكتمل' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    • {t(profileStatusKeyMap[profile.status] || profile.status)}
                  </span>
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-600">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-[10px] text-slate-400 font-bold mb-1">{t('profiles_startDate')}</div>
                <div className="text-[10px] text-slate-700 font-bold">{profile.lastUpdate}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-[10px] text-slate-400 font-bold mb-1">{t('profiles_baseCondition')}</div>
                <div className="text-[10px] text-slate-700 font-bold">{profile.tag}</div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedProfile(profile)}
              className="w-full py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all"
            >
              {t('profiles_viewFull')}
            </button>
          </motion.div>
        ))}

        {filteredProfiles.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <Users size={40} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-400 font-bold">{t('profiles_noMatching')}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
        <p>{t('profiles_showing')} {profiles.length} {t('profiles_of')} {profiles.length} {t('profiles_file')}</p>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:text-primary"><ChevronRight size={20} /></button>
          <button className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">1</button>
          <button className="p-2 hover:text-primary"><ChevronLeft size={20} /></button>
        </div>
      </div>

      <AnimatePresence>
        {selectedProfile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeViewModal}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gradient-to-l from-primary to-teal-600 p-8 rounded-t-[2rem] relative">
                <button onClick={closeViewModal} className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all">
                  <X size={20} />
                </button>
                <div className="flex items-center gap-6">
                  <img 
                    src={selectedProfile.image} 
                    alt={selectedProfile.name}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white/30 shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-white">
                    <h2 className="text-2xl font-extrabold">{selectedProfile.name}</h2>
                    <div className="flex items-center gap-4 mt-2 text-white/80 text-sm font-medium">
                      <span>{selectedProfile.ageNumber} {t('profiles_yearsOld')}</span>
                      <span>•</span>
                      <span>{t(profileGenderKeyMap[selectedProfile.gender] || selectedProfile.gender)}</span>
                      <span>•</span>
                      <span>{selectedProfile.tag}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${selectedProfile.status === 'تقييم مكتمل' ? 'bg-green-500/20 text-green-100' : 'bg-amber-500/20 text-amber-100'}`}>
                        {t(profileStatusKeyMap[selectedProfile.status] || selectedProfile.status)}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold bg-white/20 text-white`}>
                        {t('profiles_severity')} {t(profileSeverityKeyMap[selectedProfile.severity] || selectedProfile.severity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-extrabold text-blue-600">{selectedProfile.sessions}</div>
                    <div className="text-xs text-blue-500 font-bold mt-1">{t('profiles_totalSessions')}</div>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-extrabold text-green-600">{selectedProfile.completedSessions}</div>
                    <div className="text-xs text-green-500 font-bold mt-1">{t('profiles_completedSessions')}</div>
                  </div>
                  <div className="bg-primary-light rounded-2xl p-4 text-center">
                    <div className="text-2xl font-extrabold text-primary">
                      {selectedProfile.sessions > 0 ? Math.round((selectedProfile.completedSessions / selectedProfile.sessions) * 100) : 0}%
                    </div>
                    <div className="text-xs text-primary font-bold mt-1">{t('profiles_progress')}</div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-slate-700">{t('profiles_evalProgress')}</span>
                    <span className="text-xs font-bold text-primary">
                      {selectedProfile.completedSessions} / {selectedProfile.sessions} {t('profiles_session')}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedProfile.sessions > 0 ? (selectedProfile.completedSessions / selectedProfile.sessions) * 100 : 0}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="bg-gradient-to-l from-primary to-teal-400 h-full rounded-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <User size={18} className="text-primary" />
                      {t('profiles_childData')}
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: t('profiles_fullName'), value: selectedProfile.name },
                        { label: t('profiles_age'), value: selectedProfile.age },
                        { label: t('profiles_gender'), value: t(profileGenderKeyMap[selectedProfile.gender] || selectedProfile.gender) },
                        { label: t('profiles_condition'), value: selectedProfile.tag },
                        { label: t('profiles_startTreatment'), value: selectedProfile.startDate },
                        { label: t('profiles_lastUpdate'), value: selectedProfile.lastUpdate },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                          <span className="text-xs text-slate-400 font-bold">{item.label}</span>
                          <span className="text-sm text-slate-700 font-bold">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <Phone size={18} className="text-primary" />
                      {t('profiles_guardianData')}
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: t('profiles_guardianName'), value: selectedProfile.guardian },
                        { label: t('profiles_phone'), value: selectedProfile.guardianPhone },
                        { label: t('profiles_emailLabel'), value: selectedProfile.email },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                          <span className="text-xs text-slate-400 font-bold">{item.label}</span>
                          <span className="text-sm text-slate-700 font-bold">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="font-bold text-slate-900 flex items-center gap-2 mt-4">
                      <AlertTriangle size={18} className="text-amber-500" />
                      {t('profiles_severityLevel')}
                    </h3>
                    <div className={`p-3 rounded-xl font-bold text-sm text-center ${
                      selectedProfile.severity === 'شديد' ? 'bg-red-50 text-red-600' :
                      selectedProfile.severity === 'متوسط' ? 'bg-amber-50 text-amber-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {t(profileSeverityKeyMap[selectedProfile.severity] || selectedProfile.severity)}
                    </div>
                  </div>
                </div>

                {selectedProfile.notes && (
                  <div className="bg-slate-50 rounded-2xl p-5">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <FileText size={18} className="text-primary" />
                      {t('profiles_clinicalNotes')}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedProfile.notes}</p>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowSessionOptions(!showSessionOptions)}
                      className="flex-1 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      <Activity size={18} />
                      {t('profiles_newSession')}
                    </button>
                    <button 
                      onClick={() => setShowReportModal(true)}
                      className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                      <FileText size={18} />
                      {t('profiles_viewReports')}
                    </button>
                    <button 
                      onClick={() => setDeleteConfirmId(selectedProfile.id)}
                      className="py-3 px-4 bg-white border border-red-200 text-red-500 rounded-2xl font-bold text-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {showSessionOptions && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                          <p className="text-xs font-bold text-slate-500 mb-2">{t('profiles_selectSessionType')}</p>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => {
                                closeViewModal();
                                navigate('/dashboard/real-time', { state: { child: selectedProfile } });
                              }}
                              className="flex flex-col items-center gap-3 p-5 bg-white border border-slate-200 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all group"
                            >
                              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <Camera size={24} />
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-slate-900 text-sm">{t('profiles_realtimeAnalysis')}</div>
                                <p className="text-[10px] text-slate-400 font-medium mt-1">{t('profiles_realtimeDesc')}</p>
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                closeViewModal();
                                navigate('/dashboard/video-analysis', { state: { child: selectedProfile } });
                              }}
                              className="flex flex-col items-center gap-3 p-5 bg-white border border-slate-200 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all group"
                            >
                              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <Video size={24} />
                              </div>
                              <div className="text-center">
                                <div className="font-bold text-slate-900 text-sm">{t('profiles_videoAnalysis')}</div>
                                <p className="text-[10px] text-slate-400 font-medium mt-1">{t('profiles_videoAnalysisDesc')}</p>
                              </div>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {deleteConfirmId === selectedProfile.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 border border-red-200 rounded-2xl p-5"
                    >
                      <p className="text-red-700 font-bold text-sm mb-3">{t('profiles_deleteConfirm')} {selectedProfile.name}{t('profiles_deleteConfirmEnd')}</p>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleDeleteChild(selectedProfile.id)}
                          className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-all"
                        >
                          {t('profiles_yesDelete')}
                        </button>
                        <button 
                          onClick={() => setDeleteConfirmId(null)}
                          className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all"
                        >
                          {t('profiles_cancel')}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReportModal && selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReportModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gradient-to-l from-primary to-teal-600 p-8 rounded-t-[2rem] relative">
                <button onClick={() => setShowReportModal(false)} className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all">
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                    <FileText size={28} className="text-white" />
                  </div>
                  <div className="text-white">
                    <h2 className="text-xl font-extrabold">{t('profiles_comprehensiveReport')} - {selectedProfile.name}</h2>
                    <div className="flex items-center gap-4 mt-2 text-white/80 text-sm font-medium flex-wrap">
                      <span className="flex items-center gap-1"><User size={14} /> {selectedProfile.ageNumber} {t('profiles_yearsOld')} - {t(profileGenderKeyMap[selectedProfile.gender] || selectedProfile.gender)}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} /> {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {t('profiles_lastUpdate')}: {selectedProfile.lastUpdate}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${selectedProfile.status === 'تقييم مكتمل' ? 'bg-green-500/20 text-green-100' : 'bg-amber-500/20 text-amber-100'}`}>{t(profileStatusKeyMap[selectedProfile.status] || selectedProfile.status)}</span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold bg-white/20 text-white`}>{t('profiles_severity')} {t(profileSeverityKeyMap[selectedProfile.severity] || selectedProfile.severity)}</span>
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-white/20 text-white">{selectedProfile.tag}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">

                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                    <FileText size={18} className="text-primary" />
                    {t('profiles_caseSummary')}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedProfile.notes}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-2xl p-4 text-center">
                    <Activity size={20} className="mx-auto text-blue-500 mb-2" />
                    <div className="text-lg font-extrabold text-blue-600">{selectedProfile.sessions}</div>
                    <div className="text-[10px] text-blue-500 font-bold">{t('profiles_totalSessions')}</div>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-4 text-center">
                    <CheckCircle2 size={20} className="mx-auto text-green-500 mb-2" />
                    <div className="text-lg font-extrabold text-green-600">{selectedProfile.completedSessions}</div>
                    <div className="text-[10px] text-green-500 font-bold">{t('profiles_completedSessions')}</div>
                  </div>
                  <div className="bg-primary-light rounded-2xl p-4 text-center">
                    <Target size={20} className="mx-auto text-primary mb-2" />
                    <div className="text-lg font-extrabold text-primary">
                      {selectedProfile.sessions > 0 ? Math.round((selectedProfile.completedSessions / selectedProfile.sessions) * 100) : 0}%
                    </div>
                    <div className="text-[10px] text-primary font-bold">{t('profiles_progress')}</div>
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-4 text-center">
                    <Smile size={20} className="mx-auto text-amber-500 mb-2" />
                    <div className="text-sm font-extrabold text-amber-600">
                      {selectedProfile.status === 'تقييم مكتمل' ? t('profiles_stable') : t('profiles_underFollowup')}
                    </div>
                    <div className="text-[10px] text-amber-500 font-bold">{t('profiles_emotionalStateLabel')}</div>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Activity size={18} className="text-primary" />
                    {t('profiles_assessmentProgressLabel')}
                  </h3>
                  <div className="space-y-5">
                    {[
                      { label: t('profiles_attentionEngagement'), value: 72, color: 'bg-primary' },
                      { label: t('profiles_vocalActivityLabel'), value: 45, color: 'bg-amber-500' },
                      { label: t('profiles_eyeContactLabel'), value: 68, color: 'bg-blue-500' },
                      { label: t('profiles_socialInteractionLabel'), value: 55, color: 'bg-green-500' },
                    ].map((indicator, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm font-bold mb-2">
                          <span className="text-slate-600">{indicator.label}</span>
                          <span className="text-slate-900">{indicator.value}%</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${indicator.value}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className={`h-full rounded-full ${indicator.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Mic size={18} className="text-primary" />
                    {t('profiles_lastSessionVoice')}
                  </h3>
                  <div className="flex gap-4 mb-4 text-[10px] font-bold">
                    <div className="flex items-center gap-1 text-green-500"><div className="w-2 h-2 bg-green-500 rounded-full" /> {t('profiles_calm')}</div>
                    <div className="flex items-center gap-1 text-red-500"><div className="w-2 h-2 bg-red-500 rounded-full" /> {t('profiles_tension')}</div>
                  </div>
                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { time: '0', value: 35 }, { time: '2', value: 48 }, { time: '4', value: 22 },
                        { time: '6', value: 67 }, { time: '8', value: 30 }, { time: '10', value: 55 },
                        { time: '12', value: 40 }, { time: '14', value: 72 },
                      ]}>
                        <defs>
                          <linearGradient id="childVoiceGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0d6e6e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#0d6e6e" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                        <YAxis hide />
                        <Area type="monotone" dataKey="value" stroke="#0d6e6e" strokeWidth={2} fillOpacity={1} fill="url(#childVoiceGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Brain size={18} className="text-primary" />
                    {t('profiles_clinicalNotesShort')}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { time: '14:05', type: 'استجابة بصرية', text: `تم رصد تواصل بصري مستدام من ${selectedProfile.name} لمدة 5 ثوانٍ عند تقديم المحفز البصري.`, status: 'positive' },
                      { time: '12:42', type: 'سلوك تكراري', text: 'بداية حركة تكرارية باليدين استمرت لمدة 10 ثوانٍ كاستجابة للتغيير في البيئة.', status: 'warning' },
                      { time: '10:30', type: 'تفاعل اجتماعي', text: `ابتسامة واستجابة إيجابية من ${selectedProfile.name} عند التفاعل المباشر مع المعالج.`, status: 'positive' },
                    ].map((note, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex justify-between mb-2">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${note.status === 'positive' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{t(profileNoteTypeKeyMap[note.type] || note.type)}</span>
                          <span className="text-[10px] text-slate-400 font-bold">{note.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{note.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Heart size={18} className="text-primary" />
                    {t('profiles_therapeuticRecs')}
                  </h3>
                  <div className="space-y-3">
                    {[
                      'الاستمرار في برنامج العلاج الحالي مع زيادة وتيرة الأنشطة التفاعلية',
                      'تعزيز أنشطة التواصل البصري من خلال الألعاب المحفزة',
                      'مراقبة تطور مؤشرات الانتباه والتواصل الاجتماعي',
                      'إعادة التقييم الشامل خلال أسبوعين',
                    ].map((rec, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                        <p className="text-sm text-slate-700 leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button className="flex-1 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                    <Download size={18} />
                    {t('profiles_downloadPdf')}
                  </button>
                  <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <Printer size={18} />
                    {t('reports_print')}
                  </button>
                  <button className="py-3 px-5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <Share2 size={18} />
                    {t('reports_shareLabel')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gradient-to-l from-primary to-teal-600 p-6 rounded-t-[2rem] relative">
                <button onClick={() => setShowAddModal(false)} className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all">
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Plus size={28} className="text-white" />
                  </div>
                  <div className="text-white">
                    <h2 className="text-xl font-extrabold">{t('profiles_addTitle')}</h2>
                    <p className="text-white/70 text-sm">{t('profiles_addDesc')}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <User size={18} className="text-primary" />
                    {t('profiles_childData')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2">{t('profiles_childNameFull')}</label>
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={t('profiles_childNamePlaceholder')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2">{t('profiles_childAge')}</label>
                      <input 
                        type="number"
                        min="1"
                        max="18"
                        value={formData.age}
                        onChange={e => setFormData(prev => ({ ...prev, age: e.target.value }))}
                        placeholder={t('profiles_childAgePlaceholder')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2">{t('profiles_childGender')}</label>
                      <select 
                        value={formData.gender}
                        onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="ذكر">{t('profiles_male')}</option>
                        <option value="أنثى">{t('profiles_female')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2">{t('profiles_childDiagnosis')}</label>
                      <input 
                        type="text"
                        value={formData.tag}
                        onChange={e => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                        placeholder={t('profiles_childDiagnosisPlaceholder')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2">{t('profiles_severitySelect')}</label>
                      <select 
                        value={formData.severity}
                        onChange={e => setFormData(prev => ({ ...prev, severity: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="خفيف">{t('profiles_mild')}</option>
                        <option value="متوسط">{t('profiles_moderate')}</option>
                        <option value="شديد">{t('profiles_severe')}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Heart size={18} className="text-primary" />
                    {t('profiles_guardianData')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2">{t('profiles_guardianNameLabel')}</label>
                      <input 
                        type="text"
                        value={formData.guardian}
                        onChange={e => setFormData(prev => ({ ...prev, guardian: e.target.value }))}
                        placeholder={t('profiles_guardianNamePlaceholder')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2">{t('profiles_guardianPhone')}</label>
                      <input 
                        type="tel"
                        value={formData.guardianPhone}
                        onChange={e => setFormData(prev => ({ ...prev, guardianPhone: e.target.value }))}
                        placeholder={t('profiles_guardianPhonePlaceholder')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 mb-2">{t('profiles_guardianEmail')}</label>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="example@email.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <FileText size={18} className="text-primary" />
                    {t('profiles_initialNotes')}
                  </h3>
                  <textarea 
                    value={formData.notes}
                    onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder={t('profiles_initialNotesPlaceholder')}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                </div>

                <p className="text-xs text-slate-400">{t('profiles_requiredFields')}</p>

                <div className="flex gap-3">
                  <button 
                    onClick={handleAddChild}
                    disabled={!formData.name.trim() || !formData.age.trim() || !formData.guardian.trim()}
                    className="flex-1 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={18} />
                    {t('profiles_addFile')}
                  </button>
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all"
                  >
                    {t('profiles_cancel')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
