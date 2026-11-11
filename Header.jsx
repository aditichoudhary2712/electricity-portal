import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  return (

    <div style={styles.header}>

      <h2
        style={{ cursor: "pointer", margin: 0 }}
        onClick={() => navigate("/apply")}
      >
        ⚡ Electricity Connection Portal
      </h2>

      <div>

        <button
          style={styles.button}
          onClick={() => navigate("/track-status")}
        >
          Track Status
        </button>

        <button
          style={styles.button}
          onClick={() => navigate("/")}
        >
          Logout
        </button>

      </div>

    </div>

  );
}

const styles = {

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e3a8a",
    color: "white",
    padding: "15px 30px"
  },

 button: {
  marginLeft: "10px",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "auto",
  backgroundColor: "white",
  color: "#1e3a8a"
}

};

export default Header;