<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VoiceDataResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'timestamp_seconds' => $this->timestamp_seconds,
            'timestamp_display' => $this->timestamp_display,
            'intensity_value' => $this->intensity_value,
            'tone_type' => $this->tone_type,
        ];
    }
}
