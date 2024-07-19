import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData, deleteOneData } from "../../queries";
import { addOutcome, deleteOutcome } from "../../queries";

const sectionThreeRouter = Router();

//Section 3 Question 1
sectionThreeRouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "3",
        instructions:
            "Ask the participant to consecutively sit and stand up from a chair with their arms crossed on their chest and without holding on.\nIf possible, count how many times the participant can perform this properly in 30 seconds.",
        question:
            "Is the participant able to perform the chair-stand test WITHOUT ANY DIFFICULTY?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/11_EuUt5eb9gA2QZSvD3TRoqMJUmtPQ90/preview",
        videoUrl:
            "https://drive.google.com/file/d/1naAwRwy_3WmfY2rrgx-mV3Dk1lZ13tbq/preview",
        mc: true,
        title: "30-Second Chair Stand Test",
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
sectionThreeRouter.get("/2/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "3",
        instructions:
            "Ask the participant to consecutively sit and stand up from a chair with their arms crossed on their chest and without holding on.\nIf possible, count how many times the participant can perform this properly in 30 seconds.",
        question: "",
        answers: [
            "MISSING limb or UNABLE to move for non-neurological reasons",
            "UNABLE, even with help",
            "ABLE only with HELP",
            "ABLE without HELP, but with DIFFICULTY",
        ],
        imageUrl: "",
        videoUrl:
            "https://drive.google.com/file/d/1naAwRwy_3WmfY2rrgx-mV3Dk1lZ13tbq/preview",
        mc: true,
        title: "30-Second Chair Stand Test",
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

    if (
        req.body.answer ===
        "MISSING limb or UNABLE to move for non-neurological reasons"
    ) {
        nextQuestionID = 3;
    } else if (req.body.answer === "UNABLE, even with help") {
        nextQuestionID = 1;
        nextSectionID = "5";
        pool.query(
            deleteOutcome,
            [data.uuid, data.section],
            (error, results) => {
                if (error) throw error;
                pool.query(
                    addOutcome,
                    [
                        data.uuid,
                        data.section,
                        "SEVERE LL Strength Impairment" + " - " + data.answer,
                    ],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        );
    } else if (req.body.answer === "ABLE only with HELP") {
        nextQuestionID = 1;
        nextSectionID = "4";
        pool.query(
            deleteOutcome,
            [data.uuid, data.section],
            (error, results) => {
                if (error) throw error;
                pool.query(
                    addOutcome,
                    [
                        data.uuid,
                        data.section,
                        "MODERATE LL Strength Impairment" + " - " + data.answer,
                    ],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        );
    } else if (req.body.answer === "ABLE without HELP, but with DIFFICULTY") {
        nextQuestionID = 1;
        nextSectionID = "4";
        pool.query(
            deleteOutcome,
            [data.uuid, data.section],
            (error, results) => {
                if (error) throw error;
                pool.query(
                    addOutcome,
                    [
                        data.uuid,
                        data.section,
                        "MILD LL Strength Impairment" + " - " + data.answer,
                    ],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        );
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 3 Question 3
sectionThreeRouter.get("/3/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "3",
        instructions:
            "Ask the participant to consecutively sit and stand up from a chair with their arms crossed on their chest and without holding on.\nIf possible, count how many times the participant can perform this properly in 30 seconds.",
        question: "",
        answers: [
            "LEFT LEG MISSING",
            "LEFT LEG UNABLE TO MOVE",
            "RIGHT LEG MISSING",
            "RIGHT LEG UNABLE TO MOVE",
            "BOTH LEGS MISSING",
            "BOTH LEGS UNABLE TO MOVE",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "30-Second Chair Stand Test",
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

    pool.query(deleteOutcome, [data.uuid, data.section], (error, results) => {
        if (error) throw error;
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "MISSING LL or UNABLE to move for non-neurological reasons" +
                    " - " +
                    data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    });

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default sectionThreeRouter;
