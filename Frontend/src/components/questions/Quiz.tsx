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
    const { section, q_id, id } = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState("IDk");
    const [options, setOptions] = useState(["idk1", "idk2", "idk3"]);
    const [selectedOptionsMC, setSelectedOptionsMC] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [instructions, setInstructions] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [mc, setMc] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await getQuery(
                section,
                q_id,
                setQuestion,
                setInstructions,
                setOptions,
                setImageUrl,
                setVideoUrl,
                setMc
            );
        };

        fetchData();
    }, []); // Dependency array is empty so it runs only once on mount

    async function handleFormSubmit() {
        await postQuery(
            q_id,
            id,
            section,
            question,
            selectedOption,
            navigate,
            setQuestion,
            setInstructions,
            setOptions,
            setImageUrl,
            setVideoUrl,
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
            setSelectedOptionsMC,
            navigate,
            setQuestion,
            setInstructions,
            setOptions,
            setImageUrl,
            setVideoUrl,
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
        <div>
            <Container>
                <Stack gap={3}>
                    <Header
                        imageUrl={imageUrl}
                        videoUrl={videoUrl}
                        instructions={instructions}
                    />

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
                        />
                    )}

                    {!mc && (
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

                    <ProgressBarWithLabel section={section as string} />
                </Stack>
            </Container>
        </div>
    );
}

export default Quiz;
