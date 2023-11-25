import "./App.scss";
import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Draftboard from "./pages/Draftboard";
import DraftSetup from "./pages/DraftSetup";
import FantasyTeams from "./pages/FantasyTeams";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
          {/* <Route index  element={<Blank />} /> */}
          <Route path="/draftboard" element={<Draftboard />} />
          <Route path="/fantasyteams" element={<FantasyTeams />} />
          <Route path="/setup" element={<DraftSetup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
