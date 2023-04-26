import { useState } from "react";
import { Welcom } from "./components/Welcom";
import { ServicePage } from "./components/Service";
import "./main.css";
import { Routes, Route } from "react-router-dom";
import { Registration } from "./components/Registration";
// import Login from "./components/Login"
import {Login} from "./components/LoginForm"
import NavigationBar from "./components/NavigationBar";


function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = (token, user) => {
    setAccessToken(token);
    setUser(user);
  };

  const handleLogout = () => {
    setAccessToken(null);
    setUser(null);
  };
  return (
    <div>

      <NavigationBar />
      <main className="App">
        <Routes>
          <Route path="/" element={<Welcom />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login onClose={handleLogout} onLogin={handleLogin} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
