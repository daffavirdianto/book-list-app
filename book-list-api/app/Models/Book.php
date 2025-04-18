<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'author', 'publication_date', 'publisher', 'number_of_pages', 'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
