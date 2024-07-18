import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData } from "../../queries";
import { addOutcome } from "../../queries";

const sectionTenRouter = Router();

//Section 10 Question 1
sectionTenRouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "10",
        instructions:
            "The instructor moves their finger to the ceiling, the floor, right and left, asking the participant to follow it with their eyes only, without moving their head.",
        question:
            "Are the eyes of the participant following the finger SYMMETRICALLY?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
        title: "Eye Movement",
    };

    res.status(200).json(nextQuery);
});

sectionTenRouter.post("/1", (req: Request, res: Response) => {
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
    if (req.body.answer === "No") {
        pool.query(
            addOutcome,
            [data.uuid, data.section, "IMPAIRED EYE MOVEMENT"],
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

export default sectionTenRouter;
