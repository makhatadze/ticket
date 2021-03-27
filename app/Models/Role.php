<?php
/**
 *  app/Models/Role.php
 *
 * Date-Time: 16.03.21
 * Time: 14:24
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Models;

use App\Exceptions\DataNotFoundException;
use App\Http\Requests\Api\v1\RoleRequest;
use App\Traits\CustomBleableTrait;
use App\Traits\ScopeFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use RichanFongdasen\EloquentBlameable\BlameableTrait;

/**
 * Class Role
 * @package App\Models
 * @property integer $id
 * @property string $name
 * @property string $slug
 * @property string $created_at
 * @property string $updated_at
 * @property string|null $deleted_at
 * @property integer $created_by
 * @property integer $updated_by
 * @property integer|null $deleted_by
 *
 * @mixin Builder
 */
class Role extends Model
{
    use BlameableTrait, softDeletes, CustomBleableTrait, ScopeFilter;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'roles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name','slug'];

    /**
     * Get roles
     *
     * @return BelongsToMany
     */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'roles_permissions');
    }

    /**
     * @param int $roleId
     * @param int $permissionId
     *
     * @return bool
     * @throws DataNotFoundException
     */
    public static function hasConnectionToPermission(int $roleId, int $permissionId): bool
    {
        $model = self::query()->where('id',$roleId)->first();
        if (!$model) {
            throw new DataNotFoundException();
        }
        return $model->permissions()->where('id',$permissionId)->exists();
    }

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
