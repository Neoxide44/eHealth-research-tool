import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";
import { faInfo, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./InstructionAlert.css";

interface Props {
    imageUrl: string;
    instructions: string;
}

function Header(props: Props) {
    const [showInstructions, setShowInstructions] = useState(false);
    const [showImage, setShowImage] = useState(false);

    const handleCloseImage = () => setShowImage(false);
    const handleCloseInstructions = () => setShowInstructions(false);
    const handleShowImage = () => setShowImage(true);
    const handleShowInstructions = () => setShowInstructions(true);

    return (
        <div>
            <Alert
                show={showInstructions}
                variant="primary"
                style={{ width: "800px" }}
            >
                <p>{props.instructions}</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={handleCloseInstructions} variant="primary">
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                </div>
            </Alert>
            <ButtonGroup aria-label="Basic example">
                <Button
                    variant="primary"
                    size="sm"
                    onClick={handleShowInstructions}
                >
                    <FontAwesomeIcon icon={faInfo} />
                </Button>
                <Button variant="primary" size="sm" onClick={handleShowImage}>
                    <FontAwesomeIcon icon={faCamera} />
                </Button>
            </ButtonGroup>
            <Modal
                show={showImage}
                onHide={handleCloseImage}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <img
                        src={props.imageUrl}
                        className="img-fluid"
                        alt="Image"
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Header;
