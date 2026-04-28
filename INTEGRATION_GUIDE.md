# 🔗 دليل التكامل - مشروع نبض (Nabd)

> **الإصدار:** 2.0 | **التاريخ:** 28 أبريل 2026

---

## نظرة عامة

يربط هذا الدليل بين الفرونت إند (React + Vite) والباك إند (Laravel 12) من خلال API.

---

## البنية التحتية

```
Frontend (React)          Backend (Laravel)
localhost:3000    <--->   localhost:8000/api
    │                         │
    ├── axios (api.ts)        ├── Sanctum (Token Auth)
    ├── services/*.ts         ├── Controllers/Api/
    ├── AuthContext.tsx        ├── Services/
    └── pages/*.tsx           └── Resources/
```

---

## تدفق المصادقة

### 1. تسجيل الدخول
```
Frontend                         Backend
  │                                │
  ├── POST /api/auth/login        │
  │   { email, password }         │
  │                               ├── التحقق من البيانات
  │                               ├── إنشاء Token
  │   { user, token } ◄───────────┤
  │                                │
  ├── حفظ token في localStorage   │
  ├── حفظ user في localStorage    │
  └── توجيه لـ /dashboard         │
```

### 2. طلبات API المصادق عليها
```
Frontend                         Backend
  │                                │
  ├── GET /api/children           │
  │   Header: Authorization:      │
  │     Bearer {token}            │
  │                               ├── Sanctum يتحقق من Token
  │   { data } ◄─────────────────┤
  │                                │
```

### 3. انتهاء الصلاحية (401)
```
Backend                          Frontend
  │                                │
  ├── Response 401                 │
  │                                ├── حذف token من localStorage
  │                                ├── حذف user من localStorage
  │                                └── توجيه لـ /login
```

---

## طبقة API في الفرونت إند

### الملفات

| الملف | الوظيفة |
|-------|---------|
| `src/lib/api.ts` | Axios instance مركزي + interceptors |
| `src/lib/auth.ts` | إدارة Token و User في localStorage |
| `src/contexts/AuthContext.tsx` | حالة المصادقة العامة |
| `src/services/authService.ts` | تسجيل دخول/خروج/تحديث |
| `src/services/childService.ts` | CRUD أطفال |
| `src/services/sessionService.ts` | CRUD جلسات |
| `src/services/reportService.ts` | CRUD تقارير + إحصائيات |
| `src/services/dashboardService.ts` | بيانات لوحة التحكم |
| `src/services/analysisService.ts` | تحليل لحظي + فيديو |
| `src/services/articleService.ts` | مقالات |
| `src/services/notificationService.ts` | إشعارات |

### مثال استخدام Service

```typescript
import { childService } from '../services/childService';

// جلب قائمة الأطفال
const { data } = await childService.getAll({ search: 'فهد' });

// إضافة طفل
const result = await childService.create({
  name: 'أحمد محمد',
  age_years: 5,
  gender: 'male',
  guardian_name: 'محمد',
});

// حذف طفل
await childService.delete(childId);
```

---

## معالجة الأخطاء

### Axios Interceptor
ملف `src/lib/api.ts` يعالج تلقائياً:
- **401**: حذف Token + توجيه لـ /login
- **أخطاء أخرى**: تمرير الخطأ للصفحة

### في الصفحات
```typescript
try {
  await childService.create(data);
} catch (error: any) {
  const message = error.response?.data?.message || 'حدث خطأ';
  setError(message);
}
```

---

## ProtectedRoute

```tsx
// App.tsx
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
}
```

---

## تحديث صفحة فرونت إند (مثال)

### قبل (بيانات وهمية):
```tsx
const [children] = useState([
  { id: 1, name: 'فهد', age: 5 },
]);
```

### بعد (API حقيقي):
```tsx
import { childService } from '../services/childService';

const [children, setChildren] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadChildren();
}, []);

const loadChildren = async () => {
  try {
    const data = await childService.getAll();
    setChildren(data.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

---

## متغيرات البيئة

### Backend (.env)
```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000
DB_DATABASE=nabd_db
GEMINI_API_KEY=your_key_here
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## ترتيب التشغيل

```bash
# 1. الباك إند
cd nabd-backend
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve

# 2. الفرونت إند
cd ..
npm install
npm run dev

# 3. فتح المتصفح
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/api
```

---

## ملاحظات مهمة

1. **CORS**: مُعَد في `config/cors.php` للسماح بـ `localhost:3000`
2. **Sanctum**: يستخدم Token-based authentication (ليس session-based)
3. **API Prefix**: جميع مسارات API تبدأ بـ `/api/`
4. **Pagination**: الافتراضي 12 عنصر، يمكن تغييره بـ `per_page`
5. **Error Format**: `{ message: string, errors?: Record<string, string[]> }`
