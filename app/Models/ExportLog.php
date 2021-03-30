<?php
/**
 *  app\Models\ExportLog.php
 *
 * Date-Time: 27.03.21
 * Time: 16:41
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Models;

use App\Traits\CustomBleableTrait;
use App\Traits\ScopeFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use RichanFongdasen\EloquentBlameable\BlameableTrait;

/**
 * Class ExportLog
 * @package App\Models
 * @property integer $id
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
class ExportLog extends Model
{
    use BlameableTrait, softDeletes, CustomBleableTrait, ScopeFilter;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'export_logs';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['type'];

    public const EXPORT_ALL = 1;
    public const EXPORT_FILTER = 2;
    public const EXPORT_IDS = 3;
    public const EXPORT_USER = 1;
    public const EXPORT_IP_RESTRICTION = 2;


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
            'type' => [
                'hasParam' => true,
                'scopeMethod' => 'type'
            ],
            'start_time' => [
                'hasParam' => true,
                'scopeMethod' => 'startTime'
            ],
            'end_time' => [
                'hasParam' => true,
                'scopeMethod' => 'endTime'
            ]
        ];
    }

    /**
     * Get the export log's file.
     */
    public function file(): MorphOne
    {
        return $this->morphOne(File::class, 'fileable');
    }
}
