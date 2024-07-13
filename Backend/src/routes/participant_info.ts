import { Router, Request, Response } from "express";
import pool from "../../db";
import { getParticipantInfo, deleteParticipantInfo } from "../queries";

const participantInfoRouter = Router();

participantInfoRouter.get("/:uuid", (req: Request, res: Response) => {
    pool.query(getParticipantInfo, [req.params.uuid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        setTimeout(() => {
            pool.query(
                deleteParticipantInfo,
                [req.params.uuid],
                (deleteError, deleteResults) => {
                    if (deleteError) {
                        console.log(
                            `Failed to delete participant info for uuid ${req.params.uuid}:`,
                            deleteError
                        );
                    } else {
                        console.log(
                            `Participant info for uuid ${req.params.uuid} deleted successfully.`
                        );
                    }
                }
            );
        }, 1800000);
    });
});

export default participantInfoRouter;
