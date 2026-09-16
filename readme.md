# aa-webapp-demo

This is an submission for a job. It was a take home assignment making a basic CRUD with a user profile.

## To run the demo

Have `npm`, `php`, `composer` installed already.

```bash
# Install dependencies
npm install
composer install

# Should not need to modify the environment file for demoing
cp .env.example .env
php artisan key:generate

php artisan migrate:fresh --seed --seeder=TestDatabaseSeeder

# To start the application:
php artisan dev
```

Since the test seeder was used, you can login with: `admin@aa-webapp.com`, password `admin` or `rando@aa-webapp.com`, password `rando`.

Obviously, this is setup alone cannot be ran on production. Using the PHP dev server is not a good idea. Ideally, you'd would also setup a webserver, like Apache, and point it to the public folder. Then, you'd also want to optimize the build, configure the environment variables, and harden the server.

But, this should be enough to demostrate the project.

## Design

Firstly, I was required to use:

- PHP
- Laravel
- ReactJS

To syngerize with those, and based on the recommendations, I also selected:

- InertiaJS
- Fortify
- TypeScript
- Wayfinder

IntertiaJS was selected because it allows one to seamlessly connect their frontend and backend together. I can make a React page and then on the PHP side, just render it with SSR support. So, it is kinda a hybrid between a SPA and MPA, taking the advantages of both while fitting with Laravel.

Fortify because it helps manage the authentication steps without needing to build a lot of backend infrastructure.

While it's a small project, TypeScript I find is simply better to adopt early on. I appericate the type-safety it provides, preventing really easy bugs. With Wayfinder, I was able to get backend-to-frontend type-safety with pages. So, whenever I change my PHP rendering, I get type errors on the frontend showing me where I need to fix things.

Since I used a starter-kit, I also used `npm`, `vite`, and `vite+`. These are simply the recommended defaults.

The design itself, beyond the choices, is an average Laravel application.
- `app/Actions` mainly has Fortify related items;
- `app/Http` has one controller, the user. Has user pages there;
- `app/Middleware` has the middleware for Inertia. Some props are injected in there, such as the user, if authenticated;
- `app/Models` just two, `User` and `Roles`. The DB reflects this. They have a `M:M` relationship, per requirements;
- `app/Policies` just the policy wrt if a user can edit or not, per requirements;
- `app/Providers` generic providers. Fortify business there to hook into the views;
- `app/UserRole` an enumeration to make sure we only have known roles in the system;

And so on...

Lastly, I tried balancing getting things done and spending too much time on one thing. So, I tried to leave designing the CSS for example, for later, as that's easy enough for any future dev to do. However, labelling input I found more vital, for accessiblity purposes. In short, good bones to work on top off.

