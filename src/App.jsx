import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Event from "./pages/Event.jsx";
import Navbar from "./components/Navbar.jsx";
import { SupabaseProvider } from "./integrations/supabase";

function App() {
  return (
    <SupabaseProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route exact path="/event/:id" element={<Event />} />
        </Routes>
      </Router>
    </SupabaseProvider>
  );
}

export default App;
