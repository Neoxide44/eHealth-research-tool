import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import "./CircleComponent.css";
import { useState } from "react";

interface Answer {
    circle: string;
    quadrant: string;
}

interface Props {
    selectedOptions: string[];
    onOptionChange: (selectedOptions: string[]) => void;
    onGoBack: () => void;
    onSubmit: () => void;
}

const CircleComponent: React.FC<Props> = ({
    selectedOptions,
    onOptionChange,
    onSubmit,
    onGoBack,
}) => {
    const handleClick = (circle: string, quadrant: string) => {
        const option = `${circle} Eye - ${quadrant} Quadrant`;
        let updatedOptions;
        if (selectedOptions.includes(option)) {
            updatedOptions = selectedOptions.filter(
                (selectedOption) => selectedOption !== option
            );
        } else {
            updatedOptions = [...selectedOptions, option];
        }
        onOptionChange(updatedOptions);
    };

    return (
        <div className="circle-component">
            <div className="circle-container">
                <div className="circle-wrapper">
                    <div className="circle">
                        <div
                            className={`quadrant top-left ${
                                selectedOptions.includes(
                                    "Right Eye - Top External Quadrant"
                                )
                                    ? "clicked"
                                    : ""
                            }`}
                            onClick={() => handleClick("Right", "Top External")}
                        ></div>
                        <div
                            className={`quadrant top-right ${
                                selectedOptions.includes(
                                    "Right Eye - Top Internal Quadrant"
                                )
                                    ? "clicked"
                                    : ""
                            }`}
                            onClick={() => handleClick("Right", "Top Internal")}
                        ></div>
                        <div
                            className={`quadrant bottom-left ${
                                selectedOptions.includes(
                                    "Right Eye - Bottom External Quadrant"
                                )
                                    ? "clicked"
                                    : ""
                            }`}
                            onClick={() =>
                                handleClick("Right", "Bottom External")
                            }
                        ></div>
                        <div
                            className={`quadrant bottom-right ${
                                selectedOptions.includes(
                                    "Right Eye - Bottom Internal Quadrant"
                                )
                                    ? "clicked"
                                    : ""
                            }`}
                            onClick={() =>
                                handleClick("Right", "Bottom Internal")
                            }
                        ></div>
                    </div>
                    <div className="label">Right Eye</div>
                </div>
                <div className="circle-wrapper">
                    <div className="circle">
                        <div
                            className={`quadrant top-left ${
                                selectedOptions.includes(
                                    "Left Eye - Top Internal Quadrant"
                                )
                                    ? "clicked"
                                    : ""
                            }`}
                            onClick={() => handleClick("Left", "Top Internal")}
                        ></div>
                        <div
                            className={`quadrant top-right ${
                                selectedOptions.includes(
                                    "Left Eye - Top External Quadrant"
                                )
                                    ? "clicked"
                                    : ""
                            }`}
                            onClick={() => handleClick("Left", "Top External")}
                        ></div>
                        <div
                            className={`quadrant bottom-left ${
                                selectedOptions.includes(
                                    "Left Eye - Bottom Internal Quadrant"
                                )
                                    ? "clicked"
                                    : ""
                            }`}
                            onClick={() =>
                                handleClick("Left", "Bottom Internal")
                            }
                        ></div>
                        <div
                            className={`quadrant bottom-right ${
                                selectedOptions.includes(
                                    "Left Eye - Bottom External Quadrant"
                                )
                                    ? "clicked"
                                    : ""
                            }`}
                            onClick={() =>
                                handleClick("Left", "Bottom External")
                            }
                        ></div>
                    </div>
                    <div className="label">Left Eye</div>
                </div>
            </div>
            <ButtonGroup>
                <Button
                    className="submit-button"
                    onClick={onSubmit}
                    disabled={selectedOptions.length === 0}
                >
                    Submit Answer
                </Button>
                <Button
                    className="submit-button"
                    onClick={() => {
                        onGoBack();
                    }}
                >
                    Previous Question
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default CircleComponent;
