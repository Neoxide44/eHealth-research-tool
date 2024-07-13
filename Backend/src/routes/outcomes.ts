import { Router, Request, Response } from "express";
import pool from "../../db";
import { getOutcomes, deleteOutcomes } from "../queries";

const outcomeRouter = Router();

outcomeRouter.get("/:uuid", (req: Request, res: Response) => {
    pool.query(getOutcomes, [req.params.uuid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        pool.query(deleteOutcomes, [req.params.uuid], (error, results) => {
            if (error) throw error;
        });
    });
});

export default outcomeRouter;
