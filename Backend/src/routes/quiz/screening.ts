import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData, deleteOneData } from "../../queries";
import { addOutcome, deleteOutcome } from "../../queries";

const screeningQuestionsRouter = Router();

//Section 9 Question 1
screeningQuestionsRouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "screening_questions",
        instructions: "",
        question:
            "Does the participant have any vision impairment that is not corrected by wearing glasses or contact lenses?",
        answers: ["Yes", "No"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "VISION/SIGHT",
    };

    res.status(200).json(nextQuery);
});

screeningQuestionsRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 2;
    let nextSectionID = "screening_questions";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: req.body.answer,
    };
    pool.query(
        deleteOneData,
        [data.uuid, data.section, data.q_id],
        (error, results) => {
            if (error) throw error;
            pool.query(
                addData,
                [
                    data.uuid,
                    data.section,
                    data.q_id,
                    data.question,
                    data.answer,
                ],
                (error, results) => {
                    if (error) throw error;
                }
            );
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 9 Question 2
screeningQuestionsRouter.get("/2/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "screening_questions",
        instructions: "",
        question:
            "Does the participant have any hearing impairment that is not corrected by hearing aids?",
        answers: ["Yes", "No"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "HEARING",
    };

    res.status(200).json(nextQuery);
});

screeningQuestionsRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "1a";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: req.body.answer,
    };
    pool.query(
        deleteOneData,
        [data.uuid, data.section, data.q_id],
        (error, results) => {
            if (error) throw error;
            pool.query(
                addData,
                [
                    data.uuid,
                    data.section,
                    data.q_id,
                    data.question,
                    data.answer,
                ],
                (error, results) => {
                    if (error) throw error;
                }
            );
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default screeningQuestionsRouter;
