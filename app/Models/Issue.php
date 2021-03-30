<?php
/**
 *  app/Models/Issue.php
 *
 * Date-Time: 18.03.21
 * Time: 11:00
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Models;

use App\Traits\CustomBleableTrait;
use App\Traits\ScopeFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use RichanFongdasen\EloquentBlameable\BlameableTrait;

/**
 * Class Withdrawal
 * @package App\Models
 * @property integer $id
 * @property integer $department_id
 * @property string $name
 * @property boolean $status
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
class Issue extends Model
{
    use BlameableTrait, softDeletes, CustomBleableTrait, ScopeFilter;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'issues';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['department_id', 'name', 'status', 'type'];

    // issue
    public const ISSUE_DEFAULT = 1;
    public const ISSUE_WITHDRAWAL = 2;
    public const ISSUE_CUSTOM = 3;

    // issue departments
    public const ISSUE_DEPARTMENT_DEFAULT = 1;
    public const ISSUE_DEPARTMENT_WITHDRAWAL_PRIMARY = 2;
    public const ISSUE_DEPARTMENT_WITHDRAWAL_SECONDARY = 3;
    public const ISSUE_DEPARTMENT_CUSTOM_GROUP = 4;

    // issue department permissions
    public const ISSUE_DEPARTMENT_PERMISSION_WRITE_READ = 1;
    public const ISSUE_DEPARTMENT_PERMISSION_READ = 2;
    public const ISSUE_DEPARTMENT_PERMISSION_NONE = 0;

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
            'status' => [
                'hasParam' => true,
                'scopeMethod' => 'status'
            ],
            'type' => [
                'hasParam' => true,
                'scopeMethod' => 'type'
            ]
        ];
    }

    /**
     * @return HasOne
     */
    public function department(): HasOne
    {
        return $this->hasOne(Department::class, 'id', 'department_id');
    }

    /**
     * @return MorphMany
     */
    public function withdrawal(): MorphMany
    {
        return $this->morphMany(Withdrawal::class, 'withdrawalable');
    }

    /**
     * Get departments
     *
     * @return BelongsToMany
     */
    public function departments(): BelongsToMany
    {
        return $this->belongsToMany(Department::class, 'issues_departments')->withPivot(['type', 'permission']);
    }
}
