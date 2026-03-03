import { useEffect, useState } from "react";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "./services/api";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publication_year: "",
    is_available: true,
  });

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    await createBook({
      ...formData,
      publication_year: Number(formData.publication_year),
    });

    setFormData({
      title: "",
      author: "",
      isbn: "",
      publication_year: "",
      is_available: true,
    });

    fetchBooks();
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  const handleModalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedBook({
      ...selectedBook,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async () => {
    await updateBook(selectedBook.id, {
      ...selectedBook,
      publication_year: Number(selectedBook.publication_year),
    });

    setIsEditing(false);
    setSelectedBook(null);
    fetchBooks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Book Management System</h1>

        {/* Create Form */}
        <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={(e) =>
              setFormData({ ...formData, isbn: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="publication_year"
            placeholder="Publication Year"
            value={formData.publication_year}
            onChange={(e) =>
              setFormData({
                ...formData,
                publication_year: e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />
          <label className="flex items-center space-x-2 col-span-2">
            <input
              type="checkbox"
              checked={formData.is_available}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  is_available: e.target.checked,
                })
              }
            />
            <span>Available</span>
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded col-span-2"
          >
            Add Book
          </button>
        </form>

        {/* Table */}
        {loading && <p>Loading...</p>}

        {!loading && (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Author</th>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Available</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td
                    className="p-2 border cursor-pointer"
                    onClick={() => {
                      setSelectedBook(book);
                      setIsEditing(false);
                    }}
                  >
                    {book.title}
                  </td>
                  <td className="p-2 border">{book.author}</td>
                  <td className="p-2 border">{book.publication_year}</td>
                  <td className="p-2 border">
                    {book.is_available ? "Yes" : "No"}
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => {
                        setSelectedBook(book);
                        setIsEditing(true);
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Book" : "Book Details"}
            </h2>

            {isEditing ? (
              <>
                <input
                  name="title"
                  value={selectedBook.title}
                  onChange={handleModalChange}
                  className="border p-2 w-full mb-2 rounded"
                />
                <input
                  name="author"
                  value={selectedBook.author}
                  onChange={handleModalChange}
                  className="border p-2 w-full mb-2 rounded"
                />
                <input
                  name="isbn"
                  value={selectedBook.isbn}
                  onChange={handleModalChange}
                  className="border p-2 w-full mb-2 rounded"
                />
                <input
                  name="publication_year"
                  type="number"
                  value={selectedBook.publication_year}
                  onChange={handleModalChange}
                  className="border p-2 w-full mb-2 rounded"
                />
                <label className="flex items-center space-x-2 mb-3">
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={selectedBook.is_available}
                    onChange={handleModalChange}
                  />
                  <span>Available</span>
                </label>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p><strong>Title:</strong> {selectedBook.title}</p>
                <p><strong>Author:</strong> {selectedBook.author}</p>
                <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
                <p><strong>Year:</strong> {selectedBook.publication_year}</p>
                <p>
                  <strong>Available:</strong>{" "}
                  {selectedBook.is_available ? "Yes" : "No"}
                </p>
              </>
            )}

            <button
              onClick={() => setSelectedBook(null)}
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;