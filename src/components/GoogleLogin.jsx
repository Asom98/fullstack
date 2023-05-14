import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

async function handleCredentialResponse(userData) {
  const navigate = useNavigate();
  console.log('Encoded JWT', userData.credential);
  // decode jwt 
  const jwt = userData.credential;
  const jwtParts = jwt.split('.');
  const payload = JSON.parse(atob(jwtParts[1]));    // deprecated decode function but works for now
 
  console.log('Decoded JWT payload', payload);
  // send decoded jwt to backend
  const packet = {
    username: payload.name,
    password: payload.sub,
    email: payload.email,
    phoneNumber: payload.phone_number,
  };

  // register user with google credentials
  try {
    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      body: JSON.stringify(packet),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      console.log("You have succesfuly registered!");
    } else if (response.status === 400) {
      console.log("User already exists!");
      // login user with google credentials
    } else {
      console.log("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
  }

  // login user with google credentials
  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username: payload.name, password: payload.sub }),
    });
    if (response.ok) {
      console.log("You have succesfuly logged in!");
      navigate("/user")
    } else {
      console.log("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
  }
}

function initializeGoogleLogin() {
  google.accounts.id.initialize({
    client_id: '1079428828720-dfo4k6av3jvepch0hmpums7a1agal8dl.apps.googleusercontent.com',   // belongs in .env file but works for now
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(
    document.getElementById('googleButton'),
    { theme: 'outline', size: 'large' }
  );
}

function GoogleLogin() {
  useEffect(() => {
    /* global gapi */
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  
    script.onload = () => {
      initializeGoogleLogin();
    }

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div id="googleButton"></div>
  )
}

export { GoogleLogin };