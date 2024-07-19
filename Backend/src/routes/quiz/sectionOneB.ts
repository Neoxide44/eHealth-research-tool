import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData, deleteOneData } from "../../queries";
import { getAnswer } from "../../queries";
import { addOutcome, deleteOutcome } from "../../queries";

const sectionOneBRouter = Router();

//Section 1b Question 1
sectionOneBRouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "1b",
        instructions:
            "Ask the participant to sit down on the edge of a chair and raise both of their legs at waist level, stretching them forward.\nThe participant can hold on to the chair with their hands and lean back.\nAsk the participant to stay in that position for five seconds.",
        question:
            "Is the participant able to REACH the position with both legs?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/1F4U7v-Jy9PwjhLPOso1PFiEsp2LawY8-/preview",
        videoUrl:
            "https://drive.google.com/file/d/1YuVAWmMXpJ3jtiYlCQqwW4Zv_65By_Zn/preview",
        mc: true,
        title: "Mingazzini - Lower Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneBRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1b";
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

//Section 1b Question 2
sectionOneBRouter.get("/2/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "1b",
        instructions: "",
        question:
            "Is the  inability to reach position accompanied by LEG SHAKING or OSCILLATIONS?",
        answers: ["Yes", "No"],
        imageUrl: "",
        videoUrl:
            "https://drive.google.com/file/d/1YuVAWmMXpJ3jtiYlCQqwW4Zv_65By_Zn/preview",
        mc: true,
        title: "Mingazzini - Lower Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneBRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1b";
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
        nextQuestionID = 4;
    } else if (req.body.answer === "No") {
        nextQuestionID = 5;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 1b Question 3
sectionOneBRouter.get("/3/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "1b",
        instructions: "",
        question:
            "Is the participant able to HOLD STEADILY the position with both legs for at least 5 seconds?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/1F4U7v-Jy9PwjhLPOso1PFiEsp2LawY8-/preview",
        videoUrl:
            "https://drive.google.com/file/d/1YuVAWmMXpJ3jtiYlCQqwW4Zv_65By_Zn/preview",
        mc: true,
        title: "Mingazzini - Lower Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneBRouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1b";
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
        nextSectionID = "5";
    } else if (req.body.answer === "No") {
        nextQuestionID = 6;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 1b Question 4
sectionOneBRouter.get("/4/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "1b",
        instructions: "",
        question: "",
        answers: ["LEFT LEG", "RIGHT LEG", "BOTH LEGS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Lower Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneBRouter.post("/4", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1b";
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
    let check = false;

    pool.query(getAnswer, [data.uuid, "4", 2], (error, results) => {
        if (error) throw error;

        check = results.rows[0].answer.includes(
            "Participant is UNABLE to WALK IN A STRAIGHT LINE for 5 steps"
        );
        if (check) {
            nextQuestionID = 1;
            nextSectionID = "7b";
        } else if (!check) {
            nextQuestionID = 1;
            nextSectionID = "5";
        }

        res.status(200).json({
            nextQuestion: nextQuestionID,
            nextSection: nextSectionID,
        });
    });

    pool.query(
        addOutcome,
        [
            data.uuid,
            data.section,
            "SEVERE LL Strength Impairment with Extrapyramidal Signs" +
                " - " +
                data.answer,
        ],
        (error, results) => {
            if (error) throw error;
        }
    );
});

//Section 1b Question 5
sectionOneBRouter.get("/5/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "1b",
        instructions: "",
        question: "",
        answers: ["LEFT LEG", "RIGHT LEG", "BOTH LEGS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Lower Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneBRouter.post("/5", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1b";
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
    let check = false;

    pool.query(getAnswer, [data.uuid, "4", 2], (error, results) => {
        if (error) throw error;

        check = results.rows[0].answer.includes(
            "Participant is UNABLE to WALK IN A STRAIGHT LINE for 5 steps"
        );
        if (check) {
            nextQuestionID = 1;
            nextSectionID = "7b";
        } else if (!check) {
            nextQuestionID = 1;
            nextSectionID = "5";
        }

        res.status(200).json({
            nextQuestion: nextQuestionID,
            nextSection: nextSectionID,
        });
    });

    pool.query(deleteOutcome, [data.uuid, data.section], (error, results) => {
        if (error) throw error;
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "SEVERE LL Strength Impairmen" + " - " + data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    });
});

//Section 1b Question 6
sectionOneBRouter.get("/6/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "6",
        section: "1b",
        instructions: "",
        question: "Is the falling accompanied by LEG SHAKING or OSCILLATIONS?",
        answers: ["Yes", "No"],
        imageUrl: "",
        videoUrl:
            "https://drive.google.com/file/d/1YuVAWmMXpJ3jtiYlCQqwW4Zv_65By_Zn/preview",
        mc: true,
        title: "Mingazzini - Lower Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneBRouter.post("/6", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1b";
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
        nextQuestionID = 7;
    } else if (req.body.answer === "No") {
        nextQuestionID = 8;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 1b Question 7
sectionOneBRouter.get("/7/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "1b",
        instructions: "",
        question: "",
        answers: ["LEFT LEG", "RIGHT LEG", "BOTH LEGS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Lower Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneBRouter.post("/7", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1b";
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
    let check = false;

    pool.query(getAnswer, [data.uuid, "4", 2], (error, results) => {
        if (error) throw error;
        check = results.rows[0].answer.includes(
            "Participant is UNABLE to WALK IN A STRAIGHT LINE for 5 steps"
        );
        if (check) {
            nextQuestionID = 1;
            nextSectionID = "7b";
        } else if (!check) {
            nextQuestionID = 1;
            nextSectionID = "5";
        }

        res.status(200).json({
            nextQuestion: nextQuestionID,
            nextSection: nextSectionID,
        });
    });

    pool.query(deleteOutcome, [data.uuid, data.section], (error, results) => {
        if (error) throw error;
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "MODERATE LL Strength Impairment with Extrapyramidal Signs" +
                    " - " +
                    data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    });
});

//Section 1b Question 8
sectionOneBRouter.get("/8/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "1b",
        instructions: "",
        question: "",
        answers: ["LEFT LEG", "RIGHT LEG", "BOTH LEGS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Lower Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneBRouter.post("/8", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1b";
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
    let check = false;

    pool.query(getAnswer, [data.uuid, "4", 2], (error, results) => {
        if (error) throw error;
        check = results.rows[0].answer.includes(
            "Participant is UNABLE to WALK IN A STRAIGHT LINE for 5 steps"
        );
        if (check) {
            nextQuestionID = 1;
            nextSectionID = "7b";
        } else if (!check) {
            nextQuestionID = 1;
            nextSectionID = "5";
        }

        res.status(200).json({
            nextQuestion: nextQuestionID,
            nextSection: nextSectionID,
        });
    });

    pool.query(deleteOutcome, [data.uuid, data.section], (error, results) => {
        if (error) throw error;
        pool.query(
            addOutcome,
            [
                data.uuid,
                data.section,
                "MODERATE UL Strength Impairment" + " - " + data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    });
});

export default sectionOneBRouter;
