import { Router, Request, Response } from "express";
import { saveQuery } from "../models/saveQuery";
import { sendQuery } from "../models/sendQuery";

const queryRouter = Router();
let queries: saveQuery[] = [];

queryRouter.post("/query/0", (req: Request, res: Response) => {
    const saveQuery: saveQuery = {
        instructions: req.body.section,
        section: req.body.section,
        question: req.body.question,
        answer: req.body.answers,
    };
    queries.push(saveQuery);

    const nextQuery: sendQuery = {
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question: "Is the participant able to REACH the Mingazzini position?",
        answers: ["Yes", "No"],
    };

    res.status(201).json(nextQuery);
});

queryRouter.post("/query/1a", (req: Request, res: Response) => {
    const saveQuery: saveQuery = {
        instructions: req.body.section,
        section: req.body.section,
        question: req.body.question,
        answer: req.body.answer,
    };
    queries.push(saveQuery);

    let nextSection = "1a";
    let nextInstructions =
        "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.";
    let nextQuestion = "";
    let nextAnswers: string[] = [];

    console.log(req.body);

    //First question
    if (
        req.body.question ===
        "Is the participant able to REACH the Mingazzini position?"
    ) {
        if (req.body.answer === "Yes") {
            nextQuestion =
                "Is the participant able to HOLD the Mingazzini in a steady position for at least 5 seconds?";
            nextAnswers = ["Yes", "No"];
        } else if (req.body.answer === "No") {
            nextQuestion = "";
            nextAnswers = [
                "One or both arms are MISSING or UNABLE to move for non-neurological reasons",
                "One or both arms cannot REACH position",
            ];
        }
    }
    if (req.body.question === "") {
        if (
            req.body.answer ===
            "One or both arms are MISSING or UNABLE to move for non-neurological reasons"
        ) {
            nextQuestion = "";
            nextAnswers = [
                "LEFT MISSING",
                "LEFT UNABLE TO MOVE",
                "RIGHT MISSING",
                "RIGHT UNABLE TO MOVE",
                "BOTH MISSING",
                "BOTH UNABLE TO MOVE",
            ];
        } else if (
            req.body.answer === "One or both arms cannot REACH position"
        ) {
            nextQuestion =
                "Is the  inability to reach position accompanied by SHAKING or involuntary movement?";
            nextAnswers = ["Yes", "No"];
        }
    }
    if (
        req.body.question ===
        "Is the  inability to reach position accompanied by SHAKING or involuntary movement?"
    ) {
        if (req.body.answer === "Yes") {
            nextQuestion = "";
            nextAnswers = ["LEFT", "RIGHT", "BOTH"];
        } else if (req.body.answer === "No") {
            nextQuestion = "";
            nextAnswers = ["LEFT", "RIGHT", "BOTH"];
        }
    }
    if (
        req.body.question ===
        "Is the participant able to HOLD the Mingazzini in a steady position for at least 5 seconds?"
    ) {
        if (req.body.answer === "Yes") {
            //part 2
        } else if (req.body.answer === "No") {
            nextQuestion = "";
            nextAnswers = [
                "One or both arms FALL down within 5 seconds",
                "One or both arms ROTATE",
            ];
        }
    }
    if (req.body.question === "") {
        if (req.body.answer === "One or both arms FALL down within 5 seconds") {
            nextQuestion =
                "Is the falling accompanied by SHAKING or involuntary movement?";
            nextAnswers = ["Yes", "No"];
        } else if (req.body.answer === "One or both arms ROTATE") {
            nextQuestion = "";
            nextAnswers = ["LEFT", "RIGHT", "BOTH"];
        }
    }
    if (
        req.body.question ===
        "Is the falling accompanied by SHAKING or involuntary movement?"
    ) {
        if (req.body.answer === "Yes") {
            nextQuestion = "";
            nextAnswers = ["LEFT", "RIGHT", "BOTH"];
        } else if (req.body.answer === "No") {
            nextQuestion = "";
            nextAnswers = ["LEFT", "RIGHT", "BOTH"];
        }
    }

    const nextQuery: sendQuery = {
        section: nextSection,
        instructions: nextInstructions,
        question: nextQuestion,
        answers: nextAnswers,
    };

    // console.log(nextQuery);

    res.status(201).json(nextQuery);
});

queryRouter.get("/query/0", (req: Request, res: Response) => {
    const query: sendQuery = {
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
