<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Report\StoreReportRequest;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use App\Services\ReportService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ReportController extends Controller
{
    public function __construct(
        private ReportService $reportService
    ) {}

    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Report::with(['child', 'therapist']);

        if ($request->user()->role->value === 'therapist') {
            $query->where('therapist_id', $request->user()->id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        if ($request->filled('child_id')) {
            $query->where('child_id', $request->input('child_id'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%");
        }

        $reports = $query->latest()->paginate($request->input('per_page', 12));

        return ReportResource::collection($reports);
    }

    public function store(StoreReportRequest $request): JsonResponse
    {
        $report = $this->reportService->generateFromAnalysis(
            $request->validated(),
            $request->user()
        );

        return response()->json([
            'message' => 'تم إنشاء التقرير بنجاح',
            'report' => ReportResource::make($report->load(['child', 'therapist', 'notes', 'recommendations'])),
        ], 201);
    }

    public function show(Request $request, Report $report): JsonResponse
    {
        $this->authorize('view', $report);

        return response()->json(
            ReportResource::make($report->load(['child', 'therapist', 'notes', 'recommendations', 'voiceData']))
        );
    }

    public function update(Request $request, Report $report): JsonResponse
    {
        $this->authorize('update', $report);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:500',
            'status' => 'sometimes|in:draft,under_review,completed',
            'severity' => 'sometimes|in:low,medium,high',
            'summary' => 'nullable|string',
        ]);

        $report->update($validated);

        return response()->json([
            'message' => 'تم تحديث التقرير',
            'report' => ReportResource::make($report->fresh()->load(['child', 'therapist'])),
        ]);
    }

    public function destroy(Request $request, Report $report): JsonResponse
    {
        $this->authorize('delete', $report);

        $report->delete();

        return response()->json(['message' => 'تم حذف التقرير']);
    }

    public function exportPdf(Request $request, Report $report): JsonResponse
    {
        $this->authorize('view', $report);

        $pdfUrl = $this->reportService->generatePdf($report);

        return response()->json(['pdf_url' => $pdfUrl]);
    }

    public function stats(Request $request): JsonResponse
    {
        return response()->json($this->reportService->getStats($request->user()));
    }

    public function chartMonthly(Request $request): JsonResponse
    {
        return response()->json($this->reportService->getChartData($request->user(), 'monthly'));
    }

    public function chartWeekly(Request $request): JsonResponse
    {
        return response()->json($this->reportService->getChartData($request->user(), 'weekly'));
    }

    public function statusDistribution(Request $request): JsonResponse
    {
        return response()->json($this->reportService->getStatusDistribution($request->user()));
    }
}
