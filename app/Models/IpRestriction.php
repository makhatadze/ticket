<?php
/**
 *  app/Models/IpRestriction.php
 *
 * Date-Time: 19.03.21
 * Time: 10:48
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Models;

use App\Traits\CustomBleableTrait;
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
    use softDeletes, BlameableTrait, CustomBleableTrait;

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
    
    public function scopeSorted($query,array $sortParams)
    {
	return $query->orderBy($sortParams['sort'],$sortParams['order']);
    }
}
