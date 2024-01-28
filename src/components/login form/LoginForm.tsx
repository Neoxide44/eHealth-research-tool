import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postLogin } from "../../api calls/postLogin";

interface Props {
    setId: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: () => void;
}

function LoginForm(props: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit() {
        const data = await postLogin(email, password);
        console.log(data);
        props.setId(data);
    }

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                props.onSubmit();
            }}
        >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label htmlFor="basic-url">Password</Form.Label>
                <InputGroup>
                    <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default LoginForm;
