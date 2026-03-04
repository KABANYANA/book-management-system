import { useState } from "react";
import { logoutUser } from "../services/api";
import useBooks from "../hooks/useBooks";
import BookForm from "./BookForm";
import BookTable from "./BookTable";
import EditModal from "./EditModal";
import ViewModal from "./ViewModal";
import Pagination from "./Pagination";

function BookManager({ setToken }) {
  const {
    books,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    lastPage,
    loading,
    create,
    remove,
    update,
  } = useBooks();

  const [editingBook, setEditingBook] = useState(null);
  const [viewingBook, setViewingBook] = useState(null);

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-stone-100 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-stone-50 border border-stone-200 shadow-lg rounded-2xl p-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">
              Book Management System
            </h1>
            <p className="text-stone-500 text-sm mt-2">
              Manage your collection with clarity and structure
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-stone-700 hover:bg-stone-800 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          >
            Logout
          </button>
        </div>

        {/* Search */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            className="w-full md:w-1/2 border border-stone-300 bg-white p-3 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Add Book Section */}
        <BookForm onCreate={create} />

        {/* Loading */}
        {loading && (
          <p className="text-stone-500 mt-6">Loading books...</p>
        )}

        {/* Table */}
        <div className="mt-12">
          <BookTable
            books={books}
            onEdit={setEditingBook}
            onDelete={remove}
            onView={setViewingBook}
          />
        </div>

        {/* Pagination */}
        <div className="mt-10">
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      {editingBook && (
        <EditModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSave={update}
        />
      )}

      {viewingBook && (
        <ViewModal
          book={viewingBook}
          onClose={() => setViewingBook(null)}
        />
      )}
    </div>
  );
}

export default BookManager;