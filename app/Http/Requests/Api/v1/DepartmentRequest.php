<?php

namespace App\Http\Requests\Api\v1;

use App\Exceptions\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DepartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name' => ['required','string','max:255', Rule::unique('departments', 'name')->ignore($this->department)],
            'type' => 'required|in:1,2',
            'heads' => 'nullable|array',
            'heads.*' => 'exists:users,id',
            'members' => 'nullable|array',
            'members.*' => 'exists:users,id',
        ];

        // Check if request method is GET.
        if ($this->method() === 'GET') {
            $rules = [
                'id' => 'nullable|integer',
                'name' => 'nullable|string|max:255',
            ];
        }
        return $rules;
    }


    /**
     * Handle a failed validation attempt.
     *
     * @param  Validator  $validator
     * @return void
     *
     * @throws ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new ValidationException($validator->errors());
    }
}
