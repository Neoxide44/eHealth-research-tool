import { Router, Request, Response } from "express";
import pool from "../../db";
import { getAnamnesticOutcomes, deleteAnamnesticOutcome } from "../queries";

const anamnesticOutcomeRouter = Router();

anamnesticOutcomeRouter.get("/:uuid", (req: Request, res: Response) => {
    pool.query(getAnamnesticOutcomes, [req.params.uuid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        setTimeout(() => {
            pool.query(
                deleteAnamnesticOutcome,
                [req.params.uuid],
                (deleteError, deleteResults) => {
                    if (deleteError) {
                        console.log(
                            `Failed to delete anamnestic_outcomes for uuid ${req.params.uuid}:`,
                            deleteError
                        );
                    } else {
                        console.log(
                            `Outcomes for uuid ${req.params.uuid} deleted successfully.`
                        );
                    }
                }
            );
        }, 1800000);
    });
});

export default anamnesticOutcomeRouter;
