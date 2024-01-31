import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postLogin } from "../../api calls/postLogin";
import { Alert } from "react-bootstrap";
import { Container } from "react-bootstrap";

interface Props {
    setId: React.Dispatch<React.SetStateAction<string>>;
}

function LoginForm(props: Props) {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertHeading, setAlertHeading] = useState("");
    const [alertText, setAlertText] = useState("");

    async function handleSubmit(e: FormEvent) {
        const form = e.currentTarget as HTMLFormElement;
        let data = "-1";
        if (form.checkValidity() === false) {
            console.log("idk");
        }

        data = await postLogin(email, password);

        console.log(email);
        console.log(password);
        console.log(data);

        if (data === "Wrong email") {
            setAlertHeading("Incorrect email address");
            setAlertText("Please try entering your email address again");
            setShowAlert(true);
        } else if (data === "Wrong password") {
            setAlertHeading("Incorrect password");
            setAlertText("Please try entering your password again");
            setShowAlert(true);
        } else if (data != "-1") {
            props.setId(data);
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
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default LoginForm;
