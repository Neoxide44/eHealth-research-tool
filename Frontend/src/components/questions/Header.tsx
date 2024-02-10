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
            <Button
                variant="primary"
                size="sm"
                onClick={handleShowInstructions}
            >
                <FaInfo />
            </Button>
            <a href={props.imageUrl} target="_blank">
                <Button variant="primary" size="sm">
                    <FaCamera />
                </Button>
            </a>
            <a href={props.videoUrl} target="_blank">
                <Button variant="primary" size="sm">
                    <FaVideo />
                </Button>
            </a>
        </div>
    );
}

export default Header;
