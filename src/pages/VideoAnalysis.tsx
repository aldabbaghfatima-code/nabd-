import DashboardLayout from '../components/layout/DashboardLayout';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Video, 
  Upload, 
  FileText, 
  Download, 
  Play, 
  Activity, 
  Mic,
  Clock,
  User,
  Calendar,
  AlertCircle
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

const voiceData = [
  { time: '00:00', value: 30 },
  { time: '01:00', value: 45 },
  { time: '02:00', value: 20 },
  { time: '03:00', value: 80 },
  { time: '04:00', value: 35 },
  { time: '05:00', value: 50 },
];

export default function VideoAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const child = location.state?.child as {
    id: number;
    name: string;
    age: string;
    gender: string;
    tag: string;
    image: string;
    sessions: number;
    completedSessions: number;
    severity: string;
  } | undefined;

  const handleExportReport = () => {
    const report = {
      id: Date.now(),
      title: `تقرير تحليل فيديو - ${child?.name || 'طفل غير محدد'}`,
      child: child?.name || 'طفل غير محدد',
      type: 'تحليل فيديو',
      date: new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'قيد المراجعة',
      severity: child?.severity || 'غير محدد',
      therapist: 'د. سارة الأحمد',
      summary: `جلسة تحليل فيديو مسجل للطفل ${child?.name || ''}. تم رصد 12 نقطة اهتمام و3 تنبيهات سلوكية.`,
    };
    navigate('/dashboard/reports', { state: { newReport: report } });
  };

  return (
    <DashboardLayout title="مختبر التحليل المرئي">

      {child && (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={child.image} 
                alt={child.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/10"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-slate-900">{child.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${
                    child.severity === 'شديد' ? 'bg-red-100 text-red-600' :
                    child.severity === 'متوسط' ? 'bg-amber-100 text-amber-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {child.severity}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-bold mt-1">
                  <span className="flex items-center gap-1"><User size={12} /> {child.age} - {child.gender}</span>
                  <span className="flex items-center gap-1"><AlertCircle size={12} /> {child.tag}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> الجلسة {child.completedSessions + 1} من {child.sessions}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleExportReport}
              className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
            >
              <Download size={16} />
              تصدير التقرير
            </button>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Analysis Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Video size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    تحليل فيديو مسجل{child ? `: ${child.name}` : ''}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1"><Clock size={12} /> 05:24 دقيقة</span>
                    <span className="flex items-center gap-1"><Activity size={12} /> mp4</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-100 transition-all">
                  <Upload size={16} />
                  تغيير الملف
                </button>
                {!child && (
                  <button className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                    <Download size={16} />
                    تصدير التقرير
                  </button>
                )}
              </div>
            </div>

            <div className="relative aspect-video bg-slate-900 rounded-[2rem] overflow-hidden group">
              <img 
                src={child?.image || "https://picsum.photos/seed/video-thumb/1200/800"} 
                alt="Video Preview" 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all border border-white/30 group-hover:scale-110">
                  <Play size={40} fill="currentColor" />
                </button>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
                <div className="h-full bg-primary w-1/3 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Mic size={18} className="text-primary" />
                تحليل النبرة الصوتية في التسجيل (Voice Analysis)
              </h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full" /> هدوء
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-red-500">
                  <div className="w-2 h-2 bg-red-500 rounded-full" /> توتر
                </div>
              </div>
            </div>
            
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={voiceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={30}>
                    {voiceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value > 60 ? '#ef4444' : '#0d6e6e'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar: Results & Insights */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity size={18} className="text-primary" />
              مؤشرات الاستجابة اللحظية
            </h3>
            <div className="space-y-6">
              {[
                { label: 'تفاعل الانتباه', value: 84, color: 'bg-primary' },
                { label: 'النشاط الصوتي', value: 22, color: 'bg-amber-500' },
                { label: 'التواصل البصري', value: 65, color: 'bg-blue-500' },
              ].map((indicator, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-500">{indicator.label}</span>
                    <span className="text-slate-900">{indicator.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${indicator.color}`} style={{ width: `${indicator.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              ملاحظات فورية
            </h3>
            <div className="space-y-4">
              {[
                { time: '00:45', type: 'استجابة بصرية', text: 'تم رصد تواصل بصري مستدام لمدة 5 ثوانٍ مع المحفز البصري الملون.', status: 'positive' },
                { time: '01:12', type: 'سلوك تكراري', text: 'بداية حركة تكرارية باليدين (رفرفة) استمرت لمدة 10 ثوانٍ كاستجابة للضوء.', status: 'warning' },
                { time: '03:20', type: 'تفاعل اجتماعي', text: 'ابتسامة واضحة واستجابة لفظية بسيطة عند مناداة الطفل باسمه.', status: 'positive' },
              ].map((note, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-[10px]">
                  <div className="flex justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded-lg font-bold ${note.status === 'positive' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {note.type}
                    </span>
                    <span className="text-slate-400">{note.time}</span>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">{note.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center">
                <Activity size={20} />
              </div>
              <div className="text-xs font-bold text-primary">معالجة الذكاء الاصطناعي</div>
            </div>
            <p className="text-[10px] text-primary-dark font-medium leading-relaxed">
              تم تحليل 100% من هذا المقطع. تم رصد 12 نقطة اهتمام و 3 تنبيهات سلوكية.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
