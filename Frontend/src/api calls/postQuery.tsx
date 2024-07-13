import { useNavigate } from "react-router-dom";
import { getQuery } from "./getQuery";

export const postQuery = async (
    q_id: string | undefined,
    id: string | undefined,
    section: string | undefined,
    question: string,
    answer: string,
    navigate: ReturnType<typeof useNavigate>,
    setQuestion: React.Dispatch<React.SetStateAction<string>>,
    setInstructions: React.Dispatch<React.SetStateAction<string>>,
    setOptions: React.Dispatch<React.SetStateAction<string[]>>,
    setImageUrl: React.Dispatch<React.SetStateAction<string>>,
    setVideoUrl: React.Dispatch<React.SetStateAction<string>>,
    setMc: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const postData = {
        id: id,
        section: section,
        q_id: q_id,
        question: question,
        answer: answer,
    };

    const endpoint = `http://localhost:3000/queries/${section}/${q_id}`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const nextQ = await response.json();

        if (nextQ.nextSection === "42") {
            navigate(`/outcome/${id}`);
            location.reload();
        } else if (nextQ.nextSection === "9" && nextQ.nextQuestion === 4) {
            navigate(
                `/circle/${nextQ.nextSection}/${nextQ.nextQuestion}/${id}`
            );
            location.reload();
        } else {
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
            navigate(`/quiz/${nextQ.nextSection}/${nextQ.nextQuestion}/${id}`);
            location.reload();
        }
    } catch (error) {
        console.error("Error:", error);
        throw error; // Propagate the error up if needed
    }
};
