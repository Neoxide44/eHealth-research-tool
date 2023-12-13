import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import patientRouter from "./src/routes/patients";
import queryRouter from "./src/routes/queries";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/queries", queryRouter);
app.use("/patients", patientRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
