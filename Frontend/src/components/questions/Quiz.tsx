import React from "react";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getQuery } from "../../api calls/getQuery";
import { postQuery } from "../../api calls/postQuery";
import { postQueryMC } from "../../api calls/postQueryMc";
import { Container, Stack } from "react-bootstrap";
import Header from "./Header";
import ProgressBarWithLabel from "./ProgressBar";
import Question from "./single select/Question";
import MCQuestion from "./multiple select/MCQuestions";
import { useNavigate } from "react-router-dom";

function Quiz() {
    const { language, section, q_id, id } = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", ""]);
    const [selectedOptionsMC, setSelectedOptionsMC] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [instructions, setInstructions] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [title, setTitle] = useState(
        "If you see this, please refresh the page"
    );
    const [mc, setMc] = useState(false);

    const [extraInfo, setExtraInfo] = useState("");
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            await getQuery(
                section,
                q_id,
                language,
                setQuestion,
                setInstructions,
                setOptions,
                setImageUrl,
                setVideoUrl,
                setMc,
                setTitle
            );
        };

        fetchData();
    }, [section, q_id, language]); // Dependency array is empty so it runs only once on mount

    async function handleFormSubmit() {
        let finalSelectedOption = selectedOption;

        if (section === "3" && q_id === "1" && selectedOption === "Yes") {
            finalSelectedOption =
                selectedOption + " - " + String(counter) + " times";
            setSelectedOption(finalSelectedOption); // Optionally update the state
        }

        if (
            section === "11" &&
            (q_id === "4" || q_id === "7") &&
            selectedOption.includes("Yes") &&
            extraInfo
        ) {
            finalSelectedOption = selectedOption + " - " + extraInfo;
            setSelectedOption(finalSelectedOption); // Optionally update the state
        }
        await postQuery(
            q_id,
            id,
            section,
            language,
            question,
            finalSelectedOption,
            navigate,
            setQuestion,
            setInstructions,
            setOptions,
            setImageUrl,
            setVideoUrl,
            setMc,
            setTitle
        );
        setSelectedOption("");
    }
    async function handleMCFormSubmit() {
        await postQueryMC(
            q_id,
            id,
            section,
            language,
            question,
            selectedOptionsMC,
            setSelectedOptionsMC,
            navigate,
            setQuestion,
            setInstructions,
            setOptions,
            setImageUrl,
            setVideoUrl,
            setMc,
            setTitle
        );
    }
    function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSelectedOption(e.target.value);
    }

    function handleGoBack() {
        navigate(-1);
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

    function containsNumbers(str: string | undefined): boolean {
        if (str === undefined) {
            return false; // or handle it as needed
        }
        const regex = /\d/;
        return regex.test(str);
    }
    return (
        <div>
            <Container>
                <Stack gap={3}>
                    <h1>{title}</h1>
                    {(imageUrl || videoUrl || section !== "3") && (
                        <Header
                            imageUrl={imageUrl}
                            videoUrl={videoUrl}
                            instructions={instructions}
                            haveTimer={section === "3" && q_id === "1"}
                            autoShowInstructions={section === "5"}
                            counter={counter}
                            setCounter={setCounter}
                        />
                    )}

                    {mc && (
                        <Question
                            q_id={q_id}
                            question={question}
                            options={options}
                            selectedOption={selectedOption}
                            onOptionChange={handleOptionChange}
                            onSubmit={() => {
                                if (selectedOption != "") {
                                    handleFormSubmit();
                                }
                            }}
                            onGoBack={handleGoBack}
                            extraInfo={extraInfo}
                            setExtraInfo={setExtraInfo}
                        />
                    )}

                    {!mc && (
                        <MCQuestion
                            q_id={q_id}
                            question={question}
                            options={options}
                            selectedOptions={selectedOptionsMC}
                            onOptionChange={handleOptionsChange}
                            onSubmit={() => {
                                handleMCFormSubmit();
                            }}
                            onGoBack={handleGoBack}
                            allow_no_selected={section === "5"}
                        />
                    )}

                    {containsNumbers(section) && (
                        <ProgressBarWithLabel section={section as string} />
                    )}
                </Stack>
            </Container>
        </div>
    );
}

export default Quiz;
