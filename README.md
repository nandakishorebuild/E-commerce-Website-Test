# 🛒 ShopZone — E-Commerce Web App with Authentication

A modern **full stack web application** featuring secure authentication and a responsive e-commerce user interface. Built using **React.js, Node.js, Express.js, and MySQL**, this project focuses on authentication, routing, and frontend state management.

---

## 🌐 Live Demo

### 🔗 Frontend (Vercel)
👉 [https://e-commerce-website-test-2yjv.vercel.app](https://e-commerce-website-test-2yjv.vercel.app)

### 🔗 Backend (Render)
👉 [https://e-commerce-website-test.onrender.com](https://e-commerce-website-test.onrender.com)

---

## 📌 Description

ShopZone is a full stack project where users must register and log in before accessing any page. Once authenticated via JWT cookies, they can browse products, search, paginate, and manage a shopping cart. All routes are protected — unauthenticated users are redirected to login automatically.

---

## 🚀 Features

### 🔐 Authentication (Backend - Express.js)
* User Registration with duplicate username/email check
* User Login with JWT token generation
* HTTP-only Cookies for secure cross-origin sessions
* Protected Routes — all pages require authentication
* Logout functionality with cookie clearing
* Password strength indicator (Level 1 / Level 2 / Level 3)

---

### 🛍️ E-Commerce UI (Frontend - React.js)
* Product listing page powered by DummyJSON API
* Search by keyword (Enter key or Search button) with live result count
* Clear search to return to full product listing
* Skeleton loading cards while products are fetching
* Pagination — 10 products per page with Prev / Next / page number buttons
* Responsive design (mobile + desktop)

---

### 🛒 Cart Features
* Add items to cart with inline quantity controls (+ / −) on product cards
* Increase / decrease quantity
* Remove individual items
* Clear entire cart with confirmation popup
* Auto total price and total item count calculation
* Cart badge on Navbar showing live item count
* Empty cart illustration with Shop Now button

---

## 🧑‍💻 Tech Stack

### Frontend
* React.js
* React Router DOM
* Tailwind CSS
* Axios
* Context API
* Lucide React (icons)

### Backend
* Node.js
* Express.js
* MySQL (mysql2 connection pool)
* JWT (jsonwebtoken)
* bcryptjs
* cookie-parser
* dotenv

### External API
* [DummyJSON](https://dummyjson.com) — product data, search, and pagination

---

## 📁 Project Structure

```bash
E-commerce-Website-Test/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   ├── About.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   └── App.jsx
├── server/
│   ├── index.js
│   ├── db.js
│   └── .env (not pushed)
├── vercel.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/nandakishorebuild/E-commerce-Website-Test.git
cd E-commerce-Website-Test
```

---

### 2️⃣ Install Dependencies
```bash
npm install
cd server
npm install
```

---

### 3️⃣ Setup Environment Variables

Create `.env` file inside `server/`

```env
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auth_db
PORT=5731
```

---

### 4️⃣ Setup MySQL Database
```sql
CREATE DATABASE auth_db;
USE auth_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

---

### 5️⃣ Run Application

#### Start Backend
```bash
cd server
node index.js
```

#### Start Frontend
```bash
npm run dev
```

---

### 🌐 Access Application
```
http://localhost:5176
```

---

## 🔒 Security Features
* Password hashing using bcrypt (salt rounds: 10)
* JWT-based authentication stored in HTTP-only cookies
* Cookie settings: `secure: true`, `sameSite: None` for cross-origin (Vercel + Render)
* CORS restricted to localhost and Vercel app origin
* Environment variables for all sensitive data
* Token expiry: 1 day

---

## 📚 What I Learned
* Building authentication using JWT with HTTP-only cookies
* Configuring CORS for cross-origin cookie sharing
* Backend APIs using Express.js
* MySQL connection pooling with mysql2
* React routing and protected routes
* Global state management using Context API
* Skeleton loading for better UX
* Deploying React to Vercel and Node.js to Render

---

## 👨‍💻 Author

**Nanda Kishore**
Aspiring Full Stack Developer

GitHub: [https://github.com/nandakishorebuild](https://github.com/nandakishorebuild)

---

## 📄 License

This project is licensed under the MIT License.
