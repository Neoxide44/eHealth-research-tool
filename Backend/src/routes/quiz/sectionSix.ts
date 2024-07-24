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
    addOutcome2,
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
        answers: [
            "Yes",
            "No;;Participant perceives a DIFFERENCE between left and right, or is UNABLE TO FEEL at least one touch point",
        ],
        imageUrl:
            "https://drive.google.com/file/d/11zAnBMRT-dxo_5xLqEofEIPeGXy8mpG6/view?usp=sharing",
        videoUrl:
            "https://drive.google.com/file/d/1lAcr7X5f4cn9AE-72RfbGyDdg2sqUK0l/view?usp=sharing",
        mc: true,
        title: "Superficial Sensitivity",
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
        instructions:
            "With the participant sitting on a chair, touch simultaneously both sides of their body (left and right), on the following areas:\nFace - forehead, high cheek, around the jaw;\nUpper limbs - forearm;\nLower limbs - thighs and below the knees\nAsk the participant if they feel the touch with the same intensity, comparing left and right.",
        question: "",
        answers: [
            "Less on the LEFT SIDE",
            "Less on the RIGHT SIDE",
            "Nothing on the LEFT SIDE",
            "Nothing on the RIGHT SIDE",
            "Nothing on EITHER SIDE",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Superficial Sensitivity",
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
        instructions:
            "With the participant sitting on a chair, touch simultaneously both sides of their body (left and right), on the following areas:\nFace - forehead, high cheek, around the jaw;\nUpper limbs - forearm;\nLower limbs - thighs and below the knees\nAsk the participant if they feel the touch with the same intensity, comparing left and right.",
        question:
            "Is the participant able to FEEL WITH THE SAME INTENSITY the touch points on both sides of the UPPER LIMBS?",
        answers: [
            "Yes",
            "No;;Participant perceives a DIFFERENCE between left and right on UPPER LIMBS, or is UNABLE TO FEEL at least one touch point",
        ],
        imageUrl:
            "https://drive.google.com/file/d/1uLsqggL2WOlkQE7kzutpKDGvBJ8tFhaC/view?usp=sharing",
        videoUrl: "",
        mc: true,
        title: "Superficial Sensitivity",
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
        instructions:
            "With the participant sitting on a chair, touch simultaneously both sides of their body (left and right), on the following areas:\nFace - forehead, high cheek, around the jaw;\nUpper limbs - forearm;\nLower limbs - thighs and below the knees\nAsk the participant if they feel the touch with the same intensity, comparing left and right.",
        question: "",
        answers: [
            "Less on the LEFT SIDE",
            "Less on the RIGHT SIDE",
            "Nothing on the LEFT SIDE",
            "Nothing on the RIGHT SIDE",
            "Nothing on EITHER SIDE",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Superficial Sensitivity",
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
        instructions:
            "With the participant sitting on a chair, touch simultaneously both sides of their body (left and right), on the following areas:\nFace - forehead, high cheek, around the jaw;\nUpper limbs - forearm;\nLower limbs - thighs and below the knees\nAsk the participant if they feel the touch with the same intensity, comparing left and right.",
        question:
            "Is the participant able to FEEL WITH THE SAME INTENSITY the touch points on both sides of the LOWER LIMBS?",
        answers: [
            "Yes",
            "No;;Participant perceives a DIFFERENCE between left and right on the LOWER LIMBS, or is UNABLE TO FEEL at least one touch point",
        ],
        imageUrl:
            "https://drive.google.com/file/d/1340vj-lf2a0XaeLMdkx4uSuObDE369um/view?usp=sharing",
        videoUrl: "",
        mc: true,
        title: "Superficial Sensitivity",
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

                    if (req.body.answer === "Yes") {
                        nextQuestionID = 1;
                        nextSectionID = "8";
                        addOutcomeForSixTwo(data.uuid, data.section, false);
                    } else if (req.body.answer === "No") {
                        nextQuestionID = 6;
                    }

                    res.status(200).json({
                        nextQuestion: nextQuestionID,
                        nextSection: nextSectionID,
                    });
                }
            );
        }
    );
});

//Section 6 Question 6
sectionSixRouter.get("/6/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "6",
        section: "6",
        instructions:
            "With the participant sitting on a chair, touch simultaneously both sides of their body (left and right), on the following areas:\nFace - forehead, high cheek, around the jaw;\nUpper limbs - forearm;\nLower limbs - thighs and below the knees\nAsk the participant if they feel the touch with the same intensity, comparing left and right.",
        question: "",
        answers: [
            "Less on the LEFT SIDE",
            "Less on the RIGHT SIDE",
            "Nothing on the LEFT SIDE",
            "Nothing on the RIGHT SIDE",
            "Nothing on EITHER SIDE",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Superficial Sensitivity",
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
                    addOutcomeForSixTwo(data.uuid, data.section, true);
                }
            );
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

function addOutcomeForSixTwo(uuid: string, section: string, doSixSix: boolean) {
    pool.query(getAnswer, [uuid, 6, 2], (error, results) => {
        if (error) throw error;
        if (results.rows.length > 0) {
            if (
                results.rows[0].answer.includes("Less on the LEFT SIDE") ||
                results.rows[0].answer.includes("Less on the RIGHT SIDE")
            ) {
                pool.query(
                    addOutcome,
                    [
                        uuid,
                        section,
                        "MILD Superficial Sensitivity Impairment of the FACE" +
                            " - " +
                            results.rows[0].answer,
                    ],
                    (error, results) => {
                        if (error) throw error;
                        addOutcomeForSixFour(uuid, section, doSixSix, true);
                    }
                );
            } else if (
                results.rows[0].answer.includes("Nothing on the LEFT SIDE") ||
                results.rows[0].answer.includes("Nothing on the RIGHT SIDE") ||
                results.rows[0].answer.includes("Nothing on EITHER SIDE")
            ) {
                pool.query(
                    addOutcome,
                    [
                        uuid,
                        section,
                        "MODERATE Superficial Sensitivity Impairment of the FACE" +
                            " - " +
                            results.rows[0].answer,
                    ],
                    (error, results) => {
                        if (error) throw error;
                        addOutcomeForSixFour(uuid, section, doSixSix, true);
                    }
                );
            }
        } else {
            addOutcomeForSixFour(uuid, section, doSixSix, false);
        }
    });
}

function addOutcomeForSixFour(
    uuid: string,
    section: string,
    doSixSix: boolean,
    wasThereATwo: boolean
) {
    pool.query(getAnswer, [uuid, 6, 4], (error, results) => {
        if (error) throw error;

        if (results.rows.length > 0) {
            let query = "";
            if (wasThereATwo) {
                query = appendOutcome;
            } else {
                query = addOutcome2;
            }
            if (
                results.rows[0].answer.includes("Less on the LEFT SIDE") ||
                results.rows[0].answer.includes("Less on the RIGHT SIDE")
            ) {
                pool.query(
                    query,
                    [
                        ", MILD Superficial Sensitivity Impairment of the UL" +
                            " - " +
                            results.rows[0].answer,
                        uuid,
                        section,
                    ],
                    (error, results) => {
                        if (error) throw error;
                        if (doSixSix) addOutcomeForSixSix(uuid, section, true);
                    }
                );
            } else if (
                results.rows[0].answer.includes("Nothing on the LEFT SIDE") ||
                results.rows[0].answer.includes("Nothing on the RIGHT SIDE") ||
                results.rows[0].answer.includes("Nothing on EITHER SIDE")
            ) {
                pool.query(
                    query,
                    [
                        ", MODERATE Superficial Sensitivity Impairment of the UL" +
                            " - " +
                            results.rows[0].answer,
                        uuid,
                        section,
                    ],
                    (error, results) => {
                        if (error) throw error;
                        if (doSixSix) addOutcomeForSixSix(uuid, section, true);
                    }
                );
            }
        } else {
            if (doSixSix) addOutcomeForSixSix(uuid, section, wasThereATwo);
        }
    });
}

function addOutcomeForSixSix(
    uuid: string,
    section: string,
    wasTherePrevious: boolean
) {
    pool.query(getAnswer, [uuid, 6, 6], (error, results) => {
        if (error) throw error;
        if (results.rows.length > 0) {
            let query = "";
            if (wasTherePrevious) {
                query = appendOutcome;
            } else {
                query = addOutcome2;
            }
            if (
                results.rows[0].answer.includes("Less on the LEFT SIDE") ||
                results.rows[0].answer.includes("Less on the RIGHT SIDE")
            ) {
                pool.query(
                    query,
                    [
                        ", MILD Superficial Sensitivity Impairment of the LL" +
                            " - " +
                            results.rows[0].answer,
                        uuid,
                        section,
                    ],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            } else if (
                results.rows[0].answer.includes("Nothing on the LEFT SIDE") ||
                results.rows[0].answer.includes("Nothing on the RIGHT SIDE") ||
                results.rows[0].answer.includes("Nothing on EITHER SIDE")
            ) {
                pool.query(
                    query,
                    [
                        ", MODERATE Superficial Sensitivity Impairment of the LL" +
                            " - " +
                            results.rows[0].answer,
                        uuid,
                        section,
                    ],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        }
    });
}
export default sectionSixRouter;
