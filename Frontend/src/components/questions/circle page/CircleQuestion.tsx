import React, { useState, useEffect } from "react";
import CircleComponent from "./CircleComponent";
import { Container, Stack } from "react-bootstrap";
import Header from "../Header";
import ProgressBarWithLabel from "../ProgressBar";
import { useNavigate, useParams } from "react-router-dom";
import { getQuery } from "../../../api calls/getQuery";
import { postQuery } from "../../../api calls/postQuery";
import "./EyeQuestion.css"; // Import the new CSS file

const EyeQuestion: React.FC = () => {
    const { language, section, q_id, id } = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState("IDk");
    const [options, setOptions] = useState(["idk1", "idk2", "idk3"]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [instructions, setInstructions] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [mc, setMc] = useState(false);
    const [title, setTitle] = useState("");

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

    const handleOptionChange = (updatedOptions: string[]) => {
        setSelectedOptions(updatedOptions);
    };

    async function handleSubmit() {
        await postQuery(
            q_id,
            id,
            section,
            language,
            question,
            selectedOptions.join(", "),
            navigate,
            setQuestion,
            setInstructions,
            setOptions,
            setImageUrl,
            setVideoUrl,
            setMc,
            setTitle
        );
        setSelectedOptions([]);
    }
    function handleGoBack() {
        navigate(-1);
    }

    return (
        <div className="eye-question">
            <Container>
                <Stack gap={3}>
                    <h1>{title}</h1>
                    <Header
                        imageUrl={imageUrl}
                        videoUrl={videoUrl}
                        instructions={instructions}
                        haveTimer={section != "3"}
                    />

                    <CircleComponent
                        selectedOptions={selectedOptions}
                        onOptionChange={handleOptionChange}
                        onSubmit={handleSubmit}
                        onGoBack={handleGoBack}
                    />
                    <div className="selected-options-container">
                        <strong>Selected Options: </strong>
                        <div className="selected-options">
                            {selectedOptions.map((option, index) => (
                                <div key={index} className="selected-option">
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                    <ProgressBarWithLabel section={section as string} />
                </Stack>
            </Container>
        </div>
    );
};

export default EyeQuestion;
