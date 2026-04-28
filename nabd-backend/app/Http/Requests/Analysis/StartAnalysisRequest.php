<?php

namespace App\Http\Requests\Analysis;

use Illuminate\Foundation\Http\FormRequest;

class StartAnalysisRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'session_id' => ['required', 'exists:sessions,id'],
            'child_id' => ['required', 'exists:children,id'],
            'analysis_type' => ['required', 'in:real_time,video'],
        ];
    }
}
