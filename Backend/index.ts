import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import patientRouter from "./src/routes/patients";
import sectionOneARouter from "./src/routes/sectionOneA";
import sectionTwoRouter from "./src/routes/sectionTwo";
import sectionThreeRouter from "./src/routes/sectionThree";
import sectionFourRouter from "./src/routes/sectionFour";
import sectionFiveRouter from "./src/routes/sectionFive";
import sectionOneBRouter from "./src/routes/sectionOneB";
import sectionSixRouter from "./src/routes/sectionSix";
import sectionSevenARouter from "./src/routes/sectionSevenA";
import sectionSevenBRouter from "./src/routes/sectionSevenB";
import sectionEightRouter from "./src/routes/sectionEight";
import sectionNineRouter from "./src/routes/sectionNine";
import sectionTenRouter from "./src/routes/sectionTen";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/patients", patientRouter);
app.use("/queries/1a", sectionOneARouter);
app.use("/queries/1b", sectionOneBRouter);
app.use("/queries/2", sectionTwoRouter);
app.use("/queries/3", sectionThreeRouter);
app.use("/queries/4", sectionFourRouter);
app.use("/queries/5", sectionFiveRouter);
app.use("/queries/6", sectionSixRouter);
app.use("/queries/7a", sectionSevenARouter);
app.use("/queries/7b", sectionSevenBRouter);
app.use("/queries/8", sectionEightRouter);
app.use("/queries/9", sectionNineRouter);
app.use("/queries/10", sectionTenRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
