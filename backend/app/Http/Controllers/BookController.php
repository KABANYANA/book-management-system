<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of books with search + pagination.
     */
    public function index(Request $request)
    {
        $query = Book::query();

        // 🔎 Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%")
                  ->orWhere('isbn', 'like', "%{$search}%");
            });
        }

        // 📄 Pagination (5 per page)
        $books = $query->latest()->paginate(5);

        return response()->json([
            'success' => true,
            'data' => $books->items(),
            'current_page' => $books->currentPage(),
            'last_page' => $books->lastPage(),
            'per_page' => $books->perPage(),
            'total' => $books->total(),
        ], 200);
    }

    /**
     * Display a single book.
     */
    public function show(Book $book)
    {
        return response()->json([
            'success' => true,
            'data' => $book
        ], 200);
    }

    /**
     * Store a newly created book.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|max:255|unique:books,isbn',
            'publication_year' => 'required|integer|min:1000|max:' . date('Y'),
            'is_available' => 'sometimes|boolean'
        ]);

        $book = Book::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Book created successfully',
            'data' => $book
        ], 201);
    }

    /**
     * Update the specified book.
     */
    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'author' => 'sometimes|required|string|max:255',
            'isbn' => 'sometimes|required|string|max:255|unique:books,isbn,' . $book->id,
            'publication_year' => 'sometimes|required|integer|min:1000|max:' . date('Y'),
            'is_available' => 'sometimes|boolean'
        ]);

        $book->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Book updated successfully',
            'data' => $book
        ], 200);
    }

    /**
     * Remove the specified book.
     */
    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json([
            'success' => true,
            'message' => 'Book deleted successfully'
        ], 200);
    }
}