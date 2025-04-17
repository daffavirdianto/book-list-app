<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $books = [
            [
                'title' => 'Laut Bercerita',
                'author' => 'Leila S. Chudori',
                'publication_date' => '2023-11-15',
                'publisher' => 'Kepustakaan Populer Gramedia',
                'number_of_pages' => 380,
                'category_id' => 1,
            ],
            [
                'title' => 'Arah Langkah',
                'author' => 'Fiersa Besari',
                'publication_date' => '2024-01-20',
                'publisher' => 'Media Kita',
                'number_of_pages' => 232,
                'category_id' => 2,
            ],
            [
                'title' => 'Perjalanan Menuju Pulang',
                'author' => 'Boy Candra',
                'publication_date' => '2024-03-10',
                'publisher' => 'GagasMedia',
                'number_of_pages' => 216,
                'category_id' => 2,
            ],
            [
                'title' => 'Rahasia Salju di Ujung Jalan',
                'author' => 'Tere Liye',
                'publication_date' => '2023-12-05',
                'publisher' => 'Republika Penerbit',
                'number_of_pages' => 290,
                'category_id' => 1,
            ],
            [
                'title' => 'Berani Tidak Disukai',
                'author' => 'Ichiro Kishimi & Fumitake Koga',
                'publication_date' => '2024-02-17',
                'publisher' => 'Gramedia Pustaka Utama',
                'number_of_pages' => 328,
                'category_id' => 3,
            ],
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}
