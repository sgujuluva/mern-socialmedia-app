import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import morgan from "morgan"
import userRoutes from "./routes/users.js" ;
import authRoutes from "./routes/auth.js" ;
import postRoutes from "./routes/posts.js" ;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database connected! đâ"))
  .catch((error) => console.log(error, "Database did not connect! âšī¸â"));

  /* middleware*/
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("common"));

  app.use("/api/users",userRoutes)
  app.use("/api/auth",authRoutes)
  app.use("/api/posts",postRoutes)
 
  
app.listen(8800, () => {
    console.log("The port is running on 8800!")
})