<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnalysisNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'analysis_session_id',
        'timestamp_seconds',
        'timestamp_display',
        'type',
        'text',
        'status',
        'source',
    ];

    public function analysisSession()
    {
        return $this->belongsTo(AnalysisSession::class);
    }
}
