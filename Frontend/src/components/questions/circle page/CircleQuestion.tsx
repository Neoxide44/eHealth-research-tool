import React, { useState, useEffect } from "react";
import CircleComponent from "./CircleComponent";
import { Container, Stack } from "react-bootstrap";
import Header from "../Header";
import ProgressBarWithLabel from "../ProgressBar";
import { useNavigate, useParams } from "react-router-dom";
import { getQuery } from "../../../api calls/getQuery";
import { postQuery } from "../../../api calls/postQuery";

const EyeQuestion: React.FC = () => {
    const { section, q_id, id } = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState("IDk");
    const [options, setOptions] = useState(["idk1", "idk2", "idk3"]);
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
    }, []);

    const handleOptionChange = (circle: string, quadrant: string) => {
        setSelectedOption(`${circle} Eye - ${quadrant} Quadrant`);
    };

    async function handleSubmit() {
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

    return (
        <div>
            <Container>
                <Stack gap={3}>
                    <Header
                        imageUrl={imageUrl}
                        videoUrl={videoUrl}
                        instructions={instructions}
                    />

                    <CircleComponent
                        selectedOption={selectedOption}
                        onOptionChange={handleOptionChange}
                        onSubmit={handleSubmit}
                    />
                    <div>
                        <strong>Selected Option: </strong>
                        {selectedOption}
                    </div>
                    <ProgressBarWithLabel section={section as string} />
                </Stack>
            </Container>
        </div>
    );
};

export default EyeQuestion;
