function ConnectionDetails({
  connectionType,
  setConnectionType,
  supplyType,
  setSupplyType,
  loadRequirement,
  setLoadRequirement,
  phases,
  setPhases,
  meterType,
  setMeterType
}) {
  return (
    <>
      <h3>Connection Details</h3>

      <select
        value={connectionType}
        onChange={(e) =>
          setConnectionType(e.target.value)
        }
      >
        <option value="">
          Select Connection Type
        </option>
        <option>Domestic</option>
        <option>Commercial</option>
      </select>

      <select
        value={supplyType}
        onChange={(e) =>
          setSupplyType(e.target.value)
        }
      >
        <option value="">
          Select Supply Type
        </option>
        <option>LT Supply</option>
        <option>HT Supply</option>
      </select>

      <input
        placeholder="Load Requirement"
        value={loadRequirement}
        onChange={(e) =>
          setLoadRequirement(e.target.value)
        }
      />

      <input
        placeholder="Phases"
        value={phases}
        onChange={(e) =>
          setPhases(e.target.value)
        }
      />

      <select
        value={meterType}
        onChange={(e) =>
          setMeterType(e.target.value)
        }
      >
        <option value="">
          Select Meter Type
        </option>
        <option>Single Phase</option>
        <option>Three Phase</option>
      </select>
    </>
  );
}

export default ConnectionDetails;