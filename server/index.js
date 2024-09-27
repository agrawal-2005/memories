import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const PORT = process.env.PORT || 4000;

const app = express();
dotenv.config();

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`MongoDB Connected on port ${PORT}`)))
  .catch((error) => console.log(error));


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Expires", "0");
  res.setHeader("Pragma", "no-cache");
  next();
});
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// // Optional: Authentication Middleware applied to all routes
// app.use(auth);