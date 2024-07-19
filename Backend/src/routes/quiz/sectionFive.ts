import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData, deleteOneData } from "../../queries";
import { getAnswer } from "../../queries";
import { addOutcome, deleteOutcome } from "../../queries";

const sectionFiveRouter = Router();

//Need to make seperate endpoints for each l;anguage for question 3, 5, 7, 8, 9

// Section 5 Question 1
sectionFiveRouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "5",
        instructions:
            "Ask the participant the following questions.\nOnly tick the boxes when the participant answers correctly.",
        question: "Does the participant answer correctly on WHAT IS THE...",
        answers: [
            "Current YEAR?",
            "Current SEASON?",
            "Day of the week",
            "Current MONTH?",
            "Today's DATE?",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
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

// Section 5 Question 2
sectionFiveRouter.get("/2/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "5",
        instructions:
            "Ask the participant to answer each question and for each one he answers correctly check the answer.",
        question: "Does the participant answer correctly on WHAT IS THE...",
        answers: [
            "COUNTRY we are in?",
            "DISTRICT/PROVINCE we are in?",
            "TOWN/CITY we are in?",
            "FACILITY we are in?",
            "FLOOR we are in?",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
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
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

// Section 5 Question 3
sectionFiveRouter.get("/3/English", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "5",
        instructions:
            "Ask the participant to repeat back three words (APPLE, TABLE, PENNY), and remember them for later.",
        question: "Does the participant repeat correctly...",
        answers: ["The word APPLE?", "The word TABLE?", "The word PENNY?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/3/Italian", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "5",
        instructions:
            "Ask the participant to repeat back three words (CASA, PANE, GATTO), and remember them for later.",
        question: "Does the participant repeat correctly...",
        answers: ["The word CASA?", "The word PANE?", "The word GATTO?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/3/Spanish", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "5",
        instructions:
            "Ask the participant to repeat back three words (BICICLETA, CUCHARA, MANZANA), and remember them for later.",
        question: "Does the participant repeat correctly...",
        answers: [
            "The word BICICLETA?",
            "The word CUCHARA?",
            "The word MANZANA?",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/3/French", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "5",
        instructions:
            "Ask the participant to repeat back three words (CIGARE, FLEUR, PORTE), and remember them for later.",
        question: "Does the participant repeat correctly...",
        answers: ["The word CIGARE?", "The word FLEUR?", "The word PORTE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/3/Portuguese", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "5",
        instructions:
            "Ask the participant to repeat back three words (PÊRA, GATO, BOLA), and remember them for later.",
        question: "Does the participant repeat correctly...",
        answers: ["The word PÊRA?", "The word GATO?", "The word BOLA?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/3/Dutch", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "5",
        instructions:
            "Ask the participant to repeat back three words (APPEL, SLEUTEL, TAFEL), and remember them for later.",
        question: "Does the participant repeat correctly...",
        answers: ["The word APPEL?", "The word SLEUTEL?", "The word TAFEL?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/3/Indonesian", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "5",
        instructions:
            "Ask the participant to repeat back three words (JERUK, UANG, MAWAR), and remember them for later.",
        question: "Does the participant repeat correctly...",
        answers: ["The word JERUK?", "The word UANG?", "The word MAWAR?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/3/Turkish", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "5",
        instructions:
            "Ask the participant to repeat back three words (MASA, BAYRAK, ELBISE), and remember them for later.",
        question: "Does the participant repeat correctly...",
        answers: ["The word MASA?", "The word BAYRAK?", "The word ELBISE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/3/Chinese", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "5",
        instructions:
            "Ask the participant to repeat back three words (皮球 - BALL, 国旗- NATIONAL FLAG, 树木 - TREE), and remember them for later.",
        question: "Does the participant repeat correctly...",
        answers: ["The word 皮球?", "The word 国旗?", "The word 树木?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
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
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

// Section 5 Question 4
sectionFiveRouter.get("/4/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "5",
        instructions:
            "Ask the participant to count backward from 100 by sevens.",
        question: "Does the participant count correctly...",
        answers: ["93", "86", "79", "72", "65"],
        imageUrl:
            "https://drive.google.com/file/d/1Lzo3xzcZjLIGHNuBnca-4l49oB_BnLWW/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
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
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

// Section 5 Question 5
sectionFiveRouter.get("/5/English", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "5",
        instructions:
            "Ask the participant to repeat back the three previous words (APPLE, TABLE, PENNY).",
        question: "Does the participant remember correctly...",
        answers: ["The word APPLE?", "The word TABLE?", "The word PENNY?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

// Section 5 Question 5
sectionFiveRouter.get("/5/Italian", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "5",
        instructions:
            "Ask the participant to repeat back the three previous words (CASA, PANE, GATTO).",
        question: "Does the participant remember correctly...",
        answers: ["The word CASA?", "The word PANE?", "The word GATTO?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/5/Spanish", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "5",
        instructions:
            "Ask the participant to repeat back the three previous words (BICICLETA, CUCHARA, MANZANA).",
        question: "Does the participant remember correctly...",
        answers: [
            "The word BICICLETA?",
            "The word CUCHARA?",
            "The word MANZANA?",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/5/French", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "5",
        instructions:
            "Ask the participant to repeat back the three previous words (CIGARE, FLEUR, PORTE).",
        question: "Does the participant remember correctly...",
        answers: ["The word CIGARE?", "The word FLEUR?", "The word PORTE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/5/Portuguese", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "5",
        instructions:
            "Ask the participant to repeat back the three previous words (PÊRA, GATO, BOLA).",
        question: "Does the participant remember correctly...",
        answers: ["The word PÊRA?", "The word GATO?", "The word BOLA?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/5/Dutch", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "5",
        instructions:
            "Ask the participant to repeat back the three previous words (APPEL, SLEUTEL, TAFEL).",
        question: "Does the participant remember correctly...",
        answers: ["The word APPEL?", "The word SLEUTEL?", "The word TAFEL?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/5/Indonesian", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "5",
        instructions:
            "Ask the participant to repeat back the three previous words (JERUK, UANG, MAWAR).",
        question: "Does the participant remember correctly...",
        answers: ["The word JERUK?", "The word UANG?", "The word MAWAR?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/5/Turkish", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "5",
        instructions:
            "Ask the participant to repeat back the three previous words (MASA, BAYRAK, ELBISE).",
        question: "Does the participant remember correctly...",
        answers: ["The word MASA?", "The word BAYRAK?", "The word ELBISE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/5/Chinese", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "5",
        instructions:
            "Ask the participant to repeat back the three previous words (皮球 - BALL, 国旗- NATIONAL FLAG, 树木 - TREE).",
        question: "Does the participant remember correctly...",
        answers: ["The word 皮球?", "The word 国旗?", "The word 树木?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
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
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

// Section 5 Question 6
sectionFiveRouter.get("/6/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "6",
        section: "5",
        instructions:
            "Ask the participant to name the objects shown in the pictures.",
        question: "Does the participant name correctly...",
        answers: ["The WRISTWATCH?", "The PENCIL?"],
        imageUrl:
            "https://drive.google.com/file/d/1XD9rkCs6Q4Y3xS3u-PQ-8jDqrPEjyY5J/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
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
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

// Section 5 Question 7
sectionFiveRouter.get("/7/English", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "5",
        instructions:
            "Ask the participant to repeat back the phrase 'NO IFS, AND OR BUTS.'",
        question: "Does the participant repeat correctly...",
        answers: ["The FULL SENTENCE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/7/Italian", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "5",
        instructions:
            "Ask the participant to repeat back the phrase 'TIGRE CONTRO TIGRE.'",
        question: "Does the participant repeat correctly...",
        answers: ["The FULL SENTENCE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/7/Spanish", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "5",
        instructions:
            "Ask the participant to repeat back the phrase 'NI SÍ, NI NO, NI PEROS.'",
        question: "Does the participant repeat correctly...",
        answers: ["The FULL SENTENCE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/7/French", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "5",
        instructions:
            "Ask the participant to repeat back the phrase 'PAS DE MAIS, DE SI, NI DE ET.'",
        question: "Does the participant repeat correctly...",
        answers: ["The FULL SENTENCE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/7/Portuguese", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "5",
        instructions:
            "Ask the participant to repeat back the phrase 'O RATO ROEU A ROLHA.'",
        question: "Does the participant repeat correctly...",
        answers: ["The FULL SENTENCE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/7/Dutch", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "5",
        instructions:
            "Ask the participant to repeat back the phrase 'NU EENS DIT EN DAN WEER DAT.'",
        question: "Does the participant repeat correctly...",
        answers: ["The FULL SENTENCE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/7/Indonesian", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "5",
        instructions:
            "Ask the participant to repeat back the phrase 'TANPA KALAU DAN ATAU TETAPI.'",
        question: "Does the participant repeat correctly...",
        answers: ["The FULL SENTENCE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/7/Turkish", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "5",
        instructions:
            "Ask the participant to repeat back the phrase 'EĞER VE FAKAT ISTEMIYORUM.'",
        question: "Does the participant repeat correctly...",
        answers: ["The FULL SENTENCE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/7/Chinese", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "5",
        instructions:
            "Ask the participant to repeat back the phrase '大家齐心协力拉紧绳.' (everyone works together to tighten the rope)",
        question: "Does the participant repeat correctly...",
        answers: ["The FULL SENTENCE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
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
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

// Section 5 Question 8
sectionFiveRouter.get("/8/English", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "5",
        instructions:
            "Ask the participant to follow verbal instructions while handing them a sheet of paper.",
        question: "Does the participant follow correctly...",
        answers: [
            "The FIRST INSTRUCTION? ('Take this sheet of paper in your right hand')",
            "The SECOND INSTRUCTION? ('Fold the paper in half')",
            "The THIRD INSTRUCTION? ('Put the paper on the floor')",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/8/Italian", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "5",
        instructions:
            "Ask the participant to follow verbal instructions while handing them a sheet of paper.",
        question: "Does the participant follow correctly...",
        answers: [
            "The FIRST INSTRUCTION? ('Prenda un foglio con la mano destra') - Take the sheet of paper with your right hand",
            "The SECOND INSTRUCTION? ('Lo pieghi a metà') - Fold the paper in half",
            "The THIRD INSTRUCTION? ('Lo butti dal tavolo') - Throw it off the table",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/8/Spanish", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "5",
        instructions:
            "Ask the participant to follow verbal instructions while handing them a sheet of paper.",
        question: "Does the participant follow correctly...",
        answers: [
            "The FIRST INSTRUCTION? ('Coja este papel con la mano derecha') - Take the sheet of paper with your right hand",
            "The SECOND INSTRUCTION? ('Doblelo por la mitad') - Fold the paper in half",
            "The THIRD INSTRUCTION? ('Y déjelo en el suelo') - Put it on the floor",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/8/French", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "5",
        instructions:
            "Ask the participant to follow verbal instructions while handing them a sheet of paper.",
        question: "Does the participant follow correctly...",
        answers: [
            "The FIRST INSTRUCTION? ('Prenez cette feuille de papier avec la main droite') - Take the sheet of paper with your right hand",
            "The SECOND INSTRUCTION? ('Pliez-la en deux') - Fold the paper in half",
            "The THIRD INSTRUCTION? ('Et jetez-la par terre') - Throw it on the floor",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/8/Portuguese", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "5",
        instructions:
            "Ask the participant to follow verbal instructions while handing them a sheet of paper.",
        question: "Does the participant follow correctly...",
        answers: [
            "The FIRST INSTRUCTION? ('Quando eu lhe der esta folha de papel, pegue nela com a mão direita') - Take the sheet of paper with your right hand",
            "The SECOND INSTRUCTION? ('Dobre-a ao meio') - Fold the paper in half",
            "The THIRD INSTRUCTION? ('E ponha sobre a mesa') - Put it on the table",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/8/Dutch", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "5",
        instructions:
            "Ask the participant to follow verbal instructions while handing them a sheet of paper.",
        question: "Does the participant follow correctly...",
        answers: [
            "The FIRST INSTRUCTION? ('Wilt u dit papiertje pakken met uw rechterhand') - Take the sheet of paper with your right hand",
            "The SECOND INSTRUCTION? ('Het dubbelvouwen') - Fold the paper in half",
            "The THIRD INSTRUCTION? ('En het op uw schoot leggen') - Put it on your lap",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/8/Indonesian", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "5",
        instructions:
            "Ask the participant to follow verbal instructions while handing them a sheet of paper.",
        question: "Does the participant follow correctly...",
        answers: [
            "The FIRST INSTRUCTION? ('Quando eu lhe der esta folha de papel, pegue nela com a mão direita') - Take the sheet of paper with your right hand",
            "The SECOND INSTRUCTION? ('Dobre-a ao meio') - Fold the paper in half",
            "The THIRD INSTRUCTION? ('E ponha sobre a mesa') - Put it on the table",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/8/Turkish", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "5",
        instructions:
            "Ask the participant to follow verbal instructions while handing them a sheet of paper.",
        question: "Does the participant follow correctly...",
        answers: [
            "The FIRST INSTRUCTION? ('Masada duran kâğıdı elinizle alın' - Take the sheet of paper with your hand",
            "The SECOND INSTRUCTION? ('Iki elinizle ikiye katlayın') - Fold the paper in half",
            "The THIRD INSTRUCTION? ('Ve yere birakin lütfen') - Drop it on the ground",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/8/Chinese", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "5",
        instructions:
            "Ask the participant to follow verbal instructions while handing them a sheet of paper.",
        question: "Does the participant follow correctly...",
        answers: [
            "The FIRST INSTRUCTION? ('患者右手拿起纸1') - Take the sheet of paper with your right hand",
            "The SECOND INSTRUCTION? ('患者将纸对折1') - Fold the paper in half",
            "The THIRD INSTRUCTION? ('患者将纸放在左腿上') - Put it on the table",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
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
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

// Section 5 Question 9
sectionFiveRouter.get("/9/English", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "9",
        section: "5",
        instructions:
            "Ask the participant to follow the instruction that will appear on the screen.\n'CLOSE YOUR EYES'",
        question: "Does the participant follow correctly...",
        answers: ["The INSTRUCTION? (By closing their eyes)"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/9/Italian", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "9",
        section: "5",
        instructions:
            "Ask the participant to follow the instruction that will appear on the screen.\n'CHIUDA GLI OCCHI'",
        question: "Does the participant follow correctly...",
        answers: ["The INSTRUCTION? (By closing their eyes)"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/9/Spanish", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "9",
        section: "5",
        instructions:
            "Ask the participant to follow the instruction that will appear on the screen.\n'CIERRE LOS OJOS.'",
        question: "Does the participant follow correctly...",
        answers: ["The INSTRUCTION? (By closing their eyes)"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/9/French", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "9",
        section: "5",
        instructions:
            "Ask the participant to follow the instruction that will appear on the screen.\n'FERMEZ LES YEUX.'",
        question: "Does the participant follow correctly...",
        answers: ["The INSTRUCTION? (By closing their eyes)"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/9/Portuguese", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "9",
        section: "5",
        instructions:
            "Ask the participant to follow the instruction that will appear on the screen.\n'FECHE OS OLHOS.'",
        question: "Does the participant follow correctly...",
        answers: ["The INSTRUCTION? (By closing their eyes)"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/9/Dutch", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "9",
        section: "5",
        instructions:
            "Ask the participant to follow the instruction that will appear on the screen.\n'SLUIT UW OGEN.'",
        question: "Does the participant follow correctly...",
        answers: ["The INSTRUCTION? (By closing their eyes)"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/9/Indonesian", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "9",
        section: "5",
        instructions:
            "Ask the participant to follow the instruction that will appear on the screen.\n'FECHE OS OLHOS.'",
        question: "Does the participant follow correctly...",
        answers: ["The INSTRUCTION? (By closing their eyes)"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/9/Turkish", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "9",
        section: "5",
        instructions:
            "Ask the participant to follow the instruction that will appear on the screen.\n'GÖZLERİNİZİ KAPATIN.'",
        question: "Does the participant follow correctly...",
        answers: ["The INSTRUCTION? (By closing their eyes)"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
    };

    res.status(200).json(nextQuery);
});

sectionFiveRouter.get("/9/Chinese", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "9",
        section: "5",
        instructions:
            "Ask the participant to follow the instruction that will appear on the screen. '请闭上您的眼睛1.' (close your eyes)",
        question: "Does the participant follow correctly...",
        answers: ["The INSTRUCTION? (By closing their eyes)"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
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
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

// Section 5 Question 10
sectionFiveRouter.get("/10/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "10",
        section: "5",
        instructions:
            "Ask the participant to write a sentence about anything, containing a noun and a verb.",
        question: "Does the participant correctly...",
        answers: ["Write the SENTENCE?"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
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
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

// Section 5 Question 11
sectionFiveRouter.get("/11/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "11",
        section: "5",
        instructions:
            "Ask the participant to copy the following picture (intersecting pentagons with a four-sided intersection) to a piece of paper.",
        question: "Does the participant correctly...",
        answers: ["Copy the PICTURE?"],
        imageUrl:
            "https://drive.google.com/file/d/14O2RZ4nz2JSaeswVj8v1Bn7aS7xAInbF/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Mini Mental State Examination",
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
            pool.query(
                deleteOutcome,
                [data.uuid, data.section],
                (error, results) => {
                    if (error) throw error;
                    pool.query(
                        addOutcome,
                        [data.uuid, data.section, "MILD COGNITIVE IMPAIRMENT"],
                        (error, results) => {
                            if (error) throw error;
                        }
                    );
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
