import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import { FaXmark, FaCamera, FaInfo, FaVideo } from "react-icons/fa6";
import "./InstructionAlert.css";

interface Props {
    imageUrl: string;
    instructions: string;
    videoUrl: string;
}

function Header(props: Props) {
    const [showInstructions, setShowInstructions] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    const handleCloseImage = () => setShowImage(false);
    const handleCloseInstructions = () => setShowInstructions(false);
    const handleCloseVideo = () => setShowVideo(false);

    const handleShowImage = () => setShowImage(true);
    const handleShowInstructions = () => setShowInstructions(true);
    const handleShowVideo = () => setShowVideo(true);

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

            {/* Buttons */}
            <ButtonGroup aria-label="Basic example">
                <Button
                    variant="primary"
                    size="sm"
                    onClick={handleShowInstructions}
                >
                    <FaInfo />
                </Button>
                <Button variant="primary" size="sm" onClick={handleShowImage}>
                    <FaCamera />
                </Button>
                <Button variant="primary" size="sm" onClick={handleShowVideo}>
                    <FaVideo />
                </Button>
            </ButtonGroup>

            {/* Image */}
            <Modal
                show={showImage}
                onHide={handleCloseImage}
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <iframe
                        src={props.imageUrl}
                        width="100%"
                        height="480"
                        allow="autoplay"
                    ></iframe>
                </Modal.Body>
            </Modal>

            {/* Video */}
            <Modal
                show={showVideo}
                onHide={handleCloseVideo}
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <iframe
                        src={props.videoUrl}
                        width="100%"
                        height="480"
                        allow="autoplay"
                    ></iframe>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Header;
