<?php
/**
 *  app/Http/Requests/Api/v1/IssueRequest.php
 *
 * Date-Time: 30.03.21
 * Time: 11:20
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Requests\Api\v1;

use App\Exceptions\ValidationException;
use App\Models\Issue;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IssueRequest extends FormRequest
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
            'department_id' => 'required|exists:departments,id',
            'name' => ['required','string','max:255', Rule::unique('issues', 'name')->ignore($this->issue)],
            'status' => 'required|boolean',
            'type' => 'required|in:1,2,3',
        ];

        if (in_array($this->method(),['POST','PATCH'],true)) {
            if ($this->type === Issue::ISSUE_DEFAULT) {
                $rules ['departments'] = 'nullable|array';
            }
            if ($this->type === Issue::ISSUE_WITHDRAWAL) {
                $rules ['departments'] = 'required|array';
                $rules ['withdrawals'] = 'required|array';
                $rules['withdrawals.*.name'] = 'required|string|max:255';
                $rules['withdrawals.*.payment'] = 'required|array';
            }
            if ($this->type === Issue::ISSUE_CUSTOM) {
                $rules ['custom_departments'] = 'required|array';
                $rules['custom_departments.*.id'] = 'required|exists:departments,id';
                $rules['withdrawals.*.type'] = 'required|in:4';
                $rules['withdrawals.*.permission'] = 'required|in:0';
            }
            $rules['departments.*.id'] = 'required|exists:departments,id';
            $rules['departments.*.type'] = 'required|in:1,2,3';
            $rules['departments.*.permission'] = 'required|in:1,2';
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
