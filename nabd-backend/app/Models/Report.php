<?php

namespace App\Models;

use App\Enums\ReportStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'analysis_session_id',
        'session_id',
        'therapist_id',
        'child_id',
        'title',
        'type',
        'status',
        'severity',
        'summary',
        'session_duration',
        'emotional_state',
        'attention_score',
        'vocal_activity_score',
        'eye_contact_score',
    ];

    protected $casts = [
        'status' => ReportStatus::class,
    ];

    public function analysisSession()
    {
        return $this->belongsTo(AnalysisSession::class);
    }

    public function session()
    {
        return $this->belongsTo(Session::class);
    }

    public function therapist()
    {
        return $this->belongsTo(User::class, 'therapist_id');
    }

    public function child()
    {
        return $this->belongsTo(Child::class);
    }

    public function notes()
    {
        return $this->hasMany(ReportNote::class);
    }

    public function recommendations()
    {
        return $this->hasMany(ReportRecommendation::class);
    }

    public function voiceData()
    {
        return $this->hasMany(ReportVoiceData::class);
    }
}
