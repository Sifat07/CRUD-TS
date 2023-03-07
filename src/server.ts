import express, { Request, Response } from "express";
import db from "./config/database.config";
import { v4 as uuidv4 } from "uuid";
import { TodoInstance } from "./model";

db.sync().then(() => {
    console.log('db connected')
})

const app = express();
const port = 3000;

app.use(express.json());

app.post("/create", async (req: Request, res: Response) => {
    try {
        const id = uuidv4();
        const record = await TodoInstance.create({ ...req.body, id })
        console.log(req.body);
        return res.json({ record, msg: "successfully created todo" });
    } catch (e) {
        return res.json({ msg: "fail to create", status: 500, route: "/create" })
    }

})

app.listen(port, () => {
    console.log("server is running on " + port)
})