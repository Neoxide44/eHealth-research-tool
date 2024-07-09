export const postRegisterInfo = async (
    email: string,
    password: string,
    code: string
) => {
    const postData = {
        email: email,
        password: password,
        code: code,
    };

    const endpoint = `http://localhost:3000/register`;

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
