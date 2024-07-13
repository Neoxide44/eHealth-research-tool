import React from "react";
import { Button } from "react-bootstrap";
import "./CircleComponent.css";
import { useState } from "react";

interface Answer {
    circle: string;
    quadrant: string;
}

interface Props {
    selectedOption: string;
    onOptionChange: (circle: string, quadrant: string) => void;
    onSubmit: () => void;
}

const CircleComponent: React.FC<Props> = ({
    selectedOption,
    onOptionChange,
    onSubmit,
}) => {
    const [clickedQuadrant, setClickedQuadrant] = useState<Answer>({
        circle: "",
        quadrant: "",
    });
    const handleClick = (circle: string, quadrant: string) => {
        setClickedQuadrant({ circle, quadrant });
        onOptionChange(circle, quadrant);
    };

    return (
        <div className="circle-component">
            <div className="circle-container">
                <div className="circle">
                    <div
                        className={`quadrant top-left ${
                            clickedQuadrant?.circle === "Left" &&
                            clickedQuadrant?.quadrant === "Top Left"
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Left", "Top Left")}
                    ></div>
                    <div
                        className={`quadrant top-right ${
                            clickedQuadrant?.circle === "Left" &&
                            clickedQuadrant?.quadrant === "Top Right"
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Left", "Top Right")}
                    ></div>
                    <div
                        className={`quadrant bottom-left ${
                            clickedQuadrant?.circle === "Left" &&
                            clickedQuadrant?.quadrant === "Bottom Left"
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Left", "Bottom Left")}
                    ></div>
                    <div
                        className={`quadrant bottom-right ${
                            clickedQuadrant?.circle === "Left" &&
                            clickedQuadrant?.quadrant === "Bottom Right"
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Left", "Bottom Right")}
                    ></div>
                </div>
                <div className="circle">
                    <div
                        className={`quadrant top-left ${
                            clickedQuadrant?.circle === "Right" &&
                            clickedQuadrant?.quadrant === "Top Left"
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Right", "Top Left")}
                    ></div>
                    <div
                        className={`quadrant top-right ${
                            clickedQuadrant?.circle === "Right" &&
                            clickedQuadrant?.quadrant === "Top Right"
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Right", "Top Right")}
                    ></div>
                    <div
                        className={`quadrant bottom-left ${
                            clickedQuadrant?.circle === "Right" &&
                            clickedQuadrant?.quadrant === "Bottom Left"
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Right", "Bottom Left")}
                    ></div>
                    <div
                        className={`quadrant bottom-right ${
                            clickedQuadrant?.circle === "Right" &&
                            clickedQuadrant?.quadrant === "Bottom Right"
                                ? "clicked"
                                : ""
                        }`}
                        onClick={() => handleClick("Right", "Bottom Right")}
                    ></div>
                </div>
            </div>
            <Button
                className="submit-button"
                onClick={onSubmit}
                disabled={!selectedOption}
            >
                SUBMIT
            </Button>
        </div>
    );
};

export default CircleComponent;
