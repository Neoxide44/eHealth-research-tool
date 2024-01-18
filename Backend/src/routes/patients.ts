import { Router, Request, Response } from "express";
import { Patient } from "../models/patient";
import { v4 as uuid } from "uuid";
import pool from "../../db";
import { checkIfUserExists, addUser } from "../queries";

const patientRouter = Router();

// Add your CRUD API implementation here

patientRouter.post("/patient", (req: Request, res: Response) => {
    const [year, month, day] = req.body.date.split("-");

    const patient: Patient = {
        id: uuid(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: new Date(`${year}-${month}-${day}`),
    };
    pool.query(
        addUser,
        [patient.firstName, patient.lastName, patient.birthDate, patient.id],
        (error, results) => {
            if (error) throw error;
            res.status(200).json(patient.id);
        }
    );
});

export default patientRouter;
