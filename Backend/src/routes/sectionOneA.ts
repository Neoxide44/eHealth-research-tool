import { Router, Request, Response } from "express";
import { saveQuery } from "../models/saveQuery";
import { sendQuery } from "../models/sendQuery";
import pool from "../../db";
import { addData } from "../queries";
import { addOutcome } from "../queries";

const sectionOneARouter = Router();
let queries: saveQuery[] = [];

//Question 1
sectionOneARouter.get("/1", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "1",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question: "Is the participant able to REACH the Mingazzini position?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://www.researchgate.net/profile/Ildebrando-Appollonio/publication/261032919/figure/fig4/AS:296867142356998@1447790050644/The-drift-without-pronation-sign-The-test-is-carried-out-by-asking-the-patient-to-keep.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/1", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1a";
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
        nextQuestionID = 2;
    } else if (req.body.answer === "No") {
        nextQuestionID = 3;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Question 2

sectionOneARouter.get("/2", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "2",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question:
            "Is the participant able to HOLD the Mingazzini in a steady position for at least 5 seconds?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://www.researchgate.net/profile/Ildebrando-Appollonio/publication/261032919/figure/fig4/AS:296867142356998@1447790050644/The-drift-without-pronation-sign-The-test-is-carried-out-by-asking-the-patient-to-keep.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/2", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1a";

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
        nextSectionID = "2";
    } else if (req.body.answer === "No") {
        nextQuestionID = 4;
    }

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

//Question 3

sectionOneARouter.get("/3", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "3",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question: "",
        answers: [
            "One or both arms are MISSING or UNABLE to move for non-neurological reasons",
            "One or both arms cannot REACH position",
        ],
        imageUrl:
            "https://www.researchgate.net/profile/Ildebrando-Appollonio/publication/261032919/figure/fig4/AS:296867142356998@1447790050644/The-drift-without-pronation-sign-The-test-is-carried-out-by-asking-the-patient-to-keep.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/3", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1a";

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
        "One or both arms are MISSING or UNABLE to move for non-neurological reasons"
    ) {
        nextQuestionID = 6;
    } else if (req.body.answer === "One or both arms cannot REACH position") {
        nextQuestionID = 5;
    }
    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

sectionOneARouter.get("/4", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "4",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question: "",
        answers: [
            "One or both arms FALL down within 5 seconds",
            "One or both arms ROTATE",
        ],
        imageUrl:
            "https://www.researchgate.net/profile/Ildebrando-Appollonio/publication/261032919/figure/fig4/AS:296867142356998@1447790050644/The-drift-without-pronation-sign-The-test-is-carried-out-by-asking-the-patient-to-keep.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/4", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1a";

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

    if (req.body.answer === "One or both arms FALL down within 5 seconds") {
        nextQuestionID = 8;
    } else if (req.body.answer === "One or both arms ROTATE") {
        nextQuestionID = 7;
    }
    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

sectionOneARouter.get("/5", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "5",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question:
            "Is the  inability to reach position accompanied by SHAKING or involuntary movement?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://www.researchgate.net/profile/Ildebrando-Appollonio/publication/261032919/figure/fig4/AS:296867142356998@1447790050644/The-drift-without-pronation-sign-The-test-is-carried-out-by-asking-the-patient-to-keep.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/5", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1a";

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
        nextQuestionID = 10;
    } else if (req.body.answer === "No") {
        nextQuestionID = 9;
    }
    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

sectionOneARouter.get("/6", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "6",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question: "",
        answers: [
            "LEFT MISSING",
            "LEFT UNABLE TO MOVE",
            "RIGHT MISSING",
            "RIGHT UNABLE TO MOVE",
            "BOTH MISSING",
            "BOTH UNABLE TO MOVE",
        ],
        imageUrl:
            "https://www.researchgate.net/profile/Ildebrando-Appollonio/publication/261032919/figure/fig4/AS:296867142356998@1447790050644/The-drift-without-pronation-sign-The-test-is-carried-out-by-asking-the-patient-to-keep.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/6", (req: Request, res: Response) => {
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
            "MISSING UL or UNABLE to move for non-neurological reasons",
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

sectionOneARouter.get("/7", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "7",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question: "",
        answers: ["LEFT", "RIGHT", "BOTH"],
        imageUrl:
            "https://www.researchgate.net/profile/Ildebrando-Appollonio/publication/261032919/figure/fig4/AS:296867142356998@1447790050644/The-drift-without-pronation-sign-The-test-is-carried-out-by-asking-the-patient-to-keep.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/7", (req: Request, res: Response) => {
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
    pool.query(
        addOutcome,
        [data.uuid, data.section, "MILD UL Strength Impairment"],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

sectionOneARouter.get("/8", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "8",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question:
            "Is the falling accompanied by SHAKING or involuntary movement?",
        answers: ["Yes", "No"],
        imageUrl:
            "https://www.researchgate.net/profile/Ildebrando-Appollonio/publication/261032919/figure/fig4/AS:296867142356998@1447790050644/The-drift-without-pronation-sign-The-test-is-carried-out-by-asking-the-patient-to-keep.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/8", (req: Request, res: Response) => {
    let nextQuestionID = 0;
    let nextSectionID = "1a";

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
        nextQuestionID = 12;
    } else if (req.body.answer === "No") {
        nextQuestionID = 11;
    }
    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

sectionOneARouter.get("/9", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "9",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question: "",
        answers: ["LEFT", "RIGHT", "BOTH"],
        imageUrl:
            "https://www.researchgate.net/profile/Ildebrando-Appollonio/publication/261032919/figure/fig4/AS:296867142356998@1447790050644/The-drift-without-pronation-sign-The-test-is-carried-out-by-asking-the-patient-to-keep.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/9", (req: Request, res: Response) => {
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
        [data.uuid, data.section, "SEVERE UL Strength Impairment"],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

sectionOneARouter.get("/10", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "10",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question: "",
        answers: ["LEFT", "RIGHT", "BOTH"],
        imageUrl:
            "https://www.researchgate.net/profile/Ildebrando-Appollonio/publication/261032919/figure/fig4/AS:296867142356998@1447790050644/The-drift-without-pronation-sign-The-test-is-carried-out-by-asking-the-patient-to-keep.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/10", (req: Request, res: Response) => {
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
            "SEVERE UL Strength Impairment with Parkinsonian Signs",
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

sectionOneARouter.get("/11", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "11",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question: "",
        answers: ["LEFT", "RIGHT", "BOTH"],
        imageUrl:
            "https://www.researchgate.net/profile/Ildebrando-Appollonio/publication/261032919/figure/fig4/AS:296867142356998@1447790050644/The-drift-without-pronation-sign-The-test-is-carried-out-by-asking-the-patient-to-keep.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/11", (req: Request, res: Response) => {
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
        [data.uuid, data.section, "MODERATE UL Strength Impairment"],
        (error, results) => {
            if (error) throw error;
        }
    );

    res.status(200).json({
        nextQuestion: nextQuestionID,
        nextSection: nextSectionID,
    });
});

sectionOneARouter.get("/12", (req: Request, res: Response) => {
    const nextQuery: sendQuery = {
        q_id: "12",
        section: "1a",
        instructions:
            "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. Ask the participant to maintain that position for five seconds.",
        question: "",
        answers: ["LEFT", "RIGHT", "BOTH"],
        imageUrl:
            "https://www.researchgate.net/profile/Ildebrando-Appollonio/publication/261032919/figure/fig4/AS:296867142356998@1447790050644/The-drift-without-pronation-sign-The-test-is-carried-out-by-asking-the-patient-to-keep.png",
        mc: true,
    };

    res.status(200).json(nextQuery);
});

sectionOneARouter.post("/12", (req: Request, res: Response) => {
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
            "MODERATE UL Strength Impairment with Parkinsonian Signs",
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

export default sectionOneARouter;
