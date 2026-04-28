<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SessionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'child_id' => $this->child_id,
            'therapist_id' => $this->therapist_id,
            'type' => $this->type?->value,
            'type_label' => $this->type?->label(),
            'status' => $this->status?->value,
            'status_label' => $this->status?->label(),
            'scheduled_date' => $this->scheduled_date?->format('Y-m-d'),
            'scheduled_time' => $this->scheduled_time,
            'duration_minutes' => $this->duration_minutes,
            'amount' => $this->amount,
            'notes' => $this->notes,
            'child' => ChildResource::make($this->whenLoaded('child')),
            'therapist' => UserResource::make($this->whenLoaded('therapist')),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
