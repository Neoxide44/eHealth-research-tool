import { Router, Request, Response } from "express";
import { Patient } from "../models/patient";
import { v4 as uuid } from "uuid";
import pool from "../../db";
import { addPatient } from "../queries";

const patientRouter = Router();

// Add your CRUD API implementation here

patientRouter.post("/patient", (req: Request, res: Response) => {
    const patient: Patient = {
        gender: req.body.gender,
        yearOfBirth: req.body.yearOfBirth,
        numEdu: req.body.numEdu,
        language: req.body.language,
        participantCode: req.body.participantCode,
        id: req.body.uuid,
    };
    pool.query(
        addPatient,
        [
            patient.gender,
            patient.yearOfBirth,
            patient.numEdu,
            patient.language,
            patient.participantCode,
            patient.id,
        ],
        (error, results) => {
            if (error) throw error;
            res.status(200).json(patient.id);
        }
    );
});

export default patientRouter;
