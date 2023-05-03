import { useState } from "react";
import { Welcom } from "./components/Welcom";
import { ServicePage } from "./components/Service";
import "./main.css";
import { Routes, Route } from "react-router-dom";
import { Registration } from "./components/Registration";
import { Login } from "./components/LoginForm";
import NavigationBar from "./components/NavigationBar";
import { Booking } from "./components/Booking";
import { AdminPage } from "./components/AdminPage";
const path = require('path')
require('dotenv').config({path: 'backend/.env'})
import ReactGA from 'react-ga';

const TRACKING_ID = process.env.TRACKING_ID;
ReactGA.initialize(TRACKING_ID);

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
          <Route
            path="login"
            element={<Login onClose={handleLogout} onLogin={handleLogin} />}
          />
          <Route path="booking" element={<Booking />} />
          <Route path="admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
