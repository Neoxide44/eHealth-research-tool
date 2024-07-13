import { Router, Request, Response } from "express";
import pool from "../../db";
import { getOutcomes, deleteOutcomes } from "../queries";

const outcomeRouter = Router();

outcomeRouter.get("/:uuid", (req: Request, res: Response) => {
    pool.query(getOutcomes, [req.params.uuid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        setTimeout(() => {
            pool.query(
                deleteOutcomes,
                [req.params.uuid],
                (deleteError, deleteResults) => {
                    if (deleteError) {
                        console.log(
                            `Failed to delete outcomes for uuid ${req.params.uuid}:`,
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

export default outcomeRouter;
