import "./App.scss";
import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
// import Blank from "./pages/Blank";
import Draftboard from "./pages/Draftboard";
import DraftSetup from "./pages/DraftSetup";
import FantasyTeams from "./pages/FantasyTeams";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Draftboard />} />
          <Route path="/fantasyteams" element={<FantasyTeams />} />
          <Route path="/setup" element={<DraftSetup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
