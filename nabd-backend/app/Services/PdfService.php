<?php

namespace App\Services;

use App\Models\Report;

class PdfService
{
    public function renderReport(Report $report): string
    {
        $report->load(['child', 'therapist', 'notes', 'recommendations', 'voiceData']);

        return view('reports.pdf', ['report' => $report])->render();
    }

    public function downloadPdf(Report $report): string
    {
        return $this->renderReport($report);
    }
}
