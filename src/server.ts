import express from "express";
import db from "./config/database.config";
import todoRouter from "./api/routes";

db.sync().then(() => {
  console.log("db connected");
});

const app = express();
const port = 3000;

app.use(express.json());

app.use("api/v1", todoRouter);

app.listen(port, () => {
  console.log("server is running on " + port);
});
