import React from "react";
import { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import InfoForm from "./InfoForm";
import { fetchFormData } from "../getNewSet";

function Form() {
    const [id, setId] = useState(-1);
    const [section, setSection] = useState("0");
    const [instructions, setInstructions] = useState("");
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([""]);
    const [infoSubmitted, setInfoSubmitted] = useState(false);

    async function fetchData() {
        try {
            const data = await fetchFormData(
                section,
                question,
                instructions,
                answers
            );
            console.log(data);
            setTimeout(() => {
                setSection(data.section);
                setInstructions(data.instructions);
                setQuestion(data.question);
                setAnswers(data.answers);
            }, 0);
            console.log(instructions);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleSubmit = () => {
        setInfoSubmitted(true);

        fetchData();
    };

    return (
        <div>
            {id === -1 && <InfoForm onSubmit={handleSubmit} setId={setId} />}
            {id != -1 && (
                <QuestionForm
                    instructions={instructions}
                    question={question}
                    options={answers}
                />
            )}
        </div>
    );
}

export default Form;
