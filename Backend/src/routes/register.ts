import { Router, Request, Response } from "express";
import pool from "../../db";
import { checkEmail, regiserLoginInfo } from "../queries";

const registerRouter = Router();

// Add your CRUD API implementation here

registerRouter.post("", (req: Request, res: Response) => {
    const email = req.body.email;
    const pass = req.body.password;
    //check is email already in use
    pool.query(checkEmail, [email], (error, results) => {
        if (error) throw error;
        console.log(results.rowCount);
        //If rowCOunt === 0 means email isn't in use
        if (results.rowCount === 0) {
            //Add email oassword pair to database
            pool.query(regiserLoginInfo, [email, pass], (error, results) => {
                if (error) throw error;
                res.status(200).json("Success");
            });
        } else {
            res.status(200).json("Email already in use");
        }
    });
});

export default registerRouter;
