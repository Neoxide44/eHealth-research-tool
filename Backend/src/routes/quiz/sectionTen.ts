import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData, deleteOneData } from "../../queries";
import { addOutcome, deleteOutcome } from "../../queries";

const sectionTenRouter = Router();

//Section 10 Question 1
sectionTenRouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "10",
        instructions:
            "The instructor moves their finger to the ceiling, the floor, right and left, asking the participant to follow it with their eyes only, without moving their head.",
        question:
            "Are the eyes of the participant following the finger SYMMETRICALLY?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/1HaOimt5u7hjmobVP5ggMuMO5Lrl6vgDn/view?usp=sharing",
        videoUrl:
            "https://drive.google.com/file/d/1kscrulhKMXyUjS2yk8s9cS-8fljNdA0m/view?usp=sharing",
        mc: true,
        title: "Eye Movement",
    };

    res.status(200).json(nextQuery);
});

sectionTenRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "11";

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
        pool.query(
            deleteOutcome,
            [data.uuid, data.section],
            (error, results) => {
                if (error) throw error;
                pool.query(
                    addOutcome,
                    [data.uuid, data.section, "IMPAIRED EYE MOVEMENT"],
                    (error, results) => {
                        if (error) throw error;
                    }
                );
            }
        );
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

export default sectionTenRouter;
