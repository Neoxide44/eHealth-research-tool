import { useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {
    FaXmark,
    FaCamera,
    FaInfo,
    FaVideo,
    FaStopwatch,
} from "react-icons/fa6";
import "./InstructionAlert.css";
import "./HeaderButtons.css";
import { Modal } from "react-bootstrap";
import Stopwatch from "./Stopwatch";
import Counter from "./Counter";

interface Props {
    imageUrl: string;
    instructions: string;
    videoUrl: string;
    haveTimer: boolean;
    autoShowInstructions: boolean;
}

function Header(props: Props) {
    const [showInstructions, setShowInstructions] = useState(
        props.autoShowInstructions
    );
    const [showStopwatch, setShowStopwatch] = useState(false);

    const handleCloseInstructions = () => setShowInstructions(false);
    const handleShowInstructions = () => setShowInstructions(true);

    const handleCloseStopwatch = () => setShowStopwatch(false);
    const handleShowStopwatch = () => setShowStopwatch(true);

    return (
        <div>
            {/* Instructions */}
            <Alert
                show={showInstructions}
                variant="primary"
                style={{ width: "800px" }}
            >
                <p>{props.instructions}</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={handleCloseInstructions} variant="primary">
                        <FaXmark />
                    </Button>
                </div>
            </Alert>

            {/*Timer */}
            <Modal show={showStopwatch} onHide={handleCloseStopwatch}>
                <Modal.Header closeButton>
                    <Modal.Title>Stopwatch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stopwatch />
                    <Counter />
                </Modal.Body>
            </Modal>

            {/* Buttons */}
            <ButtonGroup>
                {props.instructions && (
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={handleShowInstructions}
                        className="button-icon"
                    >
                        <FaInfo />
                    </Button>
                )}
                {props.imageUrl && (
                    <Button
                        variant="primary"
                        size="sm"
                        as="a"
                        href={props.imageUrl ? props.imageUrl : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-icon"
                    >
                        <FaCamera />
                    </Button>
                )}
                {props.videoUrl && (
                    <Button
                        variant="primary"
                        size="sm"
                        as="a"
                        href={props.videoUrl ? props.videoUrl : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-icon"
                    >
                        <FaVideo />
                    </Button>
                )}
                {props.haveTimer && (
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={handleShowStopwatch}
                        className="button-icon"
                    >
                        <FaStopwatch />
                    </Button>
                )}
            </ButtonGroup>
        </div>
    );
}

export default Header;
