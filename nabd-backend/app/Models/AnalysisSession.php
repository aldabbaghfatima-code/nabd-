<?php

namespace App\Models;

use App\Enums\AnalysisType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnalysisSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_id',
        'child_id',
        'therapist_id',
        'analysis_type',
        'status',
        'started_at',
        'ended_at',
        'duration_seconds',
        'video_file_path',
        'video_duration_seconds',
        'video_mime_type',
        'attention_score',
        'vocal_activity_score',
        'eye_contact_score',
        'social_interaction_score',
        'emotional_state',
        'face_tracking_confidence',
        'ai_model',
        'ai_raw_response',
        'total_interest_points',
        'total_behavioral_alerts',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'analysis_type' => AnalysisType::class,
        'ai_raw_response' => 'array',
    ];

    public function session()
    {
        return $this->belongsTo(Session::class);
    }

    public function child()
    {
        return $this->belongsTo(Child::class);
    }

    public function therapist()
    {
        return $this->belongsTo(User::class, 'therapist_id');
    }

    public function notes()
    {
        return $this->hasMany(AnalysisNote::class);
    }

    public function voiceData()
    {
        return $this->hasMany(VoiceAnalysisData::class);
    }

    public function report()
    {
        return $this->hasOne(Report::class);
    }
}
