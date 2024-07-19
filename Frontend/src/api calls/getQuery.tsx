export const getQuery = async (
    section: string | undefined,
    q_id: string | undefined,
    language: string | undefined,
    setQuestion: React.Dispatch<React.SetStateAction<string>>,
    setInstructions: React.Dispatch<React.SetStateAction<string>>,
    setOptions: React.Dispatch<React.SetStateAction<string[]>>,
    setImageUrl: React.Dispatch<React.SetStateAction<string>>,
    setVideoUrl: React.Dispatch<React.SetStateAction<string>>,
    setMc: React.Dispatch<React.SetStateAction<boolean>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>
) => {
    const endpoint = `http://localhost:3000/queries/${section}/${q_id}/${language}`;

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setQuestion(data.question);
        setInstructions(data.instructions);
        setOptions(data.answers);
        setImageUrl(data.imageUrl);
        setVideoUrl(data.videoUrl);
        setMc(data.mc);
        setTitle(data.title);
    } catch (error) {
        console.error("Error:", error);
        throw error; // Propagate the error up if needed
    }
};
