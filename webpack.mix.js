const mix              = require('laravel-mix');
const postcssImport    = require('postcss-import');
const postcssNested    = require('postcss-nested');
const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss      = require('tailwindcss');




/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/site.js', 'public/js');

mix.js('resources/js/cp.js', 'public/vendor/app/js');
mix.postCss('resources/css/cp.css', 'public/vendor/app/css');

mix.postCss('resources/css/site.css', 'public/css', [
  postcssImport,
  tailwindcss,
  postcssNested,
  postcssPresetEnv({ stage: 0 }),
]);




if (process.argv.find((element) => element === '--watch')) {
  mix.browserSync({
    browser: process.env.MIX_BROWSER,
    files:   [
      'public/css/*.css',
      'public/js/*.js',
      'resources/views/**/*.{blade.php,antlers.html}',
    ],
    open:   'local',
    proxy:  process.env.MIX_APP_URL,
    notify: {
      styles: {
        borderRadius: 0,
        bottom:       0,
        opacity:      0.5,
        top:          'initial',
        zIndex:       10001,
      },
    },
  });
}




if (mix.inProduction()) {
  mix.version();
}




/*
 |--------------------------------------------------------------------------
 | Statamic Control Panel
 |--------------------------------------------------------------------------
 |
 | Feel free to add your own JS or CSS to the Statamic Control Panel.
 | https://statamic.dev/extending/control-panel#adding-css-and-js-assets
 |
 */

// mix.js('resources/js/cp.js', 'public/vendor/app/js')
//    .postCss('resources/css/cp.css', 'public/vendor/app/css', [
//     require('postcss-import'),
//     require('tailwindcss'),
//     require('postcss-nested'),
//     require('postcss-preset-env')({stage: 0})
// ])
