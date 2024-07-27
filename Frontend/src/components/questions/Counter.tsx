import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Counter = () => {
    const [counter, setCounter] = useState(0);

    const handleIncrement = () => {
        setCounter((prevCounter) => prevCounter + 1);
    };

    const handleDecrement = () => {
        setCounter((prevCounter) => prevCounter - 1);
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
                    {counter}
                </span>
                <Button variant="primary" onClick={handleIncrement}>
                    +
                </Button>
            </div>
        </div>
    );
};

export default Counter;
