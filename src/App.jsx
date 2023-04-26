import { Welcom } from "./components/Welcom";
import { ServicePage } from "./components/Service";
import "./main.css";
import { Routes, Route } from "react-router-dom";
import { Registration } from "./components/Registration";
import Login from "./components/Login"
// import {Login} from "./components/LoginForm"
import NavigationBar from "./components/NavigationBar";


function App() {
  return (
    <div>

      <NavigationBar />
      <main className="App">
        <Routes>
          <Route path="/" element={<Welcom />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="registration" element={<Registration />} />
          <Route path="Login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
