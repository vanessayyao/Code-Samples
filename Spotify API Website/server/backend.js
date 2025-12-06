require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/spotifyApp")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


const unfollowedArtistSchema = new mongoose.Schema({
  spotifyId: { type: String, required: true },
  name: { type: String, required: true },
  unfollowedAt: { type: Date, default: Date.now }
});
const UnfollowedArtist = mongoose.model("UnfollowedArtist", unfollowedArtistSchema);

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";
const tokenStore = new Map();

app.get("/auth/spotify/login", (req, res) => {
  const scopes = ["user-follow-read", "user-top-read"].join(" ");
  const authURL = `https://accounts.spotify.com/authorize?client_id=${
    process.env.SPOTIFY_CLIENT_ID
  }&response_type=code&redirect_uri=${
    encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)
  }&scope=${encodeURIComponent(scopes)}`;
  res.redirect(authURL);
});

app.get("/auth/spotify/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const tokenRes = await axios.post(
      SPOTIFY_TOKEN_URL,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
        },
      }
    );
    const { access_token, refresh_token } = tokenRes.data;
    tokenStore.set("user", { access_token, refresh_token });
    res.redirect(process.env.FRONTEND_URI + "/connected");
  } catch (err) {
    res.status(500).send("Error authenticating with Spotify");
  }
});

async function fetchTopArtists(accessToken) {
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [shortRes, mediumRes, longRes] = await Promise.all([
    axios.get(SPOTIFY_API_URL + "/me/top/artists?time_range=short_term&limit=50", { headers }),
    axios.get(SPOTIFY_API_URL + "/me/top/artists?time_range=medium_term&limit=50", { headers }),
    axios.get(SPOTIFY_API_URL + "/me/top/artists?time_range=long_term&limit=50", { headers })
  ]);
  const scores = new Map();
  longRes.data.items.forEach(a => scores.set(a.id, 1));
  mediumRes.data.items.forEach(a => scores.set(a.id, 2));
  shortRes.data.items.forEach(a => scores.set(a.id, 3));
  return scores;
}

async function fetchFollowedArtists(accessToken) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const artists = [];
  let nextURL = SPOTIFY_API_URL + "/me/following?type=artist&limit=50";
  while (nextURL) {
    const res = await axios.get(nextURL, { headers });
    artists.push(...res.data.artists.items);
    nextURL = res.data.artists.next;
  }
  return artists;
}

app.get("/user/data", async (req, res) => {
  const tokens = tokenStore.get("user");
  if (!tokens) return res.status(401).json({ error: "User not authenticated" });
  const accessToken = tokens.access_token;

  try {
    const [topScores, followed] = await Promise.all([
      fetchTopArtists(accessToken),
      fetchFollowedArtists(accessToken)
    ]);
    const unfollowList = [];
    followed.forEach(artist => {
      const score = topScores.get(artist.id) || 0;
      if (score <= 1) {
        unfollowList.push({id: artist.id, name: artist.name});
      }
    });

    const saveOps = unfollowList.map(a => ({
      updateOne: {
        filter: { spotifyId: a.id },
        update: { $set: { name: a.name, unfollowedAt: new Date() } },
        upsert: true
      }
    }));

    if (saveOps.length > 0) {
      UnfollowedArtist.bulkWrite(saveOps).catch(err => console.error("DB save error:", err));
    }

    res.json({artistsToUnfollow: unfollowList});
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Spotify data" });
  }
});

app.listen(3001, () => console.log("Server running on 3001"));

