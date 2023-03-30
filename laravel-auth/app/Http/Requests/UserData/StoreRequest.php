<?php

namespace App\Http\Requests\UserData;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'client_id' => 'required|numeric|max:255',
            'client_name' => 'required|string|max:255',
            'client_email' => 'required|email|max:255',
            'title' => 'required|string|max:255',
            'message' => 'nullable|string',
            'file_link' => 'nullable|string',
            //'file' => 'nullable|file|max:3072',
        ];
    }
}
