import React, { useState } from "react";
import { Button, Modal, ButtonGroup } from "react-bootstrap";
import { FaXmark, FaCamera, FaInfo } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faInfo } from "@fortawesome/free-solid-svg-icons";
interface Props {
    options: string[];
    selectedOption: string;
    onOptionChange: React.ChangeEventHandler<HTMLInputElement>;
}

function Options(props: Props) {
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [modalInfoContent, setModalInfoContent] = useState("");

    const handleShowInfoModal = (info: string) => {
        setModalInfoContent(info);
        setShowInfoModal(true);
    };
    const handleCloseInfoModal = () => setShowInfoModal(false);

    return (
        <div className="options">
            {props.options.map((option, index) => {
                const [opt, linkToImage, additionalInfo] = option.split(";");
                return (
                    <div key={index} className="form-check">
                        <input
                            type="radio"
                            name="option"
                            value={opt}
                            checked={props.selectedOption === opt}
                            onChange={props.onOptionChange}
                            className="form-check-input"
                        />
                        <label
                            className="form-check-label"
                            style={{ marginRight: "10px" }}
                        >
                            {opt}
                        </label>
                        <ButtonGroup>
                            {linkToImage && (
                                <Button
                                    variant="info"
                                    size="sm"
                                    href={linkToImage ? linkToImage : "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-flex align-items-center"
                                >
                                    <FontAwesomeIcon
                                        icon={faCamera}
                                        className="fa-xs"
                                    />
                                </Button>
                            )}
                            {additionalInfo && (
                                <Button
                                    variant="info"
                                    size="sm"
                                    onClick={() =>
                                        handleShowInfoModal(additionalInfo)
                                    }
                                    className="d-flex align-items-center"
                                >
                                    <FontAwesomeIcon
                                        icon={faInfo}
                                        className="fa-xs"
                                    />
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                );
            })}

            <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Option Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalInfoContent}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseInfoModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Options;
