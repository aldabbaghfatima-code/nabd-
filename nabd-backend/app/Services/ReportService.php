<?php

namespace App\Services;

use App\Enums\ReportStatus;
use App\Models\Report;
use App\Models\ReportNote;
use App\Models\ReportRecommendation;
use App\Models\ReportVoiceData;
use Illuminate\Support\Facades\DB;

class ReportService
{
    public function generateFromAnalysis(array $data, $user): Report
    {
        $severity = 'medium';

        if (isset($data['analysis_session_id'])) {
            $analysis = \App\Models\AnalysisSession::find($data['analysis_session_id']);
            if ($analysis) {
                $severity = $this->calculateSeverity($analysis);
            }
        }

        $report = Report::create([
            'analysis_session_id' => $data['analysis_session_id'] ?? null,
            'session_id' => $data['session_id'] ?? null,
            'therapist_id' => $user->id,
            'child_id' => $data['child_id'],
            'title' => $data['title'],
            'type' => $data['type'],
            'status' => ReportStatus::Draft,
            'severity' => $severity,
            'summary' => $data['summary'] ?? null,
        ]);

        if (isset($analysis)) {
            $this->syncFromAnalysis($report, $analysis);
        }

        return $report;
    }

    public function generatePdf(Report $report): string
    {
        return url("/api/reports/{$report->id}/pdf");
    }

    public function getStats($user): array
    {
        $query = Report::where('therapist_id', $user->id);

        return [
            'total' => (clone $query)->count(),
            'completed' => (clone $query)->where('status', ReportStatus::Completed)->count(),
            'under_review' => (clone $query)->where('status', ReportStatus::UnderReview)->count(),
            'draft' => (clone $query)->where('status', ReportStatus::Draft)->count(),
            'high_severity' => (clone $query)->where('severity', 'high')->count(),
        ];
    }

    public function getChartData($user, string $period = 'monthly'): array
    {
        $query = Report::where('therapist_id', $user->id);
        $driver = config('database.default');
        $isSqlite = $driver === 'sqlite';

        if ($period === 'monthly') {
            $monthExpr = $isSqlite
                ? "strftime('%Y-%m', created_at)"
                : "DATE_FORMAT(created_at, '%Y-%m')";

            $data = (clone $query)
                ->selectRaw("{$monthExpr} as month, COUNT(*) as count")
                ->where('created_at', '>=', now()->subMonths(6))
                ->groupByRaw($monthExpr)
                ->orderBy('month')
                ->get();

            return $data->map(fn ($item) => [
                'label' => $item->month,
                'count' => $item->count,
            ])->toArray();
        }

        $weekExpr = $isSqlite
            ? "strftime('%Y-%W', created_at)"
            : "DATE_FORMAT(created_at, '%Y-%U')";

        $data = (clone $query)
            ->selectRaw("{$weekExpr} as week, COUNT(*) as count")
            ->where('created_at', '>=', now()->subWeeks(7))
            ->groupByRaw($weekExpr)
            ->orderBy('week')
            ->get();

        return $data->map(fn ($item) => [
            'label' => $item->week,
            'count' => $item->count,
        ])->toArray();
    }

    public function getStatusDistribution($user): array
    {
        $total = Report::where('therapist_id', $user->id)->count();

        if ($total === 0) {
            return [
                ['status' => 'completed', 'label' => 'مكتمل', 'count' => 0, 'percentage' => 0],
                ['status' => 'under_review', 'label' => 'قيد المراجعة', 'count' => 0, 'percentage' => 0],
                ['status' => 'draft', 'label' => 'مسودة', 'count' => 0, 'percentage' => 0],
            ];
        }

        $statuses = Report::where('therapist_id', $user->id)
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        $labels = [
            'completed' => 'مكتمل',
            'under_review' => 'قيد المراجعة',
            'draft' => 'مسودة',
        ];

        return collect(['completed', 'under_review', 'draft'])->map(fn ($status) => [
            'status' => $status,
            'label' => $labels[$status],
            'count' => $statuses[$status] ?? 0,
            'percentage' => round((($statuses[$status] ?? 0) / $total) * 100, 1),
        ])->toArray();
    }

    private function calculateSeverity($analysis): string
    {
        $avg = ($analysis->attention_score + $analysis->eye_contact_score + $analysis->social_interaction_score) / 3;

        if ($avg < 30) return 'high';
        if ($avg < 60) return 'medium';
        return 'low';
    }

    private function syncFromAnalysis(Report $report, $analysis): void
    {
        $report->update([
            'session_duration' => $analysis->duration_seconds ? gmdate('H:i:s', $analysis->duration_seconds) : null,
            'emotional_state' => $analysis->emotional_state,
            'attention_score' => $analysis->attention_score,
            'vocal_activity_score' => $analysis->vocal_activity_score,
            'eye_contact_score' => $analysis->eye_contact_score,
        ]);

        foreach ($analysis->notes as $note) {
            ReportNote::create([
                'report_id' => $report->id,
                'time' => $note->timestamp_display,
                'type' => $note->type,
                'text' => $note->text,
                'status' => $note->status,
            ]);
        }

        foreach ($analysis->voiceData as $voice) {
            ReportVoiceData::create([
                'report_id' => $report->id,
                'time' => $voice->timestamp_display ?? $voice->timestamp_seconds,
                'value' => $voice->intensity_value,
            ]);
        }
    }
}
