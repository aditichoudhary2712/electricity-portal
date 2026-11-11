function AddressDetails({
  houseNo,
  setHouseNo,
  street,
  setStreet,
  city,
  setCity,
  stateName,
  setStateName,
  pincode,
  setPincode
}) {
  return (
    <>
      <h3>Address Details</h3>

      <input
        placeholder="House No"
        value={houseNo}
        onChange={(e) => setHouseNo(e.target.value)}
      />

      <input
        placeholder="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />

      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <input
        placeholder="State"
        value={stateName}
        onChange={(e) => setStateName(e.target.value)}
      />

      <input
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />
    </>
  );
}

export default AddressDetails;