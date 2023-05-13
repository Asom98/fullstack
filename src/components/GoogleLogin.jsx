import React, { useEffect } from 'react';

  // do cool stuff when login is successful
  function handleCredentialResponse(response) {
    console.log('Encoded JWT', response.credential);
    // Do something with the credential, such as send it to your server for verification
  }

function GoogleLogin(props) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div id="g_id_onload"
      data-client_id="1079428828720-dfo4k6av3jvepch0hmpums7a1agal8dl.apps.googleusercontent.com"
      data-context="signin"
      data-ux_mode="popup"
      data-callback={props.handleCredentialResponse}
      data-auto_select="true">
    </div>
  );
}

export default GoogleLogin;