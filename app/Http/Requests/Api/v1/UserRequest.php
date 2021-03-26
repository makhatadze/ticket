<?php
/**
 *  app/Http/Requests/Api/v1/UserRequest.php
 *
 * Date-Time: 17.03.21
 * Time: 11:58
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Requests\Api\v1;

use App\Exceptions\ValidationException;
use App\Models\Role;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Factory as ValidationFactory;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    public function __construct(ValidationFactory $validationFactory)
    {
        $validationFactory->extend(
            'hasConnRole',
            function ($attribute, $value, $parameters) {
                return Role::hasConnectionToPermission($this->role,$value);
            },
            'Sorry, Role not have this permission'
        );
        parent::__construct();
    }

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
            'name' => 'required|string|max:255',
            'username' => ['required','string','max:255',Rule::unique('users', 'username')->ignore($this->user)],
            'active' => 'required|boolean',
            'role' => 'nullable|integer|exists:roles,id',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,id|hasConnRole',
        ];

        if ($this->method() === 'POST') {
            $rules ['password'] = 'required|between:6,255|confirmed';
            $rules['password_confirmation'] = 'required';
        }

        // Check if request method is GET.
        if ($this->method() === 'GET') {
            $rules = [

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
