import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ErrorPopup } from "./ErrorPopup";


const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("")
  const [showPopup, setShowPopup] = useState(false);
  
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    fetch("https://backend-saloon.onrender.com/checkAuth", {
      headers: {
      },
      credentials: "include"
    })
      .then(response => {
        if (response.ok) {
          setIsLoggedIn(true);
          return response.json()
        } else {
          setShowPopup(true);
        }
      })
      .then(result => {
        setRole(result.role)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div  className="d-flex justify-content-center align-items-center spinner-border"></div>
  }

  if (!isLoggedIn) {
    return <ErrorPopup onClose={() => setShowPopup(false)} />;
  }

  if (pathname === '/admin' && role !== 'admin') {
    return <Navigate to="/user" replace />;
  } else if (pathname === '/user' && role !== 'user') {
    return <Navigate to="/admin" replace/>
  }

  return <Outlet />;
};

export default ProtectedRoute;
