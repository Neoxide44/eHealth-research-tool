import { Router, Request, Response } from "express";
import { saveQuery } from "../models/saveQuery";
import { sendQuery } from "../models/sendQuery";
import pool from "../../db";
import { addData } from "../queries";

const sectionNineRouter = Router();

//Section 9 Question 1
sectionNineRouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "9",
        instructions:
            "The instructor explores the extension of the visual field of the participant, by asking them to look at the tip of the instructors' nose, and assessing the limits of the participants' visual field with the hands. Guide your hand in several points from the peripheral to central vision of the participant, and ask them if they are able to see the hand (while still looking at the tip of the nose of the instructor).",
        question: "Is the participant able to SEE with BOTH eyes?",
        answers: ["Yes", "No"],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionNineRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "9";

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

//Section 9 Question 2
sectionNineRouter.get("/2", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "9",
        instructions:
            "The instructor explores the extension of the visual field of the participant, by asking them to look at the tip of the instructors' nose, and assessing the limits of the participants' visual field with the hands. Guide your hand in several points from the peripheral to central vision of the participant, and ask them if they are able to see the hand (while still looking at the tip of the nose of the instructor).",
        question: "",
        answers: [
            "LEFT eye blind or semi-blind",
            "RIGHT eye blind or semi-blind",
            "BOTH eyes blind or semi-blind",
        ],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionNineRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "42";

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

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 9 Question 3
sectionNineRouter.get("/3", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "9",
        instructions:
            "The instructor explores the extension of the visual field of the participant, by asking them to look at the tip of the instructors' nose, and assessing the limits of the participants' visual field with the hands. Guide your hand in several points from the peripheral to central vision of the participant, and ask them if they are able to see the hand (while still looking at the tip of the nose of the instructor).",
        question:
            "Is the participant ABLE to DETECT HAND in ALL POSITIONS (QUADRANTS)",
        answers: ["Yes", "No"],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionNineRouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "9";

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
        nextSectionID = "10";
    } else if (req.body.answer === "No") {
        nextQuestionID = 4;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 9 Question 4
sectionNineRouter.get("/4", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "9",
        instructions:
            "The instructor explores the extension of the visual field of the participant, by asking them to look at the tip of the instructors' nose, and assessing the limits of the participants' visual field with the hands. Guide your hand in several points from the peripheral to central vision of the participant, and ask them if they are able to see the hand (while still looking at the tip of the nose of the instructor).",
        question:
            "HERE THE INSTRUCTOR SELECTS THE QUADRANTS IN WHICH THE PARTICIPANT CANNOT DETECT THE HAND",
        answers: [
            "LEFT eye - TOP LEFT",
            "LEFT eye - TOP RIGHT",
            "LEFT eye - BOTTOM LEFT",
            "LEFT eye - BOTTOM RIGHT",
            "RIGHT eye - TOP LEFT",
            "RIGHT eye - TOP RIGHT",
            "RIGHT eye - BOTTOM LEFT",
            "RIGHT eye - BOTTOM RIGHT",
        ],
        imageUrl: "https://wiki.dave.eu/images/4/47/Placeholder.png",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionNineRouter.post("/4", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "10";

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

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default sectionNineRouter;
