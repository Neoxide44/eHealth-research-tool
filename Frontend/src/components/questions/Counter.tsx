import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface Props {
    counter: number;
    setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const Counter = (props: Props) => {
    const handleIncrement = () => {
        props.setCounter((prevCounter) => prevCounter + 1);
    };

    const handleDecrement = () => {
        props.setCounter((prevCounter) => prevCounter - 1);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Counter</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                }}
            >
                <Button variant="primary" onClick={handleDecrement}>
                    -
                </Button>
                <span style={{ margin: "0 10px", fontSize: "1.2em" }}>
                    {props.counter}
                </span>
                <Button variant="primary" onClick={handleIncrement}>
                    +
                </Button>
            </div>
        </div>
    );
};

export default Counter;
