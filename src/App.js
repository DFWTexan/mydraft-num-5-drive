import "./App.scss";
import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import InfoPage from "./pages/InfoPage";
import Draftboard from "./pages/Draftboard";
import DraftSetup from "./pages/DraftSetup";
import FantasyTeams from "./pages/FantasyTeams";
import EmailVerified from "./pages/EmailVerified";

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/home" element={<InfoPage />} />
            <Route index element={<InfoPage />} />
            <Route path="/draftboard" element={<Draftboard />} />
            <Route path="/fantasyteams" element={<FantasyTeams />} />
            <Route path="/setup" element={<DraftSetup />} />
          </Route>
          <Route path="/EmailVerified" element={<EmailVerified />} />
        </Routes>
      </BrowserRouter>
    );
  }

export default App;
