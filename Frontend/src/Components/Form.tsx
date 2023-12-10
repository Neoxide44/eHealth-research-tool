import React from "react";
import { useState } from "react";
import QuestionForm from "./QuestionForm";
import InfoForm from "./InfoForm";

function Form() {
    const [infoSubmitted, setInfoSubmitted] = useState(false);
    const handleSubmit = () => {
        setInfoSubmitted(true);
    };
    return (
        <div>
            {!infoSubmitted && <InfoForm onSubmit={handleSubmit} />}
            {infoSubmitted && (
                <QuestionForm
                    sectionText={"Idk bro"}
                    question={
                        "Is the participant able to REACH the Mingazzini position?"
                    }
                    options={["Yes", "No", "Maybe"]}
                />
            )}
        </div>
    );
}

export default Form;
