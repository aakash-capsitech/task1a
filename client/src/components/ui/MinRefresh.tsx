import React from 'react'

const MinRefresh = () => {
   return (
    <button
      style={{
        backgroundColor: "#0078D4",
        color: "white",
        padding: "8px 16px",
        border: "none",
        borderRadius: "4px",
        fontWeight: "bold",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
      disabled={loading}
    >
      {loading ? "Refreshing..." : "Refresh"}
    </button>
  );
}

export default MinRefresh