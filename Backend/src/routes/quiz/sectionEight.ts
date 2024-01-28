import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData } from "../../queries";
import { addOutcome } from "../../queries";

const sectionEightRouter = Router();

//Section 8 Question 1
sectionEightRouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "8",
        instructions:
            "Participant closes eyes with force for a few seconds. Then, participant smiles with teeth showing.",
        question:
            "Is the participant showing ASYMMETRY in the EYES, MOUTH, or BOTH?",
        answers: ["Yes", "No"],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionEightRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
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

    if (req.body.answer === "Yes") {
        nextQuestionID = 2;
    } else if (req.body.answer === "No") {
        nextQuestionID = 1;
        nextSectionID = "9";
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 8 Question 2
sectionEightRouter.get("/2", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "8",
        instructions:
            "Participant closes eyes with force for a few seconds. Then, participant smiles with teeth showing.",
        question: "",
        answers: [
            "Participant shows ASYMMETRY in the MOUTH",
            "Participant shows ASYMMETRY in both the MOUTH and EYEBROWS",
        ],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionEightRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 0;
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

    if (req.body.answer === "Participant shows ASYMMETRY in the MOUTH") {
        nextQuestionID = 1;
        nextSectionID = "9";
        pool.query(
            addOutcome,
            [data.uuid, data.section, "MILD STRENGTH IMPAIRMENT"],
            (error, results) => {
                if (error) throw error;
            }
        );
    } else if (
        req.body.answer ===
        "Participant shows ASYMMETRY in both the MOUTH and EYEBROWS"
    ) {
        nextQuestionID = 3;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 8 Question 3
sectionEightRouter.get("/3", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "8",
        instructions:
            "Participant closes eyes with force for a few seconds. Then, participant smiles with teeth showing.",
        question: "",
        answers: ["LEFT eye blink impaired", "RIGHT eye blink impaired"],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionEightRouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "9";

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

    pool.query(
        addOutcome,
        [data.uuid, data.section, "FACIAL NERVE PARALYSIS (PERIPHERAL)"],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default sectionEightRouter;
