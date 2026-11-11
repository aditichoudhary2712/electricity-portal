import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ApplicationDetails() {

    const { id } = useParams();

    const [application, setApplication] = useState(null);

    useEffect(() => {

        fetch(`http://127.0.0.1:5000/admin/application/${id}`)
            .then(res => res.json())
            .then(data => setApplication(data));

    }, [id]);

    if (!application)
        return <h2>Loading...</h2>;

    return (

        <div style={{ padding: "30px" }}>

            <h1>Application Details</h1>

            <hr />

            <h3>Applicant Information</h3>

            <p><b>Application ID:</b> {application.application_id}</p>

            <p><b>Name:</b> {application.applicant_name}</p>

            <p><b>Father Name:</b> {application.father_name}</p>

            <p><b>Mobile:</b> {application.mobile}</p>

            <p><b>Email:</b> {application.email}</p>

            <hr />

            <h3>Identity Proof</h3>

            <img
                src={`http://127.0.0.1:5000/uploads/${application.identity_proof}`}
                width="450"
                alt="Identity"
            />

            <hr />

            <h3>Applicant Photo</h3>

            <img
                src={`http://127.0.0.1:5000/uploads/${application.profile_photo}`}
                width="180"
                alt="Applicant"
            />

            <hr />

            <h3>AI Verification</h3>

            <p><b>Score:</b> {application.ai_score}</p>

            <p><b>Status:</b> {application.ai_status}</p>

            <p><b>Remarks:</b> {application.remarks}</p>

        </div>

    );
}

export default ApplicationDetails;