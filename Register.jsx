import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {

  const navigate = useNavigate();

  const handleRegister = async () => {

  const response = await fetch(
    "http://127.0.0.1:5000/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        name,
        mobile,
        email,

        permanentHouseNo,
        permanentStreet,
        permanentAddressLine,
        permanentCity,
        permanentState,
        permanentPincode,

        correspondenceHouseNo,
        correspondenceStreet,
        correspondenceAddressLine,
        correspondenceCity,
        correspondenceState,
        correspondencePincode

      })
    }
  );

  const data = await response.json();

  if (data.success) {

    alert(data.message);

    navigate("/");

  }

  else {

    alert(data.message);

  }

};

  const [name, setName] = useState("");
const [mobile, setMobile] = useState("");
const [email, setEmail] = useState("");

const [permanentHouseNo, setPermanentHouseNo] = useState("");
const [permanentStreet, setPermanentStreet] = useState("");
const [permanentAddressLine, setPermanentAddressLine] = useState("");
const [permanentCity, setPermanentCity] = useState("");
const [permanentState, setPermanentState] = useState("");
const [permanentPincode, setPermanentPincode] = useState("");

const [correspondenceHouseNo, setCorrespondenceHouseNo] = useState("");
const [correspondenceStreet, setCorrespondenceStreet] = useState("");
const [correspondenceAddressLine, setCorrespondenceAddressLine] = useState("");
const [correspondenceCity, setCorrespondenceCity] = useState("");
const [correspondenceState, setCorrespondenceState] = useState("");
const [correspondencePincode, setCorrespondencePincode] = useState("");

const [sameAddress, setSameAddress] = useState(false);

  return (

    <div className="register-container">

      <div className="register-box">

        <h1>Create Account</h1>

        <input
  type="text"
  placeholder="Enter Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

        <input
  type="text"
  placeholder="Enter Mobile Number"
  value={mobile}
  onChange={(e) => setMobile(e.target.value)}
/>

        <input
  type="email"
  placeholder="Enter Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

        <h3>Permanent Address</h3>

       <input
  type="text"
  placeholder="House Number"
  value={permanentHouseNo}
  onChange={(e) => setPermanentHouseNo(e.target.value)}
/>

        <input
  type="text"
  placeholder="Street"
  value={permanentStreet}
  onChange={(e) => setPermanentStreet(e.target.value)}
/>

        <input
  type="text"
  placeholder="Address Line"
  value={permanentAddressLine}
  onChange={(e) => setPermanentAddressLine(e.target.value)}
/>

        <input
  type="text"
  placeholder="City"
  value={permanentCity}
  onChange={(e) => setPermanentCity(e.target.value)}
/>
        <input
  type="text"
  placeholder="State"
  value={permanentState}
  onChange={(e) => setPermanentState(e.target.value)}
/>

        <input
  type="text"
  placeholder="Pincode"
  value={permanentPincode}
  onChange={(e) => setPermanentPincode(e.target.value)}
/>

        <h3>Correspondence Address</h3>

        <div className="checkbox-container">

         <input
  type="checkbox"
  id="sameAddress"
  checked={sameAddress}
  onChange={(e) => {

    setSameAddress(e.target.checked);

    if (e.target.checked) {

      setCorrespondenceHouseNo(permanentHouseNo);
      setCorrespondenceStreet(permanentStreet);
      setCorrespondenceAddressLine(permanentAddressLine);
      setCorrespondenceCity(permanentCity);
      setCorrespondenceState(permanentState);
      setCorrespondencePincode(permanentPincode);

    }

  }}
/>

          <label htmlFor="sameAddress">
            Same as Permanent Address
          </label>

        </div>

        <input
  type="text"
  placeholder="House Number"
  value={correspondenceHouseNo}
  onChange={(e) => setCorrespondenceHouseNo(e.target.value)}
/>

        <input
  type="text"
  placeholder="Street"
  value={correspondenceStreet}
  onChange={(e) => setCorrespondenceStreet(e.target.value)}
/>

        <input
  type="text"
  placeholder="Address Line"
  value={correspondenceAddressLine}
  onChange={(e) => setCorrespondenceAddressLine(e.target.value)}
/>

        <input
  type="text"
  placeholder="City"
  value={correspondenceCity}
  onChange={(e) => setCorrespondenceCity(e.target.value)}
/>

        <input
  type="text"
  placeholder="State"
  value={correspondenceState}
  onChange={(e) => setCorrespondenceState(e.target.value)}
/>

        <input
  type="text"
  placeholder="Pincode"
  value={correspondencePincode}
  onChange={(e) => setCorrespondencePincode(e.target.value)}
/>

        <button onClick={handleRegister}>
  Create Account
</button>

      </div>

    </div>

  );
}

export default Register;