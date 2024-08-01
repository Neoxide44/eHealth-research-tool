import Table from "react-bootstrap/Table";
import { getOutcomes } from "../../api calls/getOutcomes";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { getAnswers } from "../../api calls/getAnswers";
import { getInfo } from "../../api calls/getInfo";
import { getAnamnesticOutcomes } from "../../api calls/getAnamnesticOutcomes";

interface OutcomeData {
    section: string;
    outcome: string;
    id: string;
    uuid: string;
}
interface AnamnesticOutcomes {
    id: number | null;
    outcome: string;
    q_id: number | null;
}
interface Answers {
    section: string;
    q_id: number;
    question: string;
    answer: string;
}
interface Info {
    id: number | null;
    gender: string;
    year_of_birth: number | null;
    num_edu: number | null;
    language: string;
    participant_code: string;
    uuid: string;
}

function OutcomesTable() {
    const { id } = useParams<{ id: string }>();
    const [outcomeData, setOutcomeData] = useState<OutcomeData[]>([]);
    const [answers, setAnswers] = useState<Answers[]>([]);
    const [info, setInfo] = useState<Info[]>([]);
    const [anamnesticOutcomes, setAnamnesticOutcomes] = useState<
        AnamnesticOutcomes[]
    >([]);
    const [showOutcomes, setShowOutcomes] = useState(true);

    useEffect(() => {
        // Fetch data when component mounts
        getOutcomes(id, setOutcomeData);
        getAnswers(id, setAnswers);
        getAnamnesticOutcomes(id, setAnamnesticOutcomes);
        getInfo(id, setInfo);
    }, []);

    const exportToCsv = () => {
        // Export outcomes to CSV
        let outcomeHeaders = [
            "Gender",
            "Year of Birth",
            "Years Of Education",
            "Language",
            "Participant Code",
        ];
        let outcomeValues = [
            info[0].gender,
            info[0].year_of_birth,
            info[0].num_edu,
            info[0].language,
            info[0].participant_code,
        ];
        outcomeData.map((outcome) => {
            let header = "Section " + outcome.section;
            outcomeHeaders.push(header);
            outcomeValues.push(outcome.outcome);
        });

        anamnesticOutcomes.map((outcome) => {
            let header = "Section 11 Q_ID " + outcome.q_id;
            outcomeHeaders.push(header);
            outcomeValues.push(outcome.outcome);
        });
        const outcomesCsvContent =
            "data:text/csv;charset=utf-8,sep=;\n" +
            outcomeHeaders.join(";") +
            "\n" +
            outcomeValues.join(";");
        const outcomeEncodedUri = encodeURI(outcomesCsvContent);
        const outcomeLink = document.createElement("a");
        outcomeLink.setAttribute("href", outcomeEncodedUri);
        outcomeLink.setAttribute(
            "download",
            `outcomes${info[0].participant_code}.csv`
        );
        document.body.appendChild(outcomeLink);
        outcomeLink.click();

        //Export answers to CSV
        let answerHeaders = [
            "Gender",
            "Year of Birth",
            "Years Of Education",
            "Language",
            "Participant Code",
        ];
        let answerValues = [
            info[0].gender,
            info[0].year_of_birth,
            info[0].num_edu,
            info[0].language,
            info[0].participant_code,
        ];
        answers.map((answer) => {
            let header = "Section " + answer.section + " Q_ID " + answer.q_id;
            answerHeaders.push(header);
            answerValues.push(answer.answer);
        });

        const answerCsvContent =
            "data:text/csv;charset=utf-8,sep=;\n" +
            answerHeaders.join(";") +
            "\n" +
            answerValues.join(";");
        const answerEncodedUri = encodeURI(answerCsvContent);
        const answerLink = document.createElement("a");
        answerLink.setAttribute("href", answerEncodedUri);
        answerLink.setAttribute(
            "download",
            `answers${info[0].participant_code}.csv`
        );
        document.body.appendChild(answerLink);
        answerLink.click();
    };

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Gender</th>
                        <th>Year Of Birth</th>
                        <th>Years Of Education</th>
                        <th>Language</th>
                        <th>Participant Code</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((value, key) => {
                        return (
                            <tr key={key}>
                                <td>{value.gender}</td>
                                <td>{value.year_of_birth}</td>
                                <td>{value.num_edu}</td>
                                <td>{value.language}</td>
                                <td>{value.participant_code}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {showOutcomes && (
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Section</th>
                                <th>Outcome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {outcomeData.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{value.section}</td>
                                        <td>{value.outcome}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Anamnestic Outcome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {anamnesticOutcomes.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{value.outcome}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}
            {!showOutcomes && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Section</th>
                            <th>Question</th>
                            <th>Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {answers.map((value, key) => {
                            if (value.answer === "") {
                                return;
                            } else {
                                return (
                                    <tr key={key}>
                                        <td>{value.section}</td>
                                        <td>{value.question}</td>
                                        <td>{value.answer}</td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </Table>
            )}
            <ButtonGroup className="me-2" aria-label="button group">
                <Button
                    onClick={() => {
                        setShowOutcomes(true);
                    }}
                    disabled={showOutcomes}
                >
                    Show Outcomes
                </Button>
                <Button
                    onClick={() => {
                        setShowOutcomes(false);
                    }}
                    disabled={!showOutcomes}
                >
                    Show Answers
                </Button>
            </ButtonGroup>
            <Button variant="primary" onClick={exportToCsv}>
                Export to CSV
            </Button>
        </div>
    );
}

export default OutcomesTable;
