// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const productRoutes = require("./routes/products");

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());
// For parsing JSON data
app.use("/api", productRoutes);

const port = process.env.PORT || 5173;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/api/products", (req, res) => {
    const { name, description, price } = req.body;
  
    if (!name || !description || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    res.status(201).json({ message: "Product added successfully" });
});

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email }); // Check if the email already exists
    console.log(`User with email ${email} already exists.`);
    if (userExists) return res.status(400).json({ message: "Email already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("Stored password:", user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

  
