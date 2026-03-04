function ViewModal({ book, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-stone-50 border border-amber-200 shadow-2xl rounded-2xl w-[420px] p-8">

        <h2 className="text-2xl font-semibold text-stone-800 mb-6">
          Book Details
        </h2>

        <div className="space-y-4 text-stone-700">

          <div>
            <p className="text-xs uppercase tracking-wide text-stone-500">
              Title
            </p>
            <p className="text-lg font-medium text-stone-800">
              {book.title}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-stone-500">
              Author
            </p>
            <p>{book.author}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-stone-500">
              ISBN
            </p>
            <p>{book.isbn}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-stone-500">
              Publication Year
            </p>
            <p>{book.publication_year}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-stone-500">
              Availability
            </p>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                book.is_available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {book.is_available ? "Available" : "Unavailable"}
            </span>
          </div>

        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-stone-800 hover:bg-stone-900 text-amber-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewModal;