import React from "react";
import Options from "./Options.tsx";
import { Form, Button, ButtonGroup } from "react-bootstrap";

interface Props {
    question: string;
    options: string[];

    selectedOption: string;
    onOptionChange: React.ChangeEventHandler<HTMLInputElement>;
    q_id: string | undefined;
    onGoBack: () => void;
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
                <ButtonGroup>
                    <Button
                        type="submit"
                        className="btn btn-primary mt-2"
                        disabled={!props.selectedOption}
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

export default Question;
