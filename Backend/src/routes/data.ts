import { Router, Request, Response } from "express";
import pool from "../../db";
import { getData } from "../queries";

const dataRouter = Router();

dataRouter.get("/:uuid", (req: Request, res: Response) => {
    pool.query(getData, [req.params.uuid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
});

export default dataRouter;
