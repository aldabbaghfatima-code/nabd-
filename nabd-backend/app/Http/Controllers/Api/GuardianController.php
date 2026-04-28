<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GuardianResource;
use App\Models\Child;
use App\Models\Guardian;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class GuardianController extends Controller
{
    public function index(Request $request, Child $child): AnonymousResourceCollection
    {
        $this->authorize('view', $child);

        return GuardianResource::collection($child->guardians);
    }

    public function store(Request $request, Child $child): JsonResponse
    {
        $this->authorize('update', $child);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'relationship' => 'nullable|string|max:50',
        ]);

        $guardian = $child->guardians()->create($validated);

        return response()->json([
            'message' => 'تم إضافة ولي الأمر بنجاح',
            'guardian' => GuardianResource::make($guardian),
        ], 201);
    }

    public function show(Child $child, Guardian $guardian): JsonResponse
    {
        $this->authorize('view', $child);

        return response()->json(GuardianResource::make($guardian));
    }

    public function update(Request $request, Child $child, Guardian $guardian): JsonResponse
    {
        $this->authorize('update', $child);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'relationship' => 'nullable|string|max:50',
        ]);

        $guardian->update($validated);

        return response()->json([
            'message' => 'تم تحديث بيانات ولي الأمر بنجاح',
            'guardian' => GuardianResource::make($guardian),
        ]);
    }

    public function destroy(Child $child, Guardian $guardian): JsonResponse
    {
        $this->authorize('update', $child);

        $guardian->delete();

        return response()->json(['message' => 'تم حذف ولي الأمر بنجاح']);
    }
}
