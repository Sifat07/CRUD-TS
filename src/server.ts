import express, { Request, Response } from "express";
import db from "./config/database.config";

db.sync().then(() => {
    console.log('db connected')
})

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    return res.send("Hello World")
})

app.listen(port, () => {
    console.log("server is running on " + port)
})