import { useState } from "react";

function EditModal({ book, onClose, onSave }) {
  const [form, setForm] = useState(book);

  const handleSave = () => {
    onSave({
      ...form,
      publication_year: Number(form.publication_year),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-stone-50 border border-amber-200 shadow-2xl rounded-2xl w-[420px] p-8">

        <h2 className="text-2xl font-semibold text-stone-800 mb-6">
          Edit Book
        </h2>

        {["title", "author", "isbn"].map((field) => (
          <input
            key={field}
            className="w-full mb-3 p-3 rounded-lg border border-amber-200 bg-amber-50 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
            value={form[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
          />
        ))}

        <input
          type="number"
          className="w-full mb-3 p-3 rounded-lg border border-amber-200 bg-amber-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
          value={form.publication_year}
          onChange={(e) =>
            setForm({ ...form, publication_year: e.target.value })
          }
        />

        <label className="flex items-center space-x-3 mb-6 text-stone-700">
          <input
            type="checkbox"
            checked={form.is_available}
            onChange={(e) =>
              setForm({ ...form, is_available: e.target.checked })
            }
            className="accent-stone-800 w-4 h-4"
          />
          <span>Available</span>
        </label>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-stone-300 hover:bg-stone-400 text-stone-800 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-stone-800 hover:bg-stone-900 text-amber-50 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;