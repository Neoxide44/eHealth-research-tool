import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { postPatient } from "../../api calls/postPatient";
import { useParams, useNavigate } from "react-router-dom";

function PatientForm() {
    const { id } = useParams<{ id: string }>();
    const [gender, setGender] = useState("");
    const [year, setYear] = useState("");
    const [edu, setEdu] = useState(0);
    const [language, setLanguage] = useState("");
    const [participantCode, setParticipantCode] = useState("");
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();

    const generateYearOptions = () => {
        const startYear = 1900;
        const endYear = new Date().getFullYear();
        const years = [];
        for (let i = endYear; i >= startYear; i--) {
            years.push(i);
        }
        return years;
    };

    const handleEduChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (
            value === "" ||
            (Number(value) >= 0 && Number.isInteger(Number(value)))
        ) {
            setEdu(Number(value));
        }
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const data = await postPatient(
                gender,
                edu,
                year,
                language,
                participantCode,
                id
            );
            navigate(`/quiz/1a/1/${id}`);
        }
        setValidated(true);
    }

    return (
        <div>
            <h2>Participant Information</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="selectGender">
                    <Form.Label className="fs-5">Gender</Form.Label>
                    <Form.Control
                        as="select"
                        value={gender}
                        required
                        isInvalid={validated && !gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please select a gender.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="yearofbirth">
                    <Form.Label className="fs-5">Year of Birth</Form.Label>
                    <Form.Control
                        as="select"
                        name="yearofbirth"
                        value={year}
                        required
                        isInvalid={validated && !year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option value="">Select Year</option>
                        {generateYearOptions().map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please select a year.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="yearsOfEducation">
                    <Form.Label className="fs-5">Years Of Education</Form.Label>
                    <Form.Control
                        type="number"
                        value={edu}
                        placeholder="Enter years of education"
                        required
                        isInvalid={validated && edu < 0}
                        onChange={handleEduChange}
                        min="0"
                        step="1"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid number of years of education.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="selectLanguage">
                    <Form.Label className="fs-5">Language</Form.Label>
                    <Form.Control
                        as="select"
                        value={language}
                        required
                        isInvalid={validated && !language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="">Select Language</option>
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Italian">Italian</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Portuguese">Portugese</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Turkish">Turkish</option>
                        <option value="Dutch">Dutch</option>
                        <option value="Indonesian">Indonesian</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please select a language.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCode">
                    <Form.Label className="fs-5">Participant Code</Form.Label>
                    <br />
                    <Form.Label className="fs-6">
                        (Preferably do not include any identifiable or personal
                        information -
                    </Form.Label>
                    <br />
                    <Form.Label className="fs-6">
                        data will be deleted from the tool after downloading)
                    </Form.Label>
                    <Form.Control
                        type="text"
                        required
                        placeholder="Enter participant code"
                        isInvalid={validated && !participantCode}
                        onChange={(e) => setParticipantCode(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid participant code.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default PatientForm;
