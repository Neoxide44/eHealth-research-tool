import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData, deleteOneData } from "../../queries";
import { addOutcome, deleteOutcome } from "../../queries";
import { addMissingQuestions } from "../../utils/addEmptyQuestion";

const sectionOneARouter = Router();
let queries: saveQuery[] = [];

//Question 1
sectionOneARouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. If the participant reaches the position, ask them to maintain that position for five seconds.",
        question: "Is the participant able to REACH the position?",
        answers: ["Yes", "No"],
        title: "Mingazzini - Upper Limb",
        imageUrl:
            "https://drive.google.com/file/d/1qleMiqwuxRjDUPk6V46PWqrJL3BvmCJB/view?usp=sharing",
        videoUrl:
            "https://drive.google.com/file/d/1lYYrH4Je306A6ej1EAOuvpzifyowkuqH/view?usp=sharing",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
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

    if (req.body.answer === "No") {
        nextQuestionID = 2;
    } else if (req.body.answer === "Yes") {
        nextQuestionID = 3;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Question 2

sectionOneARouter.get("/2/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. If the participant reaches the position, ask them to maintain that position for five seconds.",
        question: "",
        answers: [
            "One or both arms are MISSING or UNABLE to move for known non-neurological reasons.;;The most common know non-neurological reasons are: \narthritis, \nprevious traumatic injury, \npain",
            "One or both arms are UNABLE to REACH the position.",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 0;
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

    if (
        req.body.answer ===
        "One or both arms are MISSING or UNABLE to move for known non-neurological reasons."
    ) {
        nextQuestionID = 4;
    } else if (
        req.body.answer === "One or both arms are UNABLE to REACH the position."
    ) {
        nextQuestionID = 5;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Question 3

sectionOneARouter.get("/3/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. If the participant reaches the position, ask them to maintain that position for five seconds.",
        question:
            "Is the participant able to HOLD STEADILY the position for at least 5 seconds?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/1vF4TzKgVP4mwGm1YmezGBeRGQ0pLt7kv/view?usp=sharing",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 0;
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

    if (req.body.answer === "Yes") {
        nextQuestionID = 1;
        nextSectionID = "2";
        // addMissingQuestions(
        //     data.uuid,
        //     data.section,
        //     [2, 4, 5, 7, 8, 6, 9, 10, 11, 12],
        //     [
        //         "",
        //         "",
        //         "Is the inability to reach the position accompanied by ARM SHAKING or OSCILLATIONS?",
        //         "",
        //         "",
        //         "",
        //         "Is the falling accompanied by ARM SHAKING or OSCILLATIONS?",
        //         "",
        //         "",
        //         "",
        //     ]
        // );
    } else if (req.body.answer === "No") {
        nextQuestionID = 6;
    }
    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Question 4
sectionOneARouter.get("/4/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. If the participant reaches the position, ask them to maintain that position for five seconds.",
        question: "",
        answers: [
            "LEFT ARM MISSING",
            "LEFT ARM UNABLE TO MOVE",
            "RIGHT ARM MISSING",
            "RIGHT ARM UNABLE TO MOVE",
            "BOTH ARMS MISSING",
            "BOTH ARMS UNABLE TO MOVE",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/4", (req: Request, res: Response) => {
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
                "MISSING UL or UNABLE to move for non-neurological reasons" +
                    " - " +
                    data.answer,
            ],
            (error, results) => {
                if (error) throw error;
            }
        );
    });

    // addMissingQuestions(
    //     data.uuid,
    //     data.section,
    //     [5, 7, 8, 6, 9, 10, 11, 12, 3],
    //     [
    //         "Is the inability to reach the position accompanied by ARM SHAKING or OSCILLATIONS?",
    //         "",
    //         "",
    //         "",
    //         "Is the falling accompanied by ARM SHAKING or OSCILLATIONS?",
    //         "",
    //         "",
    //         "",
    //         "Is the participant able to HOLD STEADILY the position for at least 5 seconds?",
    //     ]
    // );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Question 5
sectionOneARouter.get("/5/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. If the participant reaches the position, ask them to maintain that position for five seconds.",
        question:
            "Is the inability to reach the position accompanied by ARM SHAKING or OSCILLATIONS?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/1mxqXdotPlGUmtcF93tXcQ2T8PE33HtvE/view?usp=sharing",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/5", (req: Request, res: Response) => {
    let nextQuestionID = 0;
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

//Question 6
sectionOneARouter.get("/6/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "6",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. If the participant reaches the position, ask them to maintain that position for five seconds.",
        question: "",
        answers: [
            "One or both arms FALL DOWN within 5 seconds;https://drive.google.com/file/d/1f1UKI1oOqKcZbIp9tsRqlyRnvda6vQx3/view?usp=sharing;",
            "One or both arms ROTATE (pronate);https://drive.google.com/file/d/174oLsdObQ0LVyTtP_51hMNwI1JTUIfe1/view?usp=sharing;",
        ],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/6", (req: Request, res: Response) => {
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
    if (req.body.answer === "One or both arms FALL DOWN within 5 seconds") {
        nextQuestionID = 9;
    } else if (req.body.answer === "One or both arms ROTATE (pronate)") {
        nextQuestionID = 12;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Question 7
sectionOneARouter.get("/7/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. If the participant reaches the position, ask them to maintain that position for five seconds.",
        question: "",
        answers: ["LEFT ARM", "RIGHT ARM", "BOTH ARMS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/7", (req: Request, res: Response) => {
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
                "SEVERE UL Strength Impairment with Extrapyramidal Signs" +
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

//Question 8
sectionOneARouter.get("/8/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. If the participant reaches the position, ask them to maintain that position for five seconds.",
        question: "",
        answers: ["LEFT ARM", "RIGHT ARM", "BOTH ARMS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/8", (req: Request, res: Response) => {
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
                "SEVERE UL Strength Impairment " + " - " + data.answer,
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

sectionOneARouter.get("/9/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "9",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. If the participant reaches the position, ask them to maintain that position for five seconds.",
        question: "Is the falling accompanied by ARM SHAKING or OSCILLATIONS?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/1RTt99UMFcD_1Szs2YO4Y_Y6BpXnhxeL5/view?usp=sharing",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/9", (req: Request, res: Response) => {
    let nextQuestionID = 0;
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

    if (req.body.answer === "Yes") {
        nextQuestionID = 10;
    } else if (req.body.answer === "No") {
        nextQuestionID = 11;
    }
    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

sectionOneARouter.get("/10/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "10",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. If the participant reaches the position, ask them to maintain that position for five seconds.",
        question: "",
        answers: ["LEFT ARM", "RIGHT ARM", "BOTH ARMS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/10", (req: Request, res: Response) => {
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
                "MODERATE UL Strength Impairment with Extrapyramidal Signs" +
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

sectionOneARouter.get("/11/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "11",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. If the participant reaches the position, ask them to maintain that position for five seconds.",
        question: "",
        answers: ["LEFT ARM", "RIGHT ARM", "BOTH ARMS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/11", (req: Request, res: Response) => {
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
                "MODERATE UL Strength Impairment" + " - " + data.answer,
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

sectionOneARouter.get("/12/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "12",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. If the participant reaches the position, ask them to maintain that position for five seconds.",
        question: "",
        answers: ["LEFT ARM", "RIGHT ARM", "BOTH ARMS"],
        imageUrl: "",
        videoUrl: "",
        mc: true,
        title: "Mingazzini - Upper Limb",
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/12", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "2";

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
                "MILD UL Strength Impairment" + " - " + data.answer,
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

export default sectionOneARouter;
