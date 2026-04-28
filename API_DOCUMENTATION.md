# 📡 توثيق API - مشروع نبض (Nabd)

> **الإصدار:** 2.0 | **التاريخ:** 28 أبريل 2026  
> **Base URL:** `http://localhost:8000/api`

---

## المصادقة (Authentication)

### تسجيل حساب جديد
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "د. سارة الأحمد",
  "email": "dr.sara@nabd.com",
  "password": "password",
  "password_confirmation": "password"
}

Response 201:
{
  "user": { "id": 1, "name": "...", "email": "...", "role": "therapist" },
  "token": "1|abc123..."
}
```

### تسجيل الدخول
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "dr.sara@nabd.com",
  "password": "password"
}

Response 200:
{
  "user": { "id": 1, "name": "...", "email": "...", "role": "therapist" },
  "token": "2|def456..."
}
```

### تسجيل الخروج
```
POST /api/auth/logout
Authorization: Bearer {token}

Response 200:
{ "message": "تم تسجيل الخروج بنجاح" }
```

### الحصول على بيانات المستخدم الحالي
```
GET /api/auth/user
Authorization: Bearer {token}

Response 200:
{ "id": 1, "name": "...", "email": "...", "role": "therapist", ... }
```

### تحديث الملف الشخصي
```
PUT /api/auth/user
Authorization: Bearer {token}

{
  "name": "د. سارة الأحمد",
  "phone": "0501234567",
  "organization": "مركز نبض",
  "language": "ar",
  "dark_mode": false,
  "notifications_enabled": true
}
```

---

## الأطفال (Children)

| Method | URL | الوصف | المصادقة |
|--------|-----|-------|---------|
| GET | /api/children | قائمة الأطفال | ✅ |
| POST | /api/children | إضافة طفل | ✅ |
| GET | /api/children/stats | إحصائيات الأطفال | ✅ |
| GET | /api/children/{id} | عرض طفل | ✅ |
| PUT | /api/children/{id} | تحديث طفل | ✅ |
| DELETE | /api/children/{id} | حذف طفل | ✅ |

**معاملات الاستعلام (GET /api/children):**
- `search` - بحث بالاسم
- `status` - تصفية بالحالة (under_evaluation / evaluation_complete)
- `severity` - تصفية بالشدة (mild / moderate / severe)
- `per_page` - عدد النتائج (افتراضي: 12)

**إنشاء طفل (POST /api/children):**
```json
{
  "name": "أحمد محمد",
  "age_years": 5,
  "gender": "male",
  "diagnosis": "فرط حركة",
  "severity": "moderate",
  "notes": "ملاحظات",
  "guardian_name": "محمد",
  "guardian_phone": "0501234567",
  "guardian_email": "m@example.com",
  "guardian_relationship": "أب",
  "treatment_start_date": "2026-01-15"
}
```

---

## أولياء الأمور (Guardians)

| Method | URL | الوصف |
|--------|-----|-------|
| GET | /api/children/{childId}/guardians | قائمة أولياء الأمور |
| POST | /api/children/{childId}/guardians | إضافة ولي أمر |
| PUT | /api/children/{childId}/guardians/{id} | تحديث |
| DELETE | /api/children/{childId}/guardians/{id} | حذف |

---

## الجلسات (Sessions)

| Method | URL | الوصف |
|--------|-----|-------|
| GET | /api/sessions | قائمة الجلسات |
| POST | /api/sessions | إنشاء جلسة |
| GET | /api/sessions/{id} | عرض جلسة |
| PUT | /api/sessions/{id} | تحديث جلسة |
| DELETE | /api/sessions/{id} | حذف جلسة |
| POST | /api/sessions/{id}/start | بدء الجلسة |
| POST | /api/sessions/{id}/end | إنهاء الجلسة |

**معاملات الاستعلام:** `status`, `child_id`, `date_from`, `date_to`, `per_page`

---

## التحليل (Analysis)

| Method | URL | الوصف |
|--------|-----|-------|
| POST | /api/analysis/real-time/start | بدء تحليل لحظي |
| POST | /api/analysis/real-time/frame | إرسال إطار |
| POST | /api/analysis/real-time/end/{id} | إنهاء تحليل |
| GET | /api/analysis/real-time/{id}/results | النتائج |
| POST | /analysis/video/upload | رفع فيديو |
| POST | /api/analysis/{id}/notes | إضافة ملاحظة |
| POST | /api/analysis/{id}/voice-data | إرسال بيانات صوت |

---

## التقارير (Reports)

| Method | URL | الوصف |
|--------|-----|-------|
| GET | /api/reports | قائمة التقارير |
| POST | /api/reports | إنشاء تقرير |
| GET | /api/reports/stats | إحصائيات |
| GET | /api/reports/chart/monthly | بيانات شهرية |
| GET | /api/reports/chart/weekly | بيانات أسبوعية |
| GET | /api/reports/status-distribution | توزيع الحالات |
| GET | /api/reports/{id} | عرض تقرير |
| PUT | /api/reports/{id} | تحديث تقرير |
| DELETE | /api/reports/{id} | حذف تقرير |
| GET | /api/reports/{id}/pdf | تصدير PDF |

---

## لوحة التحكم (Dashboard)

| Method | URL | الوصف |
|--------|-----|-------|
| GET | /api/dashboard/stats | الإحصائيات |
| GET | /api/dashboard/chart/weekly | بيانات أسبوعية |
| GET | /api/dashboard/chart/monthly | بيانات شهرية |
| GET | /api/dashboard/evaluations | التقييمات الأخيرة |
| GET | /api/dashboard/upcoming-sessions | الجلسات القادمة |

---

## التقييمات (Evaluations)

| Method | URL | الوصف |
|--------|-----|-------|
| GET | /api/evaluations | قائمة التقييمات |
| POST | /api/evaluations | إنشاء تقييم |
| GET | /api/evaluations/{id} | عرض تقييم |
| PUT | /api/evaluations/{id} | تحديث تقييم |

---

## الإشعارات (Notifications)

| Method | URL | الوصف |
|--------|-----|-------|
| GET | /api/notifications | قائمة الإشعارات |
| POST | /api/notifications/{id}/read | تعليم كمقروء |
| POST | /api/notifications/read-all | تعليم الكل كمقروء |

---

## الإعدادات (Settings)

| Method | URL | الوصف |
|--------|-----|-------|
| GET | /api/settings | عرض الإعدادات |
| PUT | /api/settings | تحديث الإعدادات |

---

## مسارات عامة (Public)

| Method | URL | الوصف |
|--------|-----|-------|
| GET | /api/articles | قائمة المقالات |
| GET | /api/articles/{slug} | عرض مقال |
| POST | /api/contact | إرسال رسالة تواصل |
| GET | /api/pricing | خطط الأسعار |

---

## مسارات المدير (Admin Only)

| Method | URL | الوصف |
|--------|-----|-------|
| POST | /api/admin/articles | إنشاء مقال |
| PUT | /api/admin/articles/{id} | تحديث مقال |
| DELETE | /api/admin/articles/{id} | حذف مقال |
| GET | /api/admin/contacts | رسائل التواصل |
| CRUD | /api/admin/pricing | إدارة خطط الأسعار |
| GET | /api/admin/users | قائمة المستخدمين |
| GET | /api/admin/users/{id} | عرض مستخدم |
| PUT | /api/admin/users/{id}/role | تحديث الدور |

---

## أكواد الحالة

| الكود | المعنى |
|-------|--------|
| 200 | نجاح |
| 201 | تم الإنشاء |
| 400 | طلب غير صالح |
| 401 | غير مصادق |
| 403 | غير مصرح |
| 404 | غير موجود |
| 422 | خطأ في التحقق |
| 500 | خطأ في الخادم |

## تنسيق الأخطاء

```json
{
  "message": "رسالة الخطأ",
  "errors": {
    "field": ["رسالة الخطأ للحقل"]
  }
}
```
