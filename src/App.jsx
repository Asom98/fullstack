import { useState } from "react";
import { Welcom } from "./components/Welcom";
import { ServicePage } from "./components/Service";
import "./main.css";
import { Routes, Route } from "react-router-dom";
import { Registration } from "./components/Registration";
import {Login} from "./components/LoginForm";
import NavigationBar from "./components/NavigationBar";
import { Booking } from "./components/Booking";
import { AdminPage } from "./components/AdminPage";
import User from "./components/User";

function App() {

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
            element={<Login/>}
          />
          <Route path="booking" element={<Booking />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="user" element={<User />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
