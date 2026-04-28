<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PricingPlan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PricingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $plans = PricingPlan::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json(['plans' => $plans]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_en' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'currency' => 'nullable|string|max:10',
            'billing_period' => 'nullable|in:monthly,yearly,one_time',
            'max_children' => 'nullable|integer',
            'max_sessions_per_month' => 'nullable|integer',
            'features' => 'nullable|array',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $plan = PricingPlan::create($validated);

        return response()->json(['plan' => $plan], 201);
    }

    public function update(Request $request, PricingPlan $pricingPlan): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'name_en' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'currency' => 'nullable|string|max:10',
            'billing_period' => 'nullable|in:monthly,yearly,one_time',
            'max_children' => 'nullable|integer',
            'max_sessions_per_month' => 'nullable|integer',
            'features' => 'nullable|array',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $pricingPlan->update($validated);

        return response()->json(['plan' => $pricingPlan->fresh()]);
    }

    public function destroy(Request $request, PricingPlan $pricingPlan): JsonResponse
    {
        $pricingPlan->delete();

        return response()->json(['message' => 'تم حذف الخطة']);
    }
}
