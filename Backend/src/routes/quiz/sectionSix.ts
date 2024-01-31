import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import { addData, addOutcome, checkAnswer } from "../../queries";

const sectionSixRouter = Router();

//Section 6 Question 1
sectionSixRouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "6",
        instructions:
            "Touch and pinch several parts (face, upper limbs, lower limbs) of both sides of the body of the participant with a cotton piece or toothpick.\n Ask the participant if they feel it with the same intensity.",
        question:
            "Is the participant able feel the touch points on both sides of the same district, and with the same intensity? ",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionSixRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "6";

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
        nextSectionID = "8";
    } else if (req.body.answer === "No") {
        nextQuestionID = 2;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 6 Question 2
sectionSixRouter.get("/2", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "6",
        instructions:
            "Touch and pinch several parts (face, upper limbs, lower limbs) of both sides of the body of the participant with a cotton piece or toothpick.\n Ask the participant if they feel it with the same intensity.",
        question: "",
        answers: [
            "Participant perceives a DIFFERENCE between left and right on the FACE, or is UNABLE to feel any touch points",
            "Participant perceives a DIFFERENCE between left and right on UPPER LIMBS, or is UNABLE to feel any touch points",
            "Participant perceives a DIFFERENCE between left and right on the LOWER LIMBS, or is UNABLE to feel any touch points",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
    };

    res.status(200).json(nextQuery);
});

sectionSixRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 3;
    let nextSectionID = "6";

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

//Section 6 Question 3
sectionSixRouter.get("/3", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "6",
        instructions:
            "Touch and pinch several parts (face, upper limbs, lower limbs) of both sides of the body of the participant with a cotton piece or toothpick.\n Ask the participant if they feel it with the same intensity.",
        question: "",
        answers: [
            "Less on the LEFT",
            "Less on the RIGHT",
            "Nothing on the LEFT",
            "Nothing on the RIGHT",
            "Perceives nothing on EITHER SIDE",
        ],
        imageUrl:
            "https://drive.google.com/file/d/168-4COk-Eh3WAQ5xE5jvK4g3AK1Dklm5/preview",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionSixRouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "8";
    let outcome = "";
    let prevAnswers = [""];

    const data: saveQuery = {
        uuid: req.body.id,
        section: req.body.section,
        q_id: req.body.q_id,
        question: req.body.question,
        answer: req.body.answer,
    };

    pool.query(checkAnswer, [data.uuid, "6", 2], (error, results) => {
        if (error) throw error;
        if (
            results.rows[0].answer.includes(
                "Participant perceives a DIFFERENCE between left and right on the FACE, or is UNABLE to feel any touch points"
            )
        ) {
            prevAnswers.push("A");
        }
        if (
            results.rows[0].answer.includes(
                "Participant perceives a DIFFERENCE between left and right on UPPER LIMBS, or is UNABLE to feel any touch points"
            )
        ) {
            prevAnswers.push("B");
        }
        if (
            results.rows[0].answer.includes(
                "Participant perceives a DIFFERENCE between left and right on the LOWER LIMBS, or is UNABLE to feel any touch points"
            )
        ) {
            prevAnswers.push("C");
        }

        prevAnswers.forEach((element) => {
            if (
                data.answer === "Less on the LEFT" ||
                data.answer === "Less on the RIGHT"
            ) {
                if (element === "A") {
                    outcome +=
                        "{MILD SUPERFICIAL SENSITIVITY OF THE FACE IMPAIRMENT}";
                } else if (element === "B") {
                    outcome +=
                        "{MILD SUPERFICIAL SENSITIVITY OF THE UL IMPAIRMENT}";
                } else if (element === "C") {
                    outcome +=
                        "{MILD SUPERFICIAL SENSITIVITY OF THE LL IMPAIRMENT}";
                }
            }
            if (
                data.answer === "Nothing on the LEFT" ||
                data.answer === "Nothing on the RIGHT" ||
                data.answer === "Perceives nothing on EITHER SIDE"
            ) {
                if (element === "A") {
                    outcome +=
                        "{MODERATE SUPERFICIAL SENSITIVITY OF THE FACE IMPAIRMENT}";
                } else if (element === "B") {
                    outcome +=
                        "{MODERATE SUPERFICIAL SENSITIVITY OF THE UL IMPAIRMENT}";
                } else if (element === "C") {
                    outcome +=
                        "{MODERATE SUPERFICIAL SENSITIVITY OF THE LL IMPAIRMENT}";
                }
            }
        });

        console.log(outcome);
        pool.query(
            addOutcome,
            [data.uuid, data.section, outcome],
            (error, results) => {
                if (error) throw error;
            }
        );
    });
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

export default sectionSixRouter;
