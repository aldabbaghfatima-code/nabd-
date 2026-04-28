<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;

class NotificationService
{
    public function sendCriticalAlert(User $user, string $title, string $description, array $data = []): Notification
    {
        return $this->create($user, 'critical_alert', $title, $description, 'critical', $data);
    }

    public function sendSessionComplete(User $user, string $childName, array $data = []): Notification
    {
        return $this->create(
            $user,
            'session_complete',
            'جلسة مكتملة',
            "تم إكمال جلسة الطفل {$childName} بنجاح",
            'success',
            $data
        );
    }

    public function sendReportReady(User $user, string $reportTitle, array $data = []): Notification
    {
        return $this->create(
            $user,
            'report_ready',
            'تقرير جاهز',
            "التقرير \"{$reportTitle}\" أصبح جاهزاً للمراجعة",
            'info',
            $data
        );
    }

    public function sendWarning(User $user, string $title, string $description, array $data = []): Notification
    {
        return $this->create($user, 'warning', $title, $description, 'warning', $data);
    }

    private function create(User $user, string $type, string $title, string $description, string $severity, array $data): Notification
    {
        return Notification::create([
            'user_id' => $user->id,
            'type' => $type,
            'title' => $title,
            'description' => $description,
            'data' => $data,
            'severity' => $severity,
        ]);
    }
}
