<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService
    ) {}

    public function stats(Request $request): JsonResponse
    {
        return response()->json($this->dashboardService->calculateStats($request->user()));
    }

    public function chartWeekly(Request $request): JsonResponse
    {
        return response()->json($this->dashboardService->getWeeklyData($request->user()));
    }

    public function chartMonthly(Request $request): JsonResponse
    {
        return response()->json($this->dashboardService->getMonthlyData($request->user()));
    }

    public function evaluations(Request $request): JsonResponse
    {
        return response()->json($this->dashboardService->getRecentEvaluations($request->user()));
    }

    public function upcomingSessions(Request $request): JsonResponse
    {
        return response()->json($this->dashboardService->getUpcomingSessions($request->user()));
    }
}
