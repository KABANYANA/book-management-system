function BookTable({ books, onEdit, onDelete, onView }) {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-stone-100 text-stone-700 text-sm uppercase tracking-wide">
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Author</th>
            <th className="px-4 py-3">Year</th>
            <th className="px-4 py-3">Available</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-stone-200 bg-stone-50">
          {books.map((book) => (
            <tr
              key={book.id}
              className="hover:bg-stone-100 transition-colors"
            >
              <td
                className="px-4 py-3 text-stone-800 font-medium cursor-pointer hover:text-stone-900"
                onClick={() => onView(book)}
              >
                {book.title}
              </td>

              <td className="px-4 py-3 text-stone-600">
                {book.author}
              </td>

              <td className="px-4 py-3 text-stone-600">
                {book.publication_year}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    book.is_available
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {book.is_available ? "Available" : "Unavailable"}
                </span>
              </td>

              <td className="px-4 py-3 text-center space-x-2">
                {/* Sandy Edit Button */}
                <button
                  onClick={() => onEdit(book)}
                  className="bg-stone-300 hover:bg-stone-400 text-stone-800 px-3 py-1 rounded-md text-sm transition-colors font-medium"
                >
                  Edit
                </button>

                {/* Clear Orange Delete Button */}
                <button
                  onClick={() => onDelete(book.id)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm transition-colors font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookTable;