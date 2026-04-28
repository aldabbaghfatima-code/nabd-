<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EvaluationResource;
use App\Models\Evaluation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EvaluationController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Evaluation::with(['child', 'therapist']);

        if ($request->user()->role->value === 'therapist') {
            $query->where('therapist_id', $request->user()->id);
        }

        if ($request->filled('child_id')) {
            $query->where('child_id', $request->input('child_id'));
        }

        $evaluations = $query->latest()->paginate($request->input('per_page', 20));

        return EvaluationResource::collection($evaluations);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'child_id' => 'required|exists:children,id',
            'session_id' => 'nullable|exists:sessions,id',
            'type' => 'required|string|max:100',
            'emotional_status' => 'required|string|max:100',
            'status_color' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
        ]);

        $evaluation = Evaluation::create(array_merge($validated, [
            'therapist_id' => $request->user()->id,
        ]));

        return response()->json([
            'message' => 'تم إنشاء التقييم بنجاح',
            'evaluation' => EvaluationResource::make($evaluation->load(['child', 'therapist'])),
        ], 201);
    }

    public function show(Request $request, Evaluation $evaluation): JsonResponse
    {
        return response()->json(
            EvaluationResource::make($evaluation->load(['child', 'therapist', 'session']))
        );
    }

    public function update(Request $request, Evaluation $evaluation): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'sometimes|string|max:100',
            'emotional_status' => 'sometimes|string|max:100',
            'status_color' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
        ]);

        $evaluation->update($validated);

        return response()->json([
            'message' => 'تم تحديث التقييم',
            'evaluation' => EvaluationResource::make($evaluation->fresh()),
        ]);
    }
}
