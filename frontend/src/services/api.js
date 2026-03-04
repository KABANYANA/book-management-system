const API_BASE_URL = "http://localhost:8000/api";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ---------------- AUTH ----------------

export const registerUser = async (data) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    headers: authHeaders(),
  });

  return response.json();
};

// ---------------- BOOKS ----------------

export const getBooks = async (search = "", page = 1) => {
  const query = new URLSearchParams({
    search,
    page,
  }).toString();

  const response = await fetch(
    `${API_BASE_URL}/books?${query}`,
    {
      headers: authHeaders(),
    }
  );

  return response.json();
};

export const createBook = async (data) => {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  return response.json();
};

export const updateBook = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  return response.json();
};

export const deleteBook = async (id) => {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  return response.json();
};