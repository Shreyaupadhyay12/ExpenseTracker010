import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./DB/Database.js";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";


dotenv.config({ path: "./config/config.env" });

const app = express();
const port = process.env.PORT || 5000;

connectDB();

// ✅ All allowed origins (local + production)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://main.dsj7cd7ohlter.amplifyapp.com",
  "https://expense-tracker-app-three-beryl.vercel.app",
  "https://expense-tracker-app-knll.onrender.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// ✅ Enable CORS
app.use(cors(corsOptions));

// Other middlewares
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
