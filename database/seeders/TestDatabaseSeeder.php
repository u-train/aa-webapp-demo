<?php

namespace Database\Seeders;

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

        // Then, generate some users...
        $users = User::factory(10)->create();
        foreach ($users as $user) {
            $user->roles()->attach('user');
        }

        $admin = User::factory()->create(['name' => 'admin', 'email' => 'admin@aa-webapp.com', 'password' => 'admin']);
        $admin->roles()->attach(['user', 'admin']);

        $user = User::factory()->create(['name' => 'rando', 'email' => 'rando@aa-webapp.com', 'password' => 'rando']);
        $admin->roles()->attach(['user']);
    }
}
