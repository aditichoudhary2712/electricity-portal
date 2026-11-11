import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const sendOTP = async () => {

  const response = await fetch(
    "http://127.0.0.1:5000/send-otp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    }
  );

  const data = await response.json();

  if (response.ok) {
    alert(data.message);
  } else {
    alert(data.message);
  }

};

const verifyOTP = async () => {

  const response = await fetch(
    "http://127.0.0.1:5000/verify-otp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        otp: otp
      })
    }
  );

  const data = await response.json();

  if (data.success) {

    alert("Login Successful");

    navigate("/apply");

  } else {

    alert("Invalid OTP");

  }
};



  return (
    <div className="login-container">
      <div className="login-box">

        <h1>Electricity Portal</h1>

        {/* USER LOGIN ONLY */}
        <input
  type="email"
  placeholder="Enter Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

        <button onClick={sendOTP}>
  Send OTP
</button>

        <input
  type="text"
  placeholder="Enter OTP"
  value={otp}
  onChange={(e) => setOtp(e.target.value)}
/>

       <button onClick={verifyOTP}>
  Login
</button>

        <a
          href="/register"
          className="create-account"
        >
          Create Account
        </a>

        {/* ADMIN LOGIN LINK */}
        <hr />

        <p
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => navigate("/admin-login")}
        >
          Admin Login
        </p>

      </div>
    </div>
  );
}

export default Login;