// Init javascript SDK
window.fbAsyncInit = function() {
  FB.init({
    appId      : '177627438568799', // App ID, should probably be in .env file
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins
    version    : 'v16.0' // Specify the Graph API version to use
  });

  // Gets the state of the person visiting this page. Can return one of three states to the callback you provide
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into your app or not
  // These three cases are handled in the callback function
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

// 
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return; 
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

 // This is called with the results from from FB.getLoginStatus()
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // Response object is returned with a field that lets the app know the current login status
  if (response.status === 'connected') {
    loggedIn();
  } else {
    // The person is not logged into your app or we are unable to tell
    console.log('User is not logged in')
  }
}

// Called when someone finishes the Login 
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

// Called after login is successful
// Make calls to Graph API to get user, /me refers to the current user. The callback function recieves user data as an object
function loggedIn() {
  console.log('Fetching your information...');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    // Send the user data to be stored in the database
    // Backend can send back a JWT token
    // Token can then be used to authenticate the user

    // Redirect the user to the logged in version of the site
  });
}