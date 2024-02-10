// Options.tsx
import React from "react";

interface Props {
    options: string[];
    selectedOptions: string[];
    onOptionChange: React.ChangeEventHandler<HTMLInputElement>;
}

function MCOptions(props: Props) {
    return (
        <div className="options">
            {props.options.map((option, index) => (
                <div key={index} className="form-check">
                    <input
                        type="checkbox"
                        name="option"
                        value={option}
                        checked={props.selectedOptions.includes(option)}
                        onChange={props.onOptionChange}
                        className="form-check-input"
                    />
                    <label className="form-check-label">{option}</label>
                </div>
            ))}
        </div>
    );
}

export default MCOptions;
