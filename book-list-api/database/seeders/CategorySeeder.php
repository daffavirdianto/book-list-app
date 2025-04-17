<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Fiksi'],
            ['name' => 'Romansa'],
            ['name' => 'Pengembangan Diri'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}