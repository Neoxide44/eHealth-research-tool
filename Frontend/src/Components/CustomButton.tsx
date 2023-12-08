import React from "react";
import { Button } from "@mui/material";

interface Props {
    text: string;
    onClick: () => void;
}

function CustomButton(props: Props) {
    return (
        <Button onClick={props.onClick} size="large">
            {props.text}
        </Button>
    );
}

export default CustomButton;
