<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Child\StoreChildRequest;
use App\Http\Requests\Child\UpdateChildRequest;
use App\Http\Resources\ChildResource;
use App\Models\Child;
use App\Models\Guardian;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ChildController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Child::with(['therapist', 'guardians']);

        if ($request->user()->role->value === 'therapist') {
            $query->where('therapist_id', $request->user()->id);
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('severity')) {
            $query->where('severity', $request->input('severity'));
        }

        $children = $query->latest()->paginate($request->input('per_page', 12));

        return ChildResource::collection($children);
    }

    public function store(StoreChildRequest $request): JsonResponse
    {
        $child = Child::create([
            'therapist_id' => $request->user()->id,
            'name' => $request->name,
            'age_years' => $request->age_years,
            'gender' => $request->gender,
            'diagnosis' => $request->diagnosis,
            'severity' => $request->severity ?? 'mild',
            'notes' => $request->notes,
            'treatment_start_date' => $request->treatment_start_date ?? now(),
        ]);

        if ($request->filled('guardian_name')) {
            Guardian::create([
                'child_id' => $child->id,
                'name' => $request->guardian_name,
                'phone' => $request->guardian_phone,
                'email' => $request->guardian_email,
                'relationship' => $request->guardian_relationship,
            ]);
        }

        return response()->json([
            'message' => 'تم إضافة الطفل بنجاح',
            'child' => ChildResource::make($child->load(['therapist', 'guardians'])),
        ], 201);
    }

    public function show(Request $request, Child $child): JsonResponse
    {
        $this->authorize('view', $child);

        return response()->json(
            ChildResource::make($child->load(['therapist', 'guardians', 'sessions', 'reports']))
        );
    }

    public function update(UpdateChildRequest $request, Child $child): JsonResponse
    {
        $this->authorize('update', $child);

        $child->update($request->validated());

        return response()->json([
            'message' => 'تم تحديث بيانات الطفل بنجاح',
            'child' => ChildResource::make($child->fresh()->load(['therapist', 'guardians'])),
        ]);
    }

    public function destroy(Request $request, Child $child): JsonResponse
    {
        $this->authorize('delete', $child);

        $child->delete();

        return response()->json(['message' => 'تم حذف ملف الطفل بنجاح']);
    }

    public function stats(Request $request): JsonResponse
    {
        $query = Child::where('therapist_id', $request->user()->id);

        return response()->json([
            'total' => $query->count(),
            'under_evaluation' => (clone $query)->where('status', 'under_evaluation')->count(),
            'evaluation_complete' => (clone $query)->where('status', 'evaluation_complete')->count(),
            'mild' => (clone $query)->where('severity', 'mild')->count(),
            'moderate' => (clone $query)->where('severity', 'moderate')->count(),
            'severe' => (clone $query)->where('severity', 'severe')->count(),
        ]);
    }
}
