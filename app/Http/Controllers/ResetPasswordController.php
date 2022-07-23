<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;

class ResetPasswordController extends Controller
{
    public function resetPassword(ResetPasswordRequest $request)
    {
        return $this->getPasswordResetRecord($request)->count() === 1
            ? $this->changePassword($request)
            : $this->tokenNotFoundResponse();
    }

    private function getPasswordResetRecord(ResetPasswordRequest $request) 
    {
        return DB::table('password_resets')->where([
            'email' => $request->email,
            'token' => $request->reset_token,
        ]);
    }

    private function tokenNotFoundResponse()
    {
        return response()->json([
            'error' => 'Token or email is incorrect',
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function changePassword(ResetPasswordRequest $request)
    {
        $user = User::whereEmail($request->email)->first();
        $user->update([
            'password' => $request->password,
        ]);
        $this->getPasswordResetRecord($request)->delete();
        return response()->json([
            'data' => 'Password updated successfully',
        ], Response::HTTP_CREATED);
    }
}
