<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestDatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Generate test data for demostration purposes.
     */
    public function run(): void
    {
        // First, call the database seeder that has needed data.
        $this->call(DatabaseSeeder::class);

        $user_role = Role::where(['name' => 'user'])->firstOrFail()->id;
        $admin_role = Role::where(['name' => 'admin'])->firstOrFail()->id;

        // Then, generate some users...
        $users = User::factory(10)->create();
        foreach ($users as $user) {
            $user->roles()->attach($user_role);
        }

        $admin = User::factory()->create(['name' => 'admin', 'email' => 'admin@aa-webapp.com', 'password' => 'admin']);
        $admin->roles()->attach([$user_role, $admin_role]);

        $user = User::factory()->create(['name' => 'rando', 'email' => 'rando@aa-webapp.com', 'password' => 'rando']);
        $user->roles()->attach([$user_role]);
    }
}
