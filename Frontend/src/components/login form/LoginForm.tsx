import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postLogin } from "../../api calls/postLogin";
import { Alert } from "react-bootstrap";
import { Container } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [id, setId] = useState("");
    const [validated, setValidated] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertHeading, setAlertHeading] = useState("");
    const [alertText, setAlertText] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent) {
        const form = e.currentTarget as HTMLFormElement;
        let data = "-1";

        data = await postLogin(email, password);
        if (data === "Wrong email") {
            setAlertHeading("Incorrect email address");
            setAlertText("Please try entering your email address again");
            setShowAlert(true);
        } else if (data === "Wrong password") {
            setAlertHeading("Incorrect password");
            setAlertText("Please try entering your password again");
            setShowAlert(true);
        } else if (data != "-1") {
            setId(data);
            navigate(`/patient_form/${data}`);
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

            <Container>
                <h2>Login</h2>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </Button>
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid password
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>{" "}
                    <Link to="/register">
                        Don't have an account? Create one here
                    </Link>
                </Form>
            </Container>
        </div>
    );
}

export default LoginForm;
