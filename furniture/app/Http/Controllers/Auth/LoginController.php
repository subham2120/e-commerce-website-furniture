<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected $redirectTo = RouteServiceProvider::HOME;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function showLoginForm()
    {
        return view('auth.login');
    }

    protected function authenticated(Request $request, $user)
    {
        // Merge guest cart with user cart if exists
        $this->mergeGuestCart($user);

        return redirect()->intended($this->redirectPath());
    }

    private function mergeGuestCart($user)
    {
        if (session()->has('guest_cart')) {
            $guestCart = session('guest_cart');
            
            foreach ($guestCart as $item) {
                $existingItem = $user->cartItems()
                    ->where('product_id', $item['product_id'])
                    ->first();

                if ($existingItem) {
                    $existingItem->increment('quantity', $item['quantity']);
                } else {
                    $user->cartItems()->create($item);
                }
            }

            session()->forget('guest_cart');
        }
    }
}
