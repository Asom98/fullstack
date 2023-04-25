import { Welcom } from "./components/Welcom";
import { ServicePage } from "./components/Service";
import "./main.css";
import { Routes, Route } from "react-router-dom";
import { Registration } from "./components/Registration";

function App() {
  return (
    <div>
      <main className="App">
        <Routes>
          <Route path="/" element={<Welcom />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="registration" element={<Registration />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
