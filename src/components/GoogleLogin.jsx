import { useEffect } from 'react';

function handleCredentialResponse(response) {
  console.log('Encoded JWT', response.credential);
  // decode jwt 
  const jwt = response.credential;
  const jwtParts = jwt.split('.');
  const payload = JSON.parse(atob(jwtParts[1]));    // deprecated decode function but works for now
 
  console.log('Decoded JWT payload', payload);
  
  // Do something with the credential, such as send it to your server for verification
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