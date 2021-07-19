<?php

use Illuminate\Database\Seeder;
use App\models\User ; 
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'=>'admin',
            'email'=>'admin@admin.com',
            'password'=>Hash::make('admin'),
            'role' => 'admin'
            ]);
    }
}
