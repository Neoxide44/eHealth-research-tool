import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData } from "../../queries";
import { addOutcome } from "../../queries";

const sectionSevenBRouter = Router();

//Section 7b Question 1
sectionSevenBRouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "7b",
        instructions:
            "With the participants' eyes closed, touch their BIG TOE and ask if a part of their body is being touched. If the answer is yes, further ask which one. Move the toe slightly up and down. Then ask if the toe is being moved and ask in which direction.",
        question:
            "Is the participant able CORRECTLY IDENTIFY the TOE and DIRECTION?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionSevenBRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "7b";

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
        nextSectionID = "5";
    } else if (req.body.answer === "No") {
        nextQuestionID = 2;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 7b Question 2
sectionSevenBRouter.get("/2", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "7b",
        instructions:
            "With the participants' eyes closed, touch their BIG TOE and ask if a part of their body is being touched. If the answer is yes, further ask which one. Move the toe slightly up and down. Then ask if the toe is being moved and ask in which direction.",
        question: "",
        answers: [
            "Participant is ABLE to IDENTIFY the TOE but NOT the DIRECTION",
            "Participant is ABLE to IDENTIFY the DIRECTION but NOT the TOE",
            "Participant is UNABLE to IDENTIFY BOTH the TOE and DIRECTION",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionSevenBRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "7b";

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
        "Participant is ABLE to IDENTIFY the TOE but NOT the DIRECTION"
    ) {
        nextQuestionID = 3;
    } else if (
        req.body.answer ===
        "Participant is ABLE to IDENTIFY the DIRECTION but NOT the TOE"
    ) {
        nextQuestionID = 4;
    } else if (
        req.body.answer ===
        "Participant is UNABLE to IDENTIFY BOTH the TOE and DIRECTION"
    ) {
        nextQuestionID = 5;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 7b Question 3
sectionSevenBRouter.get("/3", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "7b",
        instructions:
            "With the participants' eyes closed, touch their BIG TOE and ask if a part of their body is being touched. If the answer is yes, further ask which one. Move the toe slightly up and down. Then ask if the toe is being moved and ask in which direction.",
        question: "",
        answers: ["LEFT", "RIGHT", "BOTH"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionSevenBRouter.post("/3", (req: Request, res: Response) => {
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
        [data.uuid, data.section, "LL DEEP SENSITIVITY IMPAIRED"],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 7b Question 4
sectionSevenBRouter.get("/4", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "7b",
        instructions:
            "With the participants' eyes closed, touch their BIG TOE and ask if a part of their body is being touched. If the answer is yes, further ask which one. Move the toe slightly up and down. Then ask if the toe is being moved and ask in which direction.",
        question: "",
        answers: ["LEFT", "RIGHT", "BOTH"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionSevenBRouter.post("/4", (req: Request, res: Response) => {
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
        [data.uuid, data.section, "LL SUPERFICIAL SENSITIVITY IMPAIRED"],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 7b Question 5
sectionSevenBRouter.get("/5", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "7b",
        instructions:
            "With the participants' eyes closed, touch their BIG TOE and ask if a part of their body is being touched. If the answer is yes, further ask which one. Move the toe slightly up and down. Then ask if the toe is being moved and ask in which direction.",
        question: "",
        answers: ["LEFT", "RIGHT", "BOTH"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionSevenBRouter.post("/5", (req: Request, res: Response) => {
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
        [data.uuid, data.section, "LL SUPERFICIAL + DEEP SENSITIVITY IMPAIRED"],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default sectionSevenBRouter;
