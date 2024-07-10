import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { postResearchCode } from "../../api calls/postResearchCode";
import { useNavigate } from "react-router-dom";

function ProjectCodeForm() {
    const [validated, setValidated] = useState(false);

    const [code, setCode] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const [alertHeading, setAlertHeading] = useState("");
    const [alertText, setAlertText] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent) {
        const form = e.currentTarget as HTMLFormElement;
        let data = "-1";
        if (form.checkValidity() === false) {
        }

        data = await postResearchCode(code);

        if (data == "Incorrect researcher code") {
            setAlertHeading("Incorrect researcher code");
            setAlertText("Please try entering a different researcher code");
            setShowAlert(true);
        } else if (data === "Success") {
            setShowAlert(false);
            navigate(`/login`);
        }

        setValidated(true);
    }

    return (
        <div>
            {showAlert && (
                <Alert
                    variant="danger"
                    onClose={() => setShowAlert(false)}
                    dismissible
                >
                    <Alert.Heading>{alertHeading}</Alert.Heading>
                    <p>{alertText}</p>
                </Alert>
            )}
            {
                <div>
                    <Container>
                        <h2>Project Code</h2>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(e);
                            }}
                        >
                            <Form.Group
                                className="mb-3"
                                controlId="formResearcherCode"
                            >
                                <Form.Label>Project Code</Form.Label>
                                <Form.Control
                                    required
                                    type="researcher code"
                                    placeholder="Enter project code"
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid project code
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>{" "}
                        </Form>
                    </Container>
                </div>
            }
        </div>
    );
}

export default ProjectCodeForm;
