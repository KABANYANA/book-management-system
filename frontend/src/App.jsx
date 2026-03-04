// import { useEffect, useState } from "react";
// import {
//   loginUser,
//   registerUser,
//   logoutUser,
//   getBooks,
//   createBook,
//   updateBook,
//   deleteBook,
// } from "./services/api";

// function App() {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [isRegistering, setIsRegistering] = useState(false);

//   const [authData, setAuthData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [books, setBooks] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [lastPage, setLastPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     isbn: "",
//     publication_year: "",
//     is_available: true,
//   });

//   const [editingBook, setEditingBook] = useState(null);
//   const [viewingBook, setViewingBook] = useState(null);

//   // ---------------- AUTH ----------------

//   const handleAuthChange = (e) => {
//     setAuthData({ ...authData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const response = await registerUser(authData);
//     if (response.success) {
//       localStorage.setItem("token", response.token);
//       setToken(response.token);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const response = await loginUser({
//       email: authData.email,
//       password: authData.password,
//     });
//     if (response.success) {
//       localStorage.setItem("token", response.token);
//       setToken(response.token);
//     }
//   };

//   const handleLogout = async () => {
//     await logoutUser();
//     localStorage.removeItem("token");
//     setToken(null);
//   };

//   // ---------------- BOOKS ----------------

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const response = await getBooks(search, currentPage);
//       setBooks(response.data || []);
//       setLastPage(response.last_page || 1);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchBooks();
//   }, [token, search, currentPage]);

//   const handleCreate = async (e) => {
//     e.preventDefault();

//     await createBook({
//       ...formData,
//       publication_year: Number(formData.publication_year),
//     });

//     setFormData({
//       title: "",
//       author: "",
//       isbn: "",
//       publication_year: "",
//       is_available: true,
//     });

//     fetchBooks();
//   };

//   const handleDelete = async (id) => {
//     await deleteBook(id);

//     if (books.length === 1 && currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     } else {
//       fetchBooks();
//     }
//   };

//   const handleEditChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditingBook({
//       ...editingBook,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleUpdate = async () => {
//     await updateBook(editingBook.id, {
//       ...editingBook,
//       publication_year: Number(editingBook.publication_year),
//     });

//     setEditingBook(null);
//     fetchBooks();
//   };

//   // ---------------- AUTH SCREEN ----------------

//   if (!token) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <form
//           onSubmit={isRegistering ? handleRegister : handleLogin}
//           className="bg-white p-6 rounded shadow-md w-96"
//         >
//           <h2 className="text-xl font-bold mb-4 text-center">
//             {isRegistering ? "Register" : "Login"}
//           </h2>

//           {isRegistering && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               className="border p-2 w-full mb-3 rounded"
//               value={authData.name}
//               onChange={handleAuthChange}
//               required
//             />
//           )}

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="border p-2 w-full mb-3 rounded"
//             value={authData.email}
//             onChange={handleAuthChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="border p-2 w-full mb-3 rounded"
//             value={authData.password}
//             onChange={handleAuthChange}
//             required
//           />

//           <button className="bg-blue-600 text-white w-full p-2 rounded">
//             {isRegistering ? "Register" : "Login"}
//           </button>

//           <p className="text-center text-sm mt-4">
//             {isRegistering
//               ? "Already have an account?"
//               : "Don't have an account?"}
//             <button
//               type="button"
//               onClick={() => setIsRegistering(!isRegistering)}
//               className="text-blue-600 ml-2"
//             >
//               {isRegistering ? "Login" : "Register"}
//             </button>
//           </p>
//         </form>
//       </div>
//     );
//   }

//   // ---------------- MAIN UI ----------------

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
//         <div className="flex justify-between mb-6">
//           <h1 className="text-2xl font-bold">Book Management System</h1>
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border p-2 rounded w-1/2 mb-4"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//         />

//         {/* Create Form */}
//         <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Title"
//             className="border p-2 rounded"
//             value={formData.title}
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//             required
//           />

//           <input
//             type="text"
//             placeholder="Author"
//             className="border p-2 rounded"
//             value={formData.author}
//             onChange={(e) =>
//               setFormData({ ...formData, author: e.target.value })
//             }
//             required
//           />

//           <input
//             type="text"
//             placeholder="ISBN"
//             className="border p-2 rounded"
//             value={formData.isbn}
//             onChange={(e) =>
//               setFormData({ ...formData, isbn: e.target.value })
//             }
//             required
//           />

//           <input
//             type="number"
//             placeholder="Year"
//             className="border p-2 rounded"
//             value={formData.publication_year}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 publication_year: e.target.value,
//               })
//             }
//             required
//           />

//           <label className="col-span-2 flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={formData.is_available}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   is_available: e.target.checked,
//                 })
//               }
//             />
//             <span>Available</span>
//           </label>

//           <button className="bg-blue-600 text-white p-2 rounded col-span-2">
//             Add Book
//           </button>
//         </form>

//         {/* Table */}
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2 border">Title</th>
//               <th className="p-2 border">Author</th>
//               <th className="p-2 border">Year</th>
//               <th className="p-2 border">Available</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book.id}>
//                 <td
//                   className="p-2 border text-blue-600 cursor-pointer hover:underline"
//                   onClick={() => setViewingBook(book)}
//                 >
//                   {book.title}
//                 </td>

//                 <td className="p-2 border">{book.author}</td>
//                 <td className="p-2 border">{book.publication_year}</td>
//                 <td className="p-2 border">
//                   {book.is_available ? "Yes" : "No"}
//                 </td>

//                 <td className="p-2 border space-x-2">
//                   <button
//                     onClick={() => setEditingBook(book)}
//                     className="bg-yellow-500 text-white px-2 py-1 rounded"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(book.id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="mt-6 flex justify-center space-x-4">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Prev
//           </button>

//           <span>
//             Page {currentPage} of {lastPage}
//           </span>

//           <button
//             disabled={currentPage === lastPage}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* VIEW DETAILS MODAL */}
//       {viewingBook && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Book Details</h2>

//             <p><strong>Title:</strong> {viewingBook.title}</p>
//             <p><strong>Author:</strong> {viewingBook.author}</p>
//             <p><strong>ISBN:</strong> {viewingBook.isbn}</p>
//             <p><strong>Year:</strong> {viewingBook.publication_year}</p>
//             <p><strong>Available:</strong> {viewingBook.is_available ? "Yes" : "No"}</p>

//             <div className="mt-4 text-right">
//               <button
//                 onClick={() => setViewingBook(null)}
//                 className="bg-gray-600 text-white px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* EDIT MODAL */}
//       {editingBook && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Edit Book</h2>

//             <input
//               name="title"
//               value={editingBook.title}
//               onChange={handleEditChange}
//               className="border p-2 w-full mb-2 rounded"
//             />
//             <input
//               name="author"
//               value={editingBook.author}
//               onChange={handleEditChange}
//               className="border p-2 w-full mb-2 rounded"
//             />
//             <input
//               name="isbn"
//               value={editingBook.isbn}
//               onChange={handleEditChange}
//               className="border p-2 w-full mb-2 rounded"
//             />
//             <input
//               name="publication_year"
//               type="number"
//               value={editingBook.publication_year}
//               onChange={handleEditChange}
//               className="border p-2 w-full mb-2 rounded"
//             />

//             <label className="flex items-center space-x-2 mb-3">
//               <input
//                 type="checkbox"
//                 name="is_available"
//                 checked={editingBook.is_available}
//                 onChange={handleEditChange}
//               />
//               <span>Available</span>
//             </label>

//             <div className="flex justify-between">
//               <button
//                 onClick={() => setEditingBook(null)}
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



import { useState } from "react";
import AuthForm from "./components/AuthForm";
import BookManager from "./components/BookManager";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (!token) {
    return <AuthForm setToken={setToken} />;
  }

  return <BookManager setToken={setToken} />;
}

export default App;