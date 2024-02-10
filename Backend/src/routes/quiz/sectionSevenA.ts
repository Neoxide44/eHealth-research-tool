import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData } from "../../queries";
import { addOutcome } from "../../queries";

const sectionSevenARouter = Router();

//Section 7a Question 1
sectionSevenARouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "7a",
        instructions:
            "With the participants' eyes closed, touch one of their FINGERS and ask which part of their body is being touched. Move the finger up or down. Then ask if the finger is being moved up or down.",
        question:
            "Is the participant able to CORRECTLY IDENTIFY the FINGER and DIRECTION?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
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
        addData,
        [data.uuid, data.section, data.q_id, data.question, data.answer],
        (error, results) => {
            if (error) throw error;
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
sectionSevenARouter.get("/2", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "7a",
        instructions:
            "With the participants' eyes closed, touch one of their FINGERS and ask which part of their body is being touched. Move the finger up or down. Then ask if the finger is being moved up or down.",
        question: "",
        answers: [
            "Participant is ABLE to IDENTIFY the FINGER but NOT the DIRECTION",
            "Participant is ABLE to IDENTIFY the DIRECTION but NOT the FINGER",
            "Participant is UNABLE to IDENTIFY EITHER the FINGER and DIRECTION",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
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
        addData,
        [data.uuid, data.section, data.q_id, data.question, data.answer],
        (error, results) => {
            if (error) throw error;
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
        "Participant is UNABLE to IDENTIFY EITHER the FINGER and DIRECTION"
    ) {
        nextQuestionID = 5;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 7a Question 3
sectionSevenARouter.get("/3", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "7a",
        instructions:
            "With the participants' eyes closed, touch one of their FINGERS and ask which part of their body is being touched. Move the finger up or down. Then ask if the finger is being moved up or down.",
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
        addData,
        [data.uuid, data.section, data.q_id, data.question, data.answer],
        (error, results) => {
            if (error) throw error;
        }
    );

    pool.query(
        addOutcome,
        [data.uuid, data.section, "UL PROPRIOCEPTION IMPAIRED"],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 7a Question 4
sectionSevenARouter.get("/4", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "7a",
        instructions:
            "With the participants' eyes closed, touch one of their FINGERS and ask which part of their body is being touched. Move the finger up or down. Then ask if the finger is being moved up or down.",
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
        addData,
        [data.uuid, data.section, data.q_id, data.question, data.answer],
        (error, results) => {
            if (error) throw error;
        }
    );
    pool.query(
        addOutcome,
        [data.uuid, data.section, "UL SUPERFICIAL SENSITIVITY IMPAIRED"],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 7a Question 5
sectionSevenARouter.get("/5", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "7a",
        instructions:
            "With the participants' eyes closed, touch one of their FINGERS and ask which part of their body is being touched. Move the finger up or down. Then ask if the finger is being moved up or down.",
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
            "UL SUPERFICIAL SENSITIVITY + PROPRIOCEPTION IMPAIRED",
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

export default sectionSevenARouter;
