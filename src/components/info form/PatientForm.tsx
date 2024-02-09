import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { postPatient } from "../../api calls/postPatient";
import { useParams, useNavigate } from "react-router-dom";

function PatientForm() {
    const { id } = useParams<{ id: string }>();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [date, setDate] = useState(new Date());

    const navigate = useNavigate();

    async function handleSubmit() {
        const data = await postPatient(firstName, lastName, date, id);
        console.log(data);
        navigate(`/quiz/1a/1/${id}`);
    }

    return (
        <div>
            <h2>Enter Patient Info</h2>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter first name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter last name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="dateofbirth">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name="dateofbirth"
                        placeholder="Date of birth"
                        onChange={(e) => setDate(new Date(e.target.value))}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default PatientForm;
