<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoiceAnalysisData extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'analysis_session_id',
        'timestamp_seconds',
        'timestamp_display',
        'intensity_value',
        'tone_type',
        'created_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function analysisSession()
    {
        return $this->belongsTo(AnalysisSession::class);
    }
}
