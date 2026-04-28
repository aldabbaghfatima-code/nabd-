<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Analysis\StartAnalysisRequest;
use App\Http\Requests\Analysis\SendFrameRequest;
use App\Http\Resources\AnalysisResource;
use App\Models\AnalysisNote;
use App\Models\AnalysisSession;
use App\Models\VoiceAnalysisData;
use App\Services\AnalysisService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnalysisController extends Controller
{
    public function __construct(
        private AnalysisService $analysisService
    ) {}

    public function startRealTime(StartAnalysisRequest $request): JsonResponse
    {
        $analysis = $this->analysisService->startSession(
            $request->validated(),
            $request->user()
        );

        return response()->json([
            'message' => 'تم بدء جلسة التحليل',
            'analysis' => AnalysisResource::make($analysis),
        ], 201);
    }

    public function sendFrame(SendFrameRequest $request): JsonResponse
    {
        $analysis = AnalysisSession::findOrFail($request->session_id);

        $result = $this->analysisService->processFrame($analysis, $request->frame, $request->timestamp);

        return response()->json($result);
    }

    public function endRealTime(Request $request, AnalysisSession $analysisSession): JsonResponse
    {
        $analysis = $this->analysisService->endSession($analysisSession);

        return response()->json([
            'message' => 'تم إنهاء جلسة التحليل',
            'analysis' => AnalysisResource::make($analysis->load(['notes', 'voiceData'])),
        ]);
    }

    public function results(Request $request, AnalysisSession $analysisSession): JsonResponse
    {
        return response()->json(
            AnalysisResource::make($analysisSession->load(['notes', 'voiceData', 'child', 'therapist']))
        );
    }

    public function uploadVideo(Request $request): JsonResponse
    {
        $request->validate([
            'session_id' => 'required|exists:sessions,id',
            'child_id' => 'required|exists:children,id',
            'video' => 'required|file|mimes:mp4,avi,mov,webm|max:102400',
        ]);

        $analysis = $this->analysisService->processVideo(
            $request->file('video'),
            $request->input('session_id'),
            $request->input('child_id'),
            $request->user()
        );

        return response()->json([
            'message' => 'تم رفع الفيديو وبدء التحليل',
            'analysis' => AnalysisResource::make($analysis),
        ], 201);
    }

    public function addNote(Request $request, AnalysisSession $analysisSession): JsonResponse
    {
        $validated = $request->validate([
            'timestamp_seconds' => 'nullable|integer',
            'timestamp_display' => 'nullable|string|max:20',
            'type' => 'required|string|max:100',
            'text' => 'required|string',
            'status' => 'nullable|in:positive,warning,info',
        ]);

        $note = $analysisSession->notes()->create(array_merge($validated, [
            'source' => 'therapist',
            'status' => $validated['status'] ?? 'info',
        ]));

        return response()->json([
            'message' => 'تم إضافة الملاحظة',
            'note' => $note,
        ], 201);
    }

    public function voiceData(Request $request, AnalysisSession $analysisSession): JsonResponse
    {
        $validated = $request->validate([
            'data' => 'required|array',
            'data.*.timestamp_seconds' => 'required|integer',
            'data.*.timestamp_display' => 'nullable|string|max:20',
            'data.*.intensity_value' => 'required|numeric',
            'data.*.tone_type' => 'nullable|in:calm,tension,neutral,happy,sad,angry',
        ]);

        $voiceData = collect($validated['data'])->map(fn ($item) => VoiceAnalysisData::create([
            'analysis_session_id' => $analysisSession->id,
            'timestamp_seconds' => $item['timestamp_seconds'],
            'timestamp_display' => $item['timestamp_display'] ?? null,
            'intensity_value' => $item['intensity_value'],
            'tone_type' => $item['tone_type'] ?? 'neutral',
        ]));

        return response()->json([
            'message' => 'تم حفظ بيانات الصوت',
            'count' => $voiceData->count(),
        ], 201);
    }
}
