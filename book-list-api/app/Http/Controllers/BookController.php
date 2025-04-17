<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Book::with('category')->get()->map(function ($book) {
            $book->publication_date = \Carbon\Carbon::parse($book->publication_date)->format('d-m-Y');
            return $book;
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'title' => 'required',
                'author' => 'required',
                'publication_date' => 'required|date',
                'publisher' => 'required',
                'number_of_pages' => 'required|integer',
                'category_id' => 'required|exists:categories,id',
            ]);

            $book = Book::create($data);

            return response()->json([
                'message' => 'Book created successfully.',
                'data' => $book,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return $book->load('category');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $data = $request->validate([
            'title' => 'sometimes|required',
            'author' => 'sometimes|required',
            'publication_date' => 'sometimes|required|date',
            'publisher' => 'sometimes|required',
            'number_of_pages' => 'sometimes|required|integer',
            'category_id' => 'sometimes|required|exists:categories,id',
        ]);

        $book->update($data);
        return $book;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return response()->noContent();
    }

    public function filter(Request $request)
    {
        $query = Book::query()->with('category');

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                    ->orWhere('author', 'like', "%$search%")
                    ->orWhere('publisher', 'like', "%$search%");
            });
        }

        if ($request->filled('publication_date')) {
            $query->whereDate('publication_date', $request->publication_date);
        }

        return $query->get();
    }
}
