import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData } from "../../queries";
import { getAnswer } from "../../queries";
import { addOutcome } from "../../queries";

const sectionFiveRouter = Router();

// Section 5 Question 1
sectionFiveRouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "5",
        instructions:
            "Ask the participant to answer each question and for each one he answers correctly check the answer.",
        question: "What is the",
        answers: ["Year", "Season", "Day of the week", "Month", "Date"],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 2;
    let nextSectionID = "5";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: String(req.body.answer.length),
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

// Section 5 Question 2
sectionFiveRouter.get("/2", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "5",
        instructions:
            "Ask the participant to answer each question and for each one he answers correctly check the answer.",
        question: "Where are we now?",
        answers: [
            "State",
            "County",
            " Town/city",
            "Building/Facility",
            "Floor",
        ],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 3;
    let nextSectionID = "5";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: String(req.body.answer.length),
    };
    pool.query(
        getAnswer,
        [data.uuid, data.section, data.q_id - 1],
        (error, results) => {
            if (error) throw error;
            data.answer = String(
                parseInt(data.answer) + parseInt(results.rows[0].answer)
            );

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

// Section 5 Question 3
sectionFiveRouter.get("/3", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "5",
        instructions:
            "Ask the participant to answer each question and for each one he answers correctly check the answer.",
        question:
            "Name 3 unrelated objects, ask subject to recite them now and remember them for later. E.g.",
        answers: ["Apple", "Table", "Penny"],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 4;
    let nextSectionID = "5";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: String(req.body.answer.length),
    };

    pool.query(
        getAnswer,
        [data.uuid, data.section, data.q_id - 1],
        (error, results) => {
            if (error) throw error;
            data.answer = String(
                parseInt(data.answer) + parseInt(results.rows[0].answer)
            );

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

// Section 5 Question 4
sectionFiveRouter.get("/4", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "5",
        instructions:
            "Ask the participant to answer each question and for each one he answers correctly check the answer.",
        question: "Count backward from 100 by sevens",
        answers: ["93", "86", "79", "72", "65"],
        imageUrl: "https://mmse.neurol.ru/img/sevens.jpg",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.post("/4", (req: Request, res: Response) => {
    let nextQuestionID = 5;
    let nextSectionID = "5";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: String(req.body.answer.length),
    };

    pool.query(
        getAnswer,
        [data.uuid, data.section, data.q_id - 1],
        (error, results) => {
            if (error) throw error;
            data.answer = String(
                parseInt(data.answer) + parseInt(results.rows[0].answer)
            );

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

// Section 5 Question 5
sectionFiveRouter.get("/5", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "5",
        instructions:
            "Ask the participant to answer each question and for each one he answers correctly check the answer.",
        question: "Name the three things asked to remember earlier. E.g.",
        answers: ["Apple", "Table", "Penny"],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.post("/5", (req: Request, res: Response) => {
    let nextQuestionID = 6;
    let nextSectionID = "5";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: String(req.body.answer.length),
    };

    pool.query(
        getAnswer,
        [data.uuid, data.section, data.q_id - 1],
        (error, results) => {
            if (error) throw error;
            data.answer = String(
                parseInt(data.answer) + parseInt(results.rows[0].answer)
            );

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

// Section 5 Question 6
sectionFiveRouter.get("/6", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "6",
        section: "5",
        instructions:
            "Ask the participant to answer each question and for each one he answers correctly check the answer.",
        question: "Name objects shown to patient:",
        answers: ["Wristwatch", "Pen or pencil"],
        imageUrl:
            "https://www.movadocompanystore.com/dw/image/v2/BDKZ_PRD/on/demandware.static/-/Sites-mgi-master/default/dwb9f20471/images/products/1570078w_LRG_rgb_Profile.jpg?sw=700&sh=700",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.post("/6", (req: Request, res: Response) => {
    let nextQuestionID = 7;
    let nextSectionID = "5";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: String(req.body.answer.length),
    };

    pool.query(
        getAnswer,
        [data.uuid, data.section, data.q_id - 1],
        (error, results) => {
            if (error) throw error;
            data.answer = String(
                parseInt(data.answer) + parseInt(results.rows[0].answer)
            );

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

// Section 5 Question 7
sectionFiveRouter.get("/7", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "5",
        instructions:
            "Ask the participant to answer each question and for each one he answers correctly check the answer.",
        question: "Repeat the phrase:",
        answers: ["'No ifs, ands, or buts.'"],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.post("/7", (req: Request, res: Response) => {
    let nextQuestionID = 8;
    let nextSectionID = "5";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: String(req.body.answer.length),
    };

    pool.query(
        getAnswer,
        [data.uuid, data.section, data.q_id - 1],
        (error, results) => {
            if (error) throw error;
            data.answer = String(
                parseInt(data.answer) + parseInt(results.rows[0].answer)
            );

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

// Section 5 Question 8
sectionFiveRouter.get("/8", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "5",
        instructions:
            "Ask the participant to answer each question and for each one he answers correctly check the answer.",
        question: "Follow these instructions:",
        answers: [
            "Take the paper in your right hand,",
            "fold it in half,",
            "and put it on the floor.",
        ],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.post("/8", (req: Request, res: Response) => {
    let nextQuestionID = 9;
    let nextSectionID = "5";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: String(req.body.answer.length),
    };

    pool.query(
        getAnswer,
        [data.uuid, data.section, data.q_id - 1],
        (error, results) => {
            if (error) throw error;
            data.answer = String(
                parseInt(data.answer) + parseInt(results.rows[0].answer)
            );

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

// Section 5 Question 9
sectionFiveRouter.get("/9", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "9",
        section: "5",
        instructions:
            "Ask the participant to answer each question and for each one he answers correctly check the answer.",
        question: "Read and follow the instructions:",
        answers: ["Close your eyes"],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.post("/9", (req: Request, res: Response) => {
    let nextQuestionID = 10;
    let nextSectionID = "5";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: String(req.body.answer.length),
    };

    pool.query(
        getAnswer,
        [data.uuid, data.section, data.q_id - 1],
        (error, results) => {
            if (error) throw error;
            data.answer = String(
                parseInt(data.answer) + parseInt(results.rows[0].answer)
            );

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

// Section 5 Question 10
sectionFiveRouter.get("/10", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "10",
        section: "5",
        instructions:
            "Ask the participant to answer each question and for each one he answers correctly check the answer.",
        question:
            "Make up and write a sentence about anything, which contains a noun and a verb:",
        answers: ["Sentence acceptable"],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.post("/10", (req: Request, res: Response) => {
    let nextQuestionID = 11;
    let nextSectionID = "5";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: String(req.body.answer.length),
    };

    pool.query(
        getAnswer,
        [data.uuid, data.section, data.q_id - 1],
        (error, results) => {
            if (error) throw error;
            data.answer = String(
                parseInt(data.answer) + parseInt(results.rows[0].answer)
            );

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

// Section 5 Question 11
sectionFiveRouter.get("/11", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "11",
        section: "5",
        instructions:
            "Ask the participant to answer each question and for each one he answers correctly check the answer.",
        question:
            "Please copy this picture (intersecting pentagons with a four-sided intersection, click on camera above too see the image):",
        answers: ["Picture acceptable"],
        imageUrl: "https://mmse.neurol.ru/img/mmse_pentagons.svg",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.post("/11", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "6";

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: String(req.body.answer.length),
    };

    pool.query(
        getAnswer,
        [data.uuid, data.section, data.q_id - 1],
        (error, results) => {
            if (error) throw error;
            data.answer = String(
                parseInt(data.answer) + parseInt(results.rows[0].answer)
            );

            console.log(data.answer);

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
            pool.query(
                addOutcome,
                [data.uuid, data.section, "MILD COGNITIVE IMPAIRMENT"],
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

export default sectionFiveRouter;
