<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Mail\RequestResetPasswordMail;
use App\Models\User;

class RequestResetPasswordController extends Controller
{
    public function sendEmail(Request $request)
    {
        if(!$this->validateEmail($request->email)) {
            return $this->failedResponse();
        }

        $this->send($request->email);
        return $this->successResponse();
    }

    private function send(string $email)
    {
        $token = $this->createToken($email);
        Mail::to($email)->send(new RequestResetPasswordMail($token));
    }

    private function validateEmail(string $email)
    {
        return !!User::where('email', $email)->first();
    }

    private function failedResponse()
    {
        return response()->json(['error' => 'Email address not found'], Response::HTTP_NOT_FOUND);
    }

    private function successResponse()
    {
        return response()->json(['data' => 'Password reset email sent. Please check your inbox/spam folder.'], Response::HTTP_OK);
    }

    private function createToken(string $email): string
    {
        $oldToken = DB::table('password_resets')->where('email', $email)->first();
        if($oldToken) {
            return $oldToken->token;
        }
        $token = Str::random(60);
        $this->saveToken($token, $email);
        return $token;
    }

    private function saveToken(string $token, string $email)
    {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now(),
        ]);
    }
}
