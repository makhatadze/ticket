# Ticket System

Install the dependencies.

```sh
cd ticket_system
composer install
npm install
```

### For run migrations...

create .env file by .env.example


```sh
php artisan migrate
php artisan db:seed --class=UserSeeder
```

### Generate jwt secret
```sh
php artisan jwt:secret
```