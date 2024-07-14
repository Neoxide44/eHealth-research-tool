import React from "react";
import { useStopwatch } from "react-timer-hook";
import { Button, ButtonGroup } from "react-bootstrap";

function Stopwatch() {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Stopwatch</h1>
            <div style={{ fontSize: "100px" }}>
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
                <span>{seconds}</span>
            </div>
            <p>{isRunning ? "Running" : "Not running"}</p>
            <ButtonGroup aria-label="Basic example">
                <Button variant="primary" onClick={() => start()}>
                    Start
                </Button>
                <Button variant="primary" onClick={() => pause()}>
                    Pause
                </Button>
                <Button variant="primary" onClick={() => reset()}>
                    Reset
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default Stopwatch;
