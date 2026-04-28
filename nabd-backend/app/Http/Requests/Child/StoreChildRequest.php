<?php

namespace App\Http\Requests\Child;

use Illuminate\Foundation\Http\FormRequest;

class StoreChildRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'age_years' => ['required', 'integer', 'min:1', 'max:18'],
            'gender' => ['required', 'in:male,female'],
            'diagnosis' => ['nullable', 'string', 'max:255'],
            'severity' => ['nullable', 'in:mild,moderate,severe'],
            'notes' => ['nullable', 'string'],
            'guardian_name' => ['required', 'string', 'max:255'],
            'guardian_phone' => ['nullable', 'string', 'max:20'],
            'guardian_email' => ['nullable', 'email', 'max:255'],
            'guardian_relationship' => ['nullable', 'string', 'max:50'],
            'treatment_start_date' => ['nullable', 'date'],
        ];
    }
}
