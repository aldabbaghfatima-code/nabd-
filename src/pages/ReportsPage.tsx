import DashboardLayout from '../components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useLang } from '../lib/i18n';
import {
  FileText,
  Download,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Eye,
  Share2,
  BarChart3,
  Users,
  Printer,
  X,
  Activity,
  User,
  Mic,
  Smile,
  Frown,
  Meh,
  Heart,
  Brain,
  Target
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

interface ReportNote {
  time: string;
  type: string;
  text: string;
  status: 'positive' | 'warning' | 'info';
}

interface SessionIndicators {
  attention: number;
  vocalActivity: number;
  eyeContact: number;
}

interface Report {
  id: number;
  title: string;
  child: string;
  type: string;
  date: string;
  status: string;
  severity: string;
  therapist: string;
  summary: string;
  sessionDuration: string;
  emotionalState: string;
  indicators: SessionIndicators;
  notes: ReportNote[];
  voiceData: { time: string; value: number }[];
  recommendations: string[];
}

const reports: Report[] = [
  {
    id: 1,
    title: 'تقرير تقييم شامل - فهد خالد العمري',
    child: 'فهد خالد العمري',
    type: 'تحليل لحظي',
    date: '15 يونيو 2024',
    status: 'مكتمل',
    severity: 'متوسط',
    therapist: 'د. سارة الأحمد',
    summary: 'تحسن ملحوظ في التواصل البصري والتفاعل الاجتماعي مقارنة بالجلسة السابقة. يُنصح بالاستمرار في العلاج باللعب.',
    sessionDuration: '14:22',
    emotionalState: 'مستقر / مهتم',
    indicators: { attention: 84, vocalActivity: 22, eyeContact: 65 },
    notes: [
      { time: '14:05', type: 'استجابة بصرية', text: 'أظهر الطفل تواصل بصري مستدام لمدة 5 ثوانٍ عند تقديم اللعبة المحفزة.', status: 'positive' },
      { time: '12:42', type: 'سلوك تكراري', text: 'بداية حركة تكرارية باليدين (رفرفة) استمرت لمدة 10 ثوانٍ.', status: 'warning' },
      { time: '10:30', type: 'تفاعل اجتماعي', text: 'ابتسامة استجابة لنداء الاسم من قبل المعالج.', status: 'positive' },
    ],
    voiceData: [
      { time: '0', value: 35 }, { time: '2', value: 48 }, { time: '4', value: 22 },
      { time: '6', value: 67 }, { time: '8', value: 30 }, { time: '10', value: 55 },
      { time: '12', value: 40 }, { time: '14', value: 72 }, { time: '16', value: 28 },
    ],
    recommendations: [
      'الاستمرار في جلسات العلاج باللعب مرتين أسبوعياً',
      'زيادة الأنشطة التفاعلية التي تتطلب تواصل بصري',
      'تقليل المحفزات البصرية المفرطة أثناء الجلسة',
    ],
  },
  {
    id: 2,
    title: 'تقرير تحليل فيديو - سارة جاسم التميمي',
    child: 'سارة جاسم التميمي',
    type: 'تحليل فيديو',
    date: '12 يونيو 2024',
    status: 'قيد المراجعة',
    severity: 'منخفض',
    therapist: 'د. سارة الأحمد',
    summary: 'تم رصد 5 نقاط اهتمام سلوكية. النشاط الصوتي في الحد الطبيعي مع تحسن في مهارات النطق.',
    sessionDuration: '05:24',
    emotionalState: 'مستقر',
    indicators: { attention: 78, vocalActivity: 45, eyeContact: 70 },
    notes: [
      { time: '00:45', type: 'استجابة بصرية', text: 'تم رصد تواصل بصري مستدام لمدة 5 ثوانٍ مع المحفز البصري الملون.', status: 'positive' },
      { time: '01:12', type: 'سلوك تكراري', text: 'بداية حركة تكرارية باليدين (رفرفة) استمرت لمدة 10 ثوانٍ كاستجابة للضوء.', status: 'warning' },
      { time: '03:20', type: 'تفاعل اجتماعي', text: 'ابتسامة واضحة واستجابة لفظية بسيطة عند مناداة الطفل باسمه.', status: 'positive' },
    ],
    voiceData: [
      { time: '00:00', value: 30 }, { time: '01:00', value: 45 }, { time: '02:00', value: 20 },
      { time: '03:00', value: 80 }, { time: '04:00', value: 35 }, { time: '05:00', value: 50 },
    ],
    recommendations: [
      'الاستمرار بتمارين النطق اليومية مع ولي الأمر',
      'استخدام الصور والبطاقات التعليمية لتحفيز التواصل',
      'إعادة التقييم بعد شهر',
    ],
  },
  {
    id: 3,
    title: 'تقرير المتابعة الأسبوعية - يوسف علي المنصور',
    child: 'يوسف علي المنصور',
    type: 'تحليل لحظي',
    date: '10 يونيو 2024',
    status: 'مكتمل',
    severity: 'عالي',
    therapist: 'د. سارة الأحمد',
    summary: 'استقرار في الحالة العاطفية مع نوبات قلق متقطعة. يحتاج متابعة مكثفة خلال الأسبوع القادم.',
    sessionDuration: '22:10',
    emotionalState: 'قلق / مهتاج',
    indicators: { attention: 52, vocalActivity: 68, eyeContact: 35 },
    notes: [
      { time: '20:15', type: 'نوبة قلق', text: 'نوبة بكاء مفاجئة استمرت 3 دقائق عند تغيير النشاط.', status: 'warning' },
      { time: '15:30', type: 'تفاعل إيجابي', text: 'استجابة ممتازة لنشطة الرسم الحر. تركيز عالٍ لمدة 8 دقائق.', status: 'positive' },
      { time: '08:45', type: 'سلوك انسحابي', text: 'انسحاب من النشاط الجماعي والجلوس بمفرده في الزاوية.', status: 'warning' },
      { time: '03:20', type: 'تواصل بصري', text: 'تواصل بصري محسن عند الحديث عن موضوع مفضل.', status: 'positive' },
    ],
    voiceData: [
      { time: '0', value: 60 }, { time: '3', value: 85 }, { time: '6', value: 70 },
      { time: '9', value: 45 }, { time: '12', value: 90 }, { time: '15', value: 35 },
      { time: '18', value: 55 }, { time: '21', value: 40 },
    ],
    recommendations: [
      'زيادة وتيرة الجلسات إلى 3 مرات أسبوعياً',
      'تجنب التغييرات المفاجئة في النشاط والبيئة',
      'تعزيز أنشطة الرسم والتعبير الفني',
      'متابعة دورية مع أخصائي نفسي',
    ],
  },
  {
    id: 4,
    title: 'تقرير تقييم أولي - ريان عمر السقاف',
    child: 'ريان عمر السقاف',
    type: 'تحليل فيديو',
    date: '08 يونيو 2024',
    status: 'مكتمل',
    severity: 'منخفض',
    therapist: 'د. سارة الأحمد',
    summary: 'أداء ضمن المعدل الطبيعي في معظم المحاور. صعوبات بسيطة في التركيز تحتاج دعماً خفيفاً.',
    sessionDuration: '08:15',
    emotionalState: 'مستقر / سعيد',
    indicators: { attention: 72, vocalActivity: 55, eyeContact: 80 },
    notes: [
      { time: '06:30', type: 'تفاعل اجتماعي', text: 'مبادرة بالسلام والتواصل مع أقرانه.', status: 'positive' },
      { time: '04:15', type: 'تشتت انتباه', text: 'صعوبة في إكمال المهمة المحددة بسبب تشتت الانتباه.', status: 'warning' },
    ],
    voiceData: [
      { time: '00:00', value: 25 }, { time: '02:00', value: 40 }, { time: '04:00', value: 35 },
      { time: '06:00', value: 50 }, { time: '08:00', value: 30 },
    ],
    recommendations: [
      'تمارين تركيز قصيرة ومتكررة (5-10 دقائق)',
      'استخدام نظام مكافآت لتعزيز إنجاز المهام',
      'إعادة التقييم بعد شهرين',
    ],
  },
  {
    id: 5,
    title: 'تقرير تحليل لحظي - ليث منصور',
    child: 'ليث منصور',
    type: 'تحليل لحظي',
    date: '05 يونيو 2024',
    status: 'مسودة',
    severity: 'متوسط',
    therapist: 'د. سارة الأحمد',
    summary: 'جلسة تفاعلية مع أنشطة رسم. تم رصد استجابة إيجابية للأنشطة الحسية الحركية.',
    sessionDuration: '18:45',
    emotionalState: 'مهتم / متفاعل',
    indicators: { attention: 76, vocalActivity: 38, eyeContact: 60 },
    notes: [
      { time: '16:20', type: 'استجابة حسية', text: 'تفاعل إيجابي مع الصلصال وإبداع في التشكيل.', status: 'positive' },
      { time: '10:05', type: 'تواصل لفظي', text: 'محاولة التعبير عن مشاعره بالكلمات بدل البكاء.', status: 'positive' },
      { time: '04:30', type: 'سلوك تجنبي', text: 'تجنب النشاط الحركي الكبير والبقاء في منطقة اللعب الهادئ.', status: 'info' },
    ],
    voiceData: [
      { time: '0', value: 20 }, { time: '3', value: 35 }, { time: '6', value: 50 },
      { time: '9', value: 42 }, { time: '12', value: 58 }, { time: '15', value: 30 },
    ],
    recommendations: [
      'تعزيز الأنشطة الحسية الحركية في كل جلسة',
      'تشجيع التعبير اللفظي عن المشاعر',
      'دمج أنشطة اللعب الهادئ مع الأنشطة الحركية تدريجياً',
    ],
  },
  {
    id: 6,
    title: 'تقرير شهري مايو - صوفيا أحمد',
    child: 'صوفيا أحمد',
    type: 'متابعة أسبوعية',
    date: '01 يونيو 2024',
    status: 'مكتمل',
    severity: 'منخفض',
    therapist: 'د. سارة الأحمد',
    summary: 'تحسن تدريجي ومستمر خلال الشهر. تم تخفيض وتيرة الجلسات من مرتين إلى مرة أسبوعياً.',
    sessionDuration: '30:00',
    emotionalState: 'مستقر / سعيد',
    indicators: { attention: 90, vocalActivity: 62, eyeContact: 85 },
    notes: [
      { time: '25:00', type: 'تحسن لغوي', text: 'زيادة ملحوظة في المفردات المستخدمة مقارنة بالشهر السابق.', status: 'positive' },
      { time: '18:30', type: 'تفاعل اجتماعي', text: 'مبادرة باللعب الجماعي مع أطفال آخرين.', status: 'positive' },
      { time: '08:00', type: 'تنظيم ذاتي', text: 'قدرة على تنظيم مشاعرها عند الشعور بالإحباط.', status: 'positive' },
    ],
    voiceData: [
      { time: '0', value: 30 }, { time: '5', value: 45 }, { time: '10', value: 25 },
      { time: '15', value: 40 }, { time: '20', value: 35 }, { time: '25', value: 28 },
    ],
    recommendations: [
      'تخفيض الجلسات إلى مرة واحدة أسبوعياً',
      'متابعة تطور اللغة والتواصل الاجتماعي',
      'إعادة التقييم الشامل بعد 3 أشهر',
    ],
  },
];

const statusKeyMap: Record<string, string> = {
  'مكتمل': 'reports_complete',
  'قيد المراجعة': 'reports_review',
  'مسودة': 'reports_draft',
};

const severityKeyMap: Record<string, string> = {
  'عالي': 'reports_severity_high',
  'متوسط': 'reports_severity_medium',
  'منخفض': 'reports_severity_low',
  'غير محدد': 'profiles_undetermined',
};

const typeKeyMap: Record<string, string> = {
  'تحليل لحظي': 'reports_type_realtime',
  'تحليل فيديو': 'reports_type_video',
  'متابعة أسبوعية': 'reports_type_weekly',
};

const emotionKeyMap: Record<string, string> = {
  'مستقر / مهتم': 'reports_emotion_stableInterested',
  'مستقر': 'reports_emotion_stable',
  'مستقر / سعيد': 'reports_emotion_stableHappy',
  'مهتم / متفاعل': 'reports_emotion_interested',
  'قلق / مهتاج': 'reports_emotion_anxious',
};

const noteTypeKeyMap: Record<string, string> = {
  'استجابة بصرية': 'reports_note_visualResponse',
  'سلوك تكراري': 'reports_note_repetitive',
  'تفاعل اجتماعي': 'reports_note_social',
  'نوبة قلق': 'reports_note_anxiety',
  'تفاعل إيجابي': 'reports_note_positive',
  'سلوك انسحابي': 'reports_note_withdrawal',
  'تواصل بصري': 'reports_note_eyeContact',
  'تشتت انتباه': 'reports_note_attention',
  'استجابة حسية': 'reports_note_sensory',
  'تواصل لفظي': 'reports_note_verbal',
  'سلوك تجنبي': 'reports_note_avoidance',
  'تحسن لغوي': 'reports_note_language',
  'تنظيم ذاتي': 'reports_note_selfRegulation',
};

const filterKeyMap: Record<string, string> = {
  'الكل': 'reports_all',
  'مكتمل': 'reports_complete',
  'قيد المراجعة': 'reports_review',
  'مسودة': 'reports_draft',
};

const statusColors: Record<string, string> = {
  'مكتمل': 'bg-green-100 text-green-700',
  'قيد المراجعة': 'bg-amber-100 text-amber-700',
  'مسودة': 'bg-slate-100 text-slate-500',
};

const severityColors: Record<string, string> = {
  'عالي': 'text-red-500',
  'متوسط': 'text-amber-500',
  'منخفض': 'text-green-500',
  'غير محدد': 'text-slate-400',
};

export default function ReportsPage() {
  const { t } = useLang();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [allReports, setAllReports] = useState(reports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [chartView, setChartView] = useState<'monthly' | 'weekly'>('monthly');

  const monthlyReports = [
    { name: t('dash_monthJan'), value: 18 },
    { name: t('dash_monthFeb'), value: 25 },
    { name: t('dash_monthMar'), value: 32 },
    { name: t('dash_monthApr'), value: 28 },
    { name: t('dash_monthMay'), value: 45 },
    { name: t('dash_monthJun'), value: 38 },
  ];

  const weeklyReports = [
    { name: t('dash_daySat'), value: 4 },
    { name: t('dash_daySun'), value: 6 },
    { name: t('dash_dayMon'), value: 3 },
    { name: t('dash_dayTue'), value: 7 },
    { name: t('dash_dayWed'), value: 5 },
    { name: t('dash_dayThu'), value: 8 },
    { name: t('dash_dayFri'), value: 2 },
  ];

  const statusDistribution = [
    { name: t('reports_complete'), value: 65, color: '#10b981' },
    { name: t('reports_review'), value: 20, color: '#f59e0b' },
    { name: t('reports_draft'), value: 15, color: '#94a3b8' },
  ];

  const emotionalIcons: Record<string, ReactNode> = {
    'مستقر / مهتم': <Smile size={20} className="text-green-500" />,
    'مستقر': <Smile size={20} className="text-green-500" />,
    'مستقر / سعيد': <Smile size={20} className="text-green-500" />,
    'مهتم / متفاعل': <Smile size={20} className="text-blue-500" />,
    'قلق / مهتاج': <Frown size={20} className="text-red-500" />,
  };

  useEffect(() => {
    const newReport = location.state?.newReport;
    const filterChild = location.state?.filterChild;
    if (newReport) {
      const detailed: Report = {
        ...newReport,
        sessionDuration: newReport.type === 'تحليل لحظي' ? '14:22' : '05:24',
        emotionalState: 'مستقر / مهتم',
        indicators: { attention: 84, vocalActivity: 22, eyeContact: 65 },
        notes: [
          { time: newReport.type === 'تحليل لحظي' ? '14:05' : '00:45', type: 'استجابة بصرية', text: `تم رصد استجابة بصرية إيجابية خلال جلسة ${newReport.type} للطفل ${newReport.child}.`, status: 'positive' },
          { time: newReport.type === 'تحليل لحظي' ? '12:42' : '01:12', type: 'سلوك تكراري', text: 'بداية حركة تكرارية باليدين استمرت لمدة 10 ثوانٍ.', status: 'warning' },
          { time: newReport.type === 'تحليل لحظي' ? '10:30' : '03:20', type: 'تفاعل اجتماعي', text: 'ابتسامة واستجابة إيجابية عند التفاعل المباشر.', status: 'positive' },
        ],
        voiceData: [
          { time: '0', value: 35 }, { time: '2', value: 48 }, { time: '4', value: 22 },
          { time: '6', value: 67 }, { time: '8', value: 30 }, { time: '10', value: 55 },
        ],
        recommendations: [
          'الاستمرار في برنامج العلاج الحالي',
          'مراقبة تطور مؤشرات التواصل البصري',
          'إعادة التقييم خلال أسبوعين',
        ],
      };
      setAllReports(prev => [detailed, ...prev]);
      window.history.replaceState({}, '');
    }
    if (filterChild) {
      setSearchQuery(filterChild);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  const filters = ['الكل', 'مكتمل', 'قيد المراجعة', 'مسودة'];

  const filteredReports = allReports.filter((report) => {
    const matchesFilter = activeFilter === 'الكل' || report.status === activeFilter;
    const matchesSearch =
      searchQuery === '' ||
      report.title.includes(searchQuery) ||
      report.child.includes(searchQuery) ||
      report.type.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout title={t('reports_title')}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: t('reports_total'), value: allReports.length.toString().padStart(2, '0'), icon: <FileText size={18} />, color: 'bg-blue-50 text-blue-600' },
          { label: t('reports_completed'), value: allReports.filter(r => r.status === 'مكتمل').length.toString().padStart(2, '0'), icon: <CheckCircle2 size={18} />, color: 'bg-green-50 text-green-600' },
          { label: t('reports_underReview'), value: allReports.filter(r => r.status === 'قيد المراجعة').length.toString().padStart(2, '0'), icon: <Clock size={18} />, color: 'bg-amber-50 text-amber-600' },
          { label: t('reports_criticalAlerts'), value: allReports.filter(r => r.severity === 'عالي').length.toString().padStart(2, '0'), icon: <AlertCircle size={18} />, color: 'bg-red-50 text-red-600' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400">{stat.label}</div>
              <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 size={20} className="text-primary" />
                {chartView === 'monthly' ? t('reports_monthly') : t('reports_weekly')}
              </h3>
              <p className="text-sm text-slate-400 font-bold">
                {chartView === 'monthly' ? t('reports_monthlyDesc') : t('reports_weeklyDesc')}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setChartView('monthly')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${chartView === 'monthly' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'}`}>{t('reports_monthlyBtn')}</button>
              <button onClick={() => setChartView('weekly')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${chartView === 'weekly' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'}`}>{t('reports_weeklyBtn')}</button>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartView === 'monthly' ? monthlyReports : weeklyReports}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} dy={10} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
                  {(chartView === 'monthly' ? monthlyReports : weeklyReports).map((_, index) => {
                    const chartData = chartView === 'monthly' ? monthlyReports : weeklyReports;
                    const maxIndex = chartData.reduce((maxI, item, i, arr) => item.value > arr[maxI].value ? i : maxI, 0);
                    return <Cell key={`cell-${index}`} fill={index === maxIndex ? '#0d6e6e' : '#e2e8f0'} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            {t('reports_statusDist')}
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {statusDistribution.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex items-center gap-3 flex-1 max-w-md w-full">
              <div className="relative w-full">
                <input type="text" placeholder={t('reports_search')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all"><Filter size={18} />{t('reports_advancedFilter')}</button>
              <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all"><Printer size={18} />{t('reports_print')}</button>
              <button className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"><Download size={18} />{t('reports_exportAll')}</button>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {filters.map((filter) => (
              <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeFilter === filter ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>{t(filterKeyMap[filter])}</button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {filteredReports.map((report, i) => (
            <motion.div key={report.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-6 hover:bg-slate-50/50 transition-all group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0"><FileText size={22} /></div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900 mb-1 truncate">{report.title}</h4>
                    <p className="text-xs text-slate-400 font-medium line-clamp-1">{report.summary}</p>
                    <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400 font-bold flex-wrap">
                      <span className="flex items-center gap-1"><Users size={12} /> {report.child}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {report.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {report.therapist}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusColors[report.status]}`}>{t(statusKeyMap[report.status] || report.status)}</span>
                    <span className={`text-[10px] font-bold flex items-center gap-1 ${severityColors[report.severity]}`}><AlertCircle size={12} />{t(severityKeyMap[report.severity] || report.severity)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setSelectedReport(report)} className="p-2 text-slate-300 hover:text-primary transition-colors" title={t('reports_viewReportTitle')}><Eye size={18} /></button>
                    <button className="p-2 text-slate-300 hover:text-primary transition-colors" title={t('reports_downloadTitle')}><Download size={18} /></button>
                    <button className="p-2 text-slate-300 hover:text-primary transition-colors" title={t('reports_shareLabel')}><Share2 size={18} /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="p-12 text-center">
            <FileText size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold">{t('reports_noResults')}</p>
          </div>
        )}

        <div className="p-6 border-t border-slate-50 flex justify-between items-center text-slate-400 text-xs font-bold">
          <p>{t('reports_showing')} {filteredReports.length} {t('reports_of')} {allReports.length} {t('reports_report')}</p>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:text-primary"><ChevronRight size={20} /></button>
            <button className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center">3</button>
            <button className="p-2 hover:text-primary"><ChevronLeft size={20} /></button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedReport(null)}
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
                <button onClick={() => setSelectedReport(null)} className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all">
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                    <FileText size={28} className="text-white" />
                  </div>
                  <div className="text-white">
                    <h2 className="text-xl font-extrabold">{selectedReport.title}</h2>
                    <div className="flex items-center gap-4 mt-2 text-white/80 text-sm font-medium flex-wrap">
                      <span className="flex items-center gap-1"><User size={14} /> {selectedReport.child}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} /> {selectedReport.date}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {selectedReport.sessionDuration}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${selectedReport.status === 'مكتمل' ? 'bg-green-500/20 text-green-100' : selectedReport.status === 'قيد المراجعة' ? 'bg-amber-500/20 text-amber-100' : 'bg-white/20 text-white/80'}`}>{t(statusKeyMap[selectedReport.status] || selectedReport.status)}</span>
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-white/20 text-white">{t('reports_severityLabel')} {t(severityKeyMap[selectedReport.severity] || selectedReport.severity)}</span>
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-white/20 text-white">{t(typeKeyMap[selectedReport.type] || selectedReport.type)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">

                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                    <FileText size={18} className="text-primary" />
                    {t('reports_sessionSummary')}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedReport.summary}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-2xl p-4 text-center">
                    <Clock size={20} className="mx-auto text-blue-500 mb-2" />
                    <div className="text-lg font-extrabold text-blue-600">{selectedReport.sessionDuration}</div>
                    <div className="text-[10px] text-blue-500 font-bold">{t('reports_sessionDurationLabel')}</div>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-4 text-center">
                    {emotionalIcons[selectedReport.emotionalState] || <Meh size={20} className="mx-auto text-slate-400 mb-2" />}
                    <div className="text-sm font-extrabold text-green-600">{t(emotionKeyMap[selectedReport.emotionalState] || selectedReport.emotionalState)}</div>
                    <div className="text-[10px] text-green-500 font-bold">{t('reports_emotionalStateLabel')}</div>
                  </div>
                  <div className="bg-primary-light rounded-2xl p-4 text-center">
                    <User size={20} className="mx-auto text-primary mb-2" />
                    <div className="text-sm font-extrabold text-primary">{selectedReport.therapist}</div>
                    <div className="text-[10px] text-primary font-bold">{t('reports_therapistLabel')}</div>
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-4 text-center">
                    <Activity size={20} className="mx-auto text-amber-500 mb-2" />
                    <div className="text-sm font-extrabold text-amber-600">{t(typeKeyMap[selectedReport.type] || selectedReport.type)}</div>
                    <div className="text-[10px] text-amber-500 font-bold">{t('reports_analysisTypeLabel')}</div>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-6">
                    <Target size={18} className="text-primary" />
                    {t('reports_responseIndicators')}
                  </h3>
                  <div className="space-y-5">
                    {[
                      { label: t('reports_attentionEngagement'), value: selectedReport.indicators.attention, color: 'bg-primary' },
                      { label: t('reports_vocalActivityLabel'), value: selectedReport.indicators.vocalActivity, color: 'bg-amber-500' },
                      { label: t('reports_eyeContactLabel'), value: selectedReport.indicators.eyeContact, color: 'bg-blue-500' },
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
                    {t('reports_voiceAnalysisLabel')}
                  </h3>
                  <div className="flex gap-4 mb-4 text-[10px] font-bold">
                    <div className="flex items-center gap-1 text-green-500"><div className="w-2 h-2 bg-green-500 rounded-full" /> {t('reports_calm')}</div>
                    <div className="flex items-center gap-1 text-red-500"><div className="w-2 h-2 bg-red-500 rounded-full" /> {t('reports_tension')}</div>
                  </div>
                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedReport.voiceData}>
                        <defs>
                          <linearGradient id="reportVoiceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0d6e6e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#0d6e6e" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                        <YAxis hide />
                        <Area type="monotone" dataKey="value" stroke="#0d6e6e" strokeWidth={2} fillOpacity={1} fill="url(#reportVoiceGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Brain size={18} className="text-primary" />
                    {t('reports_clinicalNotesLabel')}
                  </h3>
                  <div className="space-y-3">
                    {selectedReport.notes.map((note, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex justify-between mb-2">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                            note.status === 'positive' ? 'bg-green-100 text-green-700' :
                            note.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>{t(noteTypeKeyMap[note.type] || note.type)}</span>
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
                    {t('reports_therapeuticRecs')}
                  </h3>
                  <div className="space-y-3">
                    {selectedReport.recommendations.map((rec, i) => (
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
                    {t('reports_downloadPdf')}
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
    </DashboardLayout>
  );
}
