<?php

namespace App\Http\Requests\Report;

use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'child_id' => ['required', 'exists:children,id'],
            'session_id' => ['nullable', 'exists:sessions,id'],
            'analysis_session_id' => ['nullable', 'exists:analysis_sessions,id'],
            'title' => ['required', 'string', 'max:500'],
            'type' => ['required', 'in:real_time,video_analysis,weekly_followup,initial_assessment,comprehensive'],
            'summary' => ['nullable', 'string'],
        ];
    }
}
