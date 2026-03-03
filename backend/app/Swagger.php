<?php

namespace App;

/**
 * @OA\OpenApi(
 *     @OA\Info(
 *         title="Book Management API",
 *         version="1.0.0",
 *         description="API documentation for the Book Management System"
 *     ),
 *     @OA\Server(
 *         url="http://127.0.0.1:8000",
 *         description="Local Server"
 *     )
 * )
 *
 * @OA\Tag(
 *     name="Books",
 *     description="Book management endpoints"
 * )
 *
 * @OA\Get(
 *     path="/api/books",
 *     tags={"Books"},
 *     summary="Get all books",
 *     @OA\Response(
 *         response=200,
 *         description="List of books"
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/books",
 *     tags={"Books"},
 *     summary="Create a book",
 *     @OA\Response(
 *         response=201,
 *         description="Book created"
 *     )
 * )
 *
 * @OA\Put(
 *     path="/api/books/{id}",
 *     tags={"Books"},
 *     summary="Update a book",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Book updated"
 *     )
 * )
 *
 * @OA\Delete(
 *     path="/api/books/{id}",
 *     tags={"Books"},
 *     summary="Delete a book",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Book deleted"
 *     )
 * )
 */
class Swagger {}