<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnalysisResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'analysis_type' => $this->analysis_type?->value,
            'status' => $this->status,
            'started_at' => $this->started_at?->toIso8601String(),
            'ended_at' => $this->ended_at?->toIso8601String(),
            'duration_seconds' => $this->duration_seconds,
            'attention_score' => $this->attention_score,
            'vocal_activity_score' => $this->vocal_activity_score,
            'eye_contact_score' => $this->eye_contact_score,
            'social_interaction_score' => $this->social_interaction_score,
            'emotional_state' => $this->emotional_state,
            'face_tracking_confidence' => $this->face_tracking_confidence,
            'total_interest_points' => $this->total_interest_points,
            'total_behavioral_alerts' => $this->total_behavioral_alerts,
            'child' => ChildResource::make($this->whenLoaded('child')),
            'therapist' => UserResource::make($this->whenLoaded('therapist')),
            'notes' => AnalysisNoteResource::collection($this->whenLoaded('notes')),
            'voice_data' => VoiceDataResource::collection($this->whenLoaded('voiceData')),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
