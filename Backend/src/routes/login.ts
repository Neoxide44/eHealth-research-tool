import { Router, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import pool from "../../db";
import { addUserEntry, checkPassword, checkEmail } from "../queries";
import { LoginData } from "../models/loginData";

const loginRouter = Router();

// Add your CRUD API implementation here

loginRouter.post("/login", (req: Request, res: Response) => {
    const loginData: LoginData = {
        id: uuid(),
        email: req.body.email,
        password: req.body.password,
    };
    //check for email
    pool.query(checkEmail, [loginData.email], (error, results) => {
        if (error) throw error;
        console.log(results.rowCount);
        if (results.rowCount != 0) {
            //check if password is correct
            pool.query(
                checkPassword,
                [loginData.password, loginData.email],
                (error, results) => {
                    if (error) throw error;

                    if (results.rows[0].password_match === true) {
                        pool.query(
                            addUserEntry,
                            [loginData.email, loginData.id],
                            (error, results) => {
                                if (error) throw error;
                                res.status(200).json(loginData.id);
                            }
                        );
                    } else if (results.rows[0].password_match === false) {
                        res.status(200).json("Wrong password");
                    }
                }
            );
        } else {
            res.status(200).json("Wrong email");
        }
    });
});

export default loginRouter;
