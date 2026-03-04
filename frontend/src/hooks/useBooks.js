import { useEffect, useState } from "react";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../services/api";

function useBooks() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    const res = await getBooks(search, currentPage);
    setBooks(res.data || []);
    setLastPage(res.last_page || 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [search, currentPage]);

  const create = async (data) => {
    await createBook(data);
    fetchBooks();
  };

  const update = async (book) => {
    await updateBook(book.id, book);
    fetchBooks();
  };

  const remove = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  return {
    books,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    lastPage,
    loading,
    create,
    update,
    remove,
  };
}

export default useBooks;