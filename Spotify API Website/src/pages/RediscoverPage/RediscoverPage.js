import "./RediscoverPage.css";
import Header from "../../components/Header/Header";
import Carousel from "../../components/Carousel/Carousel";

export default function RediscoverPage() {
  const songs = [
    {
      title: "Song Title 1",
      time: "02:45",
      playlist: "Playlist 1",
      img: "/music-note.png",
    },
    {
      title: "Song Title 2",
      time: "03:10",
      playlist: "Playlist 2",
      img: "/music-note.png",
    },
    {
      title: "Song Title 3",
      time: "04:08",
      playlist: "Playlist 3",
      img: "/music-note.png",
    },
    {
      title: "Song Title 4",
      time: "05:02",
      playlist: "Playlist 3",
      img: "/music-note.png",
    },
    {
      title: "Song Title 5",
      time: "02:30",
      playlist: "Playlist 3",
      img: "/music-note.png",
    },
  ];

  return (
    <div className="page">
      <Header title="Rediscover Tracks" />

      <Carousel items={songs} />

      <div className="footer">
        Songs from <br /> @username_here
      </div>
	
      <button className="logout-btn" onClick={() => window.location.href = "https://corrine-dowerless-farah.ngrok-free.dev/auth/spotify/login"}>Login to Spotify</button>
      <button className="logout-btn">Disconnect / Logout</button>
    </div>
  );
}
