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
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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

    public const DEPARTMENT_HEAD = 1;
    public const DEPARTMENT_MEMBER = 2;

    public const DEPARTMENT_TYPE_DEFAULT = 1;
    public const DEPARTMENT_TYPE_GROUP = 2;

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

    /**
     * Get heads
     *
     * @return BelongsToMany
     */
    public function heads(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'departments_users')->where('type',self::DEPARTMENT_HEAD)->withPivot(['type']);
    }

    /**
     * Get members
     *
     * @return BelongsToMany
     */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'departments_users')->where('type',self::DEPARTMENT_MEMBER)->withPivot(['type']);
    }
}
