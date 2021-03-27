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
use App\Models\IpRestriction;
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

class IpRestrictionExport implements
    FromQuery,
    ShouldAutoSize,
    WithEvents,
    WithHeadings,
    WithMapping
{

    use Exportable;

    private $fileName = 'ip-restrictions.xlsx';

    /**
     * @var array
     */
    private $keys = [];

    /**
     * @var array
     */
    private $ipRestrictionIps = [];

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
        $ipRestrictions = IpRestriction::query();
        switch ($this->getType()){
            case ExportLog::EXPORT_ALL:
                return $ipRestrictions;
            case ExportLog::EXPORT_FILTER:
                return (new IpRestriction())->filter($this->getRequest());
            case ExportLog::EXPORT_IDS:
                return $ipRestrictions->WhereIn('id',$this->getIpRestrictionIps());
            default:
                return false;
        }
    }

    /**
     * @param $row
     * @return array
     */
    public function map($row): array
    {
        $ipRestrictionStatus = [
            true => 'Active',
            false => 'Block'
        ];

        $mapping = [];
        foreach ($this->keys as $key) {
            if ($key === 'created_at' || $key === 'updated_at') {
                $mapping [] = $row->{$key}->format('l jS \\of F Y h:i:s A');
                continue;
            }
            if ($key === 'status') {
                $mapping [] = $ipRestrictionStatus[$row->{$key}];
                continue;
            }
            if ($key === 'created_by') {
                $mapping [] = $row->createdBy !== null ? $row->createdBy->name : null;
                continue;
            }
            if ($key === 'updated_by') {
                $mapping [] = $row->updatedBy !== null ? $row->updatedBy->name : null;
                continue;
            }
            $mapping [] = $row->{$key};
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
     * @return IpRestrictionExport
     */
    public function setKeys(array $keys): IpRestrictionExport
    {
        $this->keys = $keys;
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
     * @return IpRestrictionExport
     */
    public function setType(int $type): IpRestrictionExport
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
     * @return IpRestrictionExport
     */
    public function setRequest(Request $request): IpRestrictionExport
    {
        $this->request = $request;
        return $this;
    }

    /**
     * @return array
     */
    public function getIpRestrictionIps(): array
    {
        return $this->ipRestrictionIps;
    }

    /**
     * @param array $ipRestrictionIps
     * @return IpRestrictionExport
     */
    public function setIpRestrictionIps(array $ipRestrictionIps): IpRestrictionExport
    {
        $this->ipRestrictionIps = $ipRestrictionIps;
        return $this;
    }

}
