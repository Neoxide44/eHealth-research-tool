import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData, addOutcome } from "../../queries";

const sectionFourRouter = Router();

//Section 4 Question 1
sectionFourRouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "4",
        instructions:
            "Ask the participant to walk in a straight line for 10 steps, stop, then turn around and come back, first on toes and then on heels.",
        question:
            "Is the participant able to WALK ON A LINE, including on TIPTOES, HEELS, and TURNING AROUND?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/1mFOhc12mjfX2rwAIyr1QmkvAeBJXllfW/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionFourRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "4";

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
        nextSectionID = "5";
    } else if (req.body.answer === "No") {
        nextQuestionID = 2;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 4 Question 2
sectionFourRouter.get("/2", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "4",
        instructions:
            "Ask the participant to walk in a straight line for 10 steps, stop, then turn around and come back, first on toes and then on heels.",
        question: "",
        answers: [
            "Participant is UNABLE to walk on TIPTOES for more than 5 steps",
            "Participant is UNABLE to walk on HEELS for more than 5 steps",
            "Participant is UNABLE to TURN smoothly",
            "Participant is UNABLE to WALK ON A LINE",
        ],
        imageUrl:
            "https://drive.google.com/file/d/1mFOhc12mjfX2rwAIyr1QmkvAeBJXllfW/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionFourRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "1b";
    let outcome = "";

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

    if (
        req.body.answer.includes("Participant is UNABLE to WALK ON A LINE") &&
        (req.body.answer.length === 1 ||
            (req.body.answer.includes(
                "Participant is UNABLE to TURN smoothly"
            ) &&
                req.body.answer.length === 2))
    ) {
        nextQuestionID = 1;
        nextSectionID = "7b";
    } else if (
        req.body.answer.includes("Participant is UNABLE to TURN smoothly") &&
        req.body.answer.length === 1
    ) {
        nextQuestionID = 1;
        nextSectionID = "5";
    }
    if (
        req.body.answer.includes(
            "Participant is UNABLE to walk on TIPTOES for more than 5 steps"
        ) ||
        req.body.answer.includes(
            "Participant is UNABLE to walk on HEELS for more than 5 steps"
        )
    ) {
        outcome += "'MILD LL Strength Impairment'";
    }

    if (req.body.answer.includes("Participant is UNABLE to TURN smoothly")) {
        outcome += "'Extrapyramidal sign /Parkinsonian sign'";
    }
    if (req.body.answer.includes("Participant is UNABLE to WALK ON A LINE")) {
        outcome += "'MODERATE LL Coordination Impairment'";
    }

    pool.query(
        addOutcome,
        [data.uuid, data.section, outcome],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default sectionFourRouter;
