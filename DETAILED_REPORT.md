# ملخص مشروع نبض (Nabd) - التقنيات والأكواد

> **تاريخ التقرير:** 21 أبريل 2026  
> **الإصدار:** 0.0.0  

---

## 1. نظرة عامة

**نبض (Nabd)** هو نظام ذكي لدعم التقييم النفسي للأطفال المتضررين في الحروب باستخدام تحليل السلوك غير اللفظي والصوت.

### معلومات المشروع

| الحقل | القيمة |
|-------|--------|
| **نوع المشروع** | Frontend SPA (Single Page Application) |
| **المنفذ** | `localhost:3000` |
| **الاتجاه** | RTL (عربي بالكامل) |
| **نقطة الدخول** | `src/main.tsx` |

---

## 2. التقنيات المستخدمة

### 2.1 الإطار الأساسي

| التقنية | الإصدار | الدور |
|---------|---------|-------|
| **React** | 19.0.0 | إطار واجهة المستخدم |
| **TypeScript** | 5.8.2 | لغة البرمجة المكتوبة |
| **Vite** | 6.2.0 | أداة البناء والتطوير |
| **Tailwind CSS** | 4.1.14 | إطار التنسيق (Utility-first) |

### 2.2 المكتبات الرئيسية

| المكتبة | الإصدار | الغرض |
|---------|---------|-------|
| **react-router-dom** | 7.14.0 | التنقل بين الصفحات |
| **motion** | 12.23.24 | الحركات والتأثيرات (Framer Motion) |
| **recharts** | 3.8.1 | الرسوم البيانية التفاعلية |
| **lucide-react** | 0.546.0 | الأيقونات بصيغة SVG |
| **@google/genai** | 1.29.0 | ربط Gemini AI |
| **clsx** | 2.1.1 | دمج أسماء CSS الشرطية |
| **tailwind-merge** | 3.5.0 | حل تعارضات Tailwind |

### 2.3 أدوات التطوير

| الأداة | الإصدار | الغرض |
|--------|---------|-------|
| **autoprefixer** | 10.4.21 | بادئات المتصفح |
| **tsx** | 4.21.0 | مشغل TypeScript |

---

## 3. هيكل المشروع

```
nabd/
├── index.html                 # صفحة HTML الرئيسية
├── package.json               # إعدادات المشروع والتبعيات
├── vite.config.ts             # إعدادات Vite
├── tsconfig.json              # إعدادات TypeScript
├── src/
│   ├── main.tsx               # نقطة دخول React
│   ├── App.tsx                # المكوّن الجذري + التوجيه
│   ├── index.css              # التنسيقات العامة
│   ├── lib/
│   │   ├── utils.ts           # دالة cn() المساعدة
│   │   └── i18n.tsx           # نظام اللغات (عربي/إنجليزي)
│   ├── components/
│   │   └── layout/
│   │       └── DashboardLayout.tsx  # قالب لوحة التحكم
│   └── pages/
│       ├── LandingPage.tsx    # الصفحة الرئيسية
│       ├── AboutPage.tsx      # صفحة "عن المشروع"
│       ├── ArticlesPage.tsx   # صفحة المقالات
│       ├── ArticleDetailPage.tsx  # تفاصيل المقال
│       ├── LoginPage.tsx      # تسجيل الدخول
│       ├── ContactPage.tsx    # صفحة التواصل
│       ├── PricingPage.tsx    # صفحة الأسعار
│       ├── Dashboard.tsx      # لوحة التحكم الرئيسية
│       ├── RealTimeAnalysis.tsx   # التحليل اللحظي
│       ├── VideoAnalysis.tsx      # تحليل الفيديو
│       ├── ReportsPage.tsx       # التقارير
│       ├── ChildProfiles.tsx     # ملفات الأطفال
│       └── Settings.tsx          # الإعدادات
```

---

## 4. نظام التوجيه (Routing)

### 4.1 المسارات العامة (Public Routes)

| المسار | المكون | الوصف |
|--------|--------|-------|
| `/` | `LandingPage` | الصفحة الرئيسية |
| `/about` | `AboutPage` | صفحة "عن المشروع" |
| `/articles` | `ArticlesPage` | صفحة المقالات |
| `/articles/:id` | `ArticleDetailPage` | تفاصيل المقال |
| `/login` | `LoginPage` | تسجيل الدخول |
| `/contact` | `ContactPage` | صفحة التواصل |
| `/pricing` | `PricingPage` | صفحة الأسعار |

### 4.2 مسارات لوحة التحكم (Dashboard Routes)

| المسار | المكون | الوصف |
|--------|--------|-------|
| `/dashboard` | `Dashboard` | لوحة التحكم الرئيسية |
| `/dashboard/real-time` | `RealTimeAnalysis` | التحليل اللحظي |
| `/dashboard/video-analysis` | `VideoAnalysis` | تحليل الفيديو |
| `/dashboard/reports` | `ReportsPage` | صفحة التقارير |
| `/dashboard/profiles` | `ChildProfiles` | ملفات الأطفال |
| `/dashboard/settings` | `Settings` | الإعدادات |

### 4.3 المسار الاحتياطي

```tsx
<Route path="*" element={<Navigate to="/" replace />} />
```

---

## 5. المكونات الرئيسية

### 5.1 `DashboardLayout` - قالب لوحة التحكم

**الوظيفة:** قالب مشترك لكل صفحات لوحة التحكم

**الهيكل:**
```
┌──────────────────────────────────────────────────┐
│  الشريط الجانبي  │  الشريط العلوي (Header)         │
│  ┌────────────┐  │  ┌──────────────────────────┐  │
│  │ نبض (Logo) │  │  │ بحث │ إشعارات │ المستخدم │  │
│  ├────────────┤  │  └──────────────────────────┘  │
│  │ لوحة التحكم│  │                                │
│  │ التحليل    │  │  ┌──────────────────────────┐  │
│  │ تحليل فيديو│  │  │     المحتوى (children)    │  │
│  │ التقارير   │  │  │                          │  │
│  │ ملفات أطفال│  │  └──────────────────────────┘  │
│  │ الإعدادات  │  │                                │
│  ├────────────┤  │                                │
│  │ تسجيل خروج│  │                                │
│  └────────────┘  │                                │
└──────────────────────────────────────────────────┘
```

**الخصائص:**
```tsx
interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}
```

### 5.2 نظام اللغات (i18n)

**الموقع:** `src/lib/i18n.tsx`

**الوظيفة:** نظام تدويل كامل يدعم العربية والإنجليزية

```tsx
type Lang = 'ar' | 'en';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  t: (key: string) => string;
}
```

**الاستخدام:**
```tsx
const { lang, setLang, t } = useLanguage();
// t('dash_title') → "لوحة التحكم" أو "Dashboard"
```

---

## 6. نظام التصميم

### 6.1 الألوان الأساسية

| اللون | الكود | المتغير | الاستخدام |
|-------|-------|---------|----------|
| Primary | `#0d6e6e` | `--color-primary` | الأزرار، العناوين |
| Primary Dark | `#0a5a5a` | `--color-primary-dark` | حالة hover |
| Primary Light | `#e6f2f2` | `--color-primary-light` | خلفيات فاتحة |
| خلفية الصفحة | `#f8fafc` | - | خلفية عامة |

### 6.2 أنماط التصميم

| النمط | القيمة |
|-------|--------|
| حواف البطاقات الكبيرة | `rounded-[2.5rem]` |
| حواف البطاقات الصغيرة | `rounded-2xl` |
| حواف النوافذ المنبثقة | `rounded-[2rem]` |
| ظل البطاقات | `border border-slate-100 shadow-sm` |
| ظل الأزرار | `shadow-lg shadow-primary/20` |
| خلفية النوافذ | `bg-black/50 backdrop-blur-sm` |
| رأس النوافذ | `bg-gradient-to-l from-primary to-teal-600` |

### 6.3 أنماط الحركات (Motion)

```tsx
// ظهور عنصر من الأسفل
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: i * 0.1 }}

// ظهور نافذة منبثقة (زنبرك)
initial={{ opacity: 0, scale: 0.9, y: 40 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ type: 'spring', damping: 25, stiffness: 300 }}

// رفع بطاقة عند التحويم
whileHover={{ y: -5 }}
```

---

## 7. المكتبات بالتفصيل

### 7.1 React Router DOM

| الدالة | الاستخدام |
|--------|----------|
| `BrowserRouter` | مكوّن جذر للتنقل |
| `Routes` + `Route` | تعريف المسارات |
| `Navigate` | إعادة توجيه |
| `Link` | رابط داخلي |
| `useNavigate()` | التنقل برمجياً |
| `useLocation()` | قراءة المسار + state |

### 7.2 Motion (Framer Motion)

| المكوّن | الاستخدام |
|---------|----------|
| `motion.div` | عنصر مع حركات |
| `AnimatePresence` | حركات الخروج |
| `initial` | حالة البداية |
| `animate` | حالة النهاية |
| `exit` | حالة الخروج |
| `whileHover` | حركة التحويم |

### 7.3 Recharts

| المكوّن | الاستخدام |
|---------|----------|
| `BarChart` + `Bar` | أعمدة بيانية |
| `AreaChart` + `Area` | مساحة ملوّنة |
| `PieChart` + `Pie` | دائري |
| `ResponsiveContainer` | تكيف الحجم |
| `XAxis`, `YAxis` | المحاور |
| `Tooltip` | تلميح التحويم |

### 7.4 Lucide React

الأيقونات المستخدمة: `Activity`, `FileText`, `Users`, `Camera`, `Video`, `Search`, `Trash2`, `Plus`, `X`, `Download`, `Share2`, `Printer`, `Settings`, `LogOut`, `Heart`, `AlertTriangle`, `Phone`, `Mail`

---

## 8. تدفق البيانات

### نقل البيانات بين الصفحات

```
ChildProfiles (/dashboard/profiles)
    │
    ├── navigate('/dashboard/real-time', { state: { child } })
    │       ↓
    │   RealTimeAnalysis
    │       │  يقرأ: location.state.child
    │       │  يعرض: شريط معلومات الطفل
    │       │
    │       ├── navigate('/dashboard/reports', { state: { newReport } })
    │       │       ↓
    │       │   ReportsPage
    │       │       يضيف التقرير للقائمة
    │       │
    ├── navigate('/dashboard/video-analysis', { state: { child } })
    │       ↓ (نفس التدفق)
    │
    └── setShowReportModal(true)
            نافذة تقرير تفصيلي
```

---

## 9. أوامر التشغيل

```bash
npm run dev      # تشغيل خادم التطوير (localhost:3000)
npm run build    # بناء نسخة الإنتاج
npm run preview  # عرض نسخة الإنتاج
npm run clean    # حذف مجلد dist
npm run lint     # فحص TypeScript
```

---

## 10. الميزات المنجزة

| الميزة | الحالة |
|--------|--------|
| نظام التوجيه (14 مسار) | ✅ مكتمل |
| الصفحات العامة (7 صفحات) | ✅ مكتمل |
| صفحات لوحة التحكم (6 صفحات) | ✅ مكتمل |
| ملفات الأطفال (CRUD) | ✅ إضافة + حذف + عرض |
| التحليل اللحظي مع بيانات الطفل | ✅ مكتمل |
| تحليل الفيديو مع بيانات الطفل | ✅ مكتمل |
| نظام التقارير التفصيلية | ✅ مكتمل |
| تصميم RTL عربي | ✅ مكتمل |
| نظام اللغات (عربي/إنجليزي) | ✅ مكتمل |
| حركات وتأثيرات بصرية | ✅ مكتمل |
| المظهر الداكن | ✅ مكتمل |

---

## 11. الخطوات التالية

| الأولوية | المهمة |
|----------|--------|
| عالية | نظام مصادقة حقيقي |
| عالية | حماية مسارات Dashboard |
| عالية | إنشاء Backend API |
| متوسطة | ربط Gemini AI للتحليل الحقيقي |
| متوسطة | حفظ البيانات في localStorage |
| متوسطة | تصدير PDF حقيقي |

---

*نهاية التقرير*