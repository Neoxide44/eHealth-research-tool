import { createStyles, makeStyles } from "@mui/styles";
import { Typography, Paper, Button } from "@mui/material";
import { useState } from "react";
import CustomButton from "./CustomButton";
import InstructionsAlert from "./InstructionsAlert";
import ImageAlert from "./ImageAlert";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

interface Props {
    section: string;
    instructions: string;
    question: string;
    options: string[];
    imageUrl: string;
    updateQuery: (answer: string) => void;
}

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            display: "flex",
            flexDirection: "column",
        },
        container: {
            margin: "16px 0px 0px 0px !important",
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
        alert: {
            position: "absolute",
            top: 0,
            left: 0,
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

    const cleanSection = (section: string) => {
        section = section.replace(/\D/g, "");
        return Number(section);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted((submited) => {
            console.log("Submitted answer: " + selected);
            props.updateQuery(selected);
            return selected;
        });
    };

    return (
        <div>
            <InstructionsAlert
                text={props.instructions}
                alertStyles={{ textAlign: "left" }}
            />
            <ImageAlert
                alertStyles={{ textAlign: "left" }}
                imageUrl={props.imageUrl}
            />
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
                    onSubmit={(e) => {
                        handleSubmit(e);
                        console.log(submited);
                    }}
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
            &nbsp;
            <LinearProgressWithLabel value={10 * cleanSection(props.section)} />
        </div>
    );
}

export default QuestionForm;
