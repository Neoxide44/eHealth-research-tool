import { Router, Request, Response } from "express";
import pool from "../../db";
import { checkCode } from "../queries";

const codeRouter = Router();
codeRouter.post("", (req: Request, res: Response) => {
    const code = req.body.code;
    // Add your CRUD API implementation here

    pool.query(checkCode, [code], (error, results) => {
        if (error) throw error;
        //If rowCOunt === 1 means code was found in db
        if (results.rowCount === 1) {
            //Add email oassword pair to database
            res.status(200).json("Success");
        } else {
            res.status(200).json("Incorrect researcher code");
        }
    });
});

export default codeRouter;
