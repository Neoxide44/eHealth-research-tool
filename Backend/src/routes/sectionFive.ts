import { Router, Request, Response } from "express";
import { saveQuery } from "../models/saveQuery";
import { sendQuery } from "../models/sendQuery";
import pool from "../../db";
import { addData } from "../queries";

const sectionFiveRouter = Router();

//Section 5 Question 1
sectionFiveRouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "5",
        instructions: "The MMSE test thingy ",
        question: "Placeholder for now",
        answers: ["Idk", "Maybe"],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "6";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: req.body.answer,
    };

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default sectionFiveRouter;
