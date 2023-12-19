import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Box from "@mui/material/Box";
import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
    createStyles({
        image: {
            width: "100%",
            height: "auto",
        },
        closeButton: {
            position: "absolute",
        },
        customBox: {
            // Add your custom styles here
            border: "1px solid #ccc",
        },
    })
);

interface Props {
    imageUrl?: string;
    alertStyles?: React.CSSProperties;
}

const ImageAlert = (props: Props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ width: "100%", position: "relative", ...props.alertStyles }}>
            <IconButton color="primary" aria-label="open" onClick={handleOpen}>
                <PhotoCameraIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {props.imageUrl && (
                        <img
                            src={props.imageUrl}
                            alt="Image"
                            className={classes.image}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ImageAlert;
