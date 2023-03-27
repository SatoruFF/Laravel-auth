<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\userData;

class UserDataController extends Controller
{
    public function submit(Request $request)
    {
        // Validate the form input
        $validatedData = $request->validate([
            'client_id' => 'integer',
            'client_name' => 'string|max:255',
            'title' => 'string|max:255',
            'message' => 'integer|min:1',
        ]);
    
        // Save the form data to the database
        $UserData = new userData();
        $UserData->client_id = $validatedData['client_id'];
        $UserData->client_name = $validatedData['client_name'];
        $UserData->title = $validatedData['title'];
        $UserData->message = $validatedData['message'];
        $UserData->save();
    
        // Redirect the user back to the dashboard with a success message
        return redirect()->route('dashboard')->with('success', 'User$UserData added successfully!');
    }
}
