<?php

namespace App\Models;

use App\Traits\CustomBleableTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use RichanFongdasen\EloquentBlameable\BlameableTrait;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class Withdrawal
 * @package App\Models
 * @property integer $id
 * @property string $widhtrawalable_type
 * @property integer $widhtrawalable_id
 * @property string $name
 * @property string $payment
 * @property string $created_at
 * @property string $updated_at
 * @property string|null $deleted_at
 * @property integer $created_by
 * @property integer $updated_by
 * @property integer|null $deleted_by
 *
 * @mixin Builder
 */
class Withdrawal extends Model
{
    use BlameableTrait, softDeletes, CustomBleableTrait;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'withdrawals';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type',
        'permission',
    ];

    protected $casts = [
        'payment' => 'array'
    ];


    /**
     * @return MorphTo
     */
    public function withrawalable(): MorphTo
    {
        return $this->morphTo();
    }
}
