<?php
/**
 *  app/Models/Department.php
 *
 * Date-Time: 18.03.21
 * Time: 10:46
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Models;

use App\Traits\CustomBleableTrait;
use App\Traits\ScopeFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use RichanFongdasen\EloquentBlameable\BlameableTrait;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class Role
 * @package App\Models
 * @property integer $id
 * @property string $name
 * @property integer $type
 * @property string $created_at
 * @property string $updated_at
 * @property string|null $deleted_at
 * @property integer $created_by
 * @property integer $updated_by
 * @property integer|null $deleted_by
 *
 * @mixin Builder
 */
class Department extends Model
{
    use BlameableTrait, softDeletes, CustomBleableTrait, ScopeFilter;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'departments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name','type'];



    /**
     * @return array[]
     */
    public function getFilterScopes(): array
    {
        return [
            'id' => [
                'hasParam' => true,
                'scopeMethod' => 'id'
            ],
            'name' => [
                'hasParam' => true,
                'scopeMethod' => 'name'
            ],
        ];
    }
}
