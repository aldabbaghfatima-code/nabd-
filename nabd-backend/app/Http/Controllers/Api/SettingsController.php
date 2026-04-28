<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'language' => $user->language,
            'dark_mode' => $user->dark_mode,
            'notifications_enabled' => $user->notifications_enabled,
            'two_factor_enabled' => $user->two_factor_enabled,
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'language' => 'nullable|in:ar,en',
            'dark_mode' => 'nullable|boolean',
            'notifications_enabled' => 'nullable|boolean',
            'two_factor_enabled' => 'nullable|boolean',
        ]);

        $request->user()->update($validated);

        return response()->json([
            'message' => 'تم تحديث الإعدادات بنجاح',
            'settings' => $validated,
        ]);
    }
}
