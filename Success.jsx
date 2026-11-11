import { useLocation } from "react-router-dom";

function Success() {

  const location = useLocation();

  const applicationId = location.state?.applicationId;

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h1>Application Submitted Successfully</h1>

      <h2>Application ID: {applicationId}</h2>

      <p>
        Please save this Application ID for future tracking.
      </p>

    </div>
  );
}

export default Success;