import Table from "react-bootstrap/Table";
import { getOutcomes } from "../../api calls/getOutcomes";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { getAnswers } from "../../api calls/getAnswers";
import { getInfo } from "../../api calls/getInfo";

interface OutcomeData {
    section: string;
    outcome: string;
    id: string;
    uuid: string;
}
interface Answers {
    section: string;
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
    const [showOutcomes, setShowOutcomes] = useState(true);

    useEffect(() => {
        // Fetch data when component mounts
        getOutcomes(id, setOutcomeData);
        getAnswers(id, setAnswers);
        getInfo(id, setInfo);
    }, []);

    const exportToCsv = () => {
        // Export outcomes to CSV
        const outcomeHeaders = [
            "Gender",
            "Year of Birth",
            "Years Of Education",
            "Language",
            "Participant Code",
            "Section",
            "Outcome",
        ];

        let isFirstRow = true;

        const outcomeCsvContent =
            "data:text/csv;charset=utf-8," +
            outcomeHeaders.join(",") +
            "\n" +
            outcomeData
                .map((row) => {
                    if (isFirstRow) {
                        isFirstRow = false;
                        return `${info[0].gender},${info[0].year_of_birth},${info[0].num_edu},${info[0].language},${info[0].participant_code},${row.section},${row.outcome}`;
                    } else {
                        return `,,,,,${row.section},${row.outcome}`;
                    }
                })
                .join("\n");
        const outcomeEncodedUri = encodeURI(outcomeCsvContent);
        const outcomeLink = document.createElement("a");
        outcomeLink.setAttribute("href", outcomeEncodedUri);
        outcomeLink.setAttribute("download", "outcomes.csv");
        document.body.appendChild(outcomeLink);
        outcomeLink.click();

        isFirstRow = true;

        // Export answers to CSV
        const answerHeaders = [
            "Gender",
            "Year of Birth",
            "Years Of Education",
            "Language",
            "Participant Code",
            "Section",
            "Question",
            "Answer",
        ];
        const answerCsvContent =
            "data:text/csv;charset=utf-8," +
            answerHeaders.join(",") +
            "\n" +
            answers
                .map((row) => {
                    // Enclose each value within double quotes and properly escape any double quotes within the values
                    const section = `"${row.section.replace(/"/g, '""')}"`;
                    const question = `"${row.question.replace(/"/g, '""')}"`;
                    const answer = `"${row.answer.replace(/"/g, '""')}"`;
                    if (isFirstRow) {
                        isFirstRow = false;
                        return `${info[0].gender},${info[0].year_of_birth}, ${info[0].num_edu},${info[0].language},${info[0].participant_code},${section},${question},${answer} `;
                    } else {
                        return `,,,,,${section},${question},${answer}`;
                    }
                })
                .join("\n");
        const answerEncodedUri = encodeURI(answerCsvContent);
        const answerLink = document.createElement("a");
        answerLink.setAttribute("href", answerEncodedUri);
        answerLink.setAttribute("download", "answers.csv");
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
                            return (
                                <tr key={key}>
                                    <td>{value.section}</td>
                                    <td>{value.question}</td>
                                    <td>{value.answer}</td>
                                </tr>
                            );
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
