function LocationDetails({
  districts,
  blocks,
  panchayats,
  villages,

  selectedDistrict,
  setSelectedDistrict,

  selectedBlock,
  setSelectedBlock,

  selectedPanchayat,
  setSelectedPanchayat,

  selectedVillage,
  setSelectedVillage,

  division,
  subDivision,
  section,
  tariff,
  phase,
  defaultLoad
}) {
  return (
    <>
      <h3>Location Details</h3>

   
<select
  value={selectedDistrict}
  onChange={(e) =>
    setSelectedDistrict(e.target.value)
  }
>  <option value="">Select District</option>
  {districts.map(d => (
    <option key={d.district_code} value={d.district_code}>
      {d.district_name}
    </option>
  ))}
</select>

{/* Block — loads automatically based on selected district */}
<select
  value={selectedBlock}
  onChange={(e) =>
    setSelectedBlock(e.target.value)
  }
>
  <option value="">
  {selectedDistrict
    ? "Select Block"
    : "Select District First"}
</option>
  {blocks.map(b => (
    <option key={b.block_code} value={b.block_code}>
      {b.block_name}
    </option>
  ))}
</select>

      {/* Panchayat */}
      <select
        value={selectedPanchayat}
        onChange={(e) =>
          setSelectedPanchayat(e.target.value)
        }
      >
        <option value="">
          Select Panchayat
        </option>

        {panchayats.map((panchayat) => (
          <option
            key={panchayat.panchayat_code}
            value={panchayat.panchayat_code}
          >
            {panchayat.panchayat_name}
          </option>
        ))}
      </select>

      {/* Village */}
      <select
        value={selectedVillage}
        onChange={(e) =>
          setSelectedVillage(e.target.value)
        }
      >
        <option value="">
          Select Village
        </option>

        {villages.map((village) => (
          <option
            key={village.village_code}
            value={village.village_code}
          >
            {village.village_name}
          </option>
        ))}
      </select>

     <div className="location-info">
 

<select value={defaultLoad || ""} disabled>
  <option>{defaultLoad || "Load"}</option>
</select>
</div>
    </>
  );
}

export default LocationDetails;