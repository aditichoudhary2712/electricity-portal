import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

import { Line } from "react-chartjs-2";


ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);
function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
  hold: 0,
  verified: 0
});

const [recentApplications, setRecentApplications] = useState([]);
const [trendData, setTrendData] = useState([]);

const lineData = {
  labels: trendData.map((item) =>
  new Date(item.day).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short"
  })
),

 datasets: [
  {
    data: trendData.map(item => item.total),

    borderColor: "#2563eb",

    backgroundColor: "rgba(37,99,235,0.12)",

    fill: true,

    tension: 0.45,

    borderWidth: 4,

    pointRadius: 6,

    pointHoverRadius: 8,

    pointBackgroundColor: "#2563eb",

    pointBorderColor: "#ffffff",

    pointBorderWidth: 3
  }
]


};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false
    },

    tooltip: {
      backgroundColor: "#2563eb",
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 12,
      displayColors: false,
      cornerRadius: 8
    }
  },

  scales: {
    x: {
      grid: {
        display: true,
        color: "#eef2f7",
        drawBorder: false
      },

      ticks: {
        color: "#64748b",
        font: {
          size: 13,
          weight: "600"
        }
      }
    },

    y: {
      beginAtZero: true,

      grid: {
        color: "#eef2f7",
        drawBorder: false
      },

      ticks: {
        stepSize: 1,
        color: "#64748b",
        font: {
          size: 13,
          weight: "600"
        }
      }
    }
  }
};

useEffect(() => {

    fetch("http://127.0.0.1:5000/admin/dashboard-data")

        .then((response) => {

            if (!response.ok) {
                throw new Error("Failed to load dashboard");
            }

            return response.json();

        })

        .then((data) => {

            console.log("Dashboard Data:", data);

            setStats(data.stats);
            setRecentApplications(data.recentApplications);
            setTrendData(data.trendData);
            console.log(data.trendData);

        })

        .catch((error) => {

            console.error("Dashboard Error:", error);

        });

}, []);

return (

    <div className="admin-container">

      <div className="dashboard-header">

    <h1>⚡ Electricity Connection Management System</h1>

    <p>
        AI Integrated Smart Admin Dashboard
    </p>

    <div className="dashboard-date">

        {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        })}

    </div>

</div>

      <div className="admin-cards">
        <div
  className="admin-card total-card"
  onClick={() => navigate("/admin-applications/all")}
>
  <div className="card-header">
    <div className="card-icon">📄</div>
    <div className="card-title">Total Applications</div>
  </div>

  <h1 className="card-value">{stats.total}</h1>

  <p className="card-text">
    View All Submitted Applications
  </p>
</div>

<div
  className="admin-card pending-card"
  onClick={() => navigate("/admin-applications/Pending")}
>
  <div className="card-header">
    <div className="card-icon">⏳</div>
    <div className="card-title">Pending Verification</div>
  </div>

  <h1 className="card-value">{stats.pending}</h1>

  <p className="card-text">
    Applications Waiting for Verification
  </p>
</div>

<div
  className="admin-card approved-card"
  onClick={() => navigate("/admin-applications/Approved")}
>
  <div className="card-header">
    <div className="card-icon">✅</div>
    <div className="card-title">Approved Records</div>
  </div>

  <h1 className="card-value">{stats.approved}</h1>

  <p className="card-text">
    Successfully Approved Connections
  </p>
</div>

<div
  className="admin-card rejected-card"
  onClick={() => navigate("/admin-applications/Rejected")}
>
  <div className="card-header">
    <div className="card-icon">❌</div>
    <div className="card-title">Rejected Records</div>
  </div>

  <h1 className="card-value">{stats.rejected}</h1>

  <p className="card-text">
    Rejected Due to Invalid Details
  </p>
</div>

<div
  className="admin-card hold-card"
  onClick={() => navigate("/admin-applications/Hold")}
>
  <div className="card-header">
    <div className="card-icon">⏸</div>
    <div className="card-title">On Hold Records</div>
  </div>

  <h1 className="card-value">{stats.hold}</h1>

  <p className="card-text">
    Applications Kept on Hold
  </p>
</div>

<div
  className="admin-card ai-card"
  onClick={() => navigate("/admin-ai-logs")}
>
  <div className="card-header">
    <div className="card-icon">🤖</div>
    <div className="card-title">AI Verification Logs</div>
  </div>

  <h1 className="card-value">{stats.verified}</h1>

  <p className="card-text">
    Verified by AI
  </p>
</div>

        </div>
<div className="dashboard-bottom">

<div className="trend-card">
  <h2
    style={{
      textAlign: "center"
    }}
  >
    📈 Application Submission Trend
  </h2>

  <div
    style={{
        height: "430px",
        width: "100%",
        marginTop: "20px"
    }}
>
    <Line
        data={lineData}
        options={lineOptions}
    />
</div>
</div>



<div className="recent-card">

  <div className="recent-header">

    <h2>📋 Recent Applications</h2>

    <button
      className="view-all-btn"
      onClick={() => navigate("/admin-applications/all")}
    >
      View All
    </button>

  </div>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse"
    }}
  >
    <thead>
  <tr>
    <th>Application ID</th>
    <th>Applicant Name</th>
    <th>Mobile</th>
    <th>Status</th>
    <th>Submitted On</th>
    <th>Action</th>
  </tr>
</thead>

    <tbody>

      {recentApplications.map((app) => (

        <tr key={app.application_id || app.mobile}>

          <td>{app.application_id || "Not Generated"}</td>

          <td>{app.applicant_name}</td>

          <td>{app.mobile}</td>

<td>
  <span className={`status-badge ${app.status.toLowerCase()}`}>
    {app.status}
  </span>
</td>

<td>{app.submitted_on}</td>

<td>

            {app.application_id ? (
             <button
    className="view-btn"
    onClick={() =>
        navigate(`/admin-application/${app.application_id}`)
    }
>
    View
</button>
            ) : (
              "-"
            )}

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

</div>

</div>

);
}

export default AdminDashboard;