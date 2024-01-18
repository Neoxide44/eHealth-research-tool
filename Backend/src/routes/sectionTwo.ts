import { Router, Request, Response } from "express";
import { saveQuery } from "../models/saveQuery";
import { sendQuery } from "../models/sendQuery";
import pool from "../../db";
import { addData } from "../queries";
import { addOutcome } from "../queries";

const sectionTwoRouter = Router();

//Section 2 Question 1
sectionTwoRouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "2",
        instructions:
            "With participant standing, ask them to, first with eyes opened and then closed, touch the tip of their nose with both index fingers, at least 10 times (5 with each hand).",
        question:
            "Is the participant able to perform Nose-Index with EYES OPEN?",
        answers: ["Yes", "No"],
        imageUrl: "https://o.quizlet.com/pPCaA2OxawH.7NFDEQ17cw.jpg",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "2";

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
        nextQuestionID = 3;
    } else if (req.body.answer === "No") {
        nextQuestionID = 2;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 2 Question 2
sectionTwoRouter.get("/2", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "2",
        instructions:
            "With participant standing, ask them to, first with eyes opened and then closed, touch the tip of their nose with both index fingers, at least 10 times (5 with each hand).",
        question: "",
        answers: [
            "Participant is  UNABLE to REACH nose with one or both hands",
            "Participant STRUGGLES to REACH nose with one or both hands",
        ],
        imageUrl: "https://o.quizlet.com/pPCaA2OxawH.7NFDEQ17cw.jpg",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "2";

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
        "Participant is  UNABLE to REACH nose with one or both hands"
    ) {
        nextQuestionID = 4;
    } else if (
        req.body.answer ===
        "Participant STRUGGLES to REACH nose with one or both hands"
    ) {
        nextQuestionID = 5;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 2 Question 3
sectionTwoRouter.get("/3", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "2",
        instructions:
            "With participant standing, ask them to, first with eyes opened and then closed, touch the tip of their nose with both index fingers, at least 10 times (5 with each hand).",
        question:
            "Is the participant able to perform Nose-Index with EYES CLOSED?",
        answers: ["Yes", "No"],
        imageUrl: "https://o.quizlet.com/pPCaA2OxawH.7NFDEQ17cw.jpg",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "2";

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
        nextQuestionID = 6;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 2 Question 4
sectionTwoRouter.get("/4", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "2",
        instructions:
            "With participant standing, ask them to, first with eyes opened and then closed, touch the tip of their nose with both index fingers, at least 10 times (5 with each hand).",
        question: "",
        answers: ["Left", "Right", "Both"],
        imageUrl: "https://o.quizlet.com/pPCaA2OxawH.7NFDEQ17cw.jpg",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/4", (req: Request, res: Response) => {
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
        [data.uuid, data.section, "SEVERE UL Coordination Impairment"],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 2 Question 5
sectionTwoRouter.get("/5", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "2",
        instructions:
            "With participant standing, ask them to, first with eyes opened and then closed, touch the tip of their nose with both index fingers, at least 10 times (5 with each hand).",
        question: "",
        answers: ["Left", "Right", "Both"],
        imageUrl: "https://o.quizlet.com/pPCaA2OxawH.7NFDEQ17cw.jpg",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/5", (req: Request, res: Response) => {
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
        [data.uuid, data.section, "MILD UL Coordination Impairment"],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 2 Question 6
sectionTwoRouter.get("/6", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "6",
        section: "2",
        instructions:
            "With participant standing, ask them to, first with eyes opened and then closed, touch the tip of their nose with both index fingers, at least 10 times (5 with each hand).",
        question: "",
        answers: [
            "Participant is UNABLE to REACH nose with one or both hands",
            "Participant STRUGGLES to REACH nose with one or both hands",
        ],
        imageUrl: "https://o.quizlet.com/pPCaA2OxawH.7NFDEQ17cw.jpg",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/6", (req: Request, res: Response) => {
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
        addData,
        [data.uuid, data.section, data.q_id, data.question, data.answer],
        (error, results) => {
            if (error) throw error;
        }
    );

    if (
        req.body.answer ===
        "Participant is UNABLE to REACH nose with one or both hands"
    ) {
        nextQuestionID = 7;
    } else if (
        req.body.answer ===
        "Participant STRUGGLES to REACH nose with one or both hands"
    ) {
        nextQuestionID = 8;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 2 Question 7
sectionTwoRouter.get("/7", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "2",
        instructions:
            "With participant standing, ask them to, first with eyes opened and then closed, touch the tip of their nose with both index fingers, at least 10 times (5 with each hand).",
        question: "",
        answers: ["Left", "Right", "Both"],
        imageUrl: "https://o.quizlet.com/pPCaA2OxawH.7NFDEQ17cw.jpg",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/7", (req: Request, res: Response) => {
    let nextQuestionID = 1;
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
    pool.query(
        addOutcome,
        [
            data.uuid,
            data.section,
            "POTENTIAL MODERATE UL Proprioception Impairment",
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

//Section 2 Question 8
sectionTwoRouter.get("/8", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "2",
        instructions:
            "With participant standing, ask them to, first with eyes opened and then closed, touch the tip of their nose with both index fingers, at least 10 times (5 with each hand).",
        question: "",
        answers: ["Left", "Right", "Both"],
        imageUrl: "https://o.quizlet.com/pPCaA2OxawH.7NFDEQ17cw.jpg",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionTwoRouter.post("/8", (req: Request, res: Response) => {
    let nextQuestionID = 1;
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

    pool.query(
        addOutcome,
        [data.uuid, data.section, "POTENTIAL MILD UL Proprioception Impairmen"],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default sectionTwoRouter;
