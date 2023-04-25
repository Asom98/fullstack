// event listener for the registration form submit

// HTTP POST request to the backend to register a new user in the database, if user already exists, it will return an error message
async function registerUser() {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const role = document.getElementById('role').value
  const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: username,
          password: password,
          role: role
      })
  })
  const data = await response.json()
  if(data.error) {
      document.getElementById('error').innerHTML = data.error
  } else {
      document.getElementById('error').innerHTML = "User registered succesfully"
  }
}
