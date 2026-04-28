<?php

use App\Http\Controllers\Api\AnalysisController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChildController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EvaluationController;
use App\Http\Controllers\Api\GuardianController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\PricingController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\SessionController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
        Route::put('/user', [AuthController::class, 'updateProfile']);
    });
});

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/pricing', [PricingController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/children', [ChildController::class, 'index']);
    Route::post('/children', [ChildController::class, 'store']);
    Route::get('/children/stats', [ChildController::class, 'stats']);
    Route::get('/children/{child}', [ChildController::class, 'show']);
    Route::put('/children/{child}', [ChildController::class, 'update']);
    Route::delete('/children/{child}', [ChildController::class, 'destroy']);

    Route::get('/children/{child}/guardians', [GuardianController::class, 'index']);
    Route::post('/children/{child}/guardians', [GuardianController::class, 'store']);
    Route::get('/children/{child}/guardians/{guardian}', [GuardianController::class, 'show']);
    Route::put('/children/{child}/guardians/{guardian}', [GuardianController::class, 'update']);
    Route::delete('/children/{child}/guardians/{guardian}', [GuardianController::class, 'destroy']);

    Route::get('/sessions', [SessionController::class, 'index']);
    Route::post('/sessions', [SessionController::class, 'store']);
    Route::get('/sessions/{session}', [SessionController::class, 'show']);
    Route::put('/sessions/{session}', [SessionController::class, 'update']);
    Route::delete('/sessions/{session}', [SessionController::class, 'destroy']);
    Route::post('/sessions/{session}/start', [SessionController::class, 'start']);
    Route::post('/sessions/{session}/end', [SessionController::class, 'end']);

    Route::post('/analysis/real-time/start', [AnalysisController::class, 'startRealTime']);
    Route::post('/analysis/real-time/frame', [AnalysisController::class, 'sendFrame']);
    Route::post('/analysis/real-time/end/{analysisSession}', [AnalysisController::class, 'endRealTime']);
    Route::get('/analysis/real-time/{analysisSession}/results', [AnalysisController::class, 'results']);
    Route::post('/analysis/video/upload', [AnalysisController::class, 'uploadVideo']);
    Route::post('/analysis/{analysisSession}/notes', [AnalysisController::class, 'addNote']);
    Route::post('/analysis/{analysisSession}/voice-data', [AnalysisController::class, 'voiceData']);

    Route::get('/reports', [ReportController::class, 'index']);
    Route::post('/reports', [ReportController::class, 'store']);
    Route::get('/reports/stats', [ReportController::class, 'stats']);
    Route::get('/reports/chart/monthly', [ReportController::class, 'chartMonthly']);
    Route::get('/reports/chart/weekly', [ReportController::class, 'chartWeekly']);
    Route::get('/reports/status-distribution', [ReportController::class, 'statusDistribution']);
    Route::get('/reports/{report}', [ReportController::class, 'show']);
    Route::put('/reports/{report}', [ReportController::class, 'update']);
    Route::delete('/reports/{report}', [ReportController::class, 'destroy']);
    Route::get('/reports/{report}/pdf', [ReportController::class, 'exportPdf']);

    Route::get('/evaluations', [EvaluationController::class, 'index']);
    Route::post('/evaluations', [EvaluationController::class, 'store']);
    Route::get('/evaluations/{evaluation}', [EvaluationController::class, 'show']);
    Route::put('/evaluations/{evaluation}', [EvaluationController::class, 'update']);

    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/chart/weekly', [DashboardController::class, 'chartWeekly']);
    Route::get('/dashboard/chart/monthly', [DashboardController::class, 'chartMonthly']);
    Route::get('/dashboard/evaluations', [DashboardController::class, 'evaluations']);
    Route::get('/dashboard/upcoming-sessions', [DashboardController::class, 'upcomingSessions']);

    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);

    Route::get('/settings', [SettingsController::class, 'show']);
    Route::put('/settings', [SettingsController::class, 'update']);
});

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::put('/articles/{article}', [ArticleController::class, 'update']);
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy']);

    Route::get('/contacts', [ContactController::class, 'index']);

    Route::post('/pricing', [PricingController::class, 'store']);
    Route::put('/pricing/{pricingPlan}', [PricingController::class, 'update']);
    Route::delete('/pricing/{pricingPlan}', [PricingController::class, 'destroy']);

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}/role', [UserController::class, 'updateRole']);
});
