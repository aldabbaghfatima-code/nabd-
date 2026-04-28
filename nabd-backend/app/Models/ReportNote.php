<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'report_id',
        'time',
        'type',
        'text',
        'status',
    ];

    public function report()
    {
        return $this->belongsTo(Report::class);
    }
}
