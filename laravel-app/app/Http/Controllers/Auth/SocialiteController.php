<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    protected array $providers = ["google", "linkedin"];

    public function __construct()
    {
        //check if provider  is in the providers array
        $this->middleware(function ($request, $next) {
            if (!in_array($request->provider, $this->providers)) {
                abort(404);
            }
            return $next($request);
        });
    }

    public function redirect(Request $request)
    {
        return Socialite::driver($request->provider)->redirect();
    }

    public function callback(Request $request)
    {
        $data = Socialite::driver($request->provider)->user();
        /** @var User $user */
        $user = User::query()->updateOrCreate([
            'email' => $data->getEmail()
        ], [
            'name' => $data->getName(),
            'provider' => $request->provider,
            'provider_id' => $data->getId()
        ]);

        Auth::login($user, true);

        //redirect to frontend with token
        return redirect()->to(config('app.ui_url') . "?token=" . $user->createToken("auth_token")->plainTextToken);
    }
}
