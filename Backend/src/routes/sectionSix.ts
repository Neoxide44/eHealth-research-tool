import { Router, Request, Response } from "express";
import { saveQuery } from "../models/saveQuery";
import { sendQuery } from "../models/sendQuery";
import pool from "../../db";
import { addData } from "../queries";
import { check4BImpaired } from "../queries";

const sectionSixRouter = Router();

//Section 6 Question 1
sectionSixRouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "6",
        instructions:
            "Touch and pinch several parts (face, upper limbs, lower limbs) of both sides of the body of the participant with a cotton piece or toothpick.\n Ask the participant if they feel it with the same intensity.",
        question:
            "Is the participant able feel the touch points on both sides of the same district, and with the same intensity? ",
        answers: ["Yes", "No"],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionSixRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "6";

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

    if (req.body.answer === "Yes") {
        nextQuestionID = 1;
        nextSectionID = "8";
    } else if (req.body.answer === "No") {
        nextQuestionID = 2;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 6 Question 2
sectionSixRouter.get("/2", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "6",
        instructions:
            "Touch and pinch several parts (face, upper limbs, lower limbs) of both sides of the body of the participant with a cotton piece or toothpick.\n Ask the participant if they feel it with the same intensity.",
        question: "",
        answers: [
            "Participant perceives a DIFFERENCE between left and right on the FACE, or is UNABLE to feel any touch points",
            "Participant perceives a DIFFERENCE between left and right on UPPER LIMBS, or is UNABLE to feel any touch points",
            "Participant perceives a DIFFERENCE between left and right on the LOWER LIMBS, or is UNABLE to feel any touch points",
        ],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionSixRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 3;
    let nextSectionID = "6";

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

//Section 6 Question 3
sectionSixRouter.get("/3", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "6",
        instructions:
            "Touch and pinch several parts (face, upper limbs, lower limbs) of both sides of the body of the participant with a cotton piece or toothpick.\n Ask the participant if they feel it with the same intensity.",
        question: "",
        answers: [
            "Less on the LEFT",
            "Less on the RIGHT",
            "Nothing on the LEFT",
            "Nothing on the RIGHT",
            "Perceives nothing on EITHER SIDE",
        ],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionSixRouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "8";

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

export default sectionSixRouter;