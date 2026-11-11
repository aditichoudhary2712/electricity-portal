import { useEffect, useState } from "react";

function AiVerificationLogs() {

    const [logs, setLogs] = useState([]);

    useEffect(() => {

        fetch("http://127.0.0.1:5000/admin/ai-verification")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setLogs(data);
            });

    }, []);

    return (

        <div style={{ padding: "30px" }}>

            <h2>AI Verification Logs</h2>

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr>

                        <th>Application ID</th>
                        <th>Document Type</th>
                        <th>AI Score</th>
                        <th>AI Status</th>
                        <th>Remarks</th>
                        <th>Verified On</th>

                    </tr>

                </thead>

                <tbody>

                    {logs.map((log, index) => (

                        <tr key={index}>

                            <td>{log.application_id}</td>
                            <td>{log.document_type}</td>
                            <td>{log.ai_score}</td>
                            <td>{log.ai_status}</td>
                            <td>{log.remarks}</td>
                            <td>{log.verified_on}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default AiVerificationLogs;