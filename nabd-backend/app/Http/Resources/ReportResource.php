<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'type' => $this->type,
            'status' => $this->status?->value,
            'status_label' => $this->status?->label(),
            'severity' => $this->severity,
            'summary' => $this->summary,
            'session_duration' => $this->session_duration,
            'emotional_state' => $this->emotional_state,
            'attention_score' => $this->attention_score,
            'vocal_activity_score' => $this->vocal_activity_score,
            'eye_contact_score' => $this->eye_contact_score,
            'child' => ChildResource::make($this->whenLoaded('child')),
            'therapist' => UserResource::make($this->whenLoaded('therapist')),
            'notes' => ReportNoteResource::collection($this->whenLoaded('notes')),
            'recommendations' => ReportRecommendationResource::collection($this->whenLoaded('recommendations')),
            'voice_data' => ReportVoiceDataResource::collection($this->whenLoaded('voiceData')),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
