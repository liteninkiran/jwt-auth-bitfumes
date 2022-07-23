<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;

class CORS
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure(Request): (Response|RedirectResponse) $next
     * @return Response|RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        header('Access-Control-Allow-Origin', '*');
        header('Access-Control-Allow-Headers : Content-type, X-Auth-Token, Authorization, Origin');
        return $next($request);
    }
}
