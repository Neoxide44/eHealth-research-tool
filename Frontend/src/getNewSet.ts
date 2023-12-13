export const fetchFormData = async (
    section: string,
    question: string,
    instructions: string,
    answers: string[]
) => {
    const postData = {
        section: section,
        question: question,
        instructions: instructions,
        answers: answers,
    };

    const endpoint = `http://localhost:3000/queries/query/${section}`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Add any other headers if needed
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error; // Propagate the error up if needed
    }
};
