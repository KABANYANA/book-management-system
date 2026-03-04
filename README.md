#  Book Management System

A full-stack Book Management System built using:

- **Frontend:** React + Tailwind CSS  
- **Backend:** Laravel (PHP)  
- **Database:** MySQL  
- **Authentication:** Laravel Sanctum  
- **API Communication:** JSON over HTTP  

This application allows authenticated users to manage books with full CRUD functionality, search, pagination, and availability status tracking.

---

##  Features

### Core Features
- Add a new book
- View a list of books
- Edit book details
- Delete a book
- Mark a book as available or unavailable
- RESTful API architecture
- Backend input validation
- Structured JSON responses

### Bonus Features
- Search by title, author, or ISBN
- Pagination (5 books per page)
- Authentication (Register / Login / Logout)
- Clean folder structure
- Custom Pale Sandy Fawn UI theme

---

#  Tech Stack

## Backend
- Laravel
- Sanctum (API Authentication)
- MySQL
- Eloquent ORM

## Frontend
- React (Functional Components)
- Tailwind CSS
- Custom Hooks for state management
- Fetch API for HTTP requests

---

#  Installation & Setup

## 1️ Clone Repository

```bash
git clone https://github.com/KABANYANA/book-management-system.git
cd book-management-system
```

---

#  Backend Setup (Laravel)

## 1. Navigate to backend folder

```bash
cd backend
```

## 2. Install dependencies

```bash
composer install
```

## 3. Copy environment file

```bash
cp .env.example .env
```

## 4. Configure Database

Open `.env` and update:

```
DB_DATABASE=database_name
DB_USERNAME=username
DB_PASSWORD=password
```

## 5. Generate application key

```bash
php artisan key:generate
```

## 6. Run migrations

```bash
php artisan migrate
```

## 7. Start backend server

```bash
php artisan serve
```

Backend runs at:

```
http://127.0.0.1:8000
```

<img width="951" height="610" alt="Screenshot from 2026-03-03 16-01-26" src="https://github.com/user-attachments/assets/36c4006d-38f8-42fc-9fc8-3a7bbd1c5d7e" />
<img width="951" height="610" alt="Screenshot from 2026-03-03 16-04-02" src="https://github.com/user-attachments/assets/448c8fa8-6825-4475-a145-a91f05856b9d" />
<img width="960" height="651" alt="Screenshot from 2026-03-03 17-34-17" src="https://github.com/user-attachments/assets/f1f65aa7-09c5-43e1-ba84-c12b9bd35419" />
<img width="960" height="651" alt="Screenshot from 2026-03-03 17-35-37" src="https://github.com/user-attachments/assets/3748ca40-d8c7-4ab9-89b0-1690df114582" />


---

#  Frontend Setup (React)

## 1. Navigate to the frontend folder

```bash
cd frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start the development server

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```
<img width="500" height="454" alt="Screenshot from 2026-03-04 04-08-52" src="https://github.com/user-attachments/assets/90081ccb-c21b-4880-b7f9-6d2be7fcc050" />
<img width="500" height="454" alt="Screenshot from 2026-03-04 04-09-02" src="https://github.com/user-attachments/assets/eada46d4-dc6b-4aec-9042-ea7f82f8cf0b" />
<img width="1267" height="693" alt="Screenshot from 2026-03-04 04-09-44" src="https://github.com/user-attachments/assets/90801f45-e46e-4cf3-91a1-6e32a867fbd9" />
<img width="1233" height="433" alt="Screenshot from 2026-03-04 04-10-05" src="https://github.com/user-attachments/assets/9d013303-58e6-4f7c-8e66-d97df8990551" />
<img width="1194" height="669" alt="Screenshot from 2026-03-04 04-10-37" src="https://github.com/user-attachments/assets/8c72b92e-60c2-4793-8bef-7c51a371eec8" />
<img width="514" height="520" alt="Screenshot from 2026-03-04 04-10-57" src="https://github.com/user-attachments/assets/cd5ebb92-8c58-4656-81ab-fc6d8d180863" />
<img width="514" height="520" alt="Screenshot from 2026-03-04 04-11-11" src="https://github.com/user-attachments/assets/758e72a5-f030-40b8-99fe-55a232cbde40" />

---

#  API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register user |
| POST | `/api/login` | Login user |
| POST | `/api/logout` | Logout (Protected) |

## Books (Protected Routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Fetch books (search + pagination supported) |
| GET | `/api/books/{id}` | Fetch single book |
| POST | `/api/books` | Create book |
| PUT | `/api/books/{id}` | Update book |
| DELETE | `/api/books/{id}` | Delete book |

---

#  Search & Pagination

Search example:

```
GET /api/books?search=more&page=1
```

Pagination:
- 5 books per page
- Returns `current_page`, `last_page`, and `total`

---

#  Project Structure

## Backend

```
backend/
  app/
  database/
  routes/
```

## Frontend

```
frontend/
  src/
    components/
    hooks/
    services/
```

---

#  Assumptions

- Authentication is required for all book operations.
- ISBN must be unique.
- Publication year cannot exceed the current year.
- Availability defaults to true if not provided.

---

#  Limitations

- No role-based access control for 
- No automated test coverage included
- Basic UI without advanced animations
- Local integration

---

#  Author

Joyeuse KABANYANA

