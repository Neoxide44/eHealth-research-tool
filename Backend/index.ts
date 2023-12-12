import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import router from "./src/routes/patients";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/patients", router);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
