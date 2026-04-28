<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Session\StoreSessionRequest;
use App\Http\Requests\Session\UpdateSessionRequest;
use App\Http\Resources\SessionResource;
use App\Enums\SessionStatus;
use App\Models\Session;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SessionController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Session::with(['child', 'therapist']);

        if ($request->user()->role->value === 'therapist') {
            $query->where('therapist_id', $request->user()->id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('child_id')) {
            $query->where('child_id', $request->input('child_id'));
        }

        if ($request->filled('date_from')) {
            $query->where('scheduled_date', '>=', $request->input('date_from'));
        }

        if ($request->filled('date_to')) {
            $query->where('scheduled_date', '<=', $request->input('date_to'));
        }

        $sessions = $query->orderBy('scheduled_date', 'desc')
            ->orderBy('scheduled_time', 'desc')
            ->paginate($request->input('per_page', 12));

        return SessionResource::collection($sessions);
    }

    public function store(StoreSessionRequest $request): JsonResponse
    {
        $session = Session::create([
            'therapist_id' => $request->user()->id,
            'child_id' => $request->child_id,
            'type' => $request->type,
            'scheduled_date' => $request->scheduled_date,
            'scheduled_time' => $request->scheduled_time,
            'duration_minutes' => $request->duration_minutes,
            'amount' => $request->amount ?? 0,
            'notes' => $request->notes,
        ]);

        return response()->json([
            'message' => 'تم إنشاء الجلسة بنجاح',
            'session' => SessionResource::make($session->load(['child', 'therapist'])),
        ], 201);
    }

    public function show(Request $request, Session $session): JsonResponse
    {
        $this->authorize('view', $session);

        return response()->json(
            SessionResource::make($session->load(['child', 'therapist', 'analysisSession', 'evaluations']))
        );
    }

    public function update(UpdateSessionRequest $request, Session $session): JsonResponse
    {
        $this->authorize('update', $session);

        $session->update($request->validated());

        return response()->json([
            'message' => 'تم تحديث الجلسة بنجاح',
            'session' => SessionResource::make($session->fresh()->load(['child', 'therapist'])),
        ]);
    }

    public function destroy(Request $request, Session $session): JsonResponse
    {
        $this->authorize('delete', $session);

        $session->delete();

        return response()->json(['message' => 'تم حذف الجلسة بنجاح']);
    }

    public function start(Request $request, Session $session): JsonResponse
    {
        $this->authorize('update', $session);

        $session->update(['status' => SessionStatus::InProgress]);

        return response()->json([
            'message' => 'تم بدء الجلسة',
            'session' => SessionResource::make($session->fresh()),
        ]);
    }

    public function end(Request $request, Session $session): JsonResponse
    {
        $this->authorize('update', $session);

        $session->update([
            'status' => SessionStatus::Completed,
            'duration_minutes' => $request->input('duration_minutes', $session->duration_minutes),
        ]);

        return response()->json([
            'message' => 'تم إنهاء الجلسة',
            'session' => SessionResource::make($session->fresh()),
        ]);
    }
}
