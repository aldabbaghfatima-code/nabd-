import DashboardLayout from '../components/layout/DashboardLayout';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Mic, 
  Pause, 
  Square, 
  Smile, 
  MessageSquare,
  Send,
  Maximize2,
  VideoOff,
  Activity,
  User,
  Clock,
  FileText,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';

const voiceData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  value: Math.floor(Math.random() * 100),
}));

export default function RealTimeAnalysis() {
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

  const handleSaveReport = () => {
    const report = {
      id: Date.now(),
      title: `تقرير تحليل لحظي - ${child?.name || 'طفل غير محدد'}`,
      child: child?.name || 'طفل غير محدد',
      type: 'تحليل لحظي',
      date: new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'قيد المراجعة',
      severity: child?.severity || 'غير محدد',
      therapist: 'د. سارة الأحمد',
      summary: `جلسة تحليل لحظي للطفل ${child?.name || ''}. تم تسجيل مؤشرات الانتباه والنشاط الصوتي والتواصل البصري.`,
    };
    navigate('/dashboard/reports', { state: { newReport: report } });
  };

  return (
    <DashboardLayout title="التحليل بالزمن الحقيقي">
      
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
              onClick={handleSaveReport}
              className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
            >
              <FileText size={16} />
              حفظ كتقرير
            </button>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Column: Controls & Indicators */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                <Square size={20} fill="currentColor" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">جلسة نشطة</div>
                <div className="text-[10px] text-slate-400 font-bold">المدة: 14:22 دقيقة</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all group">
                <Pause size={20} className="text-slate-400 group-hover:text-primary mb-2" />
                <span className="text-xs font-bold text-slate-600">إيقاف مؤقت</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-2xl border border-red-100 hover:bg-red-100 transition-all group">
                <Square size={20} className="text-red-500 mb-2" />
                <span className="text-xs font-bold text-red-600">إنهاء الجلسة</span>
              </button>
            </div>
          </div>

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
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${indicator.value}%` }}
                      className={`h-full ${indicator.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MessageSquare size={18} className="text-primary" />
              ملاحظات فورية
            </h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {[
                { time: '14:05', type: 'استجابة بصرية', text: 'أظهر الطفل تواصل بصري مستدام لمدة 5 ثوانٍ عند تقديم اللعبة المحفزة.' },
                { time: '12:42', type: 'سلوك تكراري', text: 'بداية حركة تكرارية باليدين (رفرفة) استمرت لمدة 10 ثوانٍ.' },
                { time: '10:30', type: 'تفاعل اجتماعي', text: 'ابتسامة استجابة لنداء الاسم من قبل المعالج.' },
              ].map((note, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[10px]">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-primary">{note.type}</span>
                    <span className="text-slate-400">{note.time}</span>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">{note.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 relative">
              <input 
                type="text" 
                placeholder="أضف ملاحظة سريعة..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pr-4 pl-10 text-[10px] focus:outline-none focus:border-primary"
              />
              <button className="absolute left-2 top-1/2 -translate-y-1/2 text-primary">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Column: Video Feed */}
        <div className="lg:col-span-3 space-y-6">
          <div className="relative aspect-video bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src={child?.image || "https://picsum.photos/seed/child-session/1200/800"} 
              alt="Live Session" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            
            {/* AI Overlays */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/3 w-1/4 h-1/3 border-2 border-primary rounded-2xl shadow-[0_0_20px_rgba(13,110,110,0.5)]">
                <div className="absolute -top-8 left-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                  تتبع الوجه: نشط (98%)
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-6 flex gap-3">
              <button className="w-10 h-10 bg-white/10 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
                <Maximize2 size={20} />
              </button>
              <button className="w-10 h-10 bg-white/10 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
                <VideoOff size={20} />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Smile size={32} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold">الحالة العاطفية الحالية</div>
                  <div className="text-lg font-bold text-slate-900 leading-none">مستقر / مهتم</div>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="px-4 py-2 bg-red-500 text-white rounded-full text-xs font-bold flex items-center gap-2 animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  مباشر
                </div>
              </div>
            </div>
          </div>

          {/* Voice Analysis Chart */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Mic size={18} className="text-primary" />
                تحليل النبرة الصوتية (Real-time Voice Analysis)
              </h3>
              <div className="flex items-center gap-4 text-[10px] font-bold">
                <div className="flex items-center gap-1 text-green-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  هدوء
                </div>
                <div className="flex items-center gap-1 text-red-500">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  توتر
                </div>
              </div>
            </div>
            
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={voiceData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d6e6e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0d6e6e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0d6e6e" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
