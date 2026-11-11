
import "../styles/TrackStatus.css";


import { useState } from "react";

function TrackStatus() {

  const [applicationId, setApplicationId] = useState("");
  const [status, setStatus] = useState("");
 const checkStatus = () => {
  if (!applicationId) {
    alert("Please enter Application ID");
    return;
  }

  fetch(`http://127.0.0.1:5000/track-status/${applicationId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Backend response:", data);

      if (data.status) {
        setStatus(data.status);
      } else {
        setStatus("Application Not Found");
      }
    })
    .catch((error) => {
      console.log("ERROR:", error);
      alert("Backend not responding");
    });
};
  return (
    <div className="status-container">
      <div className="status-box">

        <h1>Track Application Status</h1>

        <input
  type="text"
  placeholder="Enter Application ID"
  value={applicationId}
  onChange={(e) => setApplicationId(e.target.value)}
/>

        <button onClick={checkStatus}>
  Check Status
</button>
        {status && (
  <div className="status-result">

    <h3>Status: {status}</h3>

    <p>
      Current application status fetched from the system.
    </p>

  </div>
)}

      </div>
    </div>
  );
}

export default TrackStatus;