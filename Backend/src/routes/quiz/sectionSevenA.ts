import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData, deleteOneData } from "../../queries";
import { addOutcome, deleteOutcome } from "../../queries";

const sectionSevenARouter = Router();

//Section 7a Question 1
sectionSevenARouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "7a",
        instructions:
            "With the participant sitting on a chair with eyes closed, grab one of their wrists and touch its index finger, asking which part of their body is being touched.\nMove the finger up, then ask in which direction the finger is being moved (up or down?).",
        question:
            "Is the participant able to CORRECTLY IDENTIFY the FINGER being touched and the DIRECTION of movement?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/12lZJH3WJhH4PVCqlNn1SmVkBr0sdmEn3/view?usp=sharing",
        videoUrl:
            "https://drive.google.com/file/d/1lKSBbD3Bk2OWvcYMfHVQv9idmcvvv9Bl/view?usp=sharing",
        mc: true,
        title: "Deep Sensetivity - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionSevenARouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "7a";

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
        nextSectionID = "3";
    } else if (req.body.answer === "No") {
        nextQuestionID = 2;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 7a Question 2
sectionSevenARouter.get("/2/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "7a",
        instructions:
            "With the participant sitting on a chair with eyes closed, grab one of their wrists and touch its index finger, asking which part of their body is being touched.\nMove the finger up, then ask in which direction the finger is being moved (up or down?).",
        question: "",
        answers: [
            "Participant is ABLE to IDENTIFY the FINGER but NOT the DIRECTION",
            "Participant is ABLE to IDENTIFY the DIRECTION but NOT the FINGER",
            "Participant is UNABLE to IDENTIFY BOTH FINGER and DIRECTION",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Deep Sensetivity - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionSevenARouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "7a";

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
        "Participant is ABLE to IDENTIFY the FINGER but NOT the DIRECTION"
    ) {
        nextQuestionID = 3;
    } else if (
        req.body.answer ===
        "Participant is ABLE to IDENTIFY the DIRECTION but NOT the FINGER"
    ) {
        nextQuestionID = 4;
    } else if (
        req.body.answer ===
        "Participant is UNABLE to IDENTIFY BOTH FINGER and DIRECTION"
    ) {
        nextQuestionID = 5;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 7a Question 3
sectionSevenARouter.get("/3/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "7a",
        instructions:
            "With the participant sitting on a chair with eyes closed, grab one of their wrists and touch its index finger, asking which part of their body is being touched.\nMove the finger up, then ask in which direction the finger is being moved (up or down?).",
        question: "",
        answers: ["LEFT FINGER", "RIGHT FINGER", "BOTH FINGERS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Deep Sensetivity - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionSevenARouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 1;
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

    pool.query(deleteOutcome, [data.uuid, data.section], (error, results) => {
        if (error) throw error;
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "UL Deep Sensitivity Impairment" + " - " + data.answer,
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

//Section 7a Question 4
sectionSevenARouter.get("/4/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "7a",
        instructions:
            "With the participant sitting on a chair with eyes closed, grab one of their wrists and touch its index finger, asking which part of their body is being touched.\nMove the finger up, then ask in which direction the finger is being moved (up or down?).",
        question: "",
        answers: ["LEFT FINGER", "RIGHT FINGER", "BOTH FINGERS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Deep Sensetivity - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionSevenARouter.post("/4", (req: Request, res: Response) => {
    let nextQuestionID = 1;
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

    pool.query(deleteOutcome, [data.uuid, data.section], (error, results) => {
        if (error) throw error;
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "UL Superficial Sensitivity Impairment" + " - " + data.answer,
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

//Section 7a Question 5
sectionSevenARouter.get("/5/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "7a",
        instructions:
            "With the participant sitting on a chair with eyes closed, grab one of their wrists and touch its index finger, asking which part of their body is being touched.\nMove the finger up, then ask in which direction the finger is being moved (up or down?).",
        question: "",
        answers: ["LEFT FINGER", "RIGHT FINGER", "BOTH FINGERS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Deep Sensetivity - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionSevenARouter.post("/5", (req: Request, res: Response) => {
    let nextQuestionID = 1;
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

    pool.query(deleteOutcome, [data.uuid, data.section], (error, results) => {
        if (error) throw error;
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "UL Superficial + Deep Sensitivity Impairment" +
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

export default sectionSevenARouter;
