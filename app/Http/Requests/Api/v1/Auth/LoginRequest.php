<?php
/**
 *  app/Http/Requests/Api/v1/Auth/LoginRequest.php
 *
 * Date-Time: 15.03.21
 * Time: 11:36
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Requests\Api\v1\Auth;

use App\Exceptions\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
        return [
            'username' => 'required|exists:users,username',
            'password' => 'required'
        ];
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
