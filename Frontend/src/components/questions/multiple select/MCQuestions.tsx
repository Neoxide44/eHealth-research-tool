// Question.tsx
import React from "react";
import MCOptions from "./MCOptions";
import { Form, Button, ButtonGroup } from "react-bootstrap";

interface Props {
    question: string;
    options: string[];
    selectedOptions: string[];
    onOptionChange: React.ChangeEventHandler<HTMLInputElement>;
    q_id: string | undefined;
    allow_no_selected: boolean;
    onSubmit: () => void;
    onGoBack: () => void;
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
                <ButtonGroup>
                    <Button
                        type="submit"
                        className="btn btn-primary mt-2"
                        disabled={
                            !props.allow_no_selected &&
                            props.selectedOptions.length === 0
                        }
                    >
                        Submit Answer
                    </Button>
                    <Button
                        className="btn btn-primary mt-2"
                        disabled={props.q_id === "1"}
                        onClick={() => {
                            props.onGoBack();
                        }}
                    >
                        Previous Question
                    </Button>
                </ButtonGroup>
            </Form>
        </div>
    );
}

export default MCQuestion;
