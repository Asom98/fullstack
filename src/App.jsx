import { Welcom } from "./components/Welcom";
import { ServicePage } from "./components/Service";
import "./main.css";
import { Routes, Route } from "react-router-dom";
import { Registration } from "./components/Registration";
import { Login } from "./components/LoginForm";
import NavigationBar from "./components/NavigationBar";
import { Booking } from "./components/Booking";
import { AdminPage } from "./components/AdminPage";
import User from "./components/User";
import { AboutPage } from "./components/AboutPage";
import ContactUs from "./components/ContactUs";
import ProtectedRoute from "./components/parts/ProtectedRoute";
import React, { Fragment, useState } from "react";
import { Footer } from "./components/parts/Footer";

function App() {
  return (
    <div>
      <NavigationBar />
      <main className="App">
        <Routes>
          <Route element={<ProtectedRoute />}>
            {" "}
            {/* checks if they have an active token if not they will be redirected to the login screen */}
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/booking/:_id" element={<Booking />} />
          </Route>

          <Route path="/" element={<Welcom />} />
          <Route path="/services" element={<ServicePage />} />
          <Route
            path="/registration"
            element={<Registration isAdmin={false} />}
          />
          <Route path="/login/:showPopup" element={<Login />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
