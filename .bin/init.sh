#!/bin/bash
# This script aids in setting up the project after cloning it.
echo "------------------------"
echo "Checking out UAT branch."
echo "------------------------"
git checkout stage-uat
git pull

echo "------------------------"
echo "Installing PHP packages."
echo "------------------------"
composer install

echo "----------------------------------"
echo "Creating local environment config."
echo "----------------------------------"
cp .env.example .env
php artisan key:generate

echo "----------------------------"
echo "Creating user on new branch."
echo "----------------------------"
read -p "What should we name the new branch? [add-my-user]: " BRANCH_NAME
BRANCH_NAME=${BRANCH_NAME:-add-my-user}
git checkout -b $BRANCH_NAME
php please make:user

echo "----------------------------------------------"
echo "Installing Node packages and compiling assets."
echo "----------------------------------------------"
npm i
npm run dev

echo "-----"
echo "Done!"
echo "-----"
echo "Set a value for MIX_BROWSER in your .env for the simplest watcher setup."
