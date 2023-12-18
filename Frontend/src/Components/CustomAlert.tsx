import * as React from "react";
import { Box, Alert, IconButton, Collapse, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
    text: string;
    alertStyles?: React.CSSProperties; // Add a prop for custom styles
}

const CustomAlert = (props: Props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Box sx={{ width: "100%", position: "relative", ...props.alertStyles }}>
            <Collapse in={open}>
                <Alert
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
            <Button
                disabled={open}
                variant="contained"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Instructions
            </Button>
        </Box>
    );
};

export default CustomAlert;
