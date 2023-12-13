import { Router, Request, Response } from "express";
import { Patient } from "../models/patient";

const patientRouter = Router();
let patients: Patient[] = [];

// Add your CRUD API implementation here

patientRouter.post("/", (req: Request, res: Response) => {
    const [year, month, day] = req.body.birthDate.split("-");

    const patient: Patient = {
        id: patients.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: new Date(`${year}-${month}-${day}`),
    };

    console.log(patient);
    patients.push(patient);
    res.status(201).json(patient.id);
});

export default patientRouter;
