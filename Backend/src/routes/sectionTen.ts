import { Router, Request, Response } from "express";
import { saveQuery } from "../models/saveQuery";
import { sendQuery } from "../models/sendQuery";
import pool from "../../db";
import { addData } from "../queries";

const sectionTenRouter = Router();

//Section 10 Question 1
sectionTenRouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "10",
        instructions:
            "The participant follows the instructors' fingers with their eyes. The instructor asks them to follow their finger to the left, to the right, upwards and downwards.",
        question:
            "Are the eyes of the participant following the finger SYMMETRICALLY?",
        answers: ["Yes", "No"],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionTenRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "42";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: req.body.answer,
    };
    pool.query(
        addData,
        [data.uuid, data.section, data.q_id, data.question, data.answer],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default sectionTenRouter;
