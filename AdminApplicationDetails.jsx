import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/AdminApplicationDetails.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
function AdminApplicationDetails() {

    const { applicationId } = useParams();
    const navigate = useNavigate();

    const [application, setApplication] = useState(null);

    useEffect(() => {

        fetch(
            `http://127.0.0.1:5000/admin/application/${applicationId}`
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setApplication(data);
            });

    }, [applicationId]);

    const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Electricity Connection Application", 14, 18);

    doc.setFontSize(11);
    doc.text(`Application ID: ${application.application_id}`, 14, 30);
    doc.text(`Applicant Name: ${application.applicant_name}`, 14, 38);
    doc.text(`Father Name: ${application.father_name}`, 14, 46);
    doc.text(`Gender: ${application.gender}`, 14, 54);
    doc.text(`Mobile: ${application.mobile}`, 14, 62);
    doc.text(`Email: ${application.email}`, 14, 70);

    autoTable(doc, {
        startY: 80,
        head: [["Field", "Value"]],
        body: [
            ["Connection Type", application.connection_type],
            ["Supply Type", application.supply_type],
            ["Meter Type", application.meter_type],
            ["Load", application.load_requirement],
            ["Document Type", application.document_type],
            ["AI Score", application.ai_score],
            ["AI Status", application.ai_status],
            ["Remarks", application.remarks],
            ["Current Status", application.status]
        ]
    });

    doc.save(`${application.application_id}.pdf`);
};

    if (!application) {
        return <h2>Loading...</h2>;
    }

    const updateStatus = async (status) => {

    const response = await fetch(
        "http://127.0.0.1:5000/admin/update-status",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                application_id: application.application_id,
                status: status
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    navigate("/admin");
};

    return (
  <div className="details-container">
    <button
    className="back-btn"
    onClick={() => navigate(-1)}
>
    ← Back to Applications
</button>

    {/* Header */}

    <div className="details-header">

        <div>

        <h1>📄 Application Details</h1>

        <p>
            <b>Application ID:</b> {application.application_id}
        </p>

    </div>

    <span
        className={`status-badge ${application.status.toLowerCase()}`}
    >
        {application.status}
    </span>

      <button className="pdf-btn" onClick={downloadPDF}>
        Download PDF
      </button>

    </div>

    {/* Cards */}

    <div className="details-grid">

      {/* Applicant */}

      <div className="details-card">

        <h2>👤 Applicant Information</h2>

        <div className="info-row">
          <span className="info-label">Name</span>
          <span className="info-value">{application.applicant_name}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Father Name</span>
          <span className="info-value">{application.father_name}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Gender</span>
          <span className="info-value">{application.gender}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Mobile</span>
          <span className="info-value">{application.mobile}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Email</span>
          <span className="info-value">{application.email}</span>
        </div>

      </div>

      {/* Connection */}

      <div className="details-card">

        <h2>⚡ Connection Details</h2>

        <div className="info-row">
          <span className="info-label">Connection Type</span>
          <span className="info-value">{application.connection_type}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Supply Type</span>
          <span className="info-value">{application.supply_type}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Load</span>
          <span className="info-value">{application.load_requirement}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Meter Type</span>
          <span className="info-value">{application.meter_type}</span>
        </div>

      </div>

      {/* Documents */}

      <div className="details-card">

        <h2>📄 Uploaded Documents</h2>

        {application.identity_proof ? (
          <img
            className="document-image"
            src={`http://127.0.0.1:5000/uploads/${application.identity_proof}`}
            alt="Identity Proof"
          />
        ) : (
          <p>No Identity Proof Uploaded</p>
        )}

        <br />

        {application.profile_photo ? (
          <img
            className="document-image"
            src={`http://127.0.0.1:5000/uploads/${application.profile_photo}`}
            alt="Applicant"
          />
        ) : (
          <p>No Applicant Photo Uploaded</p>
        )}

      </div>

      {/* AI */}

      <div className="details-card">

        <h2>🤖 AI Verification</h2>

        <div className="ai-score">
          {application.ai_score}
        </div>

        <div className="info-row">
          <span className="info-label">Status</span>
          <span>{application.ai_status}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Remarks</span>
          <span>{application.remarks}</span>
        </div>

      </div>

    </div>

    {/* Buttons */}

    <div className="action-buttons">

      <button
        className="approve-btn"
        onClick={() => updateStatus("Approved")}
      >
        Approve
      </button>

      <button
        className="reject-btn"
        onClick={() => updateStatus("Rejected")}
      >
        Reject
      </button>

      <button
        className="hold-btn"
        onClick={() => updateStatus("Hold")}
      >
        Hold
      </button>

    </div>

  </div>
);

}

export default AdminApplicationDetails;