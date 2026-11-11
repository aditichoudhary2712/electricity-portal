import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminLogin() {
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
const [password, setPassword] = useState("");
const handleAdminLogin = async () => {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/admin-login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    admin_id: adminId,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (data.success) {

            alert(data.message);

            navigate("/admin");

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

};

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>Admin Login</h1>

        <input
    type="text"
    placeholder="Admin ID"
    value={adminId}
    onChange={(e) => setAdminId(e.target.value)}
/>

        <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
/>

        <button onClick={handleAdminLogin}>
    Login as Admin
</button>

        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => navigate("/")}
        >
          Back to User Login
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;