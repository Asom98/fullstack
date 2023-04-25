import { Welcom } from "./components/Welcom";
import { ServicePage } from "./components/Service";
import "./main.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <main className="App">
        <Routes>
          <Route path="/" element={<Welcom />} />
          <Route path="services" element={<ServicePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
