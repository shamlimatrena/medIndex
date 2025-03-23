import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import List from "./pages/List";
import AdminList from "./pages/AdminList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/list" element={<List />} />
          <Route path="/admin-list" element={<AdminList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
