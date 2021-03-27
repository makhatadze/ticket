<?php
/**
 *  app/Providers/RepositoryServiceProvider.php
 *
 * Date-Time: 16.03.21
 * Time: 16:36
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Providers;

use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\Eloquent\Base\EloquentRepositoryInterface;
use App\Repositories\Eloquent\ExportLogRepository;
use App\Repositories\Eloquent\IpRestrictionRepository;
use App\Repositories\Eloquent\RoleRepository;
use App\Repositories\Eloquent\UserRepository;
use App\Repositories\ExportLogRepositoryInterface;
use App\Repositories\IpRestrictionRepositoryInterface;
use App\Repositories\RoleRepositoryInterface;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
        $this->app->bind(RoleRepositoryInterface::class, RoleRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(IpRestrictionRepositoryInterface::class, IpRestrictionRepository::class);
        $this->app->bind(ExportLogRepositoryInterface::class, ExportLogRepository::class);
    }
}
