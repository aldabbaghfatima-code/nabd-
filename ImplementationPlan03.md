# 📋 خطة التنفيذ الثالثة - مشروع نبض (Nabd)
# ImplementationPlan03 - إصلاحات ما بعد QA

> **التاريخ:** 28 أبريل 2026  
> **المرجع:** نتائج QA بعد تنفيذ ImplementationPlan01 و ImplementationPlan02  
> **الحالة:** 🟡 بانتظار التنفيذ

---

## 📊 ملخص التقييم

| الفئة | العدد | الأولوية |
|-------|-------|----------|
| 🔴 مشاكل حرجة | 3 | يجب إصلاحها فوراً |
| 🟡 مشاكل متوسطة | 10 | مهمة للإنتاج |
| 🟢 مشاكل طفيفة | 4 | تحسينات |
| **المجموع** | **17** | |

### ✅ ما تم تنفيذه بنجاح
- جميع الـ Models (20 نموذج) ✅
- جميع الـ Controllers (14 controller) ✅
- جميع الـ Services (6 خدمات) ✅
- جميع الـ Migrations (22 migration) ✅
- جميع الـ Seeders (8 seeders) ✅
- جميع الـ API Resources (15 resource) ✅
- جميع الـ Form Requests (7 directories) ✅
- جميع الـ Policies (3 policies) ✅
- جميع الـ Middleware (3 middleware) ✅
- جميع الـ Enums (6 enums) ✅
- جميع الـ Frontend Services (8 services) ✅
- AuthContext + ProtectedRoute ✅
- تسجيل الدخول مربوط بالـ API ✅
- TypeScript يمر بدون أخطاء ✅
- التوثيق (4 ملفات) ✅
- الاختبارات (8 test files) ✅

---

## 🔴 المرحلة 1: الإصلاحات الحرجة (Critical Fixes)

### 1.1 ربط صفحات الفرونت إند بـ API Services

> **هذا هو أهم نقص في المشروع.** الـ Services تم إنشاؤها بالكامل لكن لم يتم استيرادها أو استخدامها في الصفحات.

#### الملفات المتأثرة:

| # | الصفحة | Service المطلوب | التغييرات |
|---|--------|-----------------|-----------|
| 1 | `src/pages/Dashboard.tsx` | `dashboardService` | استبدال البيانات الوهمية بـ `useEffect` + `dashboardService.getStats()`, `.getChartWeekly()`, `.getChartMonthly()`, `.getEvaluations()` |
| 2 | `src/pages/ChildProfiles.tsx` | `childService` | استبدال `initialProfiles` بـ `childService.getAll()`, إضافة `childService.create()`, `childService.delete()` |
| 3 | `src/pages/ReportsPage.tsx` | `reportService` | استبدال البيانات الوهمية بـ `reportService.getAll()`, `.getStats()`, `.getChartMonthly()`, `.getStatusDistribution()` |
| 4 | `src/pages/RealTimeAnalysis.tsx` | `analysisService` | ربط بدء/إيقاف التحليل بـ `analysisService.startRealTime()`, `.sendFrame()`, `.endRealTime()` |
| 5 | `src/pages/VideoAnalysis.tsx` | `analysisService` | ربط رفع الفيديو بـ `analysisService.uploadVideo()` |
| 6 | `src/pages/Settings.tsx` | `settingsService` (جديد) | ربط قراءة/تحديث الإعدادات بـ API |
| 7 | `src/pages/ArticlesPage.tsx` | `articleService` | استبدال المقالات الوهمية بـ `articleService.getAll()` |
| 8 | `src/pages/ArticleDetailPage.tsx` | `articleService` | استبدال بـ `articleService.getBySlug()` |
| 9 | `src/pages/ContactPage.tsx` | `contactService` (جديد) | ربط نموذج التواصل بـ API |
| 10 | `src/pages/PricingPage.tsx` | `pricingService` (جديد) | ربط خطط الأسعار بـ API |

#### نمط التحديث المطلوب لكل صفحة:

```tsx
// قبل (بيانات وهمية):
const [data] = useState(hardcodedData);

// بعد (API حقيقي):
import { childService } from '../services/childService';

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const loadData = async () => {
    try {
      const response = await childService.getAll();
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, []);
```

#### خدمات فرونت إند جديدة مطلوبة:

| # | الخدمة | الملف | الـ Endpoints |
|---|--------|-------|---------------|
| 1 | `settingsService` | `src/services/settingsService.ts` | `GET /api/settings`, `PUT /api/settings` |
| 2 | `contactService` | `src/services/contactService.ts` | `POST /api/contact` |
| 3 | `pricingService` | `src/services/pricingService.ts` | `GET /api/pricing` |

---

### 1.2 إصلاح `AuthController` - دوال مفقودة

**المشكلة:** المسارات `POST /api/auth/forgot-password` و `POST /api/auth/reset-password` مسجلة في `api.php` لكن الدوال غير موجودة في `AuthController`.

#### الملف: `nabd-backend/app/Http/Controllers/Api/AuthController.php`

**إضافة:**
```php
public function forgotPassword(Request $request): JsonResponse
{
    $request->validate(['email' => 'required|email']);
    
    // في بيئة التطوير: إرجاع رسالة نجاح وهمية
    // في الإنتاج: استخدام Password Broker
    return response()->json([
        'message' => 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني'
    ]);
}

public function resetPassword(Request $request): JsonResponse
{
    $request->validate([
        'email' => 'required|email',
        'token' => 'required|string',
        'password' => 'required|string|min:8|confirmed',
    ]);
    
    return response()->json([
        'message' => 'تم إعادة تعيين كلمة المرور بنجاح'
    ]);
}
```

---

### 1.3 إصلاح `routes/api.php` - Import مفقود

**المشكلة:** ملف المسارات لا يحتوي على `use Illuminate\Http\Request;` رغم أنه قد يكون مطلوباً.

**الملف:** `nabd-backend/routes/api.php`

**التحقق:** فحص هل يوجد استخدام مباشر لـ `Request` في الملف. (نتيجة QA: لا يوجد استخدام مباشر، ليس حرجاً).

---

## 🟡 المرحلة 2: إصلاحات متوسطة (Medium Priority)

### 2.1 تحديث `.env` الباك إند

**الملف:** `nabd-backend/.env`

| المتغير | القيمة الحالية | القيمة المطلوبة |
|---------|---------------|----------------|
| `APP_NAME` | `Laravel` | `Nabd` |
| `APP_LOCALE` | `en` | `ar` |
| `APP_FAKER_LOCALE` | `en_US` | `ar_SA` |
| `DB_CONNECTION` | `sqlite` | `mysql` (مع إعداد المتغيرات) |
| `FRONTEND_URL` | (غير موجود) | `http://localhost:3000` |
| `SANCTUM_STATEFUL_DOMAINS` | (غير موجود) | `localhost:3000` |

### 2.2 إكمال `PdfService` + إنشاء قالب Blade

**الملفات:**
1. `nabd-backend/app/Services/PdfService.php` - إعادة كتابة باستخدام DomPDF
2. `nabd-backend/resources/views/reports/pdf.blade.php` - **ملف جديد**: قالب HTML/CSS للتقرير
3. `composer.json` - إضافة `barryvdh/laravel-dompdf`

```bash
cd nabd-backend
composer require barryvdh/laravel-dompdf
```

#### PdfService المحدث:
```php
use Barryvdh\DomPDF\Facade\Pdf;

class PdfService
{
    public function generatePdf(Report $report): string
    {
        $report->load(['child', 'therapist', 'notes', 'recommendations', 'voiceData']);
        
        $pdf = Pdf::loadView('reports.pdf', ['report' => $report]);
        $filename = "report-{$report->id}-" . now()->format('Y-m-d') . '.pdf';
        $path = "reports/{$filename}";
        
        Storage::disk('public')->put($path, $pdf->output());
        
        return Storage::disk('public')->url($path);
    }
}
```

### 2.3 إضافة Gemini PHP Package

```bash
cd nabd-backend
composer require google-gemini-php/laravel
```

**ثم تحديث `config/services.php`:**
```php
'gemini' => [
    'api_key' => env('GEMINI_API_KEY'),
],
```

### 2.4 إضافة مسارات API ناقصة

**الملف:** `nabd-backend/routes/api.php`

```php
// مسارات ناقصة - داخل middleware('auth:sanctum')

// جلسات وتقارير طفل معين
Route::get('children/{child}/sessions', [ChildController::class, 'sessions']);
Route::get('children/{child}/reports', [ChildController::class, 'reports']);

// إيرادات الجلسات
Route::get('sessions/revenue', [SessionController::class, 'revenue']);

// حالة ونتائج تحليل فيديو
Route::get('analysis/video/{analysisSession}/status', [AnalysisController::class, 'videoStatus']);
Route::get('analysis/video/{analysisSession}/results', [AnalysisController::class, 'results']);
```

**إضافة methods في Controllers:**

#### `ChildController.php` - إضافة:
```php
public function sessions(Request $request, Child $child): AnonymousResourceCollection
{
    $this->authorize('view', $child);
    return SessionResource::collection($child->sessions()->latest()->paginate(12));
}

public function reports(Request $request, Child $child): AnonymousResourceCollection
{
    $this->authorize('view', $child);
    return ReportResource::collection($child->reports()->latest()->paginate(12));
}
```

#### `SessionController.php` - إضافة:
```php
public function revenue(Request $request): JsonResponse
{
    $query = Session::where('therapist_id', $request->user()->id)
        ->where('status', SessionStatus::Completed);

    return response()->json([
        'total_revenue' => $query->sum('amount'),
        'monthly_revenue' => (clone $query)->whereMonth('updated_at', now()->month)->sum('amount'),
        'sessions_count' => $query->count(),
    ]);
}
```

### 2.5 إصلاح تعارض Notification Model

**المشكلة:** `User.php` يستخدم `Notifiable` trait (يعتمد على Laravel Database Notifications) + `HasMany` relation مخصص لنموذج `Notification` مخصص.

**الحل:** إزالة `Notifiable` trait من User model لأن النظام يستخدم Notification model مخصص:

```php
// User.php
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes; // أزيل Notifiable
    // ...
}
```

### 2.6 إضافة UUID Generation للـ Notification Model

**الملف:** `nabd-backend/app/Models/Notification.php`

```php
use Illuminate\Support\Str;

class Notification extends Model
{
    // ...
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
}
```

### 2.7 إنشاء Events & Listeners

**ملفات جديدة:**

| الملف | النوع | الوصف |
|-------|------|-------|
| `app/Events/AnalysisCompleted.php` | Event | يُطلق عند اكتمال تحليل |
| `app/Events/CriticalAlertDetected.php` | Event | يُطلق عند اكتشاف تنبيه حرج |
| `app/Events/SessionStatusChanged.php` | Event | يُطلق عند تغيير حالة جلسة |
| `app/Listeners/NotifyTherapist.php` | Listener | إرسال إشعار للمعالج |
| `app/Listeners/LogActivity.php` | Listener | تسجيل النشاط |
| `app/Listeners/GenerateReport.php` | Listener | توليد تقرير تلقائي |

### 2.8 إضافة SessionStatus::Revenue method

**الملف:** `SessionController.php` - تمت تغطيته في 2.4

### 2.9 إصلاح خطأ SessionStatus import

**التحقق:** تأكد من أن `SessionStatus` enum يحتوي على القيم الصحيحة المستخدمة في Controller.

### 2.10 إضافة Video Status endpoint

**الملف:** `AnalysisController.php`

```php
public function videoStatus(Request $request, AnalysisSession $analysisSession): JsonResponse
{
    return response()->json([
        'status' => $analysisSession->status,
        'progress' => $analysisSession->progress_percentage ?? 0,
        'is_complete' => $analysisSession->status === 'completed',
    ]);
}
```

---

## 🟢 المرحلة 3: تحسينات (Low Priority)

### 3.1 تحديث `DETAILED_REPORT.md`

تحديث الملف ليعكس الحالة الحقيقية للمشروع بعد إكمال الباك إند والربط.

### 3.2 إصلاح npm vulnerabilities

```bash
npm audit fix
```

### 3.3 توليد APP_KEY

```bash
cd nabd-backend
php artisan key:generate
```

### 3.4 إضافة `@types/react` في devDependencies

```bash
npm install -D @types/react @types/react-dom
```

---

## 📋 ترتيب التنفيذ المقترح

| الأولوية | المهمة | الوقت المقدر | التبعيات |
|----------|--------|-------------|----------|
| 1 | إصلاح `.env` + `APP_KEY` | 5 دقائق | لا |
| 2 | إضافة `forgotPassword`/`resetPassword` | 10 دقائق | لا |
| 3 | إصلاح Notification UUID | 5 دقائق | لا |
| 4 | إزالة `Notifiable` من User | 2 دقائق | لا |
| 5 | إضافة مسارات API ناقصة + methods | 30 دقيقة | لا |
| 6 | إنشاء خدمات فرونت جديدة (3) | 15 دقيقة | لا |
| 7 | **ربط Dashboard بـ API** | 45 دقيقة | 5 |
| 8 | **ربط ChildProfiles بـ API** | 45 دقيقة | 5 |
| 9 | **ربط ReportsPage بـ API** | 40 دقيقة | 5 |
| 10 | **ربط Settings بـ API** | 20 دقيقة | 6 |
| 11 | **ربط ArticlesPage/Detail بـ API** | 30 دقيقة | لا |
| 12 | **ربط ContactPage بـ API** | 15 دقيقة | 6 |
| 13 | **ربط PricingPage بـ API** | 15 دقيقة | 6 |
| 14 | ربط RealTimeAnalysis بـ API | 60 دقيقة | 5 |
| 15 | ربط VideoAnalysis بـ API | 40 دقيقة | 5 |
| 16 | إنشاء PdfService + قالب Blade | 45 دقيقة | DomPDF package |
| 17 | إنشاء Events & Listeners | 30 دقيقة | لا |
| 18 | تحديث DETAILED_REPORT.md | 15 دقيقة | بعد كل شيء |
| 19 | npm audit fix + @types | 5 دقائق | لا |
| | **المجموع** | **~7.5 ساعات** | |

---

## 🔧 أمر التشغيل الكامل (بعد إكمال الخطة)

```bash
# 1. إعداد الباك إند
cd nabd-backend
composer install
composer require barryvdh/laravel-dompdf google-gemini-php/laravel
php artisan key:generate
# إعداد قاعدة البيانات MySQL
php artisan migrate --seed
php artisan serve

# 2. إعداد الفرونت إند
cd ..
npm install
npm audit fix
npm install -D @types/react @types/react-dom
npm run dev

# 3. التحقق
npm run lint    # TypeScript check
cd nabd-backend && php artisan test   # Laravel tests
```

---

## ⚠️ ملاحظات مهمة

1. **الأولوية القصوى** هي ربط صفحات الفرونت بالـ API Services (المهام 7-15). بدون هذا الربط، التطبيق يعرض فقط بيانات وهمية ثابتة.

2. **تسجيل الدخول يعمل** - الصفحة الوحيدة المربوطة فعلاً بالـ API هي `LoginPage.tsx` عبر `useAuth()`.

3. **الباك إند جاهز 90%** - البنية التحتية كاملة، يحتاج فقط لإصلاحات طفيفة (مسارات ناقصة + دوال مفقودة).

4. **الفرونت إند جاهز هيكلياً 95%** - كل الصفحات والمكونات موجودة، يحتاج فقط لاستبدال البيانات الوهمية باستدعاءات API حقيقية.

---

*نهاية خطة التنفيذ الثالثة*
