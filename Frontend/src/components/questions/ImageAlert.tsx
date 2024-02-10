import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

interface Props {
    imageUrl: string;
}

function ImageAlert(props: Props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" size="sm" onClick={handleShow}>
                <FontAwesomeIcon icon={faCamera} />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
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
        </>
    );
}

export default ImageAlert;
