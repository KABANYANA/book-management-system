function Pagination({ currentPage, lastPage, setCurrentPage }) {
  if (lastPage <= 1) return null;

  return (
    <div className="mt-6 flex justify-center space-x-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span>
        Page {currentPage} of {lastPage}
      </span>

      <button
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;