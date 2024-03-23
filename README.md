## Laravel chirps + websockets

```
cp .env.example  .env
```

> select your prefer database

```
composer install
```


```
php artisan key:generate
```

```
php artisan storage:link
```


```
php artisan migrate
```


```
npm install
```


```
npm run build
```

```
php artisan serve
```
> Install [Reverb](https://laravel.com/docs/reverb)

Laravel 10
```bash
composer require laravel/reverb:@beta
```

```bash
php artisan reverb:install
```

Laravel 11
```bash
php artisan install:broadcasting
```

> Run reverb


```
php artisanb reverb:start
```
