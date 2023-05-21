import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from "cors";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import path from "Path";
import { fileURLTopath } from 'url';
// configure enivironmental variables
dotenv.config();
// DataBase connection
connectDB();
//esmodeule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// rest object
const app = express();
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')))
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
app.use("*", function (req, res) {
    res.sendFile(path.join(dirname, "./client/build/index.html"))
})

//PORT
const PORT = process.env.PORT || 8080;
//run the app
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue.white);
})
