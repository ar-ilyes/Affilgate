<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\LoginUserRequest;
use App\Http\Requests\User\RegisterUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(RegisterUserRequest $request)
    {
        /** @var User $user */
        $user = User::query()->create(array_merge($request->except('accept_terms'), [
            'password' => Hash::make($request->password)
        ]));

        // Send email verification notification
        event(new Registered($user));

        // Create a token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return the user and token
        return response()->json([
            'user' => UserResource::make($user),
            'token' => $token,
            'message' => __('Inscription réussie. Veuillez vérifier votre email.')
        ]);
    }

    /**
     * Login user
     */
    public function login(LoginUserRequest $request)
    {
        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember_me');

        if (!Auth::attempt($credentials, $remember)) {
            return response()->json([
                'message' => __('Identifiants de connexion non valides.')
            ], 401);
        }

        // Get the authenticated user
        /** @var User $user */
        $user = User::query()->where('email', $request->email)->first();

        // Revoke existing tokens if not using remember me
        if (!$remember)
            $user->tokens()->delete();

        // Create a new token with extended expiration for "remember me"
        $tokenExpiration = $remember ? now()->addDays(30) : now()->addHours(1);
        $token = $user->createToken('auth_token', ['expires_at' => $tokenExpiration])->plainTextToken;

        return response()->json([
            'user' => UserResource::make($user),
            'token' => $token,
            'remember_me' => $remember
        ]);
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => __('Déconnexion réussie.')
        ]);
    }

    /**
     * Forgot Password
     */
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // Send password reset link
        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['status' => __($status)])
            : response()->json(['email' => __($status)], 422);
    }

    /**
     * Reset Password
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        // Attempt to reset the password
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => __($status)])
            : response()->json(['message' => __($status)], 422);
    }

    /**
     * Verify email
     */
    public function verifyEmail(Request $request)
    {
        /** @var User $user */
        $user = User::query()->findOrFail($request->route('id'));

        if (!hash_equals((string)$request->route('hash'), sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => __('Lien de vérification non valide')], 403);
        }

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            return redirect()->to(config('app.ui_url').'/auth/verify-email/confirmed');
        }

        return redirect()->to(config('app.ui_url'));
    }

    /**
     * Resend email verification
     */
    public function resendVerification(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => __('Email déjà vérifié')
            ], 400);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'message' => __('Lien de vérification renvoyé')
        ]);
    }
}
