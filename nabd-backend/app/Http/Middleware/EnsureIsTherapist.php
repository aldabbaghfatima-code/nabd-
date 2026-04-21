<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsTherapist
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! in_array($user->role, [UserRole::Admin, UserRole::Therapist])) {
            abort(403, 'غير مصرح. هذه المنطقة للمعالجين فقط.');
        }

        return $next($request);
    }
}
