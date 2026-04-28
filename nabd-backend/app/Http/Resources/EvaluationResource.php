<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EvaluationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'emotional_status' => $this->emotional_status,
            'status_color' => $this->status_color,
            'notes' => $this->notes,
            'child' => ChildResource::make($this->whenLoaded('child')),
            'therapist' => UserResource::make($this->whenLoaded('therapist')),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
