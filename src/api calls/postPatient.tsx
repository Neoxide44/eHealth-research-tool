export const postPatient = async (
    firstName: string,
    lastName: string,
    date: Date
) => {
    const postData = {
        firstName: firstName,
        lastName: lastName,
        date: date,
    };

    const endpoint = `http://localhost:3000/patients/patient`;

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

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error; // Propagate the error up if needed
    }
};
