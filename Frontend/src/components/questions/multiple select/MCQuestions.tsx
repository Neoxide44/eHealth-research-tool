// Question.tsx
import React from "react";
import MCOptions from "./MCOptions";
import { Form, Button } from "react-bootstrap";

interface Props {
    question: string;
    options: string[];
    selectedOptions: string[];
    onOptionChange: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: () => void;
}

function MCQuestion(props: Props) {
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
                <MCOptions
                    options={props.options}
                    selectedOptions={props.selectedOptions}
                    onOptionChange={props.onOptionChange}
                />
                <Button type="submit" className="btn btn-primary mt-2">
                    SUBMIT
                </Button>
            </Form>
        </div>
    );
}

export default MCQuestion;
