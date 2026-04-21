<?php

namespace App\Models;

use App\Enums\SessionStatus;
use App\Enums\SessionType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Session extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'therapist_id',
        'child_id',
        'type',
        'status',
        'scheduled_date',
        'scheduled_time',
        'duration_minutes',
        'amount',
        'notes',
    ];

    protected $casts = [
        'scheduled_date' => 'date',
        'type' => SessionType::class,
        'status' => SessionStatus::class,
    ];

    public function therapist()
    {
        return $this->belongsTo(User::class, 'therapist_id');
    }

    public function child()
    {
        return $this->belongsTo(Child::class);
    }

    public function analysisSession()
    {
        return $this->hasOne(AnalysisSession::class);
    }

    public function report()
    {
        return $this->hasOne(Report::class);
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }
}
