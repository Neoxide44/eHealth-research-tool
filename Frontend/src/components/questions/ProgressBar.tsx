import ProgressBar from "react-bootstrap/ProgressBar";

interface Props {
    section: string;
}

function ProgressBarWithLabel(props: Props) {
    let now = 0;

    function transform() {
        if (props.section === "1a") {
            now = 10;
        } else if (props.section === "2" || props.section === "7a") {
            now = 20;
        } else if (
            props.section === "4" ||
            props.section === "1b" ||
            props.section === "7b"
        ) {
            now = 40;
        } else {
            now = parseInt(props.section) * 10;
        }

        return now;
    }

    return (
        <ProgressBar now={transform()} label={`Section: ${props.section}`} />
    );
}

export default ProgressBarWithLabel;
