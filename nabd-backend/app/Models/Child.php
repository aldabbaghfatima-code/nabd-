<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Child extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'therapist_id',
        'name',
        'age_years',
        'gender',
        'status',
        'diagnosis',
        'severity',
        'photo',
        'notes',
        'total_sessions',
        'completed_sessions',
        'treatment_start_date',
    ];

    protected $casts = [
        'treatment_start_date' => 'date',
    ];

    public function therapist()
    {
        return $this->belongsTo(User::class, 'therapist_id');
    }

    public function guardians()
    {
        return $this->hasMany(Guardian::class);
    }

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public function analysisSessions()
    {
        return $this->hasMany(AnalysisSession::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }
}
