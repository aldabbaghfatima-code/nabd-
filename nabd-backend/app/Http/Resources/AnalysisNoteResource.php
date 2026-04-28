<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnalysisNoteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'timestamp_seconds' => $this->timestamp_seconds,
            'timestamp_display' => $this->timestamp_display,
            'type' => $this->type,
            'text' => $this->text,
            'status' => $this->status,
            'source' => $this->source,
        ];
    }
}
