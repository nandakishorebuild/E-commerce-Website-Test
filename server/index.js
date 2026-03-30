import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import db from "./db.js";

const app = express();

// CORS (FIRST)
app.use(cors({
  origin: "https://e-commerce-website-test-2yiv.vercel.app",
  credentials: true,
    //"http://localhost:5173",
}));



// Middleware
app.use(express.json());
app.use(cookieParser());




// Register
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check all fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" }); // ✅ 400 OK
    }

    // Check username already exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Username already taken" }); // ✅ 409 OK
    }

    // Check email already exists
    const [existingEmail] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingEmail.length > 0) {
      return res.status(409).json({ message: "Email already registered" }); // ✅ 409 OK
    }

    // Hash password and save
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "Registration successful" }); // ✅ CHANGED from 200 → 201

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" }); // ✅ 500 OK
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check all fields
    if (!username || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check user exists
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000
    });

    //res.json({ message: "Login successful" });
    res.status(200).json({ message: "Login successful ✅", user });

  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Home - only logged in users
app.get("/home", (req, res) => {
  const token = req.cookies.token;

  // No token = not logged in
  if (!token) {
    return res.status(401).json({ message: "Please login first" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ username: decoded.username });
  } catch (err) {
    return res.status(401).json({ message: "Session expired, please login again" });
  }
});

// Logout
app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax"
  });
  res.json({ message: "Logout successful" });
});

const PORT = process.env.PORT || 5731;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});