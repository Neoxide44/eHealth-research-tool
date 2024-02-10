import React from "react";

interface Props {
    options: string[];
    selectedOption: string;
    onOptionChange: React.ChangeEventHandler<HTMLInputElement>;
}

function Options(props: Props) {
    return (
        <div className="options">
            {props.options.map((option, index) => (
                <div key={index} className="form-check">
                    <input
                        type="radio"
                        name="option"
                        value={option}
                        checked={props.selectedOption === option}
                        onChange={props.onOptionChange}
                        className="form-check-input"
                    />
                    <label className="form-check-label">{option}</label>
                </div>
            ))}
        </div>
    );
}

export default Options;
