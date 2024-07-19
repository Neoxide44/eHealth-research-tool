import React from "react";
import "./WarningPage.css";
import { Button, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function WarningPage() {
    const { language, section, q_id, id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="App">
            <div className="container">
                <div className="content">
                    <h1>
                        Please inform the participant that the following section
                        might cause discomfort.
                    </h1>
                    <ButtonGroup>
                        <Button
                            onClick={() => {
                                navigate(
                                    `/quiz/${language}/${section}/${q_id}/${id}`
                                );
                            }}
                        >
                            Continue
                        </Button>
                        <Button
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Go Back
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
}

export default WarningPage;
