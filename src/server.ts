import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    return res.send("Hello World")
})

app.listen(port, () => {
    console.log("server is running on " + port)
})