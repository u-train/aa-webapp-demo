<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // There are two known roles for the aa-webapp: users and admins.
        // We seed them here for convenience. 
        Role::updateOrCreate(["name" => "user"]);
        Role::updateOrCreate(["name" => "admin"]);
    }
}
