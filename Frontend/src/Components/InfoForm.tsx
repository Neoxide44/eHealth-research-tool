import React, { useState } from "react";
import { Typography, Paper, Button } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import CustomTextField from "./CustonTextField";
import "./InfoForm.css";
import axios from "axios";

interface Props {
    setId: React.Dispatch<React.SetStateAction<number>>;
    onSubmit: () => void;
}

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            display: "flex",
            flexDirection: "column",
        },
        container: {
            backgroundColor: "#ffffff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            padding: 30,
            textAlign: "center",
        },
        title: {
            margin: "0px 0 20px 0",
        },
        button: {
            margin: "20px 0",
        },
    })
);

type Values = {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
};

const InfoForm = (props: Props) => {
    const classes = useStyles();
    const [values, setValues] = useState<Values>({
        firstName: "",
        lastName: "",
        dateOfBirth: new Date(),
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit();
        console.log(values);
    };

    return (
        <Paper className={classes.container}>
            <Typography variant={"h4"} className={classes.title}>
                Patient Form
            </Typography>
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                    axios
                        .post("http://localhost:3000/patients", {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            birthDate: values.dateOfBirth,
                        })
                        .then(
                            (response) => {
                                console.log(response.data);
                                props.setId(response.data);
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                }}
                className={classes.form}
            >
                <CustomTextField
                    changeHandler={handleChange}
                    type={"string"}
                    label={"First Name"}
                    name={"firstName"}
                />
                <CustomTextField
                    changeHandler={handleChange}
                    type={"string"}
                    label={"Last Name"}
                    name={"lastName"}
                />
                <CustomTextField
                    changeHandler={handleChange}
                    type={"date"}
                    label={"Date of Birth"}
                    name={"dateOfBirth"}
                />
                <Button
                    type={"submit"}
                    variant={"contained"}
                    className={classes.button}
                >
                    Submit
                </Button>
            </form>
        </Paper>
    );
};

export default InfoForm;
