import { useState } from "react";
import { loginUser, registerUser } from "../services/api";

function AuthForm({ setToken }) {
  const [isRegistering, setIsRegistering] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = isRegistering
      ? await registerUser(form)
      : await loginUser({
          email: form.email,
          password: form.password,
        });

    if (response.success) {
      localStorage.setItem("token", response.token);
      setToken(response.token);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <form
        onSubmit={handleSubmit}
        className="bg-stone-50 p-8 rounded-xl shadow-lg w-96 border border-stone-200"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-stone-800">
          {isRegistering ? "Register" : "Login"}
        </h2>

        {isRegistering && (
          <input
            type="text"
            placeholder="Name"
            className="border border-stone-300 bg-white p-3 w-full mb-4 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="border border-stone-300 bg-white p-3 w-full mb-4 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-stone-300 bg-white p-3 w-full mb-6 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button className="bg-stone-700 hover:bg-stone-800 text-white w-full p-3 rounded-lg transition-colors font-medium">
          {isRegistering ? "Register" : "Login"}
        </button>

        <p className="text-center text-sm mt-6 text-stone-600">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-stone-700 hover:text-stone-900 ml-2 font-medium"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;