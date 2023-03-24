<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    public function store(Request $request) {
        $validatedData = $request->validate([
            // Обработка полей title, а также body
            // Они оба обязательны к заполнению и плюс title должен содержать уникальное название,
            // которое не повторяется в таблице posts в базе данных,
            // а также должен быть не более 255 символов
            'title' => 'required|unique:posts|max:255',
            'body' => 'required',
        ]);
    }
}
