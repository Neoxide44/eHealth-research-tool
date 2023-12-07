import React from "react";
import { TextField } from "@mui/material";

type CustomTextFieldProps = {
    label: string;
    name: string;
    type: string;
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomTextField = (props: CustomTextFieldProps) => {
    return (
        <div>
            <TextField
                label={props.label}
                id={props.name} // Ensure id is set to the name
                name={props.name}
                type={props.type}
                onChange={props.changeHandler}
                variant="outlined"
                size="small"
                margin="dense"
                required={true}
            />
        </div>
    );
};

export default CustomTextField;
