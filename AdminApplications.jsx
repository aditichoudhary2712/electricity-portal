import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AdminApplications.css";

function AdminApplications() {
    const navigate = useNavigate();
    const { status } = useParams();

    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

    fetch("http://127.0.0.1:5000/admin/applications")
        .then((response) => {

            if (!response.ok) {
                throw new Error("Failed to fetch applications");
            }

            return response.json();

        })
        .then((data) => {

            console.log("Applications:", data);

            setApplications(data);

        })
        .catch((error) => {

            console.error("Applications Error:", error);

        });

}, []);

    return (

        <div className="applications-container">

            <h2 className="page-title">
  {status === "all"
    ? "All Applications"
    : `${status} Applications`}
</h2>

<input
    type="text"
    placeholder="Search by Application ID, Name or Mobile"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-box"
/>

          <table className="table">

                <thead>

                    <tr>

                        <th>Application ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Document</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {applications
  .filter((app) => {
    return (
      (status === "all" || app.status === status) &&
      (
        (app.application_id || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        (app.applicant_name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        (app.mobile || "")
          .includes(search)
      )
    );
  })
  .map((app) => (
    <tr key={app.application_id}>

      <td>{app.application_id}</td>

      <td>{app.applicant_name}</td>

      <td>{app.mobile}</td>

      <td>{app.document_type}</td>

      <td>
  <span
    style={{
      padding: "6px 12px",
      borderRadius: "20px",
      color: "white",
      fontWeight: "bold",
      backgroundColor:
        app.status === "Approved"
          ? "green"
          : app.status === "Rejected"
          ? "red"
          : app.status === "Hold"
          ? "orange"
          : "dodgerblue"
    }}
  >
    {app.status}
  </span>
</td>

      <td>
        <button
          onClick={() =>
            navigate(`/admin-application/${app.application_id}`)
          }
        >
          View
        </button>
      </td>

    </tr>

  ))}

                </tbody>

            </table>

        </div>

    );
}

export default AdminApplications;