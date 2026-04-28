<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    use HasFactory;

    protected $fillable = [
        'therapist_id',
        'child_id',
        'session_id',
        'type',
        'emotional_status',
        'status_color',
        'notes',
    ];

    public function therapist()
    {
        return $this->belongsTo(User::class, 'therapist_id');
    }

    public function child()
    {
        return $this->belongsTo(Child::class);
    }

    public function session()
    {
        return $this->belongsTo(Session::class);
    }
}
