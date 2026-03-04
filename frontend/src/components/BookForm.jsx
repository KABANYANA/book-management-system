import { useState } from "react";

function BookForm({ onCreate }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    publication_year: "",
    is_available: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      ...form,
      publication_year: Number(form.publication_year),
    });
    setForm({
      title: "",
      author: "",
      isbn: "",
      publication_year: "",
      is_available: true,
    });
  };

  return (
    <div className="mb-12">
      {/* Section Title */}
      <h3 className="text-2xl font-semibold text-stone-800 mb-6">
        Add a New Book
      </h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-5 bg-stone-50 p-8 rounded-xl border border-stone-200 shadow-sm"
      >
        {["title", "author", "isbn"].map((field) => (
          <input
            key={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="border border-stone-300 bg-white p-3 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
            value={form[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
            required
          />
        ))}

        <input
          type="number"
          placeholder="Publication Year"
          className="border border-stone-300 bg-white p-3 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
          value={form.publication_year}
          onChange={(e) =>
            setForm({ ...form, publication_year: e.target.value })
          }
          required
        />

        <label className="col-span-2 flex items-center space-x-3 text-stone-700 mt-2">
          <input
            type="checkbox"
            checked={form.is_available}
            onChange={(e) =>
              setForm({ ...form, is_available: e.target.checked })
            }
            className="accent-stone-700 w-4 h-4"
          />
          <span>Available</span>
        </label>

        <button className="bg-stone-700 hover:bg-stone-800 text-white p-3 rounded-lg col-span-2 transition-colors font-medium mt-2">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default BookForm;