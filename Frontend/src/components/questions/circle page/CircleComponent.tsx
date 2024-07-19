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
                <div className="circle">
                    <div
                        className={`quadrant top-left ${
                            selectedOptions.includes(
                                "Right Eye - Top Left Quadrant"
                            )
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Right", "Top Left")}
                    ></div>
                    <div
                        className={`quadrant top-right ${
                            selectedOptions.includes(
                                "Right Eye - Top Right Quadrant"
                            )
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Right", "Top Right")}
                    ></div>
                    <div
                        className={`quadrant bottom-left ${
                            selectedOptions.includes(
                                "Right Eye - Bottom Left Quadrant"
                            )
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Right", "Bottom Left")}
                    ></div>
                    <div
                        className={`quadrant bottom-right ${
                            selectedOptions.includes(
                                "Right Eye - Bottom Right Quadrant"
                            )
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Right", "Bottom Right")}
                    ></div>
                </div>
                <div className="circle">
                    <div
                        className={`quadrant top-left ${
                            selectedOptions.includes(
                                "Left Eye - Top Left Quadrant"
                            )
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Left", "Top Left")}
                    ></div>
                    <div
                        className={`quadrant top-right ${
                            selectedOptions.includes(
                                "Left Eye - Top Right Quadrant"
                            )
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Left", "Top Right")}
                    ></div>
                    <div
                        className={`quadrant bottom-left ${
                            selectedOptions.includes(
                                "Left Eye - Bottom Left Quadrant"
                            )
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Left", "Bottom Left")}
                    ></div>
                    <div
                        className={`quadrant bottom-right ${
                            selectedOptions.includes(
                                "Left Eye - Bottom Right Quadrant"
                            )
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Left", "Bottom Right")}
                    ></div>
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
