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
                    question={"Lmao are you for real???"}
                    options={["Yes", "No", "Maybe", "Yikers"]}
                />
            )}
        </div>
    );
}

export default Form;
