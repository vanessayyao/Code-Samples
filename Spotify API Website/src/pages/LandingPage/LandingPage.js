import React from "react";
import "./LandingPage.css";
// import bg from "../../assets/background.png";
// import "./LandingPage.css";

export default function LandingPage() {

  const handleConnect = () => {
    window.location.href = "http://localhost:3001/rediscover"; 
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Rediscover Tracks</h1>

      <button className="connect-btn" onClick={handleConnect}>
        Connect Spotify
      </button>
    </div>
  );
}
