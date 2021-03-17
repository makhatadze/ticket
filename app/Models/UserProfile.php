<?php
/**
 *  app/Models/UserProfile.php
 *
 * Date-Time: 17.03.21
 * Time: 11:31
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Models;

use App\Traits\CustomBleableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use RichanFongdasen\EloquentBlameable\BlameableTrait;

/**
 * Class UserProfile
 * @package App\Models
 * @property integer $id
 * @property string $first_name
 * @property string $last_name
 * @property string|null $phone
 * @property string|null $country
 * @property string|null $birthday
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property int|null $deleted_by
 */
class UserProfile extends Model
{
    use HasFactory, softDeletes,BlameableTrait,CustomBleableTrait;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_profiles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'country',
        'birthday',
    ];


    /**
     * Get the owning profileable model.
     */
    public function profileable()
    {
        return $this->morphTo();
    }
}
