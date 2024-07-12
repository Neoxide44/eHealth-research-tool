import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert, Container, Row, Col } from "react-bootstrap";
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
        <Container className="d-flex flex-column vh-100 justify-content-center align-items-center">
            <Row className="text-center">
                <Col>
                    <h2>Welcome to the NeuroEpiTool</h2>
                    <h3>
                        A research tool to assess neurological
                        function/outcomes.
                    </h3>
                    <h3>
                        Learn more about the tool and how to use it in our
                        manual.
                    </h3>
                </Col>
            </Row>
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
            <Row className="mt-4 text-center">
                <Col className="d-flex justify-content-center align-items-center">
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
                            <Form.Label className="fs-4">
                                Project Code
                            </Form.Label>
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
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-auto text-center">
                <Col>
                    <p>
                        NeuroEpiTool created by: Vasco Ribeiro Ferreira, Stefan
                        Malinovski, Fadi Mohsen, Esther Metting & Valentina
                        Gallo
                    </p>
                    <p>Illustrations by: Leonardo Silva</p>
                </Col>
            </Row>
        </Container>
    );
}

export default ProjectCodeForm;
