import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RediscoverPage from "./pages/RediscoverPage/RediscoverPage";
import ConnectedPage from "./pages/ConnectedPage/ConnectedPage.js";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={<Navigate to="/rediscover" replace />} /> */}
        <Route path="/rediscover" element={<RediscoverPage />} />
        <Route path="/connected" element={<ConnectedPage />} />
      </Routes>
    </Router>
  );
}

export default App;


