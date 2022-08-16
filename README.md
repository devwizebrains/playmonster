# PlayMonster
This is PlayMonster's trade show tool.


## Setup
```sh
git clone git@github.com:HighlandSolutions/playmonstershowroom.git
cd playmonstershowroom
sh .bin/init.sh
```

If you have [Laravel Valet][laravel-valet] installed (and you cloned this in a [parked directory][laravel-valet-park]), you can simply [visit the site][site-url] in your browser.


## Logging in to the control panel
Visit the [CP][cp-url] (control panel) and use the credentials you set when you created your user via the init script.


## Node scripts
Here are the most commonly used scripts (see [package.json](./package.json) for a complete list):

| Command              | Description                             |
|:-------------------- |:--------------------------------------- |
| `npm run dev`        | Compile assets.                         |
| `npm run watch`      | Run `dev` with live reload.<sup>*</sup> |
| `npm run production` | Compile assets for production.          |

<sup>*</sup>Set a value for `MIX_BROWSER` in your `.env` for the simplest watcher setup.


## Deployments
Changes made to the `uat` and `main` branches automatically trigger deployments to the [UAT][site-url-uat] and [production][site-url] environments respectively.


## Keeping content in sync
Statamic 3 currently doesn't have a great way to keep content outside of the repo. Because of this, we use its git integration to automatically commit changes made in production to the repo's `main` branch. To get that content into the `uat` branch (and your local development environment):

1. SSH into the UAT server
2. Commit or undo any changes to ensure the has a "clean" state (`git status` should reveal no changes), and
3. Merge `main` into `uat`.




[cp-url]: http://playmonstershowroom.test/cp
[laravel-valet]: https://laravel.com/docs/master/valet
[laravel-valet-park]: https://laravel.com/docs/master/valet#the-park-command
[site-url]: https://playmonstershowroom.test
[site-url-uat]: https://uat.playmonstershowroom.test
