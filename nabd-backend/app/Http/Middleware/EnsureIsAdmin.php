<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->role !== UserRole::Admin) {
            abort(403, 'غير مصرح. هذه المنطقة للمديرين فقط.');
        }

        return $next($request);
    }
}
