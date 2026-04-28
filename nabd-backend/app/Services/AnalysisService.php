<?php

namespace App\Services;

use App\Enums\AnalysisType;
use App\Models\AnalysisNote;
use App\Models\AnalysisSession;
use App\Models\VoiceAnalysisData;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AnalysisService
{
    public function __construct(
        private GeminiService $geminiService
    ) {}

    public function startSession(array $data, $user): AnalysisSession
    {
        return AnalysisSession::create([
            'session_id' => $data['session_id'],
            'child_id' => $data['child_id'],
            'therapist_id' => $user->id,
            'analysis_type' => $data['analysis_type'],
            'status' => 'processing',
            'started_at' => now(),
            'ai_model' => config('gemini.video_model', 'gemini-2.0-flash-001'),
        ]);
    }

    public function processFrame(AnalysisSession $analysis, string $frame, ?float $timestamp = null): array
    {
        $result = $this->geminiService->analyzeFrame($frame);

        $this->updateScores($analysis, $result);

        if (! empty($result['notes'])) {
            foreach ($result['notes'] as $note) {
                AnalysisNote::create([
                    'analysis_session_id' => $analysis->id,
                    'timestamp_seconds' => $timestamp ? (int) $timestamp : null,
                    'timestamp_display' => $timestamp ? gmdate('i:s', (int) $timestamp) : null,
                    'type' => $note['type'] ?? 'behavioral',
                    'text' => $note['text'] ?? '',
                    'status' => $note['status'] ?? 'info',
                    'source' => 'ai',
                ]);
            }
        }

        return [
            'analysis_id' => $analysis->id,
            'scores' => [
                'attention_score' => $analysis->fresh()->attention_score,
                'vocal_activity_score' => $analysis->fresh()->vocal_activity_score,
                'eye_contact_score' => $analysis->fresh()->eye_contact_score,
                'social_interaction_score' => $analysis->fresh()->social_interaction_score,
            ],
            'emotional_state' => $analysis->fresh()->emotional_state,
            'notes' => $result['notes'] ?? [],
            'alerts' => $result['alerts'] ?? [],
        ];
    }

    public function endSession(AnalysisSession $analysis): AnalysisSession
    {
        $endedAt = now();
        $duration = $analysis->started_at ? $analysis->started_at->diffInSeconds($endedAt) : 0;

        $analysis->update([
            'status' => 'completed',
            'ended_at' => $endedAt,
            'duration_seconds' => $duration,
        ]);

        return $analysis->fresh();
    }

    public function processVideo($videoFile, int $sessionId, int $childId, $user): AnalysisSession
    {
        $path = $videoFile->store('analysis_videos', 'private');

        $analysis = AnalysisSession::create([
            'session_id' => $sessionId,
            'child_id' => $childId,
            'therapist_id' => $user->id,
            'analysis_type' => AnalysisType::Video,
            'status' => 'processing',
            'started_at' => now(),
            'video_file_path' => $path,
            'video_duration_seconds' => null,
            'video_mime_type' => $videoFile->getMimeType(),
            'ai_model' => config('gemini.video_model', 'gemini-2.0-flash-001'),
        ]);

        $fullPath = Storage::disk('private')->path($path);
        $result = $this->geminiService->analyzeVideo($fullPath);

        $this->updateScores($analysis, $result);

        $analysis->update([
            'ai_raw_response' => $result,
            'status' => 'completed',
            'ended_at' => now(),
        ]);

        return $analysis->fresh();
    }

    private function updateScores(AnalysisSession $analysis, array $result): void
    {
        $updateData = [];

        if (isset($result['attention_score'])) {
            $updateData['attention_score'] = $result['attention_score'];
        }
        if (isset($result['vocal_activity_score'])) {
            $updateData['vocal_activity_score'] = $result['vocal_activity_score'];
        }
        if (isset($result['eye_contact_score'])) {
            $updateData['eye_contact_score'] = $result['eye_contact_score'];
        }
        if (isset($result['social_interaction_score'])) {
            $updateData['social_interaction_score'] = $result['social_interaction_score'];
        }
        if (isset($result['emotional_state'])) {
            $updateData['emotional_state'] = $result['emotional_state'];
        }

        if (! empty($updateData)) {
            $analysis->update($updateData);
        }
    }
}
