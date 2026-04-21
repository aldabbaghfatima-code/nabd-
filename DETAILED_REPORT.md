# تقرير مشروع نبض (Nabd) - شرح تفصيلي شامل للكود البرمجي

> **إعداد:** تقرير تقني أكاديمي شامل  
> **التاريخ:** 15 أبريل 2026  
> **الإصدار:** 0.0.0  
> **البيئة:** React 19 + TypeScript 5.8 + Vite 6.2 + Tailwind CSS 4.1

---

## الفهرس

1. [نظرة عامة على المشروع](#1-نظرة-عامة-على-المشروع)
2. [ملفات البناء والإعدادات](#2-ملفات-البناء-والإعدادات)
3. [نقطة الدخول والتمهيد](#3-نقطة-الدخول-والتمهيد)
4. [نظام التوجيه (Routing)](#4-نظام-التوجيه-routing)
5. [مكون التخطيط الرئيسي (DashboardLayout)](#5-مكون-التخطيط-الرئيسي-dashboardlayout)
6. [الصفحات العامة](#6-الصفحات-العامة)
7. [صفحات لوحة التحكم](#7-صفحات-لوحة-التحكم)
8. [نظام تنقل البيانات بين الصفحات](#8-نظام-تنقل-البيانات-بين-الصفحات)
9. [نظام التصميم والألوان](#9-نظام-التصميم-والألوان)
10. [المكتبات والتبعيات](#10-المكتبات-والتبعيات)
11. [ملخص تدفق المستخدم الكامل](#11-ملخص-تدفق-المستخدم-الكامل)

---

## 1. نظرة عامة على المشروع

### 1.1 الفكرة

**نبض (Nabd)** هو نظام ذكي لدعم التقييم النفسي للأطفال المتضررين في الحروب. يقوم بتحليل السلوك غير اللفظي والصوت باستخدام الذكاء الاصطناعي لتقديم تقارير تقييمية تساعد المعالجين النفسيين.

### 1.2 البنية التقنية

| التقنية | الإصدار | الدور |
|---------|---------|-------|
| React | 19.0.0 | إطار واجهة المستخدم (UI Framework) |
| TypeScript | 5.8.2 | لغة البرمجة المكتوبة (توفر أنواع بيانات ثابتة) |
| Vite | 6.2.0 | أداة البناء والتطوير (أسرع من Webpack) |
| Tailwind CSS | 4.1.14 | إطار تنسيق CSS مبني على الأدوات المساعدة (Utility-first) |
| React Router DOM | 7.14.0 | نظام التنقل بين الصفحات (Client-side routing) |
| Motion (Framer Motion) | 12.23.24 | مكتبة الحركات والتأثيرات البصرية |
| Recharts | 3.8.1 | مكتبة الرسوم البيانية |
| Lucide React | 0.546.0 | مكتبة الأيقونات بصيغة SVG |
| Google Gemini AI SDK | 1.29.0 | ربط مع نموذج الذكاء الاصطناعي من Google |

### 1.3 هيكل المجلدات

```
nabd/
├── index.html                    ← صفحة HTML الرئيسية
├── package.json                  ← إعدادات المشروع والتبعيات
├── vite.config.ts                ← إعدادات أداة البناء Vite
├── tsconfig.json                 ← إعدادات مترجم TypeScript
├── src/
│   ├── main.tsx                  ← نقطة دخول React
│   ├── App.tsx                   ← المكوّن الجذري + التوجيه
│   ├── index.css                 ← التنسيقات العامة
│   ├── lib/
│   │   ├── utils.ts              ← دالة cn() المساعدة
│   │   └── i18n.tsx              ← نظام اللغات (عربي/إنجليزي)
│   ├── components/
│   │   └── layout/
│   │       └── DashboardLayout.tsx ← قالب لوحة التحكم المشترك
│   └── pages/
│       ├── LandingPage.tsx       ← الصفحة الرئيسية
│       ├── AboutPage.tsx         ← صفحة "عن المشروع"
│       ├── ArticlesPage.tsx      ← صفحة المقالات
│       ├── LoginPage.tsx         ← تسجيل الدخول
│       ├── Dashboard.tsx         ← لوحة التحكم
│       ├── RealTimeAnalysis.tsx  ← التحليل اللحظي
│       ├── VideoAnalysis.tsx     ← تحليل الفيديو
│       ├── ReportsPage.tsx       ← التقارير
│       ├── ChildProfiles.tsx     ← ملفات الأطفال
│       └── Settings.tsx          ← الإعدادات
```

---

## 2. ملفات البناء والإعدادات

### 2.1 `index.html` - صفحة HTML الرئيسية

```html
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>نبض - نظام التقييم النفسي للأطفال</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**الشرح:**
- `lang="ar"`: يحدد لغة الصفحة كعربية - يساعد محركات البحث وقارئات الشاشة
- `dir="rtl"`: اتجاه النص من اليمين لليسار (Right-To-Left)
- `<div id="root">`: الحاوية التي سيرسم فيها React التطبيق بالكامل
- `<script type="module">`: يحمّل ملف TypeScript الرئيسي كوحدة ES Module
- العنوان `<title>` يظهر في تبويب المتصفح

---

### 2.2 `package.json` - إعدادات المشروع والتبعيات

```json
{
  "name": "nabd",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist",
    "lint": "tsc --noEmit"
  }
}
```

**الشرح:**
- `"name": "nabd"`: اسم المشروع في npm
- `"type": "module"`: يستخدم ES Modules (استيراد/تصدير حديث) بدل CommonJS
- `"scripts"`: أوامر التشغيل:
  - `npm run dev`: يبدأ خادم التطوير على المنفذ 3000 ويتيح الوصول من أي جهاز على الشبكة (`--host=0.0.0.0`)
  - `npm run build`: يبني نسخة الإنتاج في مجلد `dist/`
  - `npm run lint`: يفحص TypeScript بدون إنشاء ملفات (noEmit)

**التبعيات (dependencies):** مكتبات يعمل بها التطبيق في المتصفح:
- `react` + `react-dom`: مكتبة بناء واجهات المستخدم
- `react-router-dom`: التنقل بين الصفحات بدون إعادة تحميل
- `motion`: الحركات والتأثيرات (كانت تُعرف بـ Framer Motion)
- `recharts`: الرسوم البيانية التفاعلية
- `lucide-react`: أيقونات SVG خفيفة
- `clsx` + `tailwind-merge`: دمج أسماء CSS بشكل ذكي
- `@google/genai`: التواصل مع Gemini AI
- `express`: خادم ويب (غير مُفعّل حالياً)

**تبعيات التطوير (devDependencies):** أدوات البناء والفحص:
- `typescript`: المترجم
- `tailwindcss` + `@tailwindcss/vite`: إطار CSS
- `vite` + `@vitejs/plugin-react`: أداة البناء مع دعم React Fast Refresh

---

### 2.3 `vite.config.ts` - إعدادات Vite

```typescript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
```

**الشرح سطراً بسطر:**

| السطر | الوظيفة |
|-------|---------|
| `import tailwindcss` | يستورد إضافة Tailwind CSS v4 الخاصة بـ Vite |
| `import react` | يستورد إضافة React (تُفعّل Fast Refresh) |
| `defineConfig(({mode}) => {...})` | دالة إعداد Vite تستقبل وضع التشغيل (development/production) |
| `loadEnv(mode, '.', '')` | يقرأ متغيرات البيئة من ملف `.env` |
| `plugins: [react(), tailwindcss()]` | الإضافات المُفعّلة: React + Tailwind |
| `define: { process.env.GEMINI_API_KEY }` | يعرّف مفتاح Gemini كمتغير عام في المتصفح |
| `resolve.alias: { '@': ... }` | اختصار: بدل `../../lib/utils` نكتب `@/lib/utils` |
| `server.hmr` | التحكم بـ Hot Module Replacement (إعادة تحميل تلقائية عند التعديل) |

---

### 2.4 `tsconfig.json` - إعدادات TypeScript

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "paths": { "@/*": ["./*"] },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

**الشرح:**
- `target: "ES2022"`: يحوّل TypeScript إلى JavaScript حديث (يدعم المتصفحات الحديثة)
- `module: "ESNext"`: يستخدم أحدث نظام وحدات (import/export)
- `jsx: "react-jsx"`: يحوّل JSX (HTML داخل JavaScript) بدون استيراد React صراحة
- `moduleResolution: "bundler"`: مناسب لـ Vite كأداة بناء
- `paths: { "@/*": ... }`: اختصار المسارات (Alias)
- `noEmit: true`: يفحص الأنواع فقط بدون إنشاء ملفات JS (Vite يتكفل بالبناء)

---

## 3. نقطة الدخول والتمهيد

### 3.1 `src/main.tsx` - نقطة دخول React

```tsx
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**الشرح:**
- `StrictMode`: وضع التطوير الصارم - يكتشف الأخطاء الشائعة (استدعاءات مزدوجة، تأثيرات جانبية غير آمنة)
- `createRoot()`: طريقة React 19 لإنشاء شجرة العرض - تُفعّل الميزات المتزامنة (Concurrent Features)
- `document.getElementById('root')!`: علامة `!` تخبر TypeScript أن العنصر موجود أكيداً (Non-null assertion)
- `<App />`: المكوّن الجذري الذي يحتوي التطبيق بالكامل

### 3.2 `src/index.css` - التنسيقات العامة

```css
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Cairo", ui-sans-serif, system-ui, sans-serif;
  --color-primary: #0d6e6e;
  --color-primary-dark: #0a5a5a;
  --color-primary-light: #e6f2f2;
}

@layer base {
  html {
    direction: rtl;
    font-family: var(--font-sans);
  }
  body {
    @apply bg-[#f8fafc] text-slate-900;
  }
}
```

**الشرح:**
- السطر 1: يحمّل خط **Cairo** العربي من Google Fonts بأوزان من 300 (خفيف) إلى 800 (عريض جداً)
- `@import "tailwindcss"`: يستورد Tailwind CSS v4 (النسخة الجديدة تستخدم `@import` بدل ملف config)
- `@theme`: يعرّف متغيرات مخصصة لـ Tailwind:
  - `--font-sans`: الخط الافتراضي لكل النصوص
  - `--color-primary: #0d6e6e`: اللون الأساسي (أخضر مزرق - Teal)
  - `--color-primary-dark: #0a5a5a`: نسخة أغمق لحالة hover
  - `--color-primary-light: #e6f2f2`: نسخة فاتحة للخلفيات
- `@layer base`: تنسيقات أساسية تُطبّق على كل الصفحات:
  - `direction: rtl`: اتجاه النص من اليمين لليسار
  - `font-family`: تطبيق خط Cairo
  - لون الخلفية `#f8fafc` (رمادي فاتح جداً) + لون النص `slate-900` (رمادي غامق)

### 3.3 `src/lib/utils.ts` - دالة مساعدة

```tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**الشرح:**
- `cn()`: دالة مساعدة تدمج أسماء CSS Classes بذكاء
- `clsx`: يدمج الأسماء الشرطية (مثال: `clsx('base', active && 'active')` ← `'base active'`)
- `twMerge`: يحل تعارضات Tailwind (مثال: `twMerge('px-4', 'px-6')` ← `'px-6'` يربح)
- **مثال استخدام:** `className={cn('p-4 rounded-xl', isActive && 'bg-primary text-white')}`

---

## 4. نظام التوجيه (Routing)

### 4.1 `src/App.tsx` - المكوّن الجذري

```tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// ... باقي الاستيرادات
import { LanguageProvider } from './lib/i18n';

export default function App() {
  return (
    <LanguageProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/real-time" element={<RealTimeAnalysis />} />
        <Route path="/dashboard/video-analysis" element={<VideoAnalysis />} />
        <Route path="/dashboard/reports" element={<ReportsPage />} />
        <Route path="/dashboard/profiles" element={<ChildProfiles />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </LanguageProvider>
  );
}
```

**الشرح المفصّل:**

| المكوّن | الدور |
|---------|-------|
| `BrowserRouter as Router` | يتيح التنقل بدون إعادة تحميل الصفحة باستخدام History API |
| `Routes` | حاوية تحدد أي مكوّن يظهر لأي مسار |
| `Route path="..." element={<... />}` | يربط مسار URL بمكوّن React |
| `Navigate to="/" replace` | يعيد التوجيه لأي مسار غير معرّف (*) |

**تصنيف المسارات:**

| النوع | المسارات | الوصف |
|-------|---------|-------|
| عامة | `/` `/about` `/articles` `/login` | متاحة للجميع بدون تسجيل دخول |
| لوحة تحكم | `/dashboard/*` | صفحات العمل الرئيسية (غير محمية حالياً) |
| احتياطي | `*` | أي مسار آخر ← يُعاد التوجيه للرئيسية |

**`LanguageProvider`:** مكوّن سياق (Context) يوفر نظام اللغات (عربي/إنجليزي) لكل التطبيق.

---

## 5. مكون التخطيط الرئيسي (DashboardLayout)

### 5.1 `src/components/layout/DashboardLayout.tsx`

هذا المكوّن هو **القالب المشترك** لكل صفحات لوحة التحكم. يوفر:

```
┌──────────────────────────────────────────────────┐
│  الشريط الجانبي (Sidebar)  │  الشريط العلوي (Header)  │
│  ┌────────────┐            │  ┌──────────────────┐  │
│  │ نبض (Logo) │            │  │ بحث │ إشعارات │   │  │
│  ├────────────┤            │  └──────────────────┘  │
│  │ لوحة التحكم│            │                        │
│  │ التحليل    │            │  ┌──────────────────┐  │
│  │ تحليل فيديو│            │  │                  │  │
│  │ التقارير   │            │  │   المحتوى        │  │
│  │ ملفات أطفال│            │  │   (children)     │  │
│  │ الإعدادات  │            │  │                  │  │
│  ├────────────┤            │  └──────────────────┘  │
│  │ تسجيل خروج│            │                        │
│  └────────────┘            │                        │
└──────────────────────────────────────────────────┘
```

**آلية العمل:**

```tsx
interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}
```

- `children`: المحتوى الخاص بكل صفحة (يُمرَّر كعنصر فرعي)
- `title`: عنوان الصفحة الظاهر في الأعلى

**الشريط الجانبي (Sidebar):**
- مصفوفة `menuItems` تحتوي 6 عناصر، كل عنصر يحتوي: `icon` (أيقونة)، `label` (اسم)، `path` (مسار)
- `useLocation()` يحدد الصفحة الحالية لتمييز العنصر النشط بلون مختلف
- `cn()` تدمج الأنماط الشرطية: عنصر نشط ← خلفية خضراء، عنصر عادي ← شفاف

**الشريط العلوي (Header):**
- حقل بحث (غير مفعّل حالياً)
- أيقونة إشعارات مع شارة حمراء (رقم 3)
- معلومات المستخدم: الاسم + اللقب + الصورة

---

## 6. الصفحات العامة

### 6.1 `src/pages/LandingPage.tsx` - الصفحة الرئيسية (256 سطر)

**الأقسام:**

| القسم | الأسطر | الوصف |
|-------|--------|-------|
| Navbar | 9-34 | شريط تنقل علوي ثابت مع روابط وأزرار |
| Hero | 37-105 | قسم ترحيبي بعنوان كبير + صورة + أزرار CTA |
| Features | 108-150 | 3 بطاقات ميزات (تحليل متعدد الوسائط، تحليل حي، تقارير) |
| Stats | 153-169 | إحصائيات على خلفية خضراء (95% دقة، 12k+ جلسة، 24/7 دعم، +50 منظمة) |
| CTA | 172-194 | دعوة للتسجيل بخلفية داكنة |
| Footer | 197-253 | تذييل بأربعة أعمدة (عن نبض، روابط، دعم، اشتراك) |

**تقنيات مستخدمة:**
- `motion.div`: حركات ظهور العناصر (opacity + x/scale)
- `whileHover={{ y: -10 }}`: رفع البطاقة عند التحويم
- `Link to="..."`: تنقل داخلي بدون إعادة تحميل
- `bg-white/80 backdrop-blur-md`: خلفية شبه شفافة مع تأثير ضبابي

### 6.2 `src/pages/AboutPage.tsx` - صفحة "عن المشروع" (112 سطر)

تحتوي على:
- **قسم تعريفي** مع عنوان "كل طفل يستحق أن يُسمع" + إحصائيات
- **قسم الرسالة والرؤية** في بطاقتين متقابلتين (خضراء + رمادية)
- **المنهجية العلمية** في 3 بطاقات (تحليل سلوكي، ذكاء اصطناعي متعاطف، خصوصية)

### 6.3 `src/pages/ArticlesPage.tsx` - صفحة المقالات (181 سطر)

- **مقال مميز** رئيسي كبير بصورة + عنوان + ملخص
- **أزرار تصنيف** (الكل، علم النفس، الذكاء الاصطناعي...)
- **شبكة مقالات** من 3 بطاقات، كل بطاقة تحتوي: صورة، تصنيف، عنوان، ملخص، مؤلف، تاريخ

### 6.4 `src/pages/LoginPage.tsx` - تسجيل الدخول (129 سطر)

**التخطيط:** صفحة مقسومة نصفين:
- **اليسار:** نموذج تسجيل (بريد + كلمة مرور + تذكرني + زر دخول)
- **اليمين:** صورة خلفية مع شعار نبض واقتباس تحفيزي

**المنطق:**
```tsx
const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  navigate('/dashboard');
};
```
- أي بيانات تُقبل ويتوجه مباشرة للوحة التحكم (لا يوجد تحقق حقيقي)
- `e.preventDefault()` يمنع إعادة تحميل الصفحة
- `useNavigate()` ينتقل برمجياً للمسار المحدد

---

## 7. صفحات لوحة التحكم

### 7.1 `src/pages/Dashboard.tsx` - لوحة التحكم الرئيسية (221 سطر)

**المحتوى:**

| القسم | الوصف |
|-------|-------|
| 4 بطاقات إحصائيات | إجمالي الأطفال (124)، جلسات نشطة (08)، تنبيهات حرجة (03)، جلسات قادمة (05) |
| BarChart | اتجاهات الحالة العاطفية خلال الأسبوع (7 أيام) |
| رؤية عيادية | بطاقة بخلفية داكنة مع توصية ذكية |
| جدول التقييمات | 3 تقييمات أخيرة (اسم، نوع، حالة، وقت) |
| الجلسات القادمة | 3 جلسات مع أسماء ومواعيد |

**البيانات:** مصفوفة `data` ثابتة تحتوي 7 أيام بقيم مختلفة.

### 7.2 `src/pages/RealTimeAnalysis.tsx` - التحليل اللحظي (285 سطر)

**الغرض:** صفحة بث مباشر بتحليل فوري للسلوك والصوت.

**تخطيط الصفحة (4 أعمدة):**

```
┌──────────┬───────────────────────────────────────┐
│  العمود  │         العمود الرئيسي (3 أعمدة)      │
│  الأيسر  │  ┌─────────────────────────────────┐  │
│ ┌──────┐ │  │     بث الفيديو المباشر          │  │
│ │جلسة  │ │  │     (صورة + تتبع الوجه + حالة) │  │
│ │نشطة  │ │  └─────────────────────────────────┘  │
│ ├──────┤ │  ┌─────────────────────────────────┐  │
│ │مؤشرات│ │  │     رسم تحليل الصوت (AreaChart) │  │
│ ├──────┤ │  └─────────────────────────────────┘  │
│ │ملاحظات│ │                                       │
│ └──────┘ │                                       │
└──────────┴───────────────────────────────────────┘
```

**استقبال بيانات الطفل:**
```tsx
const location = useLocation();
const child = location.state?.child as { ... } | undefined;
```
- يقرأ بيانات الطفل من حالة التنقل (navigation state)
- إذا وُجد طفل ← يعرض شريط معلومات الطفل في الأعلى
- إذا لم يُوجد ← يعرض الواجهة الافتراضية

**تصدير التقرير:**
```tsx
const handleSaveReport = () => {
  const report = {
    id: Date.now(),
    title: `تقرير تحليل لحظي - ${child?.name}`,
    type: 'تحليل لحظي',
    // ...
  };
  navigate('/dashboard/reports', { state: { newReport: report } });
};
```
- ينشئ كائن تقرير ببيانات الطفل والجلسة
- ينتقل لصفحة التقارير مع تمرير التقرير عبر navigation state

**شريط معلومات الطفل:**
- صورة الطفل + اسمه + شارة الشدة (أخضر/برتقالي/أحمر)
- العمر، الجنس، التشخيص، رقم الجلسة الحالية
- زر "حفظ كتقرير"

### 7.3 `src/pages/VideoAnalysis.tsx` - تحليل الفيديو (262 سطر)

**الغرض:** تحليل مقطع فيديو مسجل للطفل.

**نفس نمط RealTimeAnalysis:**
- شريط معلومات الطفل في الأعلى (يُقرأ من `location.state.child`)
- زر "تصدير التقرير" ينشئ تقرير نوعه "تحليل فيديو"
- مشغل فيديو مع شريط تقدم ومؤشرات
- رسم تحليل الصوت (BarChart بدل AreaChart)
- شريط جانبي: مؤشرات + ملاحظات + حالة الذكاء الاصطناعي

### 7.4 `src/pages/ChildProfiles.tsx` - ملفات الأطفال (830+ سطر)

**أكثر صفحة تعقيداً في المشروع.** تحتوي على 3 نوافذ منبثقة ونظام تفاعلي كامل.

#### 7.4.1 نوع البيانات (TypeScript Interface)

```typescript
interface ChildProfile {
  id: number;
  name: string;
  age: string;
  ageNumber: number;
  gender: string;
  status: string;          // 'قيد التقييم' | 'تقييم مكتمل'
  lastUpdate: string;
  tag: string;             // التشخيص المبدئي
  image: string;
  phone: string;
  email: string;
  guardian: string;        // ولي الأمر
  guardianPhone: string;
  notes: string;           // ملاحظات سريرية
  sessions: number;
  completedSessions: number;
  startDate: string;
  severity: string;        // 'خفيف' | 'متوسط' | 'شديد'
}
```

#### 7.4.2 إدارة الحالة (State Management)

```typescript
const [profiles, setProfiles] = useState<ChildProfile[]>(initialProfiles);
const [selectedProfile, setSelectedProfile] = useState<ChildProfile | null>(null);
const [showAddModal, setShowAddModal] = useState(false);
const [showSessionOptions, setShowSessionOptions] = useState(false);
const [showReportModal, setShowReportModal] = useState(false);
const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
const [formData, setFormData] = useState({ ... });
```

| الحالة | النوع | الغرض |
|--------|-------|-------|
| `profiles` | `ChildProfile[]` | قائمة الأطفال (ديناميكية - تُحدَّث بالإضافة والحذف) |
| `selectedProfile` | `ChildProfile \| null` | الطفل المحدد لعرض تفاصيله |
| `showAddModal` | `boolean` | إظهار/إخفاء نافذة إضافة طفل |
| `showSessionOptions` | `boolean` | إظهار/إخفاء خيارات نوع الجلسة |
| `showReportModal` | `boolean` | إظهار/إخفاء نافذة التقرير التفصيلي |
| `deleteConfirmId` | `number \| null` | معرّف الطفل المراد تأكيد حذفه |
| `formData` | `object` | بيانات نموذج إضافة طفل جديد |

#### 7.4.3 الدوال التفاعلية

| الدالة | الوظيفة |
|--------|---------|
| `handleAddChild()` | تتحقق من الحقول المطلوبة → تنشئ `ChildProfile` → تضيفه لبداية القائمة → تغلق النافذة |
| `handleDeleteChild(id)` | تحذف الطفل من القائمة → تغلق نافذة العرض والتأكيد |
| `closeViewModal()` | تغلق كل النوافذ وتُعيد تعيين الحالات |

#### 7.4.4 النوافذ المنبثقة (Modals)

**1. نافذة عرض الملف الشخصي (View Profile):**
- رأس متدرج (خلفية خضراء) مع صورة واسم وتشخيص
- إحصائيات سريعة: إجمالي الجلسات، المكتملة، نسبة التقدم
- شريط تقدم متحرك (animated progress bar)
- شبكة بيانات: بيانات الطفل + بيانات ولي الأمر + مستوى الخطورة
- ملاحظات سريرية
- أزرار: بدء جلسة جديدة ← يفتح خيارات (تحليل لحظي / تحليل فيديو)
- زر عرض التقارير ← يفتح نافذة التقرير التفصيلي مباشرة
- زر حذف ← يطلب تأكيد

**2. نافذة خيارات الجلسة:**
```
┌─────────────────────────────────────────┐
│  اختر نوع الجلسة:                       │
│  ┌─────────────────┬─────────────────┐  │
│  │   📷 كاميرا     │   🎬 فيديو      │  │
│  │ التحليل اللحظي  │ تحليل الفيديو   │  │
│  │ بث مباشر        │ مقطع مسجل       │  │
│  └─────────────────┴─────────────────┘  │
└─────────────────────────────────────────┘
```
- كل زر ينقل لصفحة التحليل مع بيانات الطفل عبر `navigate(path, { state: { child } })`

**3. نافذة التقرير التفصيلي (Report Modal):**
- رأس متدرج مع اسم الطفل والتاريخ والحالة
- ملخص الحالة (الملاحظات السريرية)
- 4 إحصائيات: إجمالي الجلسات، المكتملة، نسبة التقدم، الحالة العاطفية
- مؤشرات الاستجابة (4 أشرطة تقدم متحركة)
- تحليل النبرة الصوتية (رسم AreaChart)
- ملاحظات إكلينيكية مفصلة
- توصيات علاجية مرقمة
- أزرار: تحميل PDF، طباعة، مشاركة

**4. نافذة إضافة طفل جديد (Add Child Modal):**
- 3 أقسام: بيانات الطفل، بيانات ولي الأمر، ملاحظات أولية
- حقول مطلوبة (*): الاسم، العمر، ولي الأمر
- زر الإرسال مُعطّل حتى تُملأ الحقول المطلوبة

#### 7.4.5 الحركات (Animations)

```tsx
<motion.div 
  initial={{ opacity: 0, y: 20 }}    // يبدأ شفافاً ومنخفضاً
  animate={{ opacity: 1, y: 0 }}      // يتحرك للأعلى ويصبح مرئياً
  transition={{ delay: i * 0.05 }}    // تأخير تسلسلي لكل عنصر
/>
```

| العنصر | نوع الحركة |
|--------|-----------|
| بطاقات الأطفال | ظهور تسلسلي + رفع عند التحويم |
| النوافذ المنبثقة | spring animation (ارتداد زنبركي) |
| تأكيد الحذف | ظهور بتغيير الارتفاع |
| شريط التقدم | نمو تدريجي من 0 إلى النسبة المطلوبة |

### 7.5 `src/pages/ReportsPage.tsx` - صفحة التقارير (696 سطر)

#### 7.5.1 نوع بيانات التقرير

```typescript
interface Report {
  id: number;
  title: string;
  child: string;
  type: string;              // 'تحليل لحظي' | 'تحليل فيديو' | 'متابعة أسبوعية' ...
  date: string;
  status: string;            // 'مكتمل' | 'قيد المراجعة' | 'مسودة'
  severity: string;          // 'عالي' | 'متوسط' | 'منخفض'
  therapist: string;
  summary: string;
  sessionDuration: string;
  emotionalState: string;    // 'مستقر / مهتم' | 'قلق / مهتاج' ...
  indicators: {
    attention: number;       // 0-100
    vocalActivity: number;  // 0-100
    eyeContact: number;     // 0-100
  };
  notes: {
    time: string;
    type: string;
    text: string;
    status: 'positive' | 'warning' | 'info';
  }[];
  voiceData: { time: string; value: number; }[];
  recommendations: string[];
}
```

#### 7.5.2 استقبال التقارير الجديدة

```tsx
useEffect(() => {
  const newReport = location.state?.newReport;
  if (newReport) {
    const detailed: Report = { ...newReport, /* بيانات الجلسة الوهمية */ };
    setAllReports(prev => [detailed, ...prev]);
    window.history.replaceState({}, '');  // يمسح state لمنع الإضافة المتكررة
  }
}, [location.state]);
```

**آلية العمل:**
1. صفحة التحليل (لحظي/فيديو) تصدر تقرير → `navigate('/dashboard/reports', { state: { newReport } })`
2. ReportsPage تستقبل التقرير عبر `location.state`
3. `useEffect` يلتقط التقرير ويضيفه لبداية القائمة
4. `window.history.replaceState({}, '')` يمسح الـ state لمنع إضافة التقرير مرة أخرى عند التحديث

#### 7.5.3 البحث والتصفية

```tsx
const filteredReports = allReports.filter((report) => {
  const matchesFilter = activeFilter === 'الكل' || report.status === activeFilter;
  const matchesSearch = searchQuery === '' || report.title.includes(searchQuery);
  return matchesFilter && matchesSearch;
});
```

- **تصفية حسب الحالة:** الكل، مكتمل، قيد المراجعة، مسودة
- **بحث نصي:** يبحث في العنوان واسم الطفل ونوع التقرير

#### 7.5.4 نافذة التقرير التفصيلي

عند النقر على زر العين (Eye) يفتح نافذة تحتوي:
- ملخص الجلسة
- 4 إحصائيات: مدة الجلسة، الحالة العاطفية، المُعالج، نوع التحليل
- مؤشرات الاستجابة (أشرطة تقدم متحركة)
- تحليل النبرة الصوتية (AreaChart)
- الملاحظات الإكلينيكية المصنفة (إيجابي/تحذيري)
- التوصيات العلاجية المرقمة
- أزرار: تحميل PDF، طباعة، مشاركة

### 7.6 `src/pages/Settings.tsx` - الإعدادات (208 سطر)

**نظام اللغات المُدمج:**
```tsx
type Lang = 'ar' | 'en';
const translations = {
  ar: { pageTitle: 'الإعدادات - نبض', ... },
  en: { pageTitle: 'Settings - Nabd', ... },
};
```
- كل النصوص مُعرّفة مرتين (عربي وإنجليزي)
- `const t = translations[lang]` يختار القاموس النشط
- `localStorage.setItem('nabd-lang', lang)` يحفظ اللغة المختارة
- `document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'` يغيّر اتجاه الصفحة

**الأقسام:**
1. **تفضيلات التطبيق:** تبديل اللغة (AR/EN)، المظهر الداكن، التنبيهات
2. **إعدادات الملف الشخصي:** الاسم، البريد الإلكتروني
3. **الأمان:** تفعيل المصادقة الثنائية (2FA)

---

## 8. نظام تنقل البيانات بين الصفحات

هذا من أهم الأنظمة في المشروع. البيانات تتنقل بين الصفحات عبر **Navigation State** (حالة التنقل) في React Router:

```
صفحة ملفات الأطفال (ChildProfiles)
    │
    ├── [بدء جلسة] → navigate('/dashboard/real-time', { state: { child: selectedProfile } })
    │                    ↓
    │               صفحة التحليل اللحظي (RealTimeAnalysis)
    │                    │  يقرأ: location.state.child
    │                    │  يعرض: شريط معلومات الطفل
    │                    │
    │                    ├── [حفظ كتقرير] → navigate('/dashboard/reports', { state: { newReport } })
    │                    │                      ↓
    │                    │                 صفحة التقارير (ReportsPage)
    │                    │                      │  يقرأ: location.state.newReport
    │                    │                      │  يضيفه لبداية القائمة
    │                    │
    ├── [بدء جلسة] → navigate('/dashboard/video-analysis', { state: { child } })
    │                    ↓ (نفس تدفق التحليل اللحظي)
    │
    ├── [عرض التقارير] → setShowReportModal(true)
    │                       ↓
    │                  نافذة تقرير تفصيلي مباشرة داخل الصفحة
    │
    └── [حذف] → handleDeleteChild(id) → حذف من القائمة المحلية
```

**لماذا Navigation State بدل Context/Redux؟**
- المشروع في مرحلة النموذج الأولي (prototype)
- البيانات تتنقل بين صفحتين فقط في كل مرة
- لا حاجة لإدارة حالة مركزية معقدة بعد

---

## 9. نظام التصميم والألوان

### 9.1 الألوان الأساسية

| اللون | الكود | المتغير | الاستخدام |
|-------|-------|---------|----------|
| Primary | `#0d6e6e` | `--color-primary` | الأزرار، العناوين، الروابط النشطة |
| Primary Dark | `#0a5a5a` | `--color-primary-dark` | حالة hover على الأزرار |
| Primary Light | `#e6f2f2` | `--color-primary-light` | خلفيات فاتحة، شارات |
| خلفية الصفحة | `#f8fafc` | - | خلفية الصفحة العامة |
| خلفية البطاقات | `#ffffff` | `bg-white` | خلفية كل البطاقات |

### 9.2 أنماط التصميم المتكررة

| النمط | القيمة | مثال استخدام |
|-------|--------|-------------|
| حواف البطاقات الكبيرة | `rounded-[2.5rem]` | البطاقات الرئيسية |
| حواف البطاقات الصغيرة | `rounded-2xl` | البطاقات الثانوية |
| حواف النوافذ المنبثقة | `rounded-[2rem]` | كل الـ Modals |
| ظل البطاقات | `border border-slate-100 shadow-sm` | كل البطاقات |
| ظل الأزرار | `shadow-lg shadow-primary/20` | الأزرار الرئيسية |
| خلفية النوافذ | `bg-black/50 backdrop-blur-sm` | Overlay خلف كل Modal |
| رأس النوافذ | `bg-gradient-to-l from-primary to-teal-600` | رأس كل Modal |
| حقول الإدخال | `bg-slate-50 border border-slate-200 rounded-xl` | كل حقول النماذج |
| التركيز | `focus:ring-2 focus:ring-primary/20 focus:border-primary` | كل حقول الإدخال |

### 9.3 أنماط الحركات

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

// نمو شريط التقدم
initial={{ width: 0 }}
animate={{ width: `${percentage}%` }}
transition={{ duration: 1, ease: 'easeOut' }}
```

---

## 10. المكتبات والتبعيات

### 10.1 React Router DOM - التنقل

| الدالة | الاستخدام |
|--------|----------|
| `BrowserRouter` | مكوّن جذر يتيح التنقل |
| `Routes` + `Route` | تعريف المسارات |
| `Navigate` | إعادة توجيه برمجية |
| `Link` | رابط تنقل داخلي |
| `useNavigate()` | التنقل برمجياً مع تمرير بيانات |
| `useLocation()` | قراءة المسار الحالي + state |

### 10.2 Motion (Framer Motion) - الحركات

| المكوّن/الدالة | الاستخدام |
|---------------|----------|
| `motion.div` | عنصر HTML مع دعم الحركات |
| `AnimatePresence` | يُمكّن حركات الخروج (exit animations) |
| `initial` | حالة البداية |
| `animate` | حالة النهاية |
| `exit` | حالة الخروج |
| `whileHover` | حركة عند التحويم |
| `transition` | إعدادات الحركة (مدة، تأخير، نوع) |

### 10.3 Recharts - الرسوم البيانية

| المكوّن | الاستخدام | الصفحة |
|---------|----------|--------|
| `BarChart` + `Bar` | أعمدة بيانية | Dashboard, ReportsPage, VideoAnalysis |
| `AreaChart` + `Area` | مساحة ملوّنة | RealTimeAnalysis, ReportsPage |
| `PieChart` + `Pie` | دائري | ReportsPage |
| `ResponsiveContainer` | يكيّف الحجم مع الحاوية | كل الرسوم |
| `XAxis`, `YAxis` | محاور | كل الرسوم |
| `Tooltip` | تلميح عند التحويم | كل الرسوم |
| `Cell` | تلوين كل عمود/شريحة بلون مختلف | BarChart, PieChart |

### 10.4 Lucide React - الأيقونات

أيقونات SVG خفيفة تُستورد حسب الحاجة:

| الأيقونة | الاستخدام |
|----------|----------|
| `Activity` | النبض / التحليل |
| `FileText` | التقارير |
| `Users` | الأطفال / المستخدمين |
| `Camera` | التحليل اللحظي |
| `Video` | تحليل الفيديو |
| `Search` | البحث |
| `Trash2` | الحذف |
| `Plus` | الإضافة |
| `X` | إغلاق النوافذ |
| `Download` | التحميل |
| `Share2` | المشاركة |
| `Printer` | الطباعة |

---

## 11. ملخص تدفق المستخدم الكامل

### تدفق إنشاء تقرير من البداية للنهاية:

```
1. المستخدم يفتح الموقع → LandingPage (/)
   └── يضغط "ابدأ التقييم" → LoginPage (/login)
       └── يُدخل أي بيانات → Dashboard (/dashboard)

2. يفتح "ملفات الأطفال" → ChildProfiles (/dashboard/profiles)
   └── يضغط بطاقة طفل → تفتح نافذة عرض الملف
       │
       ├── [بدء جلسة جديدة] → خيارات الجلسة
       │   ├── [التحليل اللحظي] → RealTimeAnalysis (/dashboard/real-time)
       │   │   └── يرى اسم الطفل + بياناته في الأعلى
       │   │   └── [حفظ كتقرير] → ReportsPage (/dashboard/reports)
       │   │       └── التقرير الجديد يظهر أعلى القائمة
       │   │
       │   └── [تحليل الفيديو] → VideoAnalysis (/dashboard/video-analysis)
       │       └── يرى اسم الطفل + بياناته في الأعلى
       │       └── [تصدير التقرير] → ReportsPage (/dashboard/reports)
       │
       └── [عرض التقارير] → نافذة تفصيلية مباشرة
           └── ملخص + مؤشرات + رسم صوتي + ملاحظات + توصيات

3. صفحة التقارير (/dashboard/reports)
   └── إحصائيات + رسوم بيانية + قائمة تقارير
   └── بحث + تصفية حسب الحالة
   └── زر العين (Eye) → نافذة تفصيلية بالكامل
```

### ملخص الإنجازات الحالية:

| الميزة | الحالة |
|--------|--------|
| نظام التوجيه (11 مسار) | مكتمل |
| الصفحات العامة (4 صفحات) | مكتمل |
| لوحة التحكم (6 صفحات) | مكتمل |
| ملفات الأطفال (CRUD) | إضافة + حذف + عرض تفصيلي |
| التحليل اللحظي مع بيانات الطفل | مكتمل |
| تحليل الفيديو مع بيانات الطفل | مكتمل |
| نظام التقارير التفصيلية | مكتمل |
| نقل البيانات بين الصفحات | مكتمل |
| تصميم RTL عربي | مكتمل |
| حركات وتأثيرات بصرية | مكتمل |
| نظام اللغات (عربي/إنجليزي) | مكتمل في صفحة الإعدادات |

### الخطوات التالية المطلوبة:

| الأولوية | المهمة | التقدير |
|----------|--------|---------|
| عالية | نظام مصادقة حقيقي (تسجيل دخول) | 2-3 أيام |
| عالية | حماية مسارات Dashboard | نصف يوم |
| عالية | إنشاء Backend API | 3-5 أيام |
| متوسطة | ربط Gemini AI للتحليل الحقيقي | 3-5 أيام |
| متوسطة | حفظ البيانات في localStorage | ساعة |
| متوسطة | تصدير PDF حقيقي | 1-2 يوم |
| منخفضة | المظهر الداكن الكامل | 2-3 أيام |
| منخفضة | قائمة جانبية متجاوبة (موبايل) | 1 يوم |

---

*نهاية التقرير*
