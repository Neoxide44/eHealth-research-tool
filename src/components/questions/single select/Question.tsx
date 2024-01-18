import React from "react";
import Options from "./Options.tsx";
import { Form, Button } from "react-bootstrap";

interface Props {
    question: string;
    options: string[];

    selectedOption: string;
    onOptionChange: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: () => void;
}

function Question(props: Props) {
    return (
        <div className="">
            <h3 style={{ width: "800px" }}>{props.question}</h3>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onSubmit();
                }}
                className="mt-2 mb-2"
            >
                <Options
                    options={props.options}
                    selectedOption={props.selectedOption}
                    onOptionChange={props.onOptionChange}
                />
                <Button type="submit" className="btn btn-primary mt-2">
                    SUBMIT
                </Button>
            </Form>
        </div>
    );
}

export default Question;
