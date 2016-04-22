# JocsMYO

[![Build Status](https://scrutinizer-ci.com/g/albertmayor/JocsMYO/badges/build.png?b=master)](https://scrutinizer-ci.com/g/albertmayor/JocsMYO/build-status/master)

Projecte basat en una plataforma on disposem de varios jocs controlats a través de MYO (en cas de disposar d'un dipositiu MYO. En cas contrari, podem escollir jugar amb un teclat).

Jocs creats amb Phaser.

#Official documentations

Laravel [Laravel website](http://laravel.com/docs)<br />
MYO [Thalmic Labs website](https://www.thalmic.com/)<br />
Phaser [Phaser website](http://phaser.io/)<br />

#Installation (without Homestead)
Clone this git repository into your local machine.

Run
```bash
composer install
cd /your/local/repository
php artisan serve
```

Go to
```bash
localhost:8000
```

If you keep getting an error, run
```bash
cp .env.example .env
php artisan key:generate
```
and try again.

#Installation (Homestead)
TODO
