# 🔧 توثيق الباك إند - مشروع نبض (Nabd)

> **الإصدار:** 2.0 | **التاريخ:** 28 أبريل 2026

---

## هيكل المشروع

```
nabd-backend/
├── app/
│   ├── Enums/                          # 6 Enums
│   │   ├── UserRole.php               # admin, therapist, supervisor, guardian
│   │   ├── SessionStatus.php          # scheduled, in_progress, completed, cancelled
│   │   ├── SessionType.php            # real_time, video_analysis, weekly_followup, initial_assessment
│   │   ├── Severity.php               # mild, moderate, severe
│   │   ├── ReportStatus.php           # draft, under_review, completed
│   │   └── AnalysisType.php           # real_time, video
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Controller.php         # Base controller
│   │   │   └── Api/                   # 14 API Controllers
│   │   │       ├── AuthController.php
│   │   │       ├── ChildController.php
│   │   │       ├── GuardianController.php
│   │   │       ├── SessionController.php
│   │   │       ├── AnalysisController.php
│   │   │       ├── ReportController.php
│   │   │       ├── EvaluationController.php
│   │   │       ├── DashboardController.php
│   │   │       ├── ArticleController.php
│   │   │       ├── ContactController.php
│   │   │       ├── NotificationController.php
│   │   │       ├── PricingController.php
│   │   │       ├── SettingsController.php
│   │   │       └── UserController.php
│   │   ├── Middleware/
│   │   │   ├── EnsureIsAdmin.php
│   │   │   ├── EnsureIsTherapist.php
│   │   │   └── TrackActivity.php
│   │   └── Requests/                   # 11 Form Requests
│   │       ├── Auth/ (Login, Register)
│   │       ├── Child/ (Store, Update)
│   │       ├── Session/ (Store, Update)
│   │       ├── Report/ (Store)
│   │       ├── Analysis/ (Start, SendFrame)
│   │       ├── Article/ (Store)
│   │       └── Contact/ (Store)
│   ├── Models/                         # 19 Models
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
│   │   ├── Notification.php
│   │   ├── PricingPlan.php
│   │   ├── Subscription.php
│   │   ├── Setting.php
│   │   ├── ActivityLog.php
│   │   └── DashboardStat.php
│   ├── Policies/
│   │   ├── ChildPolicy.php
│   │   ├── SessionPolicy.php
│   │   └── ReportPolicy.php
│   ├── Providers/
│   │   └── AppServiceProvider.php
│   └── Services/                       # 6 Services
│       ├── GeminiService.php          # تكامل Gemini AI
│       ├── AnalysisService.php        # إدارة التحليل
│       ├── ReportService.php          # إدارة التقارير
│       ├── PdfService.php             # تصدير PDF
│       ├── DashboardService.php       # إحصائيات لوحة التحكم
│       └── NotificationService.php    # إرسال الإشعارات
├── config/
│   ├── app.php
│   ├── auth.php
│   ├── cors.php                       # ✅ CORS configured
│   ├── gemini.php                     # Gemini AI config
│   ├── nabd.php                       # App config
│   └── sanctum.php                    # Sanctum config
├── database/
│   ├── migrations/                    # 22 Migrations
│   └── seeders/                       # 8 Seeders
├── routes/
│   ├── api.php                        # ~50 API endpoints
│   ├── web.php
│   └── console.php
└── bootstrap/
    └── app.php                        # ✅ Middleware configured
```

---

## الإعداد والتشغيل

### المتطلبات
- PHP >= 8.2
- MySQL >= 8.0
- Composer

### التثبيت

```bash
cd nabd-backend

# تثبيت التبعيات
composer install

# إعداد البيئة
cp .env.example .env
php artisan key:generate

# إنشاء قاعدة البيانات
mysql -u root -e "CREATE DATABASE nabd_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# تشغيل المايغريشن
php artisan migrate

# تشغيل البذور
php artisan db:seed

# تشغيل الخادم
php artisan serve
```

### بيانات الدخول الافتراضية

| الدور | البريد | كلمة السر |
|------|--------|-----------|
| مدير | admin@nabd.com | password |
| معالج | dr.sara@nabd.com | password |
| مشرف | supervisor@nabd.com | password |

---

## الخدمات (Services)

### GeminiService
يتكامل مع Google Gemini API لتحليل:
- **analyzeFrame()** - تحليل إطار واحد (base64 image)
- **analyzeVideo()** - تحليل فيديو كامل
- يستخدم model `gemini-2.0-flash-001`
- يعيد JSON بـ: emotional_state, attention_score, vocal_activity_score, eye_contact_score, notes, alerts

### AnalysisService
يدير دورة حياة جلسة التحليل:
- **startSession()** - إنشاء جلسة تحليل
- **processFrame()** - معالجة إطار + استدعاء Gemini + تحديث النقاط + إنشاء ملاحظات
- **endSession()** - إنهاء وحساب المدة
- **processVideo()** - رفع + تحليل + حفظ النتائج

### ReportService
ينشئ التقارير من بيانات التحليل:
- **generateFromAnalysis()** - إنشاء تقرير + نسخ البيانات
- **getStats()** - إحصائيات (إجمالي، مكتمل، قيد المراجعة)
- **getChartData()** - بيانات الرسوم البيانية (أسبوعي/شهري)
- **getStatusDistribution()** - توزيع الحالات

### DashboardService
يوفر بيانات لوحة التحكم:
- **calculateStats()** - إجمالي الأطفال، الجلسات، الإيرادات، التنبيهات
- **getWeeklyData()** - جلسات الأسبوع
- **getMonthlyData()** - جلسات الشهر
- **getRecentEvaluations()** - آخر التقييمات
- **getUpcomingSessions()** - الجلسات القادمة

### NotificationService
ينشئ إشعارات بأنواع مختلفة:
- **sendCriticalAlert()** - تنبيه حرج
- **sendSessionComplete()** - إشعار إكمال جلسة
- **sendReportReady()** - إشعار تقرير جاهز
- **sendWarning()** - تحذير

---

## الصلاحيات (Policies)

| المورد | Admin | Therapist | Supervisor | Guardian |
|--------|-------|-----------|------------|----------|
| Children - View All | ✅ | ✅ (own) | ✅ | ❌ |
| Children - Create | ✅ | ✅ | ❌ | ❌ |
| Children - Update | ✅ | ✅ (own) | ❌ | ❌ |
| Children - Delete | ✅ | ✅ (own) | ❌ | ❌ |
| Sessions - All | ✅ | ✅ (own) | ✅ (view) | ❌ |
| Reports - All | ✅ | ✅ (own) | ✅ (view) | ❌ |

---

## أوامر Artisan مفيدة

```bash
php artisan migrate:fresh --seed    # إعادة إنشاء قاعدة البيانات
php artisan route:list              # عرض جميع المسارات
php artisan config:cache            # تخزين الإعدادات مؤقتاً
php artisan config:clear            # مسح المخزن المؤقت
```
