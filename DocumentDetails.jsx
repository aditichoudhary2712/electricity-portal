import { useState } from "react";

function DocumentDetails({
  documentType,
  setDocumentType,
  documentNumber,
  setDocumentNumber,
  setIdentityProof,
  setProfilePhoto
}) {

  const [preview, setPreview] = useState(null);

  return (
    <>
      <h3>Documents</h3>

      <select
        value={documentType}
        onChange={(e) =>
          setDocumentType(e.target.value)
        }
      >
        <option value="">
          Select Identity Proof
        </option>

        <option>Aadhaar Card</option>
        <option>PAN Card</option>
        <option>Voter ID</option>
        <option>Passport</option>
        <option>Driving License</option>
      </select>
      <label>
  {documentType === "Aadhaar Card"
    ? "Aadhaar Number"
    : "Document Number"}
</label>

<input
  type="text"
  placeholder={
    documentType === "Aadhaar Card"
      ? "Enter 12-digit Aadhaar Number"
      : "Enter Document Number"
  }
  value={documentNumber}
  maxLength={
    documentType === "Aadhaar Card"
      ? 12
      : 20
  }
  onChange={(e) => {

  if(documentType === "Aadhaar Card"){

    const value = e.target.value.replace(/\D/g,"");

    setDocumentNumber(value);

  }

  else{

    setDocumentNumber(e.target.value);

  }

}}
/>

      <label>
        Upload Identity Proof
      </label>

      <input
        type="file"
        onChange={(e) =>
          setIdentityProof(
            e.target.files[0]
          )
        }
      />

      <label>
        Upload Profile Photo
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {

          const file =
            e.target.files[0];

          setProfilePhoto(file);

          if (file) {
            setPreview(
              URL.createObjectURL(file)
            );
          }

        }}
      />

      {preview && (
        <div>
          <img
            src={preview}
            alt="Profile Preview"
            width="120"
            height="120"
            style={{
              marginTop: "10px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #2563eb"
            }}
          />
        </div>
      )}

    </>
  );
}

export default DocumentDetails;