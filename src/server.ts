import express, { Request, Response } from "express";
import db from "./config/database.config";
import { v4 as uuidv4 } from "uuid";
import { TodoInstance } from "./model";
import TodoValidator from "./validator";
import Middleware from "./middleware";

db.sync().then(() => {
  console.log("db connected");
});

const app = express();
const port = 3000;

app.use(express.json());

app.post(
  "/create",
  TodoValidator.checkCreateTodo(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, msg: "successfully created todo" });
    } catch (e) {
      return res.json({
        msg: "failed to create",
        status: 500,
        route: "/create",
      });
    }
  }
);

app.get(
  "/read",
  TodoValidator.checkReadTodo(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.limit as number | undefined;
      const record = await TodoInstance.findAll({ where: {}, limit, offset });
      return res.json(record);
    } catch (e) {
      return res.json({
        msg: "failed to read",
        status: 500,
        route: "/read",
      });
    }
  }
);

app.listen(port, () => {
  console.log("server is running on " + port);
});
