<?php

namespace App\Http\Controllers;
use App\Http\Requests\UserData\StoreRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\UserData;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Inertia\Inertia;


class UserDataController extends Controller
{
    public function store(StoreRequest $request)
    {
        UserData::create($request->validated());
        return Redirect::route('dashboard');
    }
    public function index(Request $request)
    {
        $allUsers = UserData::all();
        return Inertia::render('Dashboard', [
            'users' => $allUsers,
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
}
