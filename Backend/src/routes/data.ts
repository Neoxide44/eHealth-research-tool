import { Router, Request, Response } from "express";
import pool from "../../db";
import { getData, deleteData } from "../queries";

const dataRouter = Router();

dataRouter.get("/:uuid", (req: Request, res: Response) => {
    pool.query(getData, [req.params.uuid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        setTimeout(() => {
            pool.query(
                deleteData,
                [req.params.uuid],
                (deleteError, deleteResults) => {
                    if (deleteError) {
                        console.log(
                            `Failed to delete data for uuid ${req.params.uuid}:`,
                            deleteError
                        );
                    } else {
                        console.log(
                            `Data for uuid ${req.params.uuid} deleted successfully.`
                        );
                    }
                }
            );
        }, 1800000);
    });
});

export default dataRouter;
