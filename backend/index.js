//packages
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//routes
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import uploadRoute from "./routes/uploadRoute.js";

//utils
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/upload", uploadRoute);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}. Go to http://localhost:${port}`);
});
