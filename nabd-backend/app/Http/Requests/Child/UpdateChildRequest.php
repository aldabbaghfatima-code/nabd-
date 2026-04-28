<?php

namespace App\Http\Requests\Child;

use Illuminate\Foundation\Http\FormRequest;

class UpdateChildRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'age_years' => ['sometimes', 'integer', 'min:1', 'max:18'],
            'gender' => ['sometimes', 'in:male,female'],
            'status' => ['sometimes', 'in:under_evaluation,evaluation_complete'],
            'diagnosis' => ['nullable', 'string', 'max:255'],
            'severity' => ['nullable', 'in:mild,moderate,severe'],
            'notes' => ['nullable', 'string'],
            'total_sessions' => ['sometimes', 'integer', 'min:0'],
            'completed_sessions' => ['sometimes', 'integer', 'min:0'],
            'treatment_start_date' => ['nullable', 'date'],
        ];
    }
}
