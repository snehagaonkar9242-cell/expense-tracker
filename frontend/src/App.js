import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        {/* ❌ REMOVE this to avoid conflict */}
        {/* <Route path="/add" element={<Dashboard />} /> */}

        <Route path="/categories" element={<div>Categories Page</div>} />
        <Route path="/analytics" element={<div>Analytics Page</div>} />
        <Route path="/settings" element={<div>Settings Page</div>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;