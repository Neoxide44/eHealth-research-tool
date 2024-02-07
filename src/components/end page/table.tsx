import Table from "react-bootstrap/Table";
import { getOutcomes } from "../../api calls/getOutcomes";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

interface OutcomeData {
    section: string;
    outcome: string;
    id: string;
    uuid: string;
}

interface Props {
    id: string;
}

function OutcomesTable(props: Props) {
    const [data, setData] = useState<OutcomeData[]>([]);
    useEffect(() => {
        // Fetch data when component mounts
        getOutcomes(props.id, setData);
    }, []);

    const exportToCsv = () => {
        const headers = ["Section", "Outcome"];
        const csvContent =
            "data:text/csv;charset=utf-8," +
            headers.join(",") +
            "\n" +
            data.map((row) => `${row.section},${row.outcome}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "table_data.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Section</th>
                        <th>Outcome</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value, key) => {
                        return (
                            <tr key={key}>
                                <td>{value.section}</td>
                                <td>{value.outcome}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Button variant="primary" onClick={exportToCsv}>
                Export to CSV
            </Button>
        </div>
    );
}

export default OutcomesTable;
