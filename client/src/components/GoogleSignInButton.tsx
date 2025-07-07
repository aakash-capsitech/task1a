import React from "react";

const GoogleSignInButton: React.FC = () => {
  const handleClick = () => {
    alert("Google sign-in coming soon...");
    // Later: window.location.href = "http://localhost:5153/auth/google";
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style={imgStyle} />
      Sign in with Google
    </button>
  );
};

const buttonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 20px",
  backgroundColor: "white",
  border: "1px solid #ccc",
  borderRadius: "4px",
  cursor: "pointer",
};

const imgStyle: React.CSSProperties = {
  width: "20px",
  height: "20px",
};

export default GoogleSignInButton;
