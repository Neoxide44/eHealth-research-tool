//App.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import PatientForm from "./components/info form/PatientForm";
import "./index.css";
import { useState } from "react";
import Question from "./components/questions/single select/Question";
import { getQuery } from "./api calls/getQuery";
import { postQuery } from "./api calls/postQuery";
import { postQueryMC } from "./api calls/postQueryMc";
import MCQuestion from "./components/questions/multiple select/MCQuestions";
import ProgressBarWithLabel from "./components/questions/ProgressBar";
import { Container, Stack } from "react-bootstrap";
import Header from "./components/questions/Header";

function App() {
    const [id, setId] = useState("");
    const [question, setQuestion] = useState("IDk");
    const [options, setOptions] = useState(["idk1", "idk2", "idk3"]);
    const [selectedOptionsMC, setSelectedOptionsMC] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [section, setSection] = useState("1a");
    const [q_id, setQ_id] = useState("1");
    const [instructions, setInstructions] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [mc, setMc] = useState(false);

    async function handleFormSubmit() {
        await postQuery(
            q_id,
            id,
            section,
            question,
            selectedOption,
            setSection,
            setQ_id,
            setQuestion,
            setInstructions,
            setOptions,
            setImageUrl,
            setMc
        );
        setSelectedOption("");
    }
    async function handleMCFormSubmit() {
        await postQueryMC(
            q_id,
            id,
            section,
            question,
            selectedOptionsMC,
            setSection,
            setQ_id,
            setQuestion,
            setInstructions,
            setOptions,
            setImageUrl,
            setMc,
            setSelectedOptionsMC
        );
    }

    async function handlePatientFormSubmit() {
        await getQuery(
            section,
            q_id,
            setQuestion,
            setInstructions,
            setOptions,
            setImageUrl,
            setMc
        );
    }

    function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSelectedOption(e.target.value);
    }

    const handleOptionsChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const optionValue = event.target.value;
        setSelectedOptionsMC((prevSelectedOptions) => {
            if (prevSelectedOptions.includes(optionValue)) {
                // If the option is already selected, remove it
                return prevSelectedOptions.filter(
                    (option) => option !== optionValue
                );
            } else {
                // If the option is not selected, add it
                return [...prevSelectedOptions, optionValue];
            }
        });
    };

    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            {id === "" && (
                <PatientForm onSubmit={handlePatientFormSubmit} setId={setId} />
            )}
            {id != "" && (
                <div>
                    <Container>
                        <Stack gap={3}>
                            {section != "42" && (
                                <Header
                                    imageUrl={imageUrl}
                                    instructions={instructions}
                                />
                            )}

                            {mc && section != "42" && (
                                <Question
                                    question={question}
                                    options={options}
                                    selectedOption={selectedOption}
                                    onOptionChange={handleOptionChange}
                                    onSubmit={() => {
                                        if (selectedOption != "") {
                                            handleFormSubmit();
                                        }
                                    }}
                                />
                            )}

                            {!mc && section != "42" && (
                                <MCQuestion
                                    question={question}
                                    options={options}
                                    selectedOptions={selectedOptionsMC}
                                    onOptionChange={handleOptionsChange}
                                    onSubmit={() => {
                                        if (selectedOptionsMC.length != 0) {
                                            handleMCFormSubmit();
                                        }
                                    }}
                                />
                            )}
                            {section != "42" && (
                                <ProgressBarWithLabel section={section} />
                            )}

                            {section === "42" && <h1>fin.</h1>}
                        </Stack>
                    </Container>
                </div>
            )}
        </div>
    );
}

export default App;
