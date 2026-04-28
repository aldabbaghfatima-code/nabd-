<?php

namespace App\Http\Requests\Analysis;

use Illuminate\Foundation\Http\FormRequest;

class SendFrameRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'session_id' => ['required', 'exists:analysis_sessions,id'],
            'frame' => ['required', 'string'],
            'timestamp' => ['nullable', 'numeric'],
        ];
    }
}
