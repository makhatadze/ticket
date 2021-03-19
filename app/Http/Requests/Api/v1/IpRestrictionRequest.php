<?php

namespace App\Http\Requests\Api\v1;

use App\Exceptions\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IpRestrictionRequest extends FormRequest
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
            'name' => ['required','string', Rule::unique('ip_restrictions', 'name')->ignore($this->ipRestriction)],
            'ip' => 'required|string|max:45',
            'status' => 'required|boolean',
        ];

        // Check if request method is GET.
        if ($this->method() === 'GET') {
            $rules = [
                'id' => 'nullable|integer',
                'ip' => 'nullable|string|max:255',
                'status' => 'nullable|boolean',
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
