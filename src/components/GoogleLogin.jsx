import { useEffect } from 'react';

async function handleCredentialResponse(userData) {
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
  const response = await fetch("http://localhost:3000/users/register", {
    method: "POST",
    body: JSON.stringify(packet),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 201) {
    console.log("You have succesfuly registered!");
  } else {
    console.log("This user already exists");
  }
}

function initializeGoogleLogin() {
  google.accounts.id.initialize({
    client_id: '1079428828720-dfo4k6av3jvepch0hmpums7a1agal8dl.apps.googleusercontent.com',   // belongs in .env file
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

export default GoogleLogin;