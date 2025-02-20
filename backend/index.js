//start code

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
const User = require("./models/User");
const multer = require("multer");
const app = express();
const cors = require('cors');


// Middleware
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //store the photos

const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware for Authentication

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Configure storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file names
  },
});

// File filter to accept only specific file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|pdf/; // Allow images and PDFs
  const extName = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedFileTypes.test(file.mimetype);
  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDF files are allowed!"));
  }
};

// Initialize multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
});

//login signup logout

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect("/");
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logged out successfully" });
});

//this is important for the showing the buttons on the home page
app.get("/api/dashboard", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.render("mainpage");
});
app.get("/update", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.render("update", { user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
