import { Router, Request, Response } from "express";
import { Query } from "../models/query";

const queryRouter = Router();
let queries: Query[] = [];

queryRouter.post("/query/0", (req: Request, res: Response) => {
    const saveQuery: Query = {
        instructions: req.body.section,
        section: req.body.section,
        question: req.body.question,
        answers: req.body.answers,
    };
    queries.push(saveQuery);
    console.log("Saved: " + saveQuery);

    const nextQuery: Query = {
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question: "Is the participant able to REACH the Mingazzini position?",
        answers: ["Yes", "No"],
    };

    console.log("Send data" + nextQuery);

    res.status(201).json(nextQuery);
});

queryRouter.get("/query/0", (req: Request, res: Response) => {
    const query: Query = {
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question: "Is the participant able to REACH the Mingazzini position?",
        answers: ["Yes", "No"],
    };

    console.log(query);
    res.status(201).json(query);
});

export default queryRouter;
