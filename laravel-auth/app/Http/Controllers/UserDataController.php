<?php

namespace App\Http\Controllers;
use App\Http\Requests\UserData\StoreRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\UserData;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Paginator;
use Illuminate\Http\UploadedFile;


class UserDataController extends Controller
{
    public function store(StoreRequest $request)
    {
        try {
            // if ($request->hasFile('file')) {
            //     $file = $request->file('file');
            //     $filename = time() . '_' . $file->getClientOriginalName();
            //     $path = $file->storeAs('public/files', $filename);
            //     $data['file_link'] = Storage::url($path);
            // }
            UserData::create($request->validated());
            return Redirect::route('dashboard')->with('success', 'User has been created successfully!');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors(['error' => 'Unable to create user.']);
        }
    }
    public function index(Request $request)
    {
        $allUsers = UserData::orderBy('updated_at', 'desc')->get();
        return Inertia::render('Dashboard', [
            'users' => $allUsers,
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
}
