import { getQuery } from "./getQuery";

export const postQueryMC = async (
    q_id: string,
    id: string,
    section: string,
    question: string,
    answer: string[],
    setSection: React.Dispatch<React.SetStateAction<string>>,
    setQ_id: React.Dispatch<React.SetStateAction<string>>,
    setQuestion: React.Dispatch<React.SetStateAction<string>>,
    setInstructions: React.Dispatch<React.SetStateAction<string>>,
    setOptions: React.Dispatch<React.SetStateAction<string[]>>,
    setImageUrl: React.Dispatch<React.SetStateAction<string>>,
    setVideoUrl: React.Dispatch<React.SetStateAction<string>>,
    setMc: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedOptionsMC: React.Dispatch<React.SetStateAction<string[]>>
) => {
    const postData = {
        id: id,
        section: section,
        q_id: q_id,
        question: question,
        answer: answer,
    };

    const endpoint = `http://localhost:3000/queries/${section}/${q_id}`;

    console.log("Postind data: ", postData, "to endpoint :", endpoint);

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
        setSection(nextQ.nextSection);
        setQ_id(nextQ.nextQuestion);
        setSelectedOptionsMC([]);

        await getQuery(
            nextQ.nextSection,
            nextQ.nextQuestion,
            setQuestion,
            setInstructions,
            setOptions,
            setImageUrl,
            setVideoUrl,
            setMc
        );
    } catch (error) {
        console.error("Error:", error);
        throw error; // Propagate the error up if needed
    }
};
