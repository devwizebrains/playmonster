#!/bin/bash
# This script builds for deployments.




# CSS/JavaScript
npm i
npm run production
rm -rf node_modules

# After we build the assets, let's make sure we're updated and warmed up
php artisan statamic:stache:refresh