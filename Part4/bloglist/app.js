const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");

const password = process.env.VITE_MONGODB_KEY;

const mongoUrl = `mongodb+srv://JesusAlarcon:${password}@clusterprueba.psxsc82.mongodb.net/bloglist?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
