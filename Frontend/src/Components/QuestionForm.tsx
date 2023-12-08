import { createStyles, makeStyles } from "@mui/styles";
import { Typography, Paper, Button } from "@mui/material";
import { useState } from "react";
import CustomButton from "./CustomButton";

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
            elevation: 4,
            textAlign: "center",
        },
        wordWrap: {
            wordWrap: "break-word",
        },
        title: {
            margin: "0px 0 20px 0",
        },
        button: {
            margin: "20px 0",
        },
    })
);

function QuestionForm() {
    const question: string =
        "Ask the participant to stretch out their arms in front of their body, palms facing upward and eyes closed. \n Ask the participant to maintain that position for five seconds. \n Is the participant able to REACH the Mingazzini position?";
    const optionOne: string = "Yes";
    const optionTwo: string = "No";
    const classes = useStyles();
    const [selected, setSelected] = useState("");
    const [submited, setSubmitted] = useState("");

    const handleSelectOption = (item: string) => {
        setSelected((selected) => {
            console.log("Selected answer: " + item);
            return item;
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted((submited) => {
            console.log("Submitted answer: " + selected);
            return selected;
        });
    };

    return (
        <Paper className={classes.container}>
            <Typography
                variant={"h4"}
                className={`${classes.title} ${classes.wordWrap}`}
            >
                {question}
            </Typography>
            <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
                <CustomButton
                    text={optionOne}
                    onClick={() => handleSelectOption(optionOne)}
                />
                <CustomButton
                    text={optionTwo}
                    onClick={() => handleSelectOption(optionTwo)}
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
}

export default QuestionForm;
