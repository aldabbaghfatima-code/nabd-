<?php

namespace App\Http\Middleware;

use App\Models\ActivityLog;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackActivity
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($request->user() && in_array($request->method(), ['POST', 'PUT', 'PATCH', 'DELETE'])) {
            ActivityLog::create([
                'user_id' => $request->user()->id,
                'action' => $request->method() . ' ' . $request->path(),
                'description' => $request->path(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'properties' => $request->except(['password', 'password_confirmation', '_token']),
            ]);
        }

        return $response;
    }
}
