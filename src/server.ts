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
      const limit = (req.query.limit as number | undefined) || 10;
      const offset = req.query.offset as number | undefined;

      const records = await TodoInstance.findAll({ where: {}, limit, offset });
      return res.json(records);
    } catch (e) {
      return res.json({
        msg: "failed to read",
        status: 500,
        route: "/read",
      });
    }
  }
);

app.get(
  "/read/:id",
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      return res.json(record);
    } catch (e) {
      return res.json({
        msg: "failed to read",
        status: 500,
        route: "/read/:id",
      });
    }
  }
);

app.put(
  "/update/:id",
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({ msg: "Can not find existing record" });
      }

      const updatedRecord = await record.update({
        completed: !record.getDataValue("completed"),
      });
      return res.json({ record: updatedRecord });
    } catch (e) {
      return res.json({
        msg: "failed to read",
        status: 500,
        route: "/update/:id",
      });
    }
  }
);

app.listen(port, () => {
  console.log("server is running on " + port);
});
