<?php

namespace App\Services;

use App\Enums\SessionStatus;
use App\Http\Resources\EvaluationResource;
use App\Http\Resources\SessionResource;
use App\Models\Child;
use App\Models\Evaluation;
use App\Models\Session;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function calculateStats($user): array
    {
        $childrenQuery = Child::where('therapist_id', $user->id);
        $sessionsQuery = Session::where('therapist_id', $user->id);

        return [
            'total_children' => (clone $childrenQuery)->count(),
            'under_evaluation' => (clone $childrenQuery)->where('status', 'under_evaluation')->count(),
            'active_sessions' => (clone $sessionsQuery)->where('status', SessionStatus::InProgress)->count(),
            'total_sessions' => (clone $sessionsQuery)->count(),
            'completed_sessions' => (clone $sessionsQuery)->where('status', SessionStatus::Completed)->count(),
            'total_reports' => $user->reports()->count(),
            'critical_alerts' => $user->notifications()->where('severity', 'critical')->whereNull('read_at')->count(),
            'today_sessions' => (clone $sessionsQuery)->whereDate('scheduled_date', today())->count(),
            'total_revenue' => (clone $sessionsQuery)->where('status', SessionStatus::Completed)->sum('amount'),
        ];
    }

    public function getWeeklyData($user): array
    {
        $days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        $driver = config('database.default');
        $dowExpr = $driver === 'sqlite'
            ? "CAST(strftime('%w', scheduled_date) AS INTEGER) + 1"
            : "DAYOFWEEK(scheduled_date)";

        $dailyData = Session::where('therapist_id', $user->id)
            ->selectRaw("{$dowExpr} as day_of_week, COUNT(*) as count")
            ->where('scheduled_date', '>=', now()->startOfWeek())
            ->groupByRaw($dowExpr)
            ->get()
            ->keyBy('day_of_week');

        return collect(range(1, 7))->map(fn ($day) => [
            'day' => $days[$day - 1],
            'sessions' => $dailyData->get($day)?->count ?? 0,
        ])->values()->toArray();
    }

    public function getMonthlyData($user): array
    {
        $months = [
            1 => 'يناير', 2 => 'فبراير', 3 => 'مارس', 4 => 'أبريل',
            5 => 'مايو', 6 => 'يونيو', 7 => 'يوليو', 8 => 'أغسطس',
            9 => 'سبتمبر', 10 => 'أكتوبر', 11 => 'نوفمبر', 12 => 'ديسمبر',
        ];

        $driver = config('database.default');
        $monthExpr = $driver === 'sqlite'
            ? "CAST(strftime('%m', scheduled_date) AS INTEGER)"
            : "MONTH(scheduled_date)";
        $yearExpr = $driver === 'sqlite'
            ? "strftime('%Y', scheduled_date)"
            : "YEAR(scheduled_date)";

        $data = Session::where('therapist_id', $user->id)
            ->selectRaw("{$monthExpr} as month, COUNT(*) as count")
            ->whereRaw("{$yearExpr} = ?", [now()->year])
            ->groupByRaw($monthExpr)
            ->get()
            ->keyBy('month');

        return collect(range(1, 12))->map(fn ($m) => [
            'month' => $months[$m],
            'sessions' => $data->get($m)?->count ?? 0,
        ])->values()->toArray();
    }

    public function getRecentEvaluations($user, int $limit = 5): array
    {
        $evaluations = Evaluation::where('therapist_id', $user->id)
            ->with(['child'])
            ->latest()
            ->limit($limit)
            ->get();

        return EvaluationResource::collection($evaluations)->resolve();
    }

    public function getUpcomingSessions($user, int $limit = 5): array
    {
        $sessions = Session::where('therapist_id', $user->id)
            ->with(['child'])
            ->where('scheduled_date', '>=', today())
            ->whereIn('status', [SessionStatus::Scheduled, SessionStatus::InProgress])
            ->orderBy('scheduled_date')
            ->orderBy('scheduled_time')
            ->limit($limit)
            ->get();

        return SessionResource::collection($sessions)->resolve();
    }
}
