import { createStyles, makeStyles } from "@mui/styles";
import { Typography, Paper, Button } from "@mui/material";
import { useState } from "react";
import CustomButton from "./CustomButton";

interface Props {
    sectionText: string;
    question: string;
    options: string[];
}

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            display: "flex",
            flexDirection: "column",
        },
        container: {
            margin: "16px",
            padding: "16px",
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

function QuestionForm(props: Props) {
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
        <div>
            <Paper elevation={6} className={classes.container}>
                <Typography variant={"h3"} className={classes.title}>
                    {props.sectionText}
                </Typography>
            </Paper>
            <Paper className={classes.container}>
                <Typography
                    variant={"h4"}
                    className={`${classes.title} ${classes.wordWrap}`}
                >
                    {props.question}
                </Typography>
                <Typography variant="h3" color="inherit" noWrap>
                    &nbsp;
                </Typography>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className={classes.form}
                >
                    {props.options.map((option, index) => (
                        <CustomButton
                            key={index}
                            text={option}
                            onClick={() => handleSelectOption(option)}
                        ></CustomButton>
                    ))}
                    <Typography variant="h3" color="inherit" noWrap>
                        &nbsp;
                    </Typography>
                    <Button
                        type={"submit"}
                        variant={"contained"}
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

export default QuestionForm;
