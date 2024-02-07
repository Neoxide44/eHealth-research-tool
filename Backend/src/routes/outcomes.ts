import { Router, Request, Response } from "express";
import pool from "../../db";
import { getOutcomes } from "../queries";

const outcomeRouter = Router();

outcomeRouter.get("/:uuid", (req: Request, res: Response) => {
    pool.query(getOutcomes, [req.params.uuid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
});

export default outcomeRouter;
