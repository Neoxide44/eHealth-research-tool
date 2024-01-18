import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./InstructionAlert.css";

interface Props {
    instructions: string;
}

function InstructionAlert(props: Props) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <Alert show={show} variant="primary" style={{ width: "725px" }}>
                <p>{props.instructions}</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="primary">
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                </div>
            </Alert>
            {!show && (
                <Button
                    onClick={() => setShow(true)}
                    size="sm"
                    variant="primary"
                >
                    <FontAwesomeIcon icon={faInfo} />
                </Button>
            )}
        </div>
    );
}

export default InstructionAlert;
