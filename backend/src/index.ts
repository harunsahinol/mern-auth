import "dotenv/config";

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import connectToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.status(OK).json({
    status: "healhty",
  });
});

app.use(errorHandler);

app.use("/auth", authRoutes)

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} enviroment.`);
  await connectToDatabase();
});
