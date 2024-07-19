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

    const [question, setQuestion] = useState("IDk");
    const [options, setOptions] = useState(["idk1", "idk2", "idk3"]);
    const [selectedOptionsMC, setSelectedOptionsMC] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [instructions, setInstructions] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [title, setTitle] = useState("Example Title - 1a");
    const [mc, setMc] = useState(false);

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
        await postQuery(
            q_id,
            id,
            section,
            language,
            question,
            selectedOption,
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

    return (
        <div>
            <Container>
                <Stack gap={3}>
                    <h1>{title}</h1>
                    {(imageUrl || videoUrl || section != "3") && (
                        <Header
                            imageUrl={imageUrl}
                            videoUrl={videoUrl}
                            instructions={instructions}
                            haveTimer={section != "3"}
                        />
                    )}

                    {mc && (
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
                            onGoBack={handleGoBack}
                        />
                    )}

                    {!mc && (
                        <MCQuestion
                            question={question}
                            options={options}
                            selectedOptions={selectedOptionsMC}
                            onOptionChange={handleOptionsChange}
                            onSubmit={() => {
                                handleMCFormSubmit();
                            }}
                            onGoBack={handleGoBack}
                        />
                    )}

                    <ProgressBarWithLabel section={section as string} />
                </Stack>
            </Container>
        </div>
    );
}

export default Quiz;
