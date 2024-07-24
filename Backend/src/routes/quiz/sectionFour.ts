import { Router, Request, Response } from "express";
import { saveQuery } from "../../models/saveQuery";
import { sendQuery } from "../../models/sendQuery";
import pool from "../../../db";
import {
    addData,
    addOutcome,
    deleteOneData,
    deleteOutcome,
} from "../../queries";

const sectionFourRouter = Router();

//Section 4 Question 1
sectionFourRouter.get("/1/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "4",
        instructions:
            "Ask the participant to walk normally and comfortably for five steps, stop, then turn around and come back on heels. Then, ask them to repeat the walk, this time going on tiptoes for five steps, stop, turn and come back walking in a straight line (one foot in front of the other, the front foot placed such that its heel touches the toe of the standing foot).",
        question:
            "Is the participant able to WALK IN A LINE, on TIPTOES, HEELS, and smoothly TURNING AROUND?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://drive.google.com/file/d/1FLnIR187Mz8b_3ytiSMcCIwcbaU8bb3G/view?usp=sharing",
        videoUrl:
            "https://drive.google.com/file/d/1lW1TAUgAzBxilmqzw6Cj3O5SpH4fs5as/view?usp=sharing",
        mc: true,
        title: "Walking On A Line",
    };

    res.status(200).json(nextQuery);
});

sectionFourRouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "4";

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
        nextSectionID = "5";
    } else if (req.body.answer === "No") {
        nextQuestionID = 2;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Section 4 Question 2
sectionFourRouter.get("/2/:language", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "4",
        instructions:
            "Ask the participant to walk normally and comfortably for five steps, stop, then turn around and come back on heels. Then, ask them to repeat the walk, this time going on tiptoes for five steps, stop, turn and come back walking in a straight line (one foot in front of the other, the front foot placed such that its heel touches the toe of the standing foot).",
        question: "",
        answers: [
            "Participant is UNABLE to walk on TIPTOES for 5 steps;https://drive.google.com/file/d/1_8NR8lhQ9MvNK83hVZqQv2nVgpCgViZu/view?usp=sharing;",
            "Participant is UNABLE to walk on HEELS for 5 steps;https://drive.google.com/file/d/1TUi26xzjJqDcpVcaAzqsXTOqkNwYwRKj/view?usp=sharing;",
            "Participant is UNABLE to TURN SMOOTHLY;https://drive.google.com/file/d/1-2vlF8Ey1DmOBCoxwU6yY_AZ9QcJ3OkK/view?usp=sharing;",
            "Participant is UNABLE to WALK IN A STRAIGHT LINE for 5 steps;https://drive.google.com/file/d/1GBcYqtqTKtLkwgH8csy8ljaPF_vZDnvc/view?usp=sharing;",
        ],
        imageUrl: "",
        videoUrl:
            "https://drive.google.com/file/d/1h4aZN0AQqdpTiT2r4LCKB8PX9-HFN5BP/preview",
        mc: false,
        title: "Walking On A Line",
    };

    res.status(200).json(nextQuery);
});

sectionFourRouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 1;
    let nextSectionID = "1b";
    let outcome = "";

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
        req.body.answer.includes("Participant is UNABLE to WALK ON A LINE") &&
        (req.body.answer.length === 1 ||
            (req.body.answer.includes(
                "Participant is UNABLE to TURN smoothly"
            ) &&
                req.body.answer.length === 2))
    ) {
        nextQuestionID = 1;
        nextSectionID = "7b";
    } else if (
        req.body.answer.includes("Participant is UNABLE to TURN smoothly") &&
        req.body.answer.length === 1
    ) {
        nextQuestionID = 1;
        nextSectionID = "5";
    }
    if (
        req.body.answer.includes(
            "Participant is UNABLE to walk on TIPTOES for more than 5 steps"
        ) ||
        req.body.answer.includes(
            "Participant is UNABLE to walk on HEELS for more than 5 steps"
        )
    ) {
        outcome += "'MILD LL Strength Impairment'";
    }

    if (req.body.answer.includes("Participant is UNABLE to TURN smoothly")) {
        outcome += "'Extrapyramidal sign /Parkinsonian sign'";
    }
    if (req.body.answer.includes("Participant is UNABLE to WALK ON A LINE")) {
        outcome += "'MODERATE LL Coordination Impairment'";
    }

    pool.query(deleteOutcome, [data.uuid, data.section], (error, results) => {
        if (error) throw error;
        pool.query(
            addOutcome,
            [data.uuid, data.section, outcome + " - " + data.answer],
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

export default sectionFourRouter;
