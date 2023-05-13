import { useEffect } from 'react';

function handleCredentialResponse(response) {
  console.log('Encoded JWT', response.credential);
  // Do something with the credential, such as send it to your server for verification
}

function initializeGoogleLogin() {
  google.accounts.id.initialize({
    client_id: '1079428828720-dfo4k6av3jvepch0hmpums7a1agal8dl.apps.googleusercontent.com',
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
/*
function GoogleLogin() {
  useEffect(() => {
    /* global gapi 
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  
    google.accounts.id.initialize({
      client_id: '1079428828720-dfo4k6av3jvepch0hmpums7a1agal8dl.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.querySelector('googleButton'),
      { theme: 'outline', size: 'large' }
    );

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div id="googleButton"></div>
  )
}
*/

export default GoogleLogin;