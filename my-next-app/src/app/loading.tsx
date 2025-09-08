
import React from "react";

function LoadingPage() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      color: "white",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        border: "6px solid rgba(255,255,255,0.2)",
        borderTop: "6px solid white",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        animation: "spin 1s linear infinite"
      }} />
      <h1 style={{ marginTop: "20px", fontSize: "1.5rem" }}>Loading...</h1>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoadingPage;