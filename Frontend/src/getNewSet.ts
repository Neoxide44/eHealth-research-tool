export const fetchFormData = async (
    section: string,
    question: string,
    instructions: string,
    answer: string
) => {
    const postData = {
        section: section,
        question: question,
        instructions: instructions,
        answer: answer,
    };

    const endpoint = `http://localhost:3000/queries/query/${section}`;

    console.log("Post data = " + JSON.stringify(postData));

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
