import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("")
  
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
    return <Navigate to="/login/true" replace />;
  }

  if (pathname === '/admin' && role !== 'admin') {
    return <Navigate to="/user" replace />;
  } else if (pathname === '/user' && role !== 'user') {
    return <Navigate to="/admin" replace/>
  }

  return <Outlet />;
};

export default ProtectedRoute;
