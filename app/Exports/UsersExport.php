<?php
/**
 *  app\Exports\UsersExport.php
 *
 * Date-Time: 27.03.21
 * Time: 15:20
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Exports;

use App\Models\ExportLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Excel;

class UsersExport implements
    FromQuery,
    ShouldAutoSize,
    WithEvents,
    WithHeadings,
    WithMapping
{

    use Exportable;

    private $fileName = 'users.xlsx';

    /**
     * @var array
     */
    private $keys = [];

    /**
     * @var array
     */
    private $userIds = [];

    /**
     * Optional Writer Type
     */
    private $writerType = Excel::CSV;

    /**
     * @var integer
     */
    private $type;

    /**
     * @var Request
     */
    private $request;
    /**
     * Optional headers
     */
    private $headers = [
        'Content-Type' => 'text/csv',
    ];

    /**
     * @return mixed
     */
    public function query()
    {
        $users = User::query();
        switch ($this->getType()){
            case ExportLog::EXPORT_ALL:
                return $users;
            case ExportLog::EXPORT_FILTER:
                return (new User())->filter($this->getRequest());
            case ExportLog::EXPORT_IDS:
                return $users->WhereIn('id',$this->getUserIds());
            default:
                return false;
        }
    }

    /**
     * @param $user
     * @return array
     */
    public function map($user): array
    {
        $userActive = [
            true => 'Active',
            false => 'Block'
        ];

        $mapping = [];
        foreach ($this->keys as $key) {
            if ($key === 'created_at' || $key === 'updated_at') {
                if ($user->created_at && $user->updated_at) {
                    $mapping [] = $user->{$key}->format('l jS \\of F Y h:i:s A');
                    continue;
                }
            }
            if ($key === 'active') {
                $mapping [] = $userActive[$user->{$key}];
                continue;
            }
            $mapping [] = $user->{$key};
        }
        return $mapping;
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        $headings = [];
        foreach ($this->keys as $key) {
            $key = str_replace("_", " ", $key);
            $headings [] = Str::ucfirst($key);
        }
        return $headings;
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $event->sheet->getStyle("A1:H1")->applyFromArray([
                    'font' => [
                        'bold' => 'true'
                    ]
                ]);
            }
        ];
    }


    /**
     * @return array
     */
    public function getKeys(): array
    {
        return $this->keys;
    }

    /**
     * @param array $keys
     * @return UsersExport
     */
    public function setKeys(array $keys): UsersExport
    {
        $this->keys = $keys;
        return $this;
    }

    /**
     * @return array
     */
    public function getUserIds(): array
    {
        return $this->userIds;
    }

    /**
     * @param array $userIds
     * @return UsersExport
     */
    public function setUserIds(array $userIds): UsersExport
    {
        $this->userIds = $userIds;
        return $this;
    }

    /**
     * @return int
     */
    public function getType(): int
    {
        return $this->type;
    }

    /**
     * @param int $type
     */
    public function setType(int $type): UsersExport
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @return Request
     */
    public function getRequest(): Request
    {
        return $this->request;
    }

    /**
     * @param Request $request
     * @return UsersExport
     */
    public function setRequest(Request $request): UsersExport
    {
        $this->request = $request;
        return $this;
    }

}
