import ApiService from "../services/ApiService";
import PersonalDetails from "../components/PersonalDetails";
import AddressDetails from "../components/AddressDetails";
import ConnectionDetails from "../components/ConnectionDetails";
import LocationDetails from "../components/LocationDetails";
import DocumentDetails from "../components/DocumentDetails";
import Applicant from "../models/Applicant";
import Address from "../models/Address";
import "../styles/ApplyConnection.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";


function ApplyConnection() {
  const navigate = useNavigate();

  // ---------------- USER DETAILS ----------------
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  // ---------------- ADDRESS ----------------
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");

  // ---------------- CONNECTION ----------------
  const [connectionType, setConnectionType] = useState("");
  const [supplyType, setSupplyType] = useState("");
  const [loadRequirement, setLoadRequirement] = useState("");
  const [phases, setPhases] = useState("");
  const [meterType, setMeterType] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [identityProof, setIdentityProof] = useState(null);
const [profilePhoto, setProfilePhoto] = useState(null);

  // ---------------- LOCATION ----------------
const [districts, setDistricts] = useState([]);
const [blocks, setBlocks] = useState([]);
const [district, setDistrict] = useState("");
const [block, setBlock] = useState("");
const [panchayats, setPanchayats] = useState([]);
const [villages, setVillages] = useState([]);

const [panchayat, setPanchayat] = useState("");
const [village, setVillage] = useState("");

const [details, setDetails] = useState({});




// Load districts when page opens
useEffect(() => {
  fetch("http://127.0.0.1:5000/get-districts")
    .then((response) => response.json())
    .then((data) => {
      console.log("Districts Loaded:", data);
      setDistricts(data);
    })
    .catch((error) => {
      console.error("District Error:", error);
    });
}, []);

// When district changes → load blocks
useEffect(() => {
  setBlocks([]);
  setBlock("");
  if (district) {
    fetch(`http://127.0.0.1:5000/get-blocks/${district}`)
      .then(r => r.json())
      .then(setBlocks);
  }
}, [district]);
useEffect(() => {
  setPanchayats([]);
  setPanchayat("");

  if (block) {
    fetch(`http://127.0.0.1:5000/get-panchayats/${block}`)
      .then((res) => res.json())
      .then((data) => setPanchayats(data))
      .catch((err) => console.log(err));
  }
}, [block]);
useEffect(() => {
  setVillages([]);
  setVillage("");

  if (panchayat) {
    fetch(`http://127.0.0.1:5000/get-villages/${panchayat}`)
      .then((res) => res.json())
      .then((data) => setVillages(data))
      .catch((err) => console.log(err));
  }
}, [panchayat]);
useEffect(() => {
  if (village) {
    fetch(
      `http://127.0.0.1:5000/get-village-details/${village}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Village Details =", data);
        setDetails(data);
      })
      .catch((err) => console.log(err));
  }
}, [village]);
  // ---------------- SUBMIT ----------------
  
  const handleSubmit = async () => {

  const applicant = new Applicant({
    name,
    fatherName,
    mobile,
    email,
    gender
  });

  const address = new Address({
    houseNo,
    street,
    city,
    stateName,
    pincode
  });

  const applicationData = {

    ...applicant.getData(),
    ...address.getData(),

    connectionType,
    supplyType,
    loadRequirement,
    phases,
    meterType,
    documentType,
    documentNumber,

    district,
    block,
    panchayat,
    village,

    division: details?.division,
    sub_division: details?.sub_division,
    section: details?.section,
    tariff: details?.tariff,
    phase: details?.phase,
    load: details?.load_value
  };

  try {

    const data =
  await ApiService.submitApplication(
    applicationData,
    identityProof,
    profilePhoto
  );
    alert(data.message);

    navigate("/success", {
      state: {
        applicationId:
          data.applicationId
      }
    });

  } catch (error) {

    console.error(error);

    alert("Unable to submit application");

  }
};

console.log("Current districts =", districts);
console.log("District count =", districts.length);
console.log("District State =", districts);


  return (
    <>
      <Header />

      <div className="apply-container">
        <div className="apply-box">

      <h2>Apply New Electricity Connection</h2>


          {/* ---------------- PERSONAL ---------------- */}
          <div className="section-card">
  <PersonalDetails
    name={name}
    setName={setName}
    fatherName={fatherName}
    setFatherName={setFatherName}
    mobile={mobile}
    setMobile={setMobile}
    email={email}
    setEmail={setEmail}
    gender={gender}
    setGender={setGender}
  />
</div>

<div className="section-card">
  <AddressDetails
    houseNo={houseNo}
    setHouseNo={setHouseNo}
    street={street}
    setStreet={setStreet}
    city={city}
    setCity={setCity}
    stateName={stateName}
    setStateName={setStateName}
    pincode={pincode}
    setPincode={setPincode}
  />
</div>

<div className="section-card">
  <LocationDetails
    districts={districts}
    blocks={blocks}
    panchayats={panchayats}
    villages={villages}
    selectedDistrict={district}
    setSelectedDistrict={setDistrict}
    selectedBlock={block}
    setSelectedBlock={setBlock}
    selectedPanchayat={panchayat}
    setSelectedPanchayat={setPanchayat}
    selectedVillage={village}
    setSelectedVillage={setVillage}
    section={details?.section_name || ""}
    defaultLoad={details?.default_load || ""}
  />
</div>

<div className="section-card">
  <ConnectionDetails
    connectionType={connectionType}
    setConnectionType={setConnectionType}
    supplyType={supplyType}
    setSupplyType={setSupplyType}
    loadRequirement={loadRequirement}
    setLoadRequirement={setLoadRequirement}
    phases={phases}
    setPhases={setPhases}
    meterType={meterType}
    setMeterType={setMeterType}
  />
</div>

<div className="section-card">
<DocumentDetails
  documentType={documentType}
  setDocumentType={setDocumentType}

  documentNumber={documentNumber}
  setDocumentNumber={setDocumentNumber}

  setIdentityProof={setIdentityProof}
  setProfilePhoto={setProfilePhoto}
/>
</div>
          {/* ---------------- SUBMIT ---------------- */}
         <button
  className="submit-btn"
  onClick={handleSubmit}
>
  Submit Application
</button>

        </div>
      </div>

      <Footer />
    </>
  );
}


export default ApplyConnection;