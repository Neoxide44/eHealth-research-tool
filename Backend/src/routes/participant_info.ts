import { Router, Request, Response } from "express";
import pool from "../../db";
import { getParticipantInfo, deleteParticipantInfo } from "../queries";

const participantInfoRouter = Router();

participantInfoRouter.get("/:uuid", (req: Request, res: Response) => {
    pool.query(getParticipantInfo, [req.params.uuid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        // pool.query(
        //     deleteParticipantInfo,
        //     [req.params.uuid],
        //     (error, results) => {
        //         if (error) throw error;
        //     }
        // );
    });
});

export default participantInfoRouter;
