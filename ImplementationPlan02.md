# 🏗️ خطة التنفيذ - المرحلة الثانية | مشروع نبض (Nabd)

> **التاريخ:** 28 أبريل 2026 | **الإصدار:** 2.0  
> **الهدف:** إكمال الباك إند + ربط الفرونت + التوثيق + الاختبارات

---

## 📊 تحليل حالة الخطة الأولى

### ✅ ما تم تنفيذه (30% تقريباً)

| العنصر | العدد | الحالة |
|--------|-------|--------|
| مشروع Laravel 12 | 1 | ✅ مُنشأ |
| Migrations | 22 | ✅ مكتملة |
| Models | 8/19 | ⚠️ جزئي |
| Enums | 6/6 | ✅ مكتمل |
| Middleware | 3/3 | ✅ مكتمل |
| Policies | 2/3 | ⚠️ جزئي |
| Config (gemini, nabd, sanctum) | 3 | ✅ مكتمل |

### ❌ ما لم يُنفَّذ (70%)

| العنصر | المطلوب | الموجود |
|--------|---------|---------|
| **API Controllers** | 14 | 0 |
| **Form Requests** | 8+ | 0 |
| **API Resources** | 6+ | 0 |
| **Services** | 6 | 0 |
| **Seeders** مخصصة | 8 | 0 |
| **Events/Listeners** | 6 | 0 |
| **API Routes** (api.php) | ~50 endpoint | 1 (افتراضي) |
| **Models ناقصة** | 11 | 0 |
| **.env** مُعَد | 1 | ❌ افتراضي |
| **CORS** | مُعَد | ❌ |
| **ربط الفرونت** | كامل | ❌ |

### Models الناقصة (11 موديل)
`Evaluation`, `Article`, `ContactMessage`, `PricingPlan`, `Subscription`, `Setting`, `ActivityLog`, `DashboardStat`, `ReportNote`, `ReportRecommendation`, `ReportVoiceData`

---

## 🎯 خطة التنفيذ المرحلية

---

### المرحلة 1: إكمال البنية التحتية للباك إند

#### 1.1 إكمال Models الناقصة (11 ملف)

| الملف | الجدول | العلاقات |
|-------|--------|----------|
| `Evaluation.php` | evaluations | → User, Child, Session |
| `Article.php` | articles | → User (author) |
| `ContactMessage.php` | contact_messages | - |
| `PricingPlan.php` | pricing_plans | → Subscriptions |
| `Subscription.php` | subscriptions | → User, PricingPlan |
| `Setting.php` | settings | - |
| `ActivityLog.php` | activity_logs | → User |
| `DashboardStat.php` | dashboard_stats | → User |
| `ReportNote.php` | report_notes | → Report |
| `ReportRecommendation.php` | report_recommendations | → Report |
| `ReportVoiceData.php` | report_voice_data | → Report |

#### 1.2 إضافة Policy ناقصة

| الملف | الوصف |
|-------|-------|
| `ReportPolicy.php` | صلاحيات التقارير |

#### 1.3 إعداد .env

```env
APP_NAME=Nabd
APP_KEY= (php artisan key:generate)
APP_LOCALE=ar
FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
DB_CONNECTION=mysql
DB_DATABASE=nabd_db
GEMINI_API_KEY=...
```

#### 1.4 إعداد CORS

ملف `config/cors.php`:
- `allowed_origins` → `['http://localhost:3000']`
- `supports_credentials` → `true`

---

### المرحلة 2: كتابة Controllers + Form Requests + Resources

#### 2.1 API Controllers (14 ملف في `app/Http/Controllers/Api/`)

| # | Controller | الوظائف | الأولوية |
|---|-----------|---------|---------|
| 1 | `AuthController` | register, login, logout, forgotPassword, resetPassword, user, updateProfile | 🔴 |
| 2 | `ChildController` | index, store, show, update, destroy, stats | 🔴 |
| 3 | `GuardianController` | index, store, show, update, destroy | 🟡 |
| 4 | `SessionController` | index, store, show, update, destroy, start, end, revenue | 🔴 |
| 5 | `AnalysisController` | startRealTime, sendFrame, endRealTime, results, uploadVideo, videoStatus, videoResults, addNote, voiceData | 🔴 |
| 6 | `ReportController` | index, store, show, update, destroy, exportPdf, stats, chartMonthly, chartWeekly, statusDistribution | 🔴 |
| 7 | `EvaluationController` | index, store, show, update | 🟡 |
| 8 | `DashboardController` | stats, chartWeekly, chartMonthly, evaluations, upcomingSessions | 🔴 |
| 9 | `ArticleController` | index, show (عام) + store, update, destroy (Admin) | 🟢 |
| 10 | `ContactController` | store (عام) + index (Admin) | 🟢 |
| 11 | `NotificationController` | index, markAsRead, markAllAsRead | 🟡 |
| 12 | `PricingController` | index (عام) + CRUD (Admin) | 🟢 |
| 13 | `SettingsController` | show, update | 🟢 |
| 14 | `UserController` | index (Admin), show, updateRole | 🟡 |

#### 2.2 Form Requests (في `app/Http/Requests/`)

| الملف | الحقول المطلوبة |
|-------|----------------|
| `Auth/LoginRequest` | email*, password* |
| `Auth/RegisterRequest` | name*, email*, password*, password_confirmation* |
| `Child/StoreChildRequest` | name*, age_years* (1-18), gender* (male/female), guardian_name* |
| `Child/UpdateChildRequest` | نفس الحقول (اختيارية) |
| `Session/StoreSessionRequest` | child_id*, scheduled_date*, scheduled_time*, type* |
| `Session/UpdateSessionRequest` | نفس الحقول |
| `Report/StoreReportRequest` | child_id*, title*, type* |
| `Analysis/StartAnalysisRequest` | session_id*, child_id* |
| `Analysis/SendFrameRequest` | session_id*, frame* (base64) |
| `Article/StoreArticleRequest` | title*, content* |
| `Contact/StoreContactRequest` | name*, email*, message* |

#### 2.3 API Resources (في `app/Http/Resources/`)

| Resource | الحقول المُحوَّلة |
|----------|------------------|
| `UserResource` | id, name, email, role, phone, organization, avatar, settings |
| `ChildResource` | id, name, age, gender, status, diagnosis, severity, guardian, sessions_count |
| `SessionResource` | id, child (nested), type_label, status_label, date, time, amount |
| `ReportResource` | id, title, type, status, severity, child, scores, notes, recommendations |
| `AnalysisResource` | id, scores, emotional_state, voice_data, notes, alerts |
| `ArticleResource` | id, title, slug, excerpt, content, author, category, cover_image |
| `EvaluationResource` | id, child, type, emotional_status, notes |
| `DashboardResource` | stats, charts, evaluations, upcoming_sessions |
| `NotificationResource` | id, type, title, description, severity, read_at |

---

### المرحلة 3: كتابة Services

| # | Service | المسؤوليات |
|---|---------|-----------|
| 1 | `GeminiService` | analyzeFrame(), analyzeVideo(), getSystemPrompt() - تكامل مع Gemini API |
| 2 | `AnalysisService` | startSession(), processFrame(), endSession(), saveResults() |
| 3 | `ReportService` | generateFromAnalysis(), generatePdf(), getStats(), getChartData() |
| 4 | `PdfService` | renderReport(), downloadPdf() - باستخدام DomPDF |
| 5 | `DashboardService` | calculateStats(), getWeeklyData(), getMonthlyData() |
| 6 | `NotificationService` | sendCriticalAlert(), sendSessionComplete(), sendReportReady() |

---

### المرحلة 4: كتابة API Routes (api.php)

الهيكل المطلوب:

```
عام (بدون مصادقة):
  POST /api/auth/register
  POST /api/auth/login
  POST /api/auth/forgot-password
  POST /api/auth/reset-password
  GET  /api/articles
  GET  /api/articles/{slug}
  POST /api/contact
  GET  /api/pricing

مصادق (Sanctum):
  POST /api/auth/logout
  GET  /api/auth/user
  PUT  /api/auth/user
  
  GET|POST        /api/children
  GET|PUT|DELETE   /api/children/{id}
  GET  /api/children/stats
  
  GET|POST        /api/sessions
  GET|PUT|DELETE   /api/sessions/{id}
  POST /api/sessions/{id}/start
  POST /api/sessions/{id}/end
  
  POST /api/analysis/real-time/start
  POST /api/analysis/real-time/frame
  POST /api/analysis/real-time/end
  GET  /api/analysis/real-time/{id}/results
  POST /api/analysis/video/upload
  
  GET|POST        /api/reports
  GET|PUT|DELETE   /api/reports/{id}
  GET  /api/reports/{id}/pdf
  GET  /api/reports/stats
  GET  /api/reports/chart/monthly
  
  GET  /api/dashboard/stats
  GET  /api/dashboard/chart/weekly
  GET  /api/dashboard/chart/monthly
  GET  /api/dashboard/evaluations
  GET  /api/dashboard/upcoming-sessions
  
  GET  /api/notifications
  POST /api/notifications/{id}/read
  POST /api/notifications/read-all
  
  PUT  /api/settings

Admin فقط:
  POST|PUT|DELETE /api/admin/articles
  GET  /api/admin/contacts
  CRUD /api/admin/pricing
  GET  /api/admin/users
```

---

### المرحلة 5: كتابة Seeders

| Seeder | المحتوى |
|--------|---------|
| `UserSeeder` | 1 Admin + 1 معالج (د. سارة الأحمد) + 1 مشرف |
| `ChildSeeder` | 4 أطفال: فهد، سارة، يوسف، ريان (17 حقل لكل واحد) |
| `GuardianSeeder` | ولي أمر لكل طفل |
| `SessionSeeder` | 5 جلسات |
| `EvaluationSeeder` | 10 تقييمات |
| `ReportSeeder` | 6 تقارير مع ملاحظات وتوصيات |
| `ArticleSeeder` | 3 مقالات |
| `PricingPlanSeeder` | 3 خطط (مجاني، احترافي، مؤسسي) |

> ⚠️ البيانات يجب أن تتطابق مع البيانات الوهمية في الفرونت إند

---

### المرحلة 6: ربط الفرونت إند مع الباك إند

#### 6.1 إنشاء طبقة API في الفرونت

- `src/lib/api.ts` - Axios instance مركزي + interceptors
- `src/lib/auth.ts` - Token management

#### 6.2 إنشاء API Services للفرونت

| الملف | الوظائف |
|-------|---------|
| `src/services/authService.ts` | login, register, logout, getUser, updateProfile |
| `src/services/childService.ts` | getAll, getById, create, update, delete, getStats |
| `src/services/sessionService.ts` | getAll, create, update, delete, start, end |
| `src/services/reportService.ts` | getAll, getById, create, exportPdf, getStats, getCharts |
| `src/services/dashboardService.ts` | getStats, getCharts, getEvaluations |
| `src/services/analysisService.ts` | startRealTime, sendFrame, endSession, uploadVideo |
| `src/services/articleService.ts` | getAll, getBySlug |
| `src/services/notificationService.ts` | getAll, markRead, markAllRead |

#### 6.3 تحديث صفحات الفرونت (استبدال البيانات الوهمية)

| الصفحة | التغييرات |
|--------|----------|
| `LoginPage.tsx` | ربط بـ authService.login + حفظ token |
| `Dashboard.tsx` | استبدال البيانات الثابتة بـ dashboardService |
| `ChildProfiles.tsx` | ربط CRUD بـ childService |
| `ReportsPage.tsx` | ربط بـ reportService + charts حقيقية |
| `RealTimeAnalysis.tsx` | ربط الكاميرا بـ analysisService |
| `VideoAnalysis.tsx` | ربط رفع الفيديو بـ analysisService |
| `Settings.tsx` | ربط بـ authService.updateProfile |
| `ArticlesPage.tsx` | ربط بـ articleService |
| `ContactPage.tsx` | ربط نموذج التواصل بـ API |
| `PricingPage.tsx` | ربط بـ pricingService |

#### 6.4 إضافة Auth Context

- `src/contexts/AuthContext.tsx` - حالة المستخدم + ProtectedRoute

#### 6.5 تحديث `.env` للفرونت

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

### المرحلة 7: التوثيق

#### 7.1 توثيق API (`API_DOCUMENTATION.md`)

لكل endpoint: Method, URL, Headers, Body, Response, أمثلة cURL, أكواد الحالة

#### 7.2 توثيق الباك إند (`BACKEND_DOCS.md`)

هيكل المشروع، شرح كل Service، طريقة التشغيل، أوامر Artisan

#### 7.3 توثيق التكامل (`INTEGRATION_GUIDE.md`)

طريقة ربط الفرونت بالباك، Authentication flow, Error handling

---

### المرحلة 8: الاختبارات

#### Feature Tests

| Test File | يغطي |
|-----------|-------|
| `AuthTest` | تسجيل، دخول، خروج، نسيت كلمة السر |
| `ChildTest` | CRUD أطفال، بحث، تصفية، إحصائيات |
| `SessionTest` | CRUD جلسات، بدء/إنهاء |
| `ReportTest` | CRUD تقارير، تصدير PDF |
| `DashboardTest` | إحصائيات، رسوم بيانية |
| `AnalysisTest` | بدء تحليل، إرسال frame |
| `ArticleTest` | CRUD مقالات |

#### Unit Tests

| Test | يغطي |
|------|-------|
| `GeminiServiceTest` | Mock لاستدعاءات Gemini API |
| `ReportServiceTest` | إنشاء تقارير |
| `DashboardServiceTest` | حساب الإحصائيات |

---

### المرحلة 9: تقرير الانتهاء

1. ملخص تنفيذي لكل ما تم إنجازه
2. قائمة بجميع الملفات المُنشأة/المُعدَّلة
3. نتائج الاختبارات
4. تعليمات النشر (Deployment Guide)
5. التحسينات المستقبلية

---

## 📋 ترتيب التنفيذ

| # | المهمة | المدة التقديرية | الأولوية |
|---|--------|----------------|---------|
| 1 | إكمال 11 Model ناقص | 1 ساعة | 🔴 |
| 2 | إعداد .env + CORS | 30 دقيقة | 🔴 |
| 3 | كتابة 14 API Controller | 4-5 ساعات | 🔴 |
| 4 | كتابة Form Requests | 1-2 ساعة | 🔴 |
| 5 | كتابة API Resources | 1-2 ساعة | 🔴 |
| 6 | كتابة 6 Services | 3-4 ساعات | 🔴 |
| 7 | كتابة API Routes | 1 ساعة | 🔴 |
| 8 | كتابة 8 Seeders | 1-2 ساعة | 🟡 |
| 9 | إنشاء طبقة API بالفرونت | 2-3 ساعات | 🔴 |
| 10 | Auth Context + Protected Routes | 1-2 ساعة | 🔴 |
| 11 | ربط كل صفحة فرونت بالـ API | 4-6 ساعات | 🔴 |
| 12 | كتابة التوثيق | 2-3 ساعات | 🟡 |
| 13 | كتابة الاختبارات | 3-4 ساعات | 🟡 |
| 14 | تقرير الانتهاء | 1 ساعة | 🟢 |

**المدة الإجمالية التقديرية:** 25-35 ساعة عمل

---

## ⚠️ ملاحظات مهمة

1. **Packages إضافية للباك إند:**
   - `google-gemini-php/laravel` - تكامل Gemini
   - `barryvdh/laravel-dompdf` - تصدير PDF
   
2. **Package إضافي للفرونت:**
   - `axios` - HTTP client
   
3. **قاعدة البيانات:** يجب إنشاء `nabd_db` في MySQL قبل تشغيل migrations

4. **ترتيب التشغيل:**
   ```bash
   # الباك إند
   cd nabd-backend && composer install
   php artisan key:generate && php artisan migrate && php artisan db:seed
   php artisan serve
   
   # الفرونت
   cd .. && npm install && npm run dev
   ```

---

> 📌 **الخطوة التالية:** بعد الموافقة على هذه الخطة، سيتم التنفيذ بالترتيب المذكور أعلاه.
