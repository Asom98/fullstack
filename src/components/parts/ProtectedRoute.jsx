import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("")
  
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    fetch("http://localhost:3000/checkAuth", {
      headers: {
        Authorization: `Bearer ${token}`
      }
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
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login/true" replace />;
  }

  if (pathname === '/admin' && role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
