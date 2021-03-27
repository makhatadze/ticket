<?php
/**
 *  app/Models/IpRestriction.php
 *
 * Date-Time: 19.03.21
 * Time: 10:48
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Models;

use App\Http\Requests\Api\v1\IpRestrictionRequest;
use App\Traits\CustomBleableTrait;
use App\Traits\ScopeFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use RichanFongdasen\EloquentBlameable\BlameableTrait;

/**
 * Class IpRestriction
 * @package App\Models
 *
 * @property string $name
 * @property string $ip
 * @property boolean $status
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 * @property integer $created_by
 * @property integer $updated_by
 * @property integer $deleted_by
 */
class IpRestriction extends Model
{
    use softDeletes, BlameableTrait, CustomBleableTrait, ScopeFilter;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ip_restrictions';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'ip',
        'status'
    ];

    /**
     * @param IpRestrictionRequest $request
     * @return array
     */
    public function getActiveFilters(IpRestrictionRequest $request): array
    {
        $activeFilters = [];
        foreach ($this->getFilterScopes() as $key => $value) {
            if ($request->filled($key)) {
                $activeFilters [$key] = $request->{$key};
            }
        }
        return $activeFilters;
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
            'ip' => [
                'hasParam' => true,
                'scopeMethod' => 'ip'
            ],
        ];
    }
}
