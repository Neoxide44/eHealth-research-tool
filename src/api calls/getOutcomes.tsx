interface OutcomeData {
    section: string;
    outcome: string;
    id: string;
    uuid: string;
}

export const getOutcomes = async (
    id: string,
    setData: React.Dispatch<React.SetStateAction<OutcomeData[]>>
) => {
    const endpoint = `http://localhost:3000/outcome/${id}`;
    console.log(endpoint);

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
