interface Answers {
    section: string;
    q_id: number;
    question: string;
    answer: string;
}

export const getAnswers = async (
    id: string | undefined,
    setData: React.Dispatch<React.SetStateAction<Answers[]>>
) => {
    const endpoint = `http://localhost:3000/answers/${id}`;
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
        setData(data);
    } catch (error) {
        console.error("Error:", error);
        throw error; // Propagate the error up if needed
    }
};
