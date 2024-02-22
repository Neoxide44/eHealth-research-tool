import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Alert, Container } from "react-bootstrap";
import { postRegisterInfo } from "../../api calls/postRegisterInfo.tsx";
import { Link } from "react-router-dom";

function RegisterForm() {
    const [validated, setValidated] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertHeading, setAlertHeading] = useState("");
    const [alertText, setAlertText] = useState("");

    async function handleSubmit(e: FormEvent) {
        const form = e.currentTarget as HTMLFormElement;
        let data = "-1";
        if (form.checkValidity() === false) {
        }
        if (password === confirmPassword) {
            data = await postRegisterInfo(email, password);
        } else {
            setAlertHeading("Passwords don't match");
            setAlertText("Please try entering them again");
            setShowAlert(true);
        }

        if (data === "Email already in use") {
            setAlertHeading("Email already in use");
            setAlertText("Please try entering a different email address");
            setShowAlert(true);
        } else if (data === "Success") {
            setSuccess(true);
            setShowAlert(false);
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
            {!success && (
                <div>
                    <Container>
                        <h2>Register</h2>
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
                                controlId="formBasicEmail"
                            >
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
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        required
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />

                                    <Button
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <FaEye />
                                        ) : (
                                            <FaEyeSlash />
                                        )}
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid password
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="confirmPassword"
                            >
                                <Form.Label>Confirm Password</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        required
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirm Password"
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />

                                    <Button
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <FaEye />
                                        ) : (
                                            <FaEyeSlash />
                                        )}
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid password
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>{" "}
                            <Link to="/">
                                Already have an account? Login here
                            </Link>
                        </Form>
                    </Container>
                </div>
            )}
            {success && (
                <div>
                    <h2>Credentials created!</h2>
                    <Link to="/">
                        <Button>Click me to go to login page</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default RegisterForm;
