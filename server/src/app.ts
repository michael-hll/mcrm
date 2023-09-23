import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

import todoRoutes from "./routes/user";
import { syncDb } from "./util/database";

const app = express();

app.use(json()); 
app.use("/user", todoRoutes);

app.use(
  "/",
  (err: Error, req: Request, res: Response, next: NextFunction): void => {
    res.status(500).json({ message: err.message });
  }
);

syncDb()
  .then((res) => {
    app.listen(3000, () => {
      console.log("Server started successfully.");
    });
  })
  .catch((err) => {
    console.log("Database sync() error: ", err); 
  });
