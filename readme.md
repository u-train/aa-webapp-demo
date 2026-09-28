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

### Immediate Future Work

To make sure I got to MVP in time, I skimped on some tasks. However, I tried keeping it to non-critical, possibly straightforward ones. So, between 100% clean CSS vs. making sure 403 error codes render as 404s, I picked the latter as security is more important.

With that, I want to mention further work I'd do from the top of my head:

- Unfortunately, there are some user-enumeration attacks possible with registration and password reseting (as they says if an email is valid or not). The solution to those is probably overriding the controllers responsible for those endpoints and making them respond similarly regardless if the email is valid or invalid.
- Testing the application to verify features work. Currently, there is only an example test. Given time, I would have liked to do more thorough testing (snapshots, testing features work like profile edits work, and so on).
- `app.module.css` has two rules for `.profilesFooter` and `.changePasswordFieldset` that should be split off to its own modules and imported accordingly.
- The form related CSS should probably be split into a `form.module.css` file as well (seeing that not every page needs that styling).
- I made use of just the HTML `form` element, when InertiaJS provides a `Form` component that prevent full-page reloads (with that, saving inputs automatically for example). I avoided only because of lack of familiarity and time rush. Though, it was really such an easy win that I wish I did.
- Refactoring some common patterns into components like the error-handling in forms.
- As mentioned in `verify-email.tsx`, I would probably see about disabling Fortify's views and then creating my own endpoints replacing them.
- I would also want to check the currently dependencies list to see if they are all required or not as they came mostly from a starter-kit. For example, vetting `concurrently` in `package.json` to make sure it can be removed (at first blush, no longer used).
- On a similar note, I believe there are packages that are out of date, so I would seek about upgrading them. I tried before, but that led to breakages that would have consumed time to fix that should be spent on other tasks.

Overall, I like to think that I still gave a good baseline. Especially with notes like the above, the developer I'm handing this off to should be able to continue development, have a clear idea of next steps, and possibly gain easy wins.
