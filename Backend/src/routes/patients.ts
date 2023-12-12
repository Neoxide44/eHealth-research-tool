import { Router, Request, Response } from "express";
import { Patient } from "../models/patient";

const router = Router();
let patients: Patient[] = [];

// Add your CRUD API implementation here

router.post("/", (req: Request, res: Response) => {
    const patient: Patient = {
        id: patients.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };

    patients.push(patient);
    res.status(201).json(patient);
});

export default router;
