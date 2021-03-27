<?php
/**
 *  app/Repositories/IpRestrictionRepositoryInterface.php
 *
 * Date-Time: 19.03.21
 * Time: 11:02
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories;


use App\Http\Requests\Api\v1\IpRestrictionRequest;
use App\Http\Resources\Api\v1\IpRestrictionCollection;

interface IpRestrictionRepositoryInterface
{
    /**
     * @param IpRestrictionRequest $request
     *
     */
    public function getData(IpRestrictionRequest $request);
}
