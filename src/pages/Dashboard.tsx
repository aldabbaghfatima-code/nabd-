import DashboardLayout from '../components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { 
  Users, 
  Activity, 
  AlertCircle, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock,
  ChevronLeft,
  MoreVertical,
  Plus,
  X,
  User,
  CreditCard,
  Eye,
  Pencil,
  Trash2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const weeklyData = [
  { name: 'السبت', value: 6 },
  { name: 'الأحد', value: 4 },
  { name: 'الاثنين', value: 8 },
  { name: 'الثلاثاء', value: 5 },
  { name: 'الأربعاء', value: 9 },
  { name: 'الخميس', value: 7 },
  { name: 'الجمعة', value: 3 },
];

const monthlyData = [
  { name: 'يناير', value: 18 },
  { name: 'فبراير', value: 25 },
  { name: 'مارس', value: 32 },
  { name: 'أبريل', value: 28 },
  { name: 'مايو', value: 45 },
  { name: 'يونيو', value: 38 },
];

interface Session {
  id: number;
  name: string;
  time: string;
  childName: string;
  type: string;
  date: string;
  amount: number;
  notes: string;
}

const initialSessions: Session[] = [
  { id: 1, name: 'ليث', time: '10:30', childName: 'ليث منصور', type: 'تحليل لحظي', date: '2026-04-16', amount: 150, notes: 'جلسة متابعة أسبوعية - الحالة مستقرة' },
  { id: 2, name: 'صوفيا', time: '11:45', childName: 'صوفيا أحمد', type: 'تحليل فيديو', date: '2026-04-16', amount: 200, notes: 'تحليل فيديو الجلسة الثالثة' },
  { id: 3, name: 'أمير', time: '13:15', childName: 'أمير زايد', type: 'تحليل لحظي', date: '2026-04-16', amount: 150, notes: 'أول جلسة تقييم' },
  { id: 4, name: 'فهد', time: '14:30', childName: 'فهد العمري', type: 'متابعة أسبوعية', date: '2026-04-16', amount: 100, notes: 'متابعة تطور مهارات التواصل' },
  { id: 5, name: 'سارة', time: '16:00', childName: 'سارة التميمي', type: 'تحليل فيديو', date: '2026-04-16', amount: 200, notes: 'تقييم سلوكي شامل' },
];

const evaluations = [
  { name: 'ياسين عمر', type: 'تحليل سلوكي', status: 'مستقر', time: 'منذ 20 دقيقة', color: 'bg-green-100 text-green-700' },
  { name: 'نور الهدى', type: 'تفاعل اجتماعي', status: 'بحاجة لمتابعة', time: 'منذ ساعة', color: 'bg-amber-100 text-amber-700' },
  { name: 'ريان خالد', type: 'تقييم المهارات', status: 'مستقر', time: 'منذ 3 ساعات', color: 'bg-green-100 text-green-700' },
  { name: 'فهد العمري', type: 'تحليل لحظي', status: 'تحسن ملحوظ', time: 'منذ 5 ساعات', color: 'bg-blue-100 text-blue-700' },
  { name: 'سارة التميمي', type: 'تحليل فيديو', status: 'مستقر', time: 'أمس', color: 'bg-green-100 text-green-700' },
  { name: 'أمير زايد', type: 'تقييم أولي', status: 'تنبيه', time: 'أمس', color: 'bg-red-100 text-red-700' },
  { name: 'ليث منصور', type: 'متابعة أسبوعية', status: 'مستقر', time: 'منذ يومين', color: 'bg-green-100 text-green-700' },
  { name: 'صوفيا أحمد', type: 'تحليل سلوكي', status: 'بحاجة لمتابعة', time: 'منذ 3 أيام', color: 'bg-amber-100 text-amber-700' },
  { name: 'يوسف المنصور', type: 'تفاعل اجتماعي', status: 'تحسن ملحوظ', time: 'منذ 4 أيام', color: 'bg-blue-100 text-blue-700' },
  { name: 'ريان السقاف', type: 'تقييم المهارات', status: 'مستقر', time: 'منذ 5 أيام', color: 'bg-green-100 text-green-700' },
];

export default function Dashboard() {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ childName: '', time: '', date: '', type: '', amount: '', notes: '' });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [expandedStat, setExpandedStat] = useState<number | null>(null);
  const [chartView, setChartView] = useState<'weekly' | 'monthly'>('weekly');
  const [showAllEvals, setShowAllEvals] = useState(false);
  const [formData, setFormData] = useState({ childName: '', time: '', date: '', type: 'تحليل لحظي', amount: '', notes: '' });

  const handleAddSession = () => {
    if (!formData.childName.trim() || !formData.time || !formData.date) return;
    const newSession: Session = {
      id: Date.now(),
      name: formData.childName.split(' ')[0],
      time: formData.time,
      childName: formData.childName,
      type: formData.type,
      date: formData.date,
      amount: Number(formData.amount) || 0,
      notes: formData.notes,
    };
    setSessions(prev => [...prev, newSession]);
    setFormData({ childName: '', time: '', date: '', type: 'تحليل لحظي', amount: '', notes: '' });
    setShowAddModal(false);
  };

  const handleEditSession = () => {
    if (!selectedSession) return;
    if (!editForm.childName.trim() || !editForm.time || !editForm.date) return;
    setSessions(prev => prev.map(s => {
      if (s.id !== selectedSession.id) return s;
      return {
        ...s,
        childName: editForm.childName,
        name: editForm.childName.split(' ')[0],
        time: editForm.time,
        date: editForm.date,
        type: editForm.type,
        amount: Number(editForm.amount) || 0,
        notes: editForm.notes,
      };
    }));
    setSelectedSession(null);
    setIsEditing(false);
  };

  const handleDeleteSession = () => {
    if (!selectedSession) return;
    setSessions(prev => prev.filter(s => s.id !== selectedSession.id));
    setSelectedSession(null);
    setConfirmDelete(false);
  };

  const startEdit = () => {
    if (!selectedSession) return;
    setEditForm({
      childName: selectedSession.childName,
      time: selectedSession.time,
      date: selectedSession.date,
      type: selectedSession.type,
      amount: selectedSession.amount.toString(),
      notes: selectedSession.notes,
    });
    setIsEditing(true);
  };

  const closeDetailModal = () => {
    setSelectedSession(null);
    setIsEditing(false);
    setConfirmDelete(false);
  };

  const formatTime = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    const period = h >= 12 ? 'مساءً' : 'صباحاً';
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const totalRevenue = sessions.reduce((sum, s) => sum + s.amount, 0);

  return (
    <DashboardLayout title="لوحة التحكم">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'إجمالي الأطفال المقيّمين', value: '124', icon: <Users />, color: 'bg-blue-50 text-blue-600', trend: '+12%', up: true, detail: '124 طفل تم تقييمهم منذ بداية البرنامج. 18 طفل جديد خلال الشهر الحالي.' },
          { label: 'الجلسات النشطة', value: '08', icon: <Activity />, color: 'bg-green-50 text-green-600', trend: '-2', up: false, detail: '8 جلسات جارية حالياً. 5 تحليل لحظي و 3 تحليل فيديو.' },
          { label: 'تنبيهات حرجة', value: '03', icon: <AlertCircle />, color: 'bg-red-50 text-red-600', trend: 'عالية', up: true, detail: '3 حالات تحتاج تدخل فوري: يوسف علي (نوبة قلق)، نور الهدى (انسحاب اجتماعي)، أمير زايد (سلوك تكراري).' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setExpandedStat(expandedStat === i ? null : i)}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm font-bold text-slate-400">{stat.label}</div>
            <AnimatePresence>
              {expandedStat === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500 leading-relaxed">{stat.detail}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">عدد الحالات المعالجة</h3>
              <p className="text-sm text-slate-400 font-bold">
                {chartView === 'weekly' ? 'عدد الجلسات خلال الأسبوع' : 'عدد الجلسات خلال الأشهر'}
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setChartView('weekly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${chartView === 'weekly' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'}`}
              >أسبوعي</button>
              <button 
                onClick={() => setChartView('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${chartView === 'monthly' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'}`}
              >شهري</button>
            </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartView === 'weekly' ? weeklyData : monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} dy={10} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
                  {(chartView === 'weekly' ? weeklyData : monthlyData).map((_, index) => {
                    const chartData = chartView === 'weekly' ? weeklyData : monthlyData;
                    const maxIndex = chartData.reduce((maxI, item, i, arr) => item.value > arr[maxI].value ? i : maxI, 0);
                    return <Cell key={`cell-${index}`} fill={index === maxIndex ? '#0d6e6e' : '#e2e8f0'} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <Calendar size={20} className="text-primary" />
            الجلسات القادمة
          </h3>
          <div className="space-y-4">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-all text-right"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary font-bold shadow-sm">
                    {session.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{session.childName}</div>
                    <div className="text-[10px] text-slate-400 font-bold">{formatTime(session.time)}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold text-primary">{session.amount} ر.س</span>
                  <Eye size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 bg-primary/5 rounded-xl flex items-center justify-between">
            <span className="text-[10px] font-bold text-primary">إجمالي المبالغ</span>
            <span className="text-sm font-extrabold text-primary">{totalRevenue} ر.س</span>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-full mt-4 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            إضافة مواعيد
          </button>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">التقييمات الأخيرة</h3>
            <button 
              onClick={() => setShowAllEvals(!showAllEvals)}
              className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
            >
              {showAllEvals ? 'عرض أقل' : 'عرض الكل'}
              <ChevronLeft size={16} className={`transition-transform ${showAllEvals ? 'rotate-90' : ''}`} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-right text-slate-400 text-xs font-bold border-b border-slate-50">
                  <th className="pb-4 pr-4">اسم الطفل</th>
                  <th className="pb-4">نوع التقييم</th>
                  <th className="pb-4">الحالة العاطفية</th>
                  <th className="pb-4">آخر نشاط</th>
                  <th className="pb-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {(showAllEvals ? evaluations : evaluations.slice(0, 3)).map((row, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                          {row.name[0]}
                        </div>
                        <span className="font-bold text-slate-700">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-500 font-medium">{row.type}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.color}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 text-xs text-slate-400 font-bold">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {row.time}
                      </div>
                    </td>
                    <td className="py-4 text-left">
                      <button className="p-2 text-slate-300 hover:text-slate-600">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== Session Detail / Edit Modal ===== */}
      <AnimatePresence>
        {selectedSession && !isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeDetailModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gradient-to-l from-primary to-teal-600 p-6 rounded-t-[2rem] relative">
                <button onClick={closeDetailModal} className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all">
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    {selectedSession.name[0]}
                  </div>
                  <div className="text-white">
                    <h2 className="text-xl font-extrabold">{selectedSession.childName}</h2>
                    <p className="text-white/70 text-sm">تفاصيل الموعد</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-2xl p-4 text-center">
                    <Calendar size={20} className="mx-auto text-blue-500 mb-2" />
                    <div className="text-sm font-extrabold text-blue-600">{formatDate(selectedSession.date)}</div>
                    <div className="text-[10px] text-blue-500 font-bold">التاريخ</div>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-4 text-center">
                    <Clock size={20} className="mx-auto text-green-500 mb-2" />
                    <div className="text-sm font-extrabold text-green-600">{formatTime(selectedSession.time)}</div>
                    <div className="text-[10px] text-green-500 font-bold">الوقت</div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                      <Activity size={14} className="text-primary" />
                      نوع الجلسة
                    </span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-bold">{selectedSession.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                      <User size={14} className="text-primary" />
                      المعالج
                    </span>
                    <span className="text-xs font-bold text-slate-700">د. سارة الأحمد</span>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary flex items-center gap-2">
                      <CreditCard size={18} />
                      المبلغ المدفوع
                    </span>
                    <span className="text-2xl font-extrabold text-primary">{selectedSession.amount} <span className="text-sm">ر.س</span></span>
                  </div>
                </div>

                {selectedSession.notes && (
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <span className="text-xs font-bold text-slate-500 mb-2 block">ملاحظات</span>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedSession.notes}</p>
                  </div>
                )}

                <AnimatePresence>
                  {confirmDelete && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                        <p className="text-red-700 font-bold text-sm mb-3">هل أنت متأكد من إلغاء موعد {selectedSession.childName}؟</p>
                        <div className="flex gap-3">
                          <button onClick={handleDeleteSession} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-all">نعم، إلغاء الموعد</button>
                          <button onClick={() => setConfirmDelete(false)} className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">تراجع</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3">
                  <button 
                    onClick={startEdit}
                    className="flex-1 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <Pencil size={18} />
                    تعديل الموعد
                  </button>
                  <button 
                    onClick={() => setConfirmDelete(true)}
                    className="py-3 px-5 bg-white border border-red-200 text-red-500 rounded-2xl font-bold text-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    إلغاء الموعد
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Edit Session Modal ===== */}
      <AnimatePresence>
        {selectedSession && isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeDetailModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gradient-to-l from-primary to-teal-600 p-6 rounded-t-[2rem] relative">
                <button onClick={closeDetailModal} className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all">
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Pencil size={24} className="text-white" />
                  </div>
                  <div className="text-white">
                    <h2 className="text-lg font-extrabold">تعديل موعد {selectedSession.childName}</h2>
                    <p className="text-white/70 text-sm">عدّل بيانات الموعد</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">اسم الطفل *</label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={editForm.childName}
                      onChange={e => setEditForm(prev => ({ ...prev, childName: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">التاريخ *</label>
                    <input 
                      type="date"
                      value={editForm.date}
                      onChange={e => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">الوقت *</label>
                    <input 
                      type="time"
                      value={editForm.time}
                      onChange={e => setEditForm(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">نوع الجلسة</label>
                  <select 
                    value={editForm.type}
                    onChange={e => setEditForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="تحليل لحظي">تحليل لحظي</option>
                    <option value="تحليل فيديو">تحليل فيديو</option>
                    <option value="متابعة أسبوعية">متابعة أسبوعية</option>
                    <option value="تقييم أولي">تقييم أولي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">المبلغ المدفوع (ر.س)</label>
                  <div className="relative">
                    <input 
                      type="number"
                      min="0"
                      value={editForm.amount}
                      onChange={e => setEditForm(prev => ({ ...prev, amount: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">ملاحظات</label>
                  <textarea 
                    value={editForm.notes}
                    onChange={e => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={handleEditSession}
                    disabled={!editForm.childName.trim() || !editForm.time || !editForm.date}
                    className="flex-1 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Pencil size={18} />
                    حفظ التعديلات
                  </button>
                  <button 
                    onClick={() => { setIsEditing(false); setConfirmDelete(false); }}
                    className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all"
                  >
                    تراجع
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Add Session Modal ===== */}
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
              className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gradient-to-l from-primary to-teal-600 p-6 rounded-t-[2rem] relative">
                <button onClick={() => setShowAddModal(false)} className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all">
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <div className="text-white">
                    <h2 className="text-lg font-extrabold">إضافة موعد جديد</h2>
                    <p className="text-white/70 text-sm">أضف جلسة تقييم جديدة للجدول</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">اسم الطفل *</label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={formData.childName}
                      onChange={e => setFormData(prev => ({ ...prev, childName: e.target.value }))}
                      placeholder="مثال: أحمد محمد العلي"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">التاريخ *</label>
                    <input 
                      type="date"
                      value={formData.date}
                      onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">الوقت *</label>
                    <input 
                      type="time"
                      value={formData.time}
                      onChange={e => setFormData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">نوع الجلسة</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="تحليل لحظي">تحليل لحظي</option>
                    <option value="تحليل فيديو">تحليل فيديو</option>
                    <option value="متابعة أسبوعية">متابعة أسبوعية</option>
                    <option value="تقييم أولي">تقييم أولي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">المبلغ المدفوع (ر.س)</label>
                  <div className="relative">
                    <input 
                      type="number"
                      min="0"
                      value={formData.amount}
                      onChange={e => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="0"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">ملاحظات</label>
                  <textarea 
                    value={formData.notes}
                    onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="ملاحظات إضافية عن الجلسة..."
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={handleAddSession}
                    disabled={!formData.childName.trim() || !formData.time || !formData.date}
                    className="flex-1 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={18} />
                    إضافة الموعد
                  </button>
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all"
                  >
                    إلغاء
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
