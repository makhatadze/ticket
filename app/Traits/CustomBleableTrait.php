<?php
/**
 *  app/Traits/CustomBleableTrait.php
 *
 * Date-Time: 17.03.21
 * Time: 11:37
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Traits;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait CustomBleableTrait
{
    /**
     * Get Created By
     * @return HasOne
     */
    public function createdBy(): HasOne
    {
        return $this->hasOne(User::class,'id','created_by');
    }

    /**
     * Get Updated By
     *
     * @return HasOne
     */
    public function updatedBy(): HasOne
    {
        return $this->hasOne(User::class,'id','updated_by');
    }
}