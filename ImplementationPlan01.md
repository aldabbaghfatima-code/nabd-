# 🏗️ خطة تنفيذ الباك إند - مشروع نبض (Nabd)

> **الإصدار:** 1.0.0 | **التاريخ:** 21 أبريل 2026  
> **الإطار:** Laravel 12 + PHP 8.4  
> **قاعدة البيانات:** MySQL 8.x / PostgreSQL 16  
> **المصادقة:** Laravel Sanctum (SPA + API Tokens)  
> **الذكاء الاصطناعي:** Gemini 3.1 Flash Live Preview (Real-time Multimodal)

---

## 📑 فهرس المحتويات

1. [نظرة عامة على النظام](#1-نظرة-عامة-على-النظام)
2. [متطلبات النظام الوظيفية](#2-متطلبات-النظام-الوظيفية)
3. [متطلبات النظام غير الوظيفية](#3-متطلبات-النظام-غير-الوظيفية)
4. [مخططات حالات الاستخدام (Use Case Diagrams)](#4-مخططات-حالات-الاستخدام)
5. [قاعدة البيانات الكاملة (dbdiagram.io)](#5-قاعدة-البيانات-الكاملة)
6. [شرح الجداول والعلاقات](#6-شرح-الجداول-والعلاقات)
7. [هيكلة مشروع Laravel](#7-هيكلة-مشروع-laravel)
8. [توثيق API الكامل](#8-توثيق-api-الكامل)
9. [تكامل Gemini 3.1 Flash Live Preview](#9-تكامل-gemini-31-flash-live-preview)
10. [ملف .env الشامل](#10-ملف-env-الشامل)
11. [خطة التنفيذ المرحلية](#11-خطة-التنفيذ-المرحلية)

---

## 1. نظرة عامة على النظام

### 1.1 وصف المشروع

**نبض (Nabd)** هو نظام ذكي لدعم التقييم النفسي للأطفال المتضررين في الحروب. يعتمد على تحليل السلوك غير اللفظي والصوت باستخدام الذكاء الاصطناعي (Gemini 3.1 Flash Live Preview) لرصد المشاعر والتغيرات السلوكية بالزمن الحقيقي.

### 1.2 أدوار المستخدمين

| الدور | الوصف | الصلاحيات |
|-------|-------|-----------|
| **مدير النظام (Admin)** | مدير المنصة | إدارة كاملة: مستخدمين، إعدادات، تقارير عامة |
| **معالج (Therapist)** | الطبيب/الأخصائي النفسي | إدارة ملفات الأطفال، الجلسات، التقارير، التحليل اللحظي |
| **مشرف (Supervisor)** | مشرف على المعالجين | مراجعة التقارير، متابعة الحالات الحرجة |
| **ولي أمر (Guardian)** | ولي أمر الطفل | عرض تقارير طفله فقط (وصول محدود) |

### 1.3 الهندسة المعمارية

```
┌──────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                │
│              localhost:3000 → SPA (RTL Arabic)           │
└──────────────────────┬───────────────────────────────────┘
                       │ REST API (JSON)
                       │ Authorization: Bearer {token}
┌──────────────────────▼───────────────────────────────────┐
│                 Laravel 12 Backend API                     │
│                   localhost:8000/api                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │   Auth   │  │ Children │  │ Sessions │  │ Reports  │ │
│  │(Sanctum) │  │ Profiles │  │ Manager  │  │ Engine   │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │   AI     │  │  Notif   │  │ Articles │  │ Contact  │ │
│  │ Service  │  │  System  │  │  & CMS   │  │ Messages │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
└──────────────────────┬───────────────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
   ┌────────────┐ ┌─────────┐ ┌──────────────────┐
   │  MySQL /   │ │  Redis  │ │   Gemini 3.1     │
   │ PostgreSQL │ │ (Cache) │ │ Flash Live API   │
   └────────────┘ └─────────┘ └──────────────────┘
```

---

## 2. متطلبات النظام الوظيفية

### FR-01: المصادقة وإدارة المستخدمين
- **FR-01.1:** تسجيل حساب جديد (الاسم، البريد، الهاتف، المنظمة، كلمة المرور)
- **FR-01.2:** تسجيل الدخول بالبريد وكلمة المرور
- **FR-01.3:** تسجيل الخروج وإبطال التوكنات
- **FR-01.4:** نسيت كلمة المرور (إعادة التعيين بالبريد)
- **FR-01.5:** تفعيل المصادقة الثنائية (2FA)
- **FR-01.6:** تحديث بيانات الملف الشخصي (الاسم + البريد)
- **FR-01.7:** إدارة أدوار المستخدمين (Admin فقط)

### FR-02: ملفات الأطفال (Child Profiles)
- **FR-02.1:** إنشاء ملف طفل جديد (17 حقل كامل)
- **FR-02.2:** عرض قائمة الأطفال مع تصفية (حسب الحالة + الشدة)
- **FR-02.3:** عرض الملف الشخصي الكامل للطفل
- **FR-02.4:** تعديل بيانات الطفل
- **FR-02.5:** حذف ملف الطفل
- **FR-02.6:** البحث بالاسم
- **FR-02.7:** إحصائيات ديناميكية (إجمالي، تحت التقييم، مكتملة)
- **FR-02.8:** ترقيم الصفحات (Pagination)

### FR-03: الجلسات (Sessions)
- **FR-03.1:** إنشاء جلسة جديدة (اسم الطفل، التاريخ، الوقت، النوع، المبلغ، ملاحظات)
- **FR-03.2:** تعديل بيانات الجلسة
- **FR-03.3:** حذف/إلغاء الجلسة
- **FR-03.4:** عرض تفاصيل الجلسة
- **FR-03.5:** أنواع الجلسات: تحليل لحظي، تحليل فيديو، متابعة أسبوعية، تقييم أولي
- **FR-03.6:** حساب إجمالي المبالغ

### FR-04: التحليل بالزمن الحقيقي (Real-Time Analysis)
- **FR-04.1:** بدء جلسة تحليل لحظي مرتبطة بطفل
- **FR-04.2:** استقبال بث الفيديو والصوت من الكاميرا
- **FR-04.3:** تحليل المشاعر لحظياً عبر Gemini 3.1 Flash Live
- **FR-04.4:** رصد مؤشرات الاستجابة اللحظية (انتباه، نشاط صوتي، تواصل بصري)
- **FR-04.5:** رصد الحالة العاطفية (مستقر/قلق/مهتم/سعيد...)
- **FR-04.6:** تتبع الوجه بالذكاء الاصطناعي
- **FR-04.7:** إضافة ملاحظات فورية أثناء الجلسة
- **FR-04.8:** حفظ نتائج الجلسة كتقرير

### FR-05: تحليل الفيديو المسجل (Video Analysis)
- **FR-05.1:** رفع ملف فيديو مسجل
- **FR-05.2:** تحليل الفيديو عبر Gemini (مشاعر + سلوك + صوت)
- **FR-05.3:** رصد نقاط الاهتمام السلوكية
- **FR-05.4:** تحليل النبرة الصوتية (هدوء/توتر)
- **FR-05.5:** تصدير التقرير

### FR-06: التقارير (Reports)
- **FR-06.1:** إنشاء تقرير شامل لجلسة (تلقائي + يدوي)
- **FR-06.2:** عرض قائمة التقارير مع بحث وتصفية
- **FR-06.3:** تصفية حسب الحالة: مكتمل / قيد المراجعة / مسودة
- **FR-06.4:** عرض التقرير التفصيلي (الملخص، المؤشرات، ملاحظات سريرية، توصيات)
- **FR-06.5:** تحميل التقرير كـ PDF
- **FR-06.6:** طباعة التقرير
- **FR-06.7:** مشاركة التقرير
- **FR-06.8:** رسوم بيانية: شهرية + أسبوعية + توزيع الحالات

### FR-07: لوحة التحكم (Dashboard)
- **FR-07.1:** عرض الإحصائيات العامة (أطفال مقيّمين، جلسات نشطة، تنبيهات حرجة)
- **FR-07.2:** رسم بياني لعدد الحالات المعالجة (أسبوعي/شهري)
- **FR-07.3:** جدول التقييمات الأخيرة
- **FR-07.4:** قائمة الجلسات القادمة

### FR-08: المقالات والمحتوى (Articles)
- **FR-08.1:** عرض قائمة المقالات والبحوث
- **FR-08.2:** عرض تفاصيل مقال
- **FR-08.3:** إدارة المقالات (CRUD - Admin فقط)

### FR-09: نموذج التواصل (Contact)
- **FR-09.1:** إرسال رسالة تواصل من الصفحة العامة
- **FR-09.2:** عرض رسائل التواصل (Admin)

### FR-10: الإشعارات (Notifications)
- **FR-10.1:** إشعار تنبيه حرج (نوبة قلق مُكتشفة)
- **FR-10.2:** إشعار جلسة مكتملة
- **FR-10.3:** إشعار تقرير جديد جاهز للمراجعة
- **FR-10.4:** عرض الإشعارات + تعليم كمقروء

### FR-11: الإعدادات (Settings)
- **FR-11.1:** تغيير اللغة (عربي/إنجليزي)
- **FR-11.2:** تفعيل/تعطيل الوضع المظلم
- **FR-11.3:** تفعيل/تعطيل الإشعارات
- **FR-11.4:** تعديل بيانات الملف الشخصي
- **FR-11.5:** تفعيل المصادقة الثنائية

### FR-12: خطط الأسعار (Pricing)
- **FR-12.1:** عرض خطط الاشتراك
- **FR-12.2:** إدارة الخطط (Admin)

---

## 3. متطلبات النظام غير الوظيفية

| الرقم | المتطلب | التفاصيل |
|-------|---------|----------|
| NFR-01 | **الأمان** | تشفير HTTPS، Sanctum tokens، CSRF، XSS protection |
| NFR-02 | **الأداء** | زمن استجابة ≤ 200ms للـ API، ≤ 500ms للتحليل |
| NFR-03 | **التوفر** | 99.5% uptime |
| NFR-04 | **قابلية التوسع** | دعم 1000+ مستخدم متزامن |
| NFR-05 | **RTL** | دعم كامل للعربية (واجهة + بيانات) |
| NFR-06 | **i18n** | دعم العربية والإنجليزية |
| NFR-07 | **التوافق** | REST API متوافق مع SPA (React) |
| NFR-08 | **النسخ الاحتياطي** | نسخ يومي تلقائي لقاعدة البيانات |
| NFR-09 | **الخصوصية** | حماية بيانات الأطفال وفق HIPAA-like standards |
| NFR-10 | **الصور** | رفع صور بحد أقصى 5MB، تخزين محلي/S3 |

---

## 4. مخططات حالات الاستخدام

### 4.1 مخطط حالات الاستخدام العام

```
┌─────────────────────────────────────────────────────────────────┐
│                        نظام نبض (Nabd)                          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    المصادقة                              │    │
│  │  • تسجيل حساب جديد                                      │    │
│  │  • تسجيل دخول                                           │    │
│  │  • نسيت كلمة المرور                                      │    │
│  │  • تسجيل خروج                                           │    │
│  │  • تفعيل 2FA                                             │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                  ملفات الأطفال                           │    │
│  │  • إنشاء ملف طفل        • تعديل بيانات الطفل            │    │
│  │  • عرض الملف الكامل      • حذف ملف الطفل               │    │
│  │  • تصفية وبحث            • ترقيم صفحات                  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   الجلسات                                │    │
│  │  • إنشاء جلسة جديدة      • تعديل جلسة                   │    │
│  │  • إلغاء جلسة             • عرض تفاصيل الجلسة           │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              التحليل بالذكاء الاصطناعي                    │    │
│  │  • تحليل لحظي (كاميرا + صوت)                            │    │
│  │  • تحليل فيديو مسجل                                     │    │
│  │  • رصد المشاعر والسلوك                                  │    │
│  │  • تحليل النبرة الصوتية                                  │    │
│  │  • ملاحظات فورية                                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    التقارير                               │    │
│  │  • إنشاء تقرير            • عرض تقرير تفصيلي            │    │
│  │  • تصدير PDF              • طباعة ومشاركة               │    │
│  │  • بحث وتصفية             • إحصائيات                    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   الإدارة العامة                          │    │
│  │  • لوحة التحكم            • الإشعارات                    │    │
│  │  • المقالات والمحتوى       • رسائل التواصل               │    │
│  │  • الإعدادات              • خطط الأسعار                  │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘

الممثلون (Actors):
  👨‍⚕️ معالج (Therapist) → جميع الوظائف ضمن ملفاته
  👨‍💼 مدير (Admin) → إدارة كاملة
  👁️ مشرف (Supervisor) → مراجعة التقارير
  👨‍👩‍👧 ولي أمر (Guardian) → عرض تقارير طفله فقط
```

### 4.2 مخطط تدفق جلسة التحليل اللحظي

```
[المعالج] → فتح صفحة التحليل اللحظي
     │
     ▼
[اختيار ملف الطفل] → تحميل بيانات الطفل من API
     │
     ▼
[بدء الجلسة] → إنشاء سجل جلسة في قاعدة البيانات
     │
     ▼
[تشغيل الكاميرا والميكروفون] → WebRTC / MediaStream API
     │
     ▼
[إرسال بث الفيديو+الصوت] ──→ [Gemini 3.1 Flash Live API]
     │                                    │
     │                                    ▼
     │                         [تحليل المشاعر لحظياً]
     │                         - تتبع الوجه (Face Tracking)
     │                         - رصد التعبيرات (Expressions)
     │                         - تحليل النبرة الصوتية (Voice Tone)
     │                         - رصد السلوك (Behavioral Cues)
     │                                    │
     │                                    ▼
     │◄──── [نتائج مباشرة عبر WebSocket/SSE] ────┘
     │
     ▼
[عرض المؤشرات اللحظية]
  - تفاعل الانتباه: 84%
  - النشاط الصوتي: 22%
  - التواصل البصري: 65%
  - الحالة العاطفية: مستقر / مهتم
     │
     ▼
[إضافة ملاحظات فورية يدوية]
     │
     ▼
[إنهاء الجلسة] → حفظ جميع النتائج
     │
     ▼
[إنشاء تقرير تلقائي] → حفظ في جدول reports
```

---

## 5. قاعدة البيانات الكاملة

### كود dbdiagram.io (انسخ والصق مباشرة في https://dbdiagram.io)

```dbml
// ===========================================================
// نبض (Nabd) - مخطط قاعدة البيانات الكامل
// إطار العمل: Laravel 12 | التاريخ: أبريل 2026
// ===========================================================

// ─────────────────── المستخدمون والمصادقة ───────────────────

Table users {
  id bigint [pk, increment]
  name varchar(255) [not null, note: 'الاسم الكامل']
  email varchar(255) [unique, not null, note: 'البريد الإلكتروني']
  email_verified_at timestamp [null]
  password varchar(255) [not null]
  phone varchar(20) [null, note: 'رقم الهاتف']
  organization varchar(255) [null, note: 'اسم المنظمة/العيادة']
  role enum('admin', 'therapist', 'supervisor', 'guardian') [default: 'therapist', note: 'دور المستخدم']
  avatar varchar(500) [null, note: 'رابط صورة الملف الشخصي']
  language enum('ar', 'en') [default: 'ar', note: 'لغة الواجهة']
  dark_mode boolean [default: false, note: 'الوضع المظلم']
  notifications_enabled boolean [default: true, note: 'تفعيل الإشعارات']
  two_factor_enabled boolean [default: false, note: 'المصادقة الثنائية']
  two_factor_secret text [null]
  is_active boolean [default: true, note: 'حالة الحساب']
  remember_token varchar(100) [null]
  last_login_at timestamp [null]
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp [null, note: 'Soft Delete']

  Note: 'جدول المستخدمين: معالجين، مدراء، مشرفين، أولياء أمور'
}

Table personal_access_tokens {
  id bigint [pk, increment]
  tokenable_type varchar(255) [not null]
  tokenable_id bigint [not null]
  name varchar(255) [not null]
  token varchar(64) [unique, not null]
  abilities text [null]
  last_used_at timestamp [null]
  expires_at timestamp [null]
  created_at timestamp
  updated_at timestamp

  Note: 'جدول توكنات Sanctum'
}

Table password_reset_tokens {
  email varchar(255) [pk]
  token varchar(255) [not null]
  created_at timestamp [null]

  Note: 'جدول إعادة تعيين كلمات المرور'
}

// ─────────────────── ملفات الأطفال ───────────────────

Table children {
  id bigint [pk, increment]
  therapist_id bigint [not null, ref: > users.id, note: 'المعالج المسؤول']
  name varchar(255) [not null, note: 'اسم الطفل الكامل']
  age_years int [not null, note: 'العمر بالسنوات (1-18)']
  gender enum('male', 'female') [not null, note: 'الجنس']
  status enum('under_evaluation', 'evaluation_complete') [default: 'under_evaluation', note: 'حالة التقييم']
  diagnosis varchar(255) [null, note: 'التشخيص/الحالة الأساسية مثل: فرط حركة، تأخر نطق، توحد']
  severity enum('mild', 'moderate', 'severe') [default: 'mild', note: 'مستوى الخطورة']
  photo varchar(500) [null, note: 'رابط صورة الطفل']
  notes text [null, note: 'ملاحظات سريرية']
  total_sessions int [default: 0, note: 'إجمالي الجلسات المخطط لها']
  completed_sessions int [default: 0, note: 'الجلسات المكتملة']
  treatment_start_date date [null, note: 'تاريخ بدء العلاج']
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp [null]

  Note: 'جدول ملفات الأطفال - كل طفل مرتبط بمعالج'
}

Table guardians {
  id bigint [pk, increment]
  child_id bigint [not null, ref: > children.id, note: 'الطفل المرتبط']
  user_id bigint [null, ref: > users.id, note: 'حساب ولي الأمر (اختياري)']
  name varchar(255) [not null, note: 'اسم ولي الأمر']
  phone varchar(20) [null, note: 'رقم الهاتف']
  email varchar(255) [null, note: 'البريد الإلكتروني']
  relationship varchar(50) [null, note: 'صلة القرابة: أب، أم، وصي']
  created_at timestamp
  updated_at timestamp

  Note: 'جدول أولياء الأمور - كل طفل له ولي أمر واحد على الأقل'
}

// ─────────────────── الجلسات ───────────────────

Table sessions {
  id bigint [pk, increment]
  therapist_id bigint [not null, ref: > users.id, note: 'المعالج']
  child_id bigint [not null, ref: > children.id, note: 'الطفل']
  type enum('real_time', 'video_analysis', 'weekly_followup', 'initial_assessment') [not null, note: 'نوع الجلسة']
  status enum('scheduled', 'in_progress', 'completed', 'cancelled') [default: 'scheduled', note: 'حالة الجلسة']
  scheduled_date date [not null, note: 'تاريخ الجلسة']
  scheduled_time time [not null, note: 'وقت الجلسة']
  duration_minutes int [null, note: 'مدة الجلسة بالدقائق']
  amount decimal(10,2) [default: 0, note: 'المبلغ المدفوع (ر.س)']
  notes text [null, note: 'ملاحظات عن الجلسة']
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp [null]

  Note: 'جدول الجلسات: تحليل لحظي، فيديو، متابعة، تقييم أولي'
}

// ─────────────────── التحليل بالذكاء الاصطناعي ───────────────────

Table analysis_sessions {
  id bigint [pk, increment]
  session_id bigint [not null, ref: > sessions.id, note: 'الجلسة المرتبطة']
  child_id bigint [not null, ref: > children.id, note: 'الطفل']
  therapist_id bigint [not null, ref: > users.id, note: 'المعالج']
  analysis_type enum('real_time', 'video') [not null, note: 'نوع التحليل']
  status enum('pending', 'processing', 'completed', 'failed') [default: 'pending']
  started_at timestamp [null, note: 'وقت بدء التحليل']
  ended_at timestamp [null, note: 'وقت انتهاء التحليل']
  duration_seconds int [null, note: 'مدة التحليل بالثواني']

  // مُدخلات التحليل
  video_file_path varchar(500) [null, note: 'مسار ملف الفيديو (لتحليل الفيديو)']
  video_duration_seconds int [null, note: 'مدة الفيديو بالثواني']
  video_mime_type varchar(50) [null, note: 'نوع ملف الفيديو']

  // نتائج الذكاء الاصطناعي - المؤشرات الرئيسية
  attention_score decimal(5,2) [null, note: 'نسبة تفاعل الانتباه (0-100)']
  vocal_activity_score decimal(5,2) [null, note: 'نسبة النشاط الصوتي (0-100)']
  eye_contact_score decimal(5,2) [null, note: 'نسبة التواصل البصري (0-100)']
  social_interaction_score decimal(5,2) [null, note: 'نسبة التفاعل الاجتماعي (0-100)']

  // الحالة العاطفية
  emotional_state varchar(100) [null, note: 'الحالة العاطفية: مستقر، قلق، سعيد، مهتم...']
  face_tracking_confidence decimal(5,2) [null, note: 'دقة تتبع الوجه (0-100)']

  // معالجة الذكاء الاصطناعي
  ai_model varchar(100) [default: 'gemini-3.1-flash-live-preview', note: 'النموذج المستخدم']
  ai_raw_response json [null, note: 'الاستجابة الخام من Gemini']
  total_interest_points int [null, note: 'عدد نقاط الاهتمام المرصودة']
  total_behavioral_alerts int [null, note: 'عدد التنبيهات السلوكية']

  created_at timestamp
  updated_at timestamp

  Note: 'جدول جلسات التحليل بالذكاء الاصطناعي - النتائج الرئيسية لكل جلسة'
}

Table analysis_notes {
  id bigint [pk, increment]
  analysis_session_id bigint [not null, ref: > analysis_sessions.id, note: 'جلسة التحليل']
  timestamp_seconds int [null, note: 'التوقيت بالثواني منذ بداية الجلسة']
  timestamp_display varchar(20) [null, note: 'التوقيت المعروض (14:05)']
  type varchar(100) [not null, note: 'نوع الملاحظة: استجابة بصرية، سلوك تكراري، تفاعل اجتماعي...']
  text text [not null, note: 'نص الملاحظة']
  status enum('positive', 'warning', 'info') [default: 'info', note: 'تصنيف الملاحظة']
  source enum('ai', 'therapist') [default: 'therapist', note: 'مصدر الملاحظة: ذكاء اصطناعي أو معالج']
  created_at timestamp
  updated_at timestamp

  Note: 'جدول ملاحظات التحليل - كل ملاحظة خلال الجلسة'
}

Table voice_analysis_data {
  id bigint [pk, increment]
  analysis_session_id bigint [not null, ref: > analysis_sessions.id, note: 'جلسة التحليل']
  timestamp_seconds int [not null, note: 'التوقيت بالثواني']
  timestamp_display varchar(20) [null, note: 'التوقيت المعروض (00:00)']
  intensity_value decimal(5,2) [not null, note: 'قيمة شدة الصوت (0-100)']
  tone_type enum('calm', 'tension', 'neutral', 'happy', 'sad', 'angry') [default: 'neutral', note: 'نوع النبرة']
  created_at timestamp

  Note: 'جدول بيانات تحليل الصوت - نقاط البيانات لرسم المخطط البياني'
}

// ─────────────────── التقارير ───────────────────

Table reports {
  id bigint [pk, increment]
  analysis_session_id bigint [null, ref: > analysis_sessions.id, note: 'جلسة التحليل المرتبطة']
  session_id bigint [null, ref: > sessions.id, note: 'الجلسة المرتبطة']
  therapist_id bigint [not null, ref: > users.id, note: 'المعالج']
  child_id bigint [not null, ref: > children.id, note: 'الطفل']
  title varchar(500) [not null, note: 'عنوان التقرير']
  type enum('real_time', 'video_analysis', 'weekly_followup', 'initial_assessment', 'comprehensive') [not null]
  status enum('draft', 'under_review', 'completed') [default: 'draft', note: 'حالة التقرير']
  severity enum('low', 'medium', 'high') [default: 'medium', note: 'شدة الحالة']
  summary text [null, note: 'ملخص التقرير']
  session_duration varchar(20) [null, note: 'مدة الجلسة المعروضة (14:22)']
  emotional_state varchar(100) [null, note: 'الحالة العاطفية']

  // مؤشرات الاستجابة
  attention_score decimal(5,2) [null, note: 'تفاعل الانتباه %']
  vocal_activity_score decimal(5,2) [null, note: 'النشاط الصوتي %']
  eye_contact_score decimal(5,2) [null, note: 'التواصل البصري %']

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp [null]

  Note: 'جدول التقارير - كل تقرير مرتبط بجلسة تحليل وطفل'
}

Table report_notes {
  id bigint [pk, increment]
  report_id bigint [not null, ref: > reports.id]
  time varchar(20) [null, note: 'التوقيت (14:05)']
  type varchar(100) [not null, note: 'نوع الملاحظة']
  text text [not null, note: 'نص الملاحظة']
  status enum('positive', 'warning', 'info') [default: 'info']
  created_at timestamp
  updated_at timestamp

  Note: 'ملاحظات سريرية مرتبطة بالتقرير'
}

Table report_recommendations {
  id bigint [pk, increment]
  report_id bigint [not null, ref: > reports.id]
  text text [not null, note: 'نص التوصية']
  priority int [default: 0, note: 'أولوية التوصية']
  created_at timestamp

  Note: 'توصيات علاجية مرتبطة بالتقرير'
}

Table report_voice_data {
  id bigint [pk, increment]
  report_id bigint [not null, ref: > reports.id]
  time varchar(20) [not null, note: 'التوقيت']
  value decimal(5,2) [not null, note: 'قيمة الشدة']
  created_at timestamp

  Note: 'بيانات تحليل الصوت لعرضها في التقرير'
}

// ─────────────────── التقييمات ───────────────────

Table evaluations {
  id bigint [pk, increment]
  therapist_id bigint [not null, ref: > users.id]
  child_id bigint [not null, ref: > children.id]
  session_id bigint [null, ref: > sessions.id]
  type varchar(100) [not null, note: 'نوع التقييم: تحليل سلوكي، تفاعل اجتماعي، تقييم المهارات...']
  emotional_status varchar(100) [not null, note: 'الحالة: مستقر، بحاجة لمتابعة، تحسن ملحوظ، تنبيه']
  status_color varchar(50) [null, note: 'لون الشارة CSS class']
  notes text [null]
  created_at timestamp
  updated_at timestamp

  Note: 'جدول التقييمات الأخيرة المعروضة في لوحة التحكم'
}

// ─────────────────── المقالات والمحتوى ───────────────────

Table articles {
  id bigint [pk, increment]
  author_id bigint [not null, ref: > users.id, note: 'كاتب المقال']
  title varchar(500) [not null]
  slug varchar(500) [unique, not null]
  excerpt text [null, note: 'مقتطف المقال']
  content longtext [not null, note: 'محتوى المقال']
  cover_image varchar(500) [null, note: 'صورة الغلاف']
  category varchar(100) [null, note: 'تصنيف المقال: بحث، مقال، دراسة حالة']
  tags json [null, note: 'الوسوم']
  is_published boolean [default: false]
  views_count int [default: 0]
  published_at timestamp [null]
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp [null]

  Note: 'جدول المقالات والبحوث'
}

// ─────────────────── رسائل التواصل ───────────────────

Table contact_messages {
  id bigint [pk, increment]
  name varchar(255) [not null]
  email varchar(255) [not null]
  phone varchar(20) [null]
  subject varchar(500) [null]
  message text [not null]
  is_read boolean [default: false]
  replied_at timestamp [null]
  created_at timestamp
  updated_at timestamp

  Note: 'جدول رسائل نموذج التواصل'
}

// ─────────────────── الإشعارات ───────────────────

Table notifications {
  id uuid [pk]
  user_id bigint [not null, ref: > users.id]
  type varchar(255) [not null, note: 'نوع الإشعار: critical_alert, session_complete, report_ready']
  title varchar(255) [not null]
  description text [null]
  data json [null, note: 'بيانات إضافية (child_id, session_id...)']
  severity enum('critical', 'success', 'info', 'warning') [default: 'info']
  read_at timestamp [null]
  created_at timestamp
  updated_at timestamp

  Note: 'جدول إشعارات Laravel المدمج'
}

// ─────────────────── خطط الأسعار ───────────────────

Table pricing_plans {
  id bigint [pk, increment]
  name varchar(255) [not null, note: 'اسم الخطة: مجاني، احترافي، مؤسسي']
  name_en varchar(255) [null]
  description text [null]
  price decimal(10,2) [default: 0]
  currency varchar(10) [default: 'SAR']
  billing_period enum('monthly', 'yearly', 'one_time') [default: 'monthly']
  max_children int [null, note: 'الحد الأقصى للأطفال']
  max_sessions_per_month int [null, note: 'الحد الأقصى للجلسات']
  features json [null, note: 'قائمة الميزات']
  is_active boolean [default: true]
  sort_order int [default: 0]
  created_at timestamp
  updated_at timestamp

  Note: 'جدول خطط الأسعار'
}

Table subscriptions {
  id bigint [pk, increment]
  user_id bigint [not null, ref: > users.id]
  plan_id bigint [not null, ref: > pricing_plans.id]
  status enum('active', 'expired', 'cancelled', 'trial') [default: 'trial']
  starts_at timestamp [not null]
  ends_at timestamp [null]
  created_at timestamp
  updated_at timestamp

  Note: 'جدول اشتراكات المستخدمين'
}

// ─────────────────── إعدادات النظام ───────────────────

Table settings {
  id bigint [pk, increment]
  key varchar(255) [unique, not null, note: 'مفتاح الإعداد']
  value text [null, note: 'قيمة الإعداد']
  group varchar(100) [null, note: 'مجموعة الإعدادات: general, ai, email']
  created_at timestamp
  updated_at timestamp

  Note: 'جدول إعدادات النظام العامة'
}

// ─────────────────── سجل الأنشطة ───────────────────

Table activity_logs {
  id bigint [pk, increment]
  user_id bigint [null, ref: > users.id]
  action varchar(255) [not null, note: 'نوع النشاط: login, create_child, start_session...']
  description text [null]
  model_type varchar(255) [null, note: 'نوع النموذج المتأثر']
  model_id bigint [null, note: 'معرف النموذج المتأثر']
  ip_address varchar(45) [null]
  user_agent text [null]
  properties json [null, note: 'بيانات إضافية']
  created_at timestamp

  Note: 'سجل أنشطة النظام للتتبع والأمان'
}

// ─────────────────── إحصائيات لوحة التحكم ───────────────────

Table dashboard_stats {
  id bigint [pk, increment]
  therapist_id bigint [not null, ref: > users.id]
  stat_date date [not null, note: 'تاريخ الإحصائية']
  total_children_evaluated int [default: 0]
  active_sessions int [default: 0]
  critical_alerts int [default: 0]
  sessions_count int [default: 0, note: 'عدد الجلسات في هذا اليوم']
  total_revenue decimal(10,2) [default: 0]
  created_at timestamp
  updated_at timestamp

  indexes {
    (therapist_id, stat_date) [unique]
  }

  Note: 'جدول إحصائيات لوحة التحكم اليومية'
}
```

---

## 6. شرح الجداول والعلاقات

### 6.1 ملخص الجداول

| # | الجدول | الوظيفة | العلاقات |
|---|--------|---------|----------|
| 1 | `users` | المستخدمون (معالج/مدير/مشرف/ولي أمر) | - |
| 2 | `personal_access_tokens` | توكنات Sanctum | → users |
| 3 | `password_reset_tokens` | إعادة تعيين كلمة المرور | - |
| 4 | `children` | ملفات الأطفال (17+ حقل) | → users (therapist) |
| 5 | `guardians` | أولياء الأمور | → children, → users |
| 6 | `sessions` | الجلسات (4 أنواع) | → users, → children |
| 7 | `analysis_sessions` | جلسات تحليل الذكاء الاصطناعي | → sessions, → children, → users |
| 8 | `analysis_notes` | ملاحظات التحليل اللحظي | → analysis_sessions |
| 9 | `voice_analysis_data` | بيانات تحليل الصوت | → analysis_sessions |
| 10 | `reports` | التقارير الشاملة | → analysis_sessions, → sessions, → users, → children |
| 11 | `report_notes` | ملاحظات التقرير السريرية | → reports |
| 12 | `report_recommendations` | التوصيات العلاجية | → reports |
| 13 | `report_voice_data` | بيانات الصوت في التقرير | → reports |
| 14 | `evaluations` | التقييمات الأخيرة (لوحة التحكم) | → users, → children, → sessions |
| 15 | `articles` | المقالات والبحوث | → users (author) |
| 16 | `contact_messages` | رسائل التواصل | - |
| 17 | `notifications` | نظام الإشعارات | → users |
| 18 | `pricing_plans` | خطط الأسعار | - |
| 19 | `subscriptions` | اشتراكات المستخدمين | → users, → pricing_plans |
| 20 | `settings` | إعدادات النظام | - |
| 21 | `activity_logs` | سجل الأنشطة | → users |
| 22 | `dashboard_stats` | إحصائيات يومية | → users |

### 6.2 العلاقات الرئيسية

```
users (1) ──── (N) children          المعالج لديه عدة أطفال
children (1) ──── (N) guardians      الطفل له ولي أمر أو أكثر
children (1) ──── (N) sessions       الطفل لديه عدة جلسات
sessions (1) ──── (1) analysis_sessions   كل جلسة لها جلسة تحليل
analysis_sessions (1) ──── (N) analysis_notes    ملاحظات التحليل
analysis_sessions (1) ──── (N) voice_analysis_data بيانات الصوت
sessions (1) ──── (0..1) reports     كل جلسة قد يكون لها تقرير
reports (1) ──── (N) report_notes       ملاحظات التقرير
reports (1) ──── (N) report_recommendations  التوصيات
users (1) ──── (N) notifications      إشعارات لكل مستخدم
users (1) ──── (N) subscriptions      اشتراكات
```

---

## 7. هيكلة مشروع Laravel

```
nabd-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── AuthController.php            # تسجيل / دخول / خروج / نسيت كلمة السر
│   │   │   │   ├── UserController.php             # الملف الشخصي + الإعدادات
│   │   │   │   ├── ChildController.php            # CRUD ملفات الأطفال
│   │   │   │   ├── GuardianController.php         # CRUD أولياء الأمور
│   │   │   │   ├── SessionController.php          # CRUD الجلسات
│   │   │   │   ├── AnalysisController.php         # التحليل اللحظي + فيديو
│   │   │   │   ├── ReportController.php           # CRUD التقارير + تصدير PDF
│   │   │   │   ├── EvaluationController.php       # التقييمات الأخيرة
│   │   │   │   ├── DashboardController.php        # إحصائيات لوحة التحكم
│   │   │   │   ├── ArticleController.php          # CRUD المقالات
│   │   │   │   ├── ContactController.php          # رسائل التواصل
│   │   │   │   ├── NotificationController.php     # الإشعارات
│   │   │   │   ├── PricingController.php          # خطط الأسعار
│   │   │   │   └── SettingsController.php         # إعدادات النظام
│   │   │   └── ...
│   │   ├── Middleware/
│   │   │   ├── EnsureIsAdmin.php
│   │   │   ├── EnsureIsTherapist.php
│   │   │   └── TrackActivity.php
│   │   ├── Requests/                              # Form Requests للتحقق
│   │   │   ├── Auth/
│   │   │   │   ├── LoginRequest.php
│   │   │   │   └── RegisterRequest.php
│   │   │   ├── Child/
│   │   │   │   ├── StoreChildRequest.php
│   │   │   │   └── UpdateChildRequest.php
│   │   │   ├── Session/
│   │   │   │   ├── StoreSessionRequest.php
│   │   │   │   └── UpdateSessionRequest.php
│   │   │   └── Report/
│   │   │       └── StoreReportRequest.php
│   │   └── Resources/                             # API Resources (JSON Transform)
│   │       ├── ChildResource.php
│   │       ├── SessionResource.php
│   │       ├── ReportResource.php
│   │       ├── AnalysisResource.php
│   │       ├── ArticleResource.php
│   │       └── DashboardResource.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Child.php
│   │   ├── Guardian.php
│   │   ├── Session.php
│   │   ├── AnalysisSession.php
│   │   ├── AnalysisNote.php
│   │   ├── VoiceAnalysisData.php
│   │   ├── Report.php
│   │   ├── ReportNote.php
│   │   ├── ReportRecommendation.php
│   │   ├── ReportVoiceData.php
│   │   ├── Evaluation.php
│   │   ├── Article.php
│   │   ├── ContactMessage.php
│   │   ├── PricingPlan.php
│   │   ├── Subscription.php
│   │   ├── Setting.php
│   │   ├── ActivityLog.php
│   │   └── DashboardStat.php
│   ├── Services/
│   │   ├── GeminiService.php                      # ★ تكامل Gemini 3.1 Flash Live
│   │   ├── AnalysisService.php                    # منطق التحليل
│   │   ├── ReportService.php                      # إنشاء التقارير
│   │   ├── PdfService.php                         # تصدير PDF
│   │   ├── DashboardService.php                   # حساب الإحصائيات
│   │   └── NotificationService.php                # إرسال الإشعارات
│   ├── Events/
│   │   ├── AnalysisCompleted.php
│   │   ├── CriticalAlertDetected.php
│   │   └── SessionStatusChanged.php
│   ├── Listeners/
│   │   ├── GenerateReport.php
│   │   ├── SendCriticalNotification.php
│   │   └── UpdateDashboardStats.php
│   ├── Policies/
│   │   ├── ChildPolicy.php
│   │   ├── SessionPolicy.php
│   │   └── ReportPolicy.php
│   └── Enums/
│       ├── UserRole.php
│       ├── SessionType.php
│       ├── SessionStatus.php
│       ├── ReportStatus.php
│       ├── Severity.php
│       └── AnalysisType.php
├── database/
│   ├── migrations/                                # 22 ملف هجرة
│   ├── seeders/
│   │   ├── DatabaseSeeder.php
│   │   ├── UserSeeder.php                         # مستخدمين افتراضيين
│   │   ├── ChildSeeder.php                        # 4 أطفال (البيانات الموجودة)
│   │   ├── SessionSeeder.php                      # 5 جلسات
│   │   ├── EvaluationSeeder.php                   # 10 تقييمات
│   │   ├── ReportSeeder.php                       # 6 تقارير
│   │   ├── ArticleSeeder.php                      # 3 مقالات
│   │   └── PricingPlanSeeder.php                  # خطط الأسعار
│   └── factories/
├── routes/
│   ├── api.php                                     # جميع مسارات API
│   └── channels.php                                # Broadcasting channels
├── config/
│   ├── gemini.php                                  # إعدادات Gemini API
│   └── nabd.php                                    # إعدادات خاصة بالمشروع
├── storage/
│   └── app/
│       ├── videos/                                 # ملفات الفيديو المرفوعة
│       ├── photos/                                 # صور الأطفال
│       └── reports/                                # ملفات PDF المُصدَّرة
└── .env                                            # متغيرات البيئة
```

---

## 8. توثيق API الكامل

### 8.1 المصادقة (Authentication)

| الطريقة | المسار | الوصف | المدخلات | المخرجات |
|---------|--------|-------|----------|----------|
| `POST` | `/api/auth/register` | تسجيل حساب جديد | `name*, email*, password*, password_confirmation*, phone, organization` | `{user, token}` |
| `POST` | `/api/auth/login` | تسجيل الدخول | `email*, password*, remember` | `{user, token}` |
| `POST` | `/api/auth/logout` | تسجيل الخروج | - (Bearer Token) | `{message}` |
| `POST` | `/api/auth/forgot-password` | نسيت كلمة المرور | `email*` | `{message}` |
| `POST` | `/api/auth/reset-password` | إعادة تعيين | `token*, email*, password*, password_confirmation*` | `{message}` |
| `GET` | `/api/auth/user` | بيانات المستخدم الحالي | - | `{user}` |
| `PUT` | `/api/auth/user` | تحديث الملف الشخصي | `name, email, phone, organization` | `{user}` |

### 8.2 ملفات الأطفال (Children)

| الطريقة | المسار | الوصف | المدخلات |
|---------|--------|-------|----------|
| `GET` | `/api/children` | قائمة الأطفال | `?status=under_evaluation&severity=mild&page=1&per_page=12&search=فهد` |
| `POST` | `/api/children` | إنشاء ملف طفل | `name*, age_years*, gender*, diagnosis, severity, guardian_name*, guardian_phone, guardian_email, notes, photo` |
| `GET` | `/api/children/{id}` | عرض طفل | - |
| `PUT` | `/api/children/{id}` | تعديل طفل | (نفس حقول الإنشاء) |
| `DELETE` | `/api/children/{id}` | حذف طفل | - |
| `GET` | `/api/children/{id}/sessions` | جلسات الطفل | - |
| `GET` | `/api/children/{id}/reports` | تقارير الطفل | - |
| `GET` | `/api/children/stats` | إحصائيات الأطفال | - |

### 8.3 الجلسات (Sessions)

| الطريقة | المسار | الوصف | المدخلات |
|---------|--------|-------|----------|
| `GET` | `/api/sessions` | قائمة الجلسات | `?child_id=1&type=real_time&status=scheduled&date=2026-04-16` |
| `POST` | `/api/sessions` | إنشاء جلسة | `child_id*, scheduled_date*, scheduled_time*, type*, amount, notes` |
| `GET` | `/api/sessions/{id}` | عرض جلسة | - |
| `PUT` | `/api/sessions/{id}` | تعديل جلسة | (نفس حقول الإنشاء) |
| `DELETE` | `/api/sessions/{id}` | حذف جلسة | - |
| `POST` | `/api/sessions/{id}/start` | بدء الجلسة | - |
| `POST` | `/api/sessions/{id}/end` | إنهاء الجلسة | `duration_minutes` |
| `GET` | `/api/sessions/revenue` | إجمالي المبالغ | `?from=2026-04-01&to=2026-04-30` |

### 8.4 التحليل بالذكاء الاصطناعي (Analysis)

| الطريقة | المسار | الوصف | المدخلات |
|---------|--------|-------|----------|
| `POST` | `/api/analysis/real-time/start` | بدء تحليل لحظي | `session_id*, child_id*` |
| `POST` | `/api/analysis/real-time/frame` | إرسال إطار فيديو+صوت | `session_id*, frame (base64), audio (base64)` |
| `POST` | `/api/analysis/real-time/end` | إنهاء التحليل | `session_id*` |
| `GET` | `/api/analysis/real-time/{id}/results` | نتائج التحليل | - |
| `POST` | `/api/analysis/video/upload` | رفع فيديو للتحليل | `session_id*, child_id*, video (file, max:100MB)` |
| `GET` | `/api/analysis/video/{id}/status` | حالة تحليل الفيديو | - |
| `GET` | `/api/analysis/video/{id}/results` | نتائج تحليل الفيديو | - |
| `POST` | `/api/analysis/{id}/notes` | إضافة ملاحظة | `type*, text*, status` |
| `GET` | `/api/analysis/{id}/voice-data` | بيانات الصوت | - |

### 8.5 التقارير (Reports)

| الطريقة | المسار | الوصف | المدخلات |
|---------|--------|-------|----------|
| `GET` | `/api/reports` | قائمة التقارير | `?status=completed&search=فهد&child_id=1&type=real_time&page=1` |
| `POST` | `/api/reports` | إنشاء تقرير | `session_id, child_id*, title*, type*, summary, severity, notes[], recommendations[]` |
| `GET` | `/api/reports/{id}` | عرض تقرير تفصيلي | - |
| `PUT` | `/api/reports/{id}` | تعديل تقرير | (نفس الحقول) |
| `DELETE` | `/api/reports/{id}` | حذف تقرير | - |
| `GET` | `/api/reports/{id}/pdf` | تصدير PDF | - |
| `GET` | `/api/reports/stats` | إحصائيات التقارير | - |
| `GET` | `/api/reports/chart/monthly` | بيانات الرسم الشهري | - |
| `GET` | `/api/reports/chart/weekly` | بيانات الرسم الأسبوعي | - |
| `GET` | `/api/reports/chart/status-distribution` | توزيع الحالات | - |

### 8.6 لوحة التحكم (Dashboard)

| الطريقة | المسار | الوصف |
|---------|--------|-------|
| `GET` | `/api/dashboard/stats` | الإحصائيات العامة (أطفال، جلسات نشطة، تنبيهات) |
| `GET` | `/api/dashboard/chart/weekly` | بيانات الرسم الأسبوعي |
| `GET` | `/api/dashboard/chart/monthly` | بيانات الرسم الشهري |
| `GET` | `/api/dashboard/evaluations` | التقييمات الأخيرة |
| `GET` | `/api/dashboard/upcoming-sessions` | الجلسات القادمة |

### 8.7 باقي النقاط

| الطريقة | المسار | الوصف |
|---------|--------|-------|
| `GET` | `/api/articles` | قائمة المقالات (عام) |
| `GET` | `/api/articles/{slug}` | تفاصيل مقال (عام) |
| `POST` | `/api/admin/articles` | إنشاء مقال (Admin) |
| `PUT` | `/api/admin/articles/{id}` | تعديل مقال (Admin) |
| `DELETE` | `/api/admin/articles/{id}` | حذف مقال (Admin) |
| `POST` | `/api/contact` | إرسال رسالة تواصل (عام) |
| `GET` | `/api/admin/contacts` | عرض رسائل التواصل (Admin) |
| `GET` | `/api/notifications` | إشعارات المستخدم |
| `POST` | `/api/notifications/{id}/read` | تعليم إشعار كمقروء |
| `POST` | `/api/notifications/read-all` | تعليم الكل كمقروء |
| `GET` | `/api/pricing` | خطط الأسعار (عام) |
| `PUT` | `/api/settings` | تحديث إعدادات المستخدم |

---

## 9. تكامل Gemini 3.1 Flash Live Preview

### 9.1 نظرة عامة على النموذج

| الخاصية | القيمة |
|---------|--------|
| **اسم النموذج** | `gemini-3.1-flash-live-preview` |
| **النوع** | Low-latency audio-to-audio + multimodal |
| **الوصف** | نموذج محسّن للحوار في الوقت الحقيقي مع رصد الفروق الدقيقة الصوتية والوعي متعدد الوسائط |
| **المدخلات** | نص، صور، صوت، فيديو |
| **التخصص** | Real-time dialogue، acoustic nuance detection، numeric precision |
| **الاستخدام في نبض** | تحليل مشاعر الأطفال لحظياً من الكاميرا والميكروفون |

### 9.2 لماذا هذا النموذج تحديداً؟

1. **زمن استجابة منخفض (Low-latency):** مثالي لتحليل الزمن الحقيقي
2. **رصد الفروق الصوتية (Acoustic Nuance Detection):** يميز بين نبرات الهدوء والتوتر والقلق
3. **وعي متعدد الوسائط (Multimodal Awareness):** يحلل الفيديو والصوت معاً
4. **تدفق مباشر (Streaming):** يعمل عبر Gemini Live API مع بث مستمر

### 9.3 هندسة التكامل

```
┌──────────────────────────────────────────────────────────┐
│                   Frontend (React)                        │
│                                                          │
│  ┌──────────────┐    ┌──────────────┐                    │
│  │   Camera      │    │   Microphone │                    │
│  │  (MediaStream)│    │  (MediaStream)│                    │
│  └──────┬───────┘    └──────┬───────┘                    │
│         │                    │                            │
│         ▼                    ▼                            │
│  ┌──────────────────────────────────┐                    │
│  │  WebSocket / Server-Sent Events  │                    │
│  │  إرسال frames + audio chunks    │                    │
│  └──────────────┬───────────────────┘                    │
│                 │                                        │
└─────────────────┼────────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────────────────────┐
│              Laravel Backend (API)                        │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │              GeminiService.php                      │  │
│  │                                                    │  │
│  │  1. استقبال Frame + Audio من Frontend              │  │
│  │  2. استدعاء Gemini Live API                        │  │
│  │  3. تحليل الاستجابة (مشاعر + سلوك)                 │  │
│  │  4. حفظ النتائج في analysis_sessions               │  │
│  │  5. إرسال النتائج للـ Frontend عبر SSE/WS          │  │
│  │  6. رصد التنبيهات الحرجة                            │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
└──────────────────┬───────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────┐
│         Gemini 3.1 Flash Live Preview API                 │
│           generativelanguage.googleapis.com               │
│                                                          │
│  المدخلات:                                               │
│  - فيديو (إطارات بصيغة JPEG/PNG base64)                  │
│  - صوت (Audio chunks PCM/WAV)                            │
│  - تعليمات النظام (System Prompt)                        │
│                                                          │
│  المخرجات:                                               │
│  - الحالة العاطفية (emotional_state)                      │
│  - نسبة الانتباه (attention_score)                        │
│  - التواصل البصري (eye_contact_score)                     │
│  - النشاط الصوتي (vocal_activity_score)                   │
│  - نوع نبرة الصوت (calm/tension/neutral)                 │
│  - تقييم تتبع الوجه (face_tracking_confidence)            │
│  - ملاحظات سلوكية (behavioral_notes)                     │
│  - تنبيهات (alerts)                                      │
└──────────────────────────────────────────────────────────┘
```

### 9.4 System Prompt للتحليل النفسي

```
أنت نظام ذكاء اصطناعي متخصص في تحليل السلوك غير اللفظي للأطفال المتضررين 
في مناطق النزاع. مهمتك تحليل البث المرئي والصوتي للطفل وتقديم:

1. **الحالة العاطفية:** حدد الحالة العاطفية الحالية للطفل من: 
   (مستقر، قلق، مهتاج، سعيد، حزين، خائف، مهتم، منسحب)

2. **مؤشرات الاستجابة:** أعط نسبة مئوية (0-100) لكل من:
   - تفاعل الانتباه (Attention Engagement)
   - النشاط الصوتي (Vocal Activity)  
   - التواصل البصري (Eye Contact)
   - التفاعل الاجتماعي (Social Interaction)

3. **تحليل الصوت:** حدد نوع النبرة الصوتية:
   (هدوء calm, توتر tension, حيادي neutral, سعادة happy, حزن sad)

4. **تتبع الوجه:** أعط نسبة ثقة تتبع الوجه (0-100%)

5. **ملاحظات سلوكية:** سجل أي سلوك ملحوظ مثل:
   - حركات تكرارية
   - تجنب بصري
   - استجابة بصرية إيجابية
   - انسحاب اجتماعي
   - تفاعل إيجابي

6. **تنبيهات:** إذا رصدت أي سلوك يتطلب تدخل فوري (نوبة قلق، بكاء شديد، 
   سلوك إيذاء ذاتي)، أرسل تنبيه فوري.

أجب بصيغة JSON فقط.
```

### 9.5 مثال على استدعاء API من Laravel

```php
// app/Services/GeminiService.php

namespace App\Services;

use Google\GenAI\Client;
use Google\GenAI\Types;

class GeminiService
{
    private Client $client;
    private string $model = 'gemini-3.1-flash-live-preview';

    public function __construct()
    {
        $this->client = new Client([
            'apiKey' => config('gemini.api_key'),
        ]);
    }

    /**
     * تحليل إطار فيديو + مقطع صوتي لحظياً
     */
    public function analyzeFrame(string $imageBase64, ?string $audioBase64 = null): array
    {
        $parts = [
            Types\Part::fromText($this->getSystemPrompt()),
            Types\Part::fromBytes(
                data: base64_decode($imageBase64),
                mimeType: 'image/jpeg'
            ),
        ];

        if ($audioBase64) {
            $parts[] = Types\Part::fromBytes(
                data: base64_decode($audioBase64),
                mimeType: 'audio/wav'
            );
        }

        $parts[] = Types\Part::fromText(
            'حلل هذا الإطار من جلسة التقييم النفسي للطفل. أجب بصيغة JSON.'
        );

        $response = $this->client->models->generateContent(
            model: $this->model,
            contents: [
                Types\Content::fromParts($parts)
            ],
            config: new Types\GenerateContentConfig(
                thinkingConfig: new Types\ThinkingConfig(
                    thinkingLevel: 'low' // زمن استجابة سريع
                ),
                responseMimeType: 'application/json',
            )
        );

        return json_decode($response->text(), true);
    }

    /**
     * تحليل فيديو كامل مسجل
     */
    public function analyzeVideo(string $videoPath): array
    {
        $videoData = file_get_contents($videoPath);
        $mimeType = mime_content_type($videoPath);

        $response = $this->client->models->generateContent(
            model: 'gemini-3-flash-preview', // نموذج أقوى للفيديو الكامل
            contents: [
                Types\Content::fromParts([
                    Types\Part::fromText($this->getSystemPrompt()),
                    Types\Part::fromBytes(
                        data: $videoData,
                        mimeType: $mimeType
                    ),
                    Types\Part::fromText(
                        'حلل هذا الفيديو الكامل من جلسة التقييم. 
                         أعط تحليلاً شاملاً مع ملاحظات مؤقتة وتوصيات. 
                         أجب بصيغة JSON.'
                    ),
                ])
            ],
            config: new Types\GenerateContentConfig(
                thinkingConfig: new Types\ThinkingConfig(
                    thinkingLevel: 'high' // استدلال عميق للفيديو الكامل
                ),
                responseMimeType: 'application/json',
                mediaResolution: 'media_resolution_high',
            )
        );

        return json_decode($response->text(), true);
    }

    private function getSystemPrompt(): string
    {
        return config('gemini.system_prompt');
    }
}
```

### 9.6 بنية الاستجابة المتوقعة من Gemini

```json
{
  "emotional_state": "مستقر / مهتم",
  "attention_score": 84,
  "vocal_activity_score": 22,
  "eye_contact_score": 65,
  "social_interaction_score": 55,
  "face_tracking": {
    "detected": true,
    "confidence": 98,
    "bounding_box": { "x": 120, "y": 80, "width": 200, "height": 250 }
  },
  "voice_analysis": {
    "tone": "calm",
    "intensity": 35,
    "is_speaking": false
  },
  "behavioral_notes": [
    {
      "type": "استجابة بصرية",
      "text": "تواصل بصري مستدام لمدة 5 ثوانٍ عند تقديم المحفز",
      "status": "positive"
    }
  ],
  "alerts": [],
  "timestamp": "2026-04-21T12:45:00Z"
}
```

---

## 10. ملف .env الشامل

```env
# ============================================================
# نبض (Nabd) - Laravel Backend Environment Variables
# ============================================================

# ─── App Configuration ───
APP_NAME="Nabd"
APP_ENV=local
APP_KEY=base64:GENERATE_WITH_PHP_ARTISAN_KEY_GENERATE
APP_DEBUG=true
APP_TIMEZONE=Asia/Riyadh
APP_URL=http://localhost:8000
APP_LOCALE=ar
APP_FALLBACK_LOCALE=en

# ─── Frontend URL (CORS) ───
FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost

# ─── Database ───
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nabd_db
DB_USERNAME=root
DB_PASSWORD=your_database_password

# ─── Redis (Cache & Queue) ───
CACHE_STORE=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
QUEUE_CONNECTION=redis

# ─── Session ───
SESSION_DRIVER=database
SESSION_LIFETIME=120

# ─── Mail (إعادة تعيين كلمة المرور + إشعارات) ───
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@nabd.com
MAIL_FROM_NAME="نبض - Nabd"

# ─── File Storage ───
FILESYSTEM_DISK=local
# لو كنت تستخدم S3:
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_DEFAULT_REGION=me-south-1
# AWS_BUCKET=nabd-storage

# ─── Logging ───
LOG_CHANNEL=daily
LOG_LEVEL=debug

# ============================================================
# ★★★ Gemini AI Configuration ★★★
# ============================================================

# ─── مفتاح API الأساسي لـ Gemini ───
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

# ─── نموذج التحليل اللحظي (Real-time) ───
GEMINI_LIVE_MODEL=gemini-3.1-flash-live-preview

# ─── نموذج تحليل الفيديو الكامل ───
GEMINI_VIDEO_MODEL=gemini-3-flash-preview

# ─── نموذج إنشاء التقارير والتوصيات ───
GEMINI_REPORT_MODEL=gemini-3.1-pro-preview

# ─── إعدادات التحليل ───
GEMINI_THINKING_LEVEL_REALTIME=low
GEMINI_THINKING_LEVEL_VIDEO=high
GEMINI_THINKING_LEVEL_REPORT=medium
GEMINI_MEDIA_RESOLUTION=media_resolution_high
GEMINI_MAX_TOKENS=8192
GEMINI_TEMPERATURE=1.0

# ─── System Prompt (يمكن أيضاً وضعه في config/gemini.php) ───
GEMINI_SYSTEM_PROMPT="أنت نظام ذكاء اصطناعي متخصص في تحليل السلوك غير اللفظي للأطفال المتضررين في مناطق النزاع. حلل البث المرئي والصوتي وقدم: الحالة العاطفية، مؤشرات الاستجابة، تحليل الصوت، ملاحظات سلوكية، وتنبيهات. أجب بصيغة JSON."

# ─── API Endpoint ───
GEMINI_API_BASE_URL=https://generativelanguage.googleapis.com
GEMINI_API_VERSION=v1alpha

# ============================================================
# ★★★ API Documentation (حقول يحتاجها الفرونت إند) ★★★
# ============================================================

# الفرونت إند يحتاج المتغيرات التالية في ملف .env الخاص به:
# VITE_API_BASE_URL=http://localhost:8000/api
# VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE  (لو كان التحليل مباشراً من الفرونت)
# VITE_WS_URL=ws://localhost:8000               (للـ WebSocket)

# ============================================================
# Broadcasting (للإشعارات اللحظية)
# ============================================================
BROADCAST_CONNECTION=pusher
PUSHER_APP_ID=your_pusher_app_id
PUSHER_APP_KEY=your_pusher_key
PUSHER_APP_SECRET=your_pusher_secret
PUSHER_APP_CLUSTER=eu

# ============================================================
# Rate Limiting
# ============================================================
API_RATE_LIMIT=60
ANALYSIS_RATE_LIMIT=10
```

---

## 11. خطة التنفيذ المرحلية

### المرحلة 1: الأساسيات (الأسبوع 1-2)

| المهمة | الملفات | الأولوية |
|--------|---------|---------|
| إنشاء مشروع Laravel 12 | `composer create-project laravel/laravel nabd-backend` | 🔴 حرج |
| إعداد قاعدة البيانات (22 migration) | `database/migrations/*` | 🔴 حرج |
| نظام المصادقة (Sanctum + API) | `AuthController`, `User model` | 🔴 حرج |
| CORS + SPA configuration | `config/cors.php`, `config/sanctum.php` | 🔴 حرج |
| Seeders للبيانات الأولية | `database/seeders/*` | 🟡 مهم |

### المرحلة 2: CRUD الأساسي (الأسبوع 2-3)

| المهمة | الملفات | الأولوية |
|--------|---------|---------|
| CRUD ملفات الأطفال + أولياء الأمور | `ChildController`, `GuardianController` | 🔴 حرج |
| CRUD الجلسات | `SessionController` | 🔴 حرج |
| CRUD التقارير + التقييمات | `ReportController`, `EvaluationController` | 🔴 حرج |
| لوحة التحكم (إحصائيات) | `DashboardController` | 🟡 مهم |

### المرحلة 3: الذكاء الاصطناعي (الأسبوع 3-4)

| المهمة | الملفات | الأولوية |
|--------|---------|---------|
| تكامل Gemini 3.1 Flash Live Preview | `GeminiService.php` | 🔴 حرج |
| التحليل اللحظي (WebSocket/SSE) | `AnalysisController`, `AnalysisService` | 🔴 حرج |
| تحليل الفيديو المسجل | `AnalysisController@videoUpload` | 🟡 مهم |
| إنشاء التقارير التلقائية | `ReportService.php` | 🟡 مهم |

### المرحلة 4: الميزات الإضافية (الأسبوع 4-5)

| المهمة | الملفات | الأولوية |
|--------|---------|---------|
| نظام الإشعارات | `NotificationService`, Broadcasting | 🟡 مهم |
| المقالات والمحتوى | `ArticleController` | 🟢 اختياري |
| رسائل التواصل | `ContactController` | 🟢 اختياري |
| تصدير PDF | `PdfService.php` | 🟡 مهم |
| خطط الأسعار والاشتراكات | `PricingController` | 🟢 اختياري |

### المرحلة 5: التكامل والاختبار (الأسبوع 5-6)

| المهمة | الوصف |
|--------|-------|
| ربط الفرونت إند بالـ API | تحويل البيانات الوهمية لاستدعاءات API |
| كتابة Feature Tests | اختبارات تكامل لكل endpoint |
| اختبار التحليل اللحظي E2E | بث كاميرا → Gemini → نتائج |
| تحسين الأداء | Cache, Queue, Indexing |
| نشر الإنتاج | Docker / VPS / Cloud |

---

## 📋 ملاحظات مهمة للتنفيذ

> **⚠️ بيانات أولية (Seeders):** يجب أن تتطابق مع البيانات الوهمية الموجودة في الفرونت إند:
> - 4 أطفال: فهد، سارة، يوسف، ريان (مع 17 حقل لكل طفل)
> - 5 جلسات: ليث، صوفيا، أمير، فهد، سارة
> - 10 تقييمات: ياسين، نور الهدى، ريان خالد...
> - 6 تقارير مفصلة مع ملاحظات وتوصيات
> - 1 معالج: د. سارة الأحمد (dr.sara@nabd.com)

> **⚠️ أنواع الجلسات (4 أنواع):**
> 1. `real_time` → تحليل لحظي
> 2. `video_analysis` → تحليل فيديو
> 3. `weekly_followup` → متابعة أسبوعية
> 4. `initial_assessment` → تقييم أولي

> **⚠️ حالات التقارير (3 حالات):**
> 1. `draft` → مسودة
> 2. `under_review` → قيد المراجعة
> 3. `completed` → مكتمل

> **⚠️ مستويات الشدة (3 مستويات):**
> 1. `mild` → خفيف
> 2. `moderate` → متوسط
> 3. `severe` → شديد

---

> 📌 **الخطوة التالية:** بعد الموافقة على هذه الخطة، سيتم إنشاء مشروع Laravel 12 كامل مع جميع الملفات والهجرات والـ Controllers والـ Services وفق هذا التوثيق بالضبط.
