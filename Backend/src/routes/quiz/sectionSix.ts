import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import {
    addData,
    addOutcome,
    appendOutcome,
    getAnswer,
    deleteOneData,
} from "../../queries";

const sectionSixRouter = Router();

//Section 6 Question 1
sectionSixRouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "6",
        instructions:
            "With the participant sitting on a chair, touch simultaneously both sides of their body (left and right), on the following areas:\nFace - forehead, high cheek, around the jaw;\nUpper limbs - forearm;\nLower limbs - thighs and below the knees\nAsk the participant if they feel the touch with the same intensity, comparing left and right.",
        question:
            "Is the participant able to FEEL WITH THE SAME INTENSITY the touch points on both sides of the FACE?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
        title: "Superficial Sensetivity",
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
        nextQuestionID = 3;
    } else if (req.body.answer === "No") {
        nextQuestionID = 2;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 6 Question 2
sectionSixRouter.get("/2/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "6",
        instructions: "",
        question: "",
        answers: [
            "Less on the LEFT SIDE",
            "Less on the RIGHT SIDE",
            "Nothing on the LEFT SIDE",
            "Nothing on the RIGHT SIDE",
            "Perceives nothing on EITHER SIDE",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: false,
        title: "Superficial Sensetivity",
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
        data.answer === "Less on the LEFT SIDE" ||
        data.answer === "Less on the RIGHT SIDE"
    ) {
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "MILD Superficial Sensitivity Impairment of the FACE" +
                    " - " +
                    data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    } else {
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "MODERATE Superficial Sensitivity Impairment of the FACE" +
                    " - " +
                    data.answer,
            ],
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

//Section 6 Question 3
sectionSixRouter.get("/3/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "6",
        instructions: "",
        question:
            "Is the participant able to FEEL WITH THE SAME INTENSITY the touch points on both sides of the UPPER LIMBS?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
        title: "Superficial Sensetivity",
    };

    res.status(200).json(nextQuery);
});

sectionSixRouter.post("/3", (req: Request, res: Response) => {
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
        nextQuestionID = 5;
    } else if (req.body.answer === "No") {
        nextQuestionID = 4;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 6 Question 4
sectionSixRouter.get("/4/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "6",
        instructions: "",
        question: "",
        answers: [
            "Less on the LEFT SIDE",
            "Less on the RIGHT SIDE",
            "Nothing on the LEFT SIDE",
            "Nothing on the RIGHT SIDE",
            "Perceives nothing on EITHER SIDE",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: false,
        title: "Superficial Sensetivity",
    };

    res.status(200).json(nextQuery);
});

sectionSixRouter.post("/4", (req: Request, res: Response) => {
    let nextQuestionID = 5;
    let nextSectionID = "6";

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
        data.answer === "Less on the LEFT SIDE" ||
        data.answer === "Less on the RIGHT SIDE"
    ) {
        pool.query(
            appendOutcome,
            [
                ", MILD Superficial Sensitivity Impairment of the UL" +
                    " - " +
                    data.answer,
                data.uuid,
                data.section,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    } else {
        pool.query(
            appendOutcome,
            [
                ", MODERATE Superficial Sensitivity Impairment of the UL" +
                    " - " +
                    data.answer,
                data.uuid,
                data.section,
            ],
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

//Section 6 Question 5
sectionSixRouter.get("/5/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "6",
        instructions: "",
        question:
            "Is the participant able to FEEL WITH THE SAME INTENSITY the touch points on both sides of the LOWER LIMBS?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
        title: "Superficial Sensetivity",
    };

    res.status(200).json(nextQuery);
});

sectionSixRouter.post("/5", (req: Request, res: Response) => {
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
        nextSectionID = "8";
    } else if (req.body.answer === "No") {
        nextQuestionID = 6;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 6 Question 6
sectionSixRouter.get("/6/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "6",
        section: "6",
        instructions: "",
        question: "",
        answers: [
            "Less on the LEFT SIDE",
            "Less on the RIGHT SIDE",
            "Nothing on the LEFT SIDE",
            "Nothing on the RIGHT SIDE",
            "Perceives nothing on EITHER SIDE",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: false,
        title: "Superficial Sensetivity",
    };

    res.status(200).json(nextQuery);
});

sectionSixRouter.post("/6", (req: Request, res: Response) => {
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
        data.answer === "Less on the LEFT SIDE" ||
        data.answer === "Less on the RIGHT SIDE"
    ) {
        pool.query(
            appendOutcome,
            [
                ", MILD Superficial Sensitivity Impairment of the LL" +
                    " - " +
                    data.answer,
                data.uuid,
                data.section,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    } else {
        pool.query(
            appendOutcome,
            [
                ", MODERATE Superficial Sensitivity Impairment of the LL" +
                    " - " +
                    data.answer,
                data.uuid,
                data.section,
            ],
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

export default sectionSixRouter;
