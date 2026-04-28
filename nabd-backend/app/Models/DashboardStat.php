<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DashboardStat extends Model
{
    use HasFactory;

    protected $fillable = [
        'therapist_id',
        'stat_date',
        'total_children_evaluated',
        'active_sessions',
        'critical_alerts',
        'sessions_count',
        'total_revenue',
    ];

    protected $casts = [
        'stat_date' => 'date',
        'total_revenue' => 'decimal:2',
    ];

    public function therapist()
    {
        return $this->belongsTo(User::class, 'therapist_id');
    }
}
