import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import patientRouter from "./src/routes/patients";
import sectionOneARouter from "./src/routes/quiz/sectionOneA";
import sectionTwoRouter from "./src/routes/quiz/sectionTwo";
import sectionThreeRouter from "./src/routes/quiz/sectionThree";
import sectionFourRouter from "./src/routes/quiz/sectionFour";
import sectionFiveRouter from "./src/routes/quiz/sectionFive";
import sectionOneBRouter from "./src/routes/quiz/sectionOneB";
import sectionSixRouter from "./src/routes/quiz/sectionSix";
import sectionSevenARouter from "./src/routes/quiz/sectionSevenA";
import sectionSevenBRouter from "./src/routes/quiz/sectionSevenB";
import sectionEightRouter from "./src/routes/quiz/sectionEight";
import sectionNineRouter from "./src/routes/quiz/sectionNine";
import sectionTenRouter from "./src/routes/quiz/sectionTen";
import loginRouter from "./src/routes/login";
import outcomeRouter from "./src/routes/outcomes";
import registerRouter from "./src/routes/register";
import dataRouter from "./src/routes/data";
import db_setup from "./src/dbsetup";
import codeRouter from "./src/routes/research_code";
import participantInfoRouter from "./src/routes/participant_info";
import anamnesticRouter from "./src/routes/quiz/amnesiac";
import anamnesticOutcomeRouter from "./src/routes/anamnestic_outcomes";
import screeningQuestionsRouter from "./src/routes/quiz/screening";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

db_setup();

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
app.use("/queries/anamnestic", anamnesticRouter);
app.use("/queries/screening_questions", screeningQuestionsRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/outcome", outcomeRouter);
app.use("/anamnestic_outcomes", anamnesticOutcomeRouter);
app.use("/answers", dataRouter);
app.use("/code", codeRouter);
app.use("/info", participantInfoRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
