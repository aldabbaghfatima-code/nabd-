<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChildResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'age_years' => $this->age_years,
            'age' => $this->age_years . ' سنوات',
            'gender' => $this->gender,
            'gender_label' => $this->gender === 'male' ? 'ذكر' : 'أنثى',
            'status' => $this->status,
            'status_label' => $this->status === 'under_evaluation' ? 'قيد التقييم' : 'تقييم مكتمل',
            'diagnosis' => $this->diagnosis,
            'severity' => $this->severity,
            'photo' => $this->photo,
            'notes' => $this->notes,
            'total_sessions' => $this->total_sessions,
            'completed_sessions' => $this->completed_sessions,
            'treatment_start_date' => $this->treatment_start_date?->format('Y-m-d'),
            'therapist' => UserResource::make($this->whenLoaded('therapist')),
            'guardians' => GuardianResource::collection($this->whenLoaded('guardians')),
            'sessions_count' => $this->whenCounted('sessions'),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
