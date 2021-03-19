<?php
/**
 *  app/Providers/AuthServiceProvider.php
 *
 * Date-Time: 16.03.21
 * Time: 16:56
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Providers;

use App\Models\IpRestriction;
use App\Models\Role;
use App\Models\User;
use App\Policies\IpRestrictionPolicy;
use App\Policies\RolePolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Role::class => RolePolicy::class,
        User::class => UserPolicy::class,
        IpRestriction::class => IpRestrictionPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::before(function ($user) {
           return $user->isAdmin();
        });
    }

    private function abort(string $message = "You don't have access this action.", $status = 403){
        abort(response()->json([
            'error' => [
                'message' => $message,
                'status' => $status
            ]
        ], $status));
    }
}
