import { useEffect, useState } from "react";
import axios from "axios";
import "./ConnectedPage.css";

export default function ConnectedPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/user/data")
      .then((res) => {
        setArtists(res.data.artistsToUnfollow);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="connected-loading">Loading...</div>;

  return (
    <div className="connected-container">
      <h1 className="connected-title">Artists You Might Want to Unfollow</h1>

      {artists.length === 0 && (
        <p className="connected-empty">🎉 You're not following any low-score artists!</p>
      )}

      <div className="artists-list">
        {artists.map((artist) => (
          <div key={artist.id} className="artist-card">
            <div className="artist-info">
              <h2>{artist.name}</h2>
            </div>

            <button
              className="unfollow-btn"
              onClick={() => alert("Unfollow logic here")}
            >
              Unfollow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

