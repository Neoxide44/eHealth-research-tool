import * as React from "react";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

interface Props {
    text: string;
    alertStyles?: React.CSSProperties; // Add a prop for custom styles
}

const InstructionsAlert = (props: Props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Box sx={{ width: "100%", position: "relative", ...props.alertStyles }}>
            <Collapse in={open}>
                <Alert
                    variant="filled"
                    severity="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {props.text}
                </Alert>
            </Collapse>
            <IconButton
                color="primary"
                disabled={open}
                onClick={() => {
                    setOpen(true);
                }}
            >
                <InfoIcon fontSize="inherit" />
            </IconButton>
        </Box>
    );
};

export default InstructionsAlert;
