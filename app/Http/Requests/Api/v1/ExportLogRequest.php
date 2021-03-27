<?php
/**
 *  app\Http\Requests\Api\v1\ExportLogRequest.php
 *
 * Date-Time: 27.03.21
 * Time: 19:21
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Requests\Api\v1;

use Illuminate\Foundation\Http\FormRequest;

class ExportLogRequest extends FormRequest
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
            //
        ];
    }
}
