import { Welcom } from "./components/Welcom";
import { ServicePage } from "./components/Service";
import "./main.css";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div>

      <NavigationBar />
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
