<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Statamic\Facades\CP\Nav;
use Statamic\Statamic;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Statamic::script('app', 'cp');
        Statamic::style('app', 'cp');

        Nav::extend(function ($nav) {
            $nav->remove('Content', 'Taxonomies');
            $nav->remove('Content', 'Navigation');
            $nav->remove('Content', 'Collections');
        });

        Nav::extend(function ($nav) {
            $nav->content('Brands')
                ->url('/cp/collections/brand_pages')
                ->icon('content-writing');
            
            $nav->content('Categories')
                ->url('/cp/collections/category_pages')
                ->icon('content-writing');
            
            $nav->content('PowerPoints')
                ->url('/cp/collections/powerpoints')
                ->icon('content-writing');
        });
    }
}
