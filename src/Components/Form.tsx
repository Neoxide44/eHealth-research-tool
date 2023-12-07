import React, { useState } from "react";
import { Typography, Paper, Button } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import CustomTextField from "./CustonTextField";

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

const Form = () => {
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
        console.log(values);
    };

    return (
        <Paper className={classes.container}>
            <Typography variant={"h4"} className={classes.title}>
                Patient Form
            </Typography>
            <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
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

export default Form;
