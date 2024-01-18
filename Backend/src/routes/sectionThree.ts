import { Router, Request, Response } from "express";
import { saveQuery } from "../models/saveQuery";
import { sendQuery } from "../models/sendQuery";
import pool from "../../db";
import { addData } from "../queries";
import { addOutcome } from "../queries";

const sectionThreeRouter = Router();

//Section 3 Question 1
sectionThreeRouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "3",
        instructions:
            "Ask the participant to consecutively sit and stand up from a chair, without holding on.\n Repeat three times in a row.",
        question:
            "Is the participant able to PERFORM Sitting & Standing without any difficulty?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://iris.hattiesburgclinic.com/patadv/exkit/Body%20Mechanics/Images/0040000025mov006.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionThreeRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "3";

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
        nextSectionID = "4";
    } else if (req.body.answer === "No") {
        nextQuestionID = 2;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 3 Question 2
sectionThreeRouter.get("/2", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "3",
        instructions:
            "Ask the participant to consecutively sit and stand up from a chair, without holding on.\n Repeat three times in a row.",
        question: "",
        answers: [
            "MISSING limb or UNABLE to move for non-neurological reasons",
            "UNABLE, even with help",
            "ABLE only with HELP",
            "ABLE without HELP, but with DIFFICULTY",
        ],
        imageUrl:
            "https://iris.hattiesburgclinic.com/patadv/exkit/Body%20Mechanics/Images/0040000025mov006.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionThreeRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "3";

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
        req.body.answer ===
        "MISSING limb or UNABLE to move for non-neurological reasons"
    ) {
        nextQuestionID = 3;
    } else if (req.body.answer === "UNABLE, even with help") {
        nextQuestionID = 1;
        nextSectionID = "5";
        pool.query(
            addOutcome,
            [data.uuid, data.section, "SEVERE LL Strength Impairment"],
            (error, results) => {
                if (error) throw error;
            }
        );
    } else if (req.body.answer === "ABLE only with HELP") {
        nextQuestionID = 1;
        nextSectionID = "4";
        pool.query(
            addOutcome,
            [data.uuid, data.section, "MODERATE LL Strength Impairment"],
            (error, results) => {
                if (error) throw error;
            }
        );
    } else if (req.body.answer === "ABLE without HELP, but with DIFFICULTY") {
        nextQuestionID = 1;
        nextSectionID = "4";
        pool.query(
            addOutcome,
            [data.uuid, data.section, "MILD LL Strength Impairment"],
            (error, results) => {
                if (error) throw error;
            }
        );
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 3 Question 3
sectionThreeRouter.get("/3", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "3",
        instructions:
            "Ask the participant to consecutively sit and stand up from a chair, without holding on.\n Repeat three times in a row.",
        question: "",
        answers: [
            "LEFT MISSING",
            "LEFT UNABLE TO MOVE",
            "RIGHT MISSING",
            "RIGHT UNABLE TO MOVE",
            "BOTH MISSING",
            "BOTH UNABLE TO MOVE",
        ],
        imageUrl:
            "https://iris.hattiesburgclinic.com/patadv/exkit/Body%20Mechanics/Images/0040000025mov006.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionThreeRouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "5";

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
        [
            data.uuid,
            data.section,
            "MISSING LL or UNABLE to move for non-neurological reasons",
        ],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default sectionThreeRouter;
