function PersonalDetails({
  name,
  setName,
  fatherName,
  setFatherName,
  mobile,
  setMobile,
  email,
  setEmail,
  gender,
  setGender
}) {
  return (
    <>
      <h3>Personal Details</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Father Name"
        value={fatherName}
        onChange={(e) => setFatherName(e.target.value)}
      />

      <input
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
    </>
  );
}

export default PersonalDetails;