# Fullstack project - HKR Beauty Salon
 This is a fullstack web-application for a beauty salon.  
   
 __Features:__  
 User registration and login.  
 Registration and login with Google.  
 User profile.  
 Once logged in, the user can book a timeslot for a specific service.  
 The user will be sent a confirmation email for the booking.  
 Once a costumer has spent a certain amount of money, a discount coupon is added to the user profile.  
 
 ## Setting up the project

Install the node modules
```
npm install
```

Run the project
```
npm run dev
```

__Enjoy developing!__  

# Backend
## Middleware
_auth.js_

Check if the role of the logged in user is 'admin' or 'user'
```
function checkRole()
```

Authenticate the user with JWT. Uses cookies for access token.
```
function authenticateUser()
```

## Models
The mongoDB database models are located here.

_admin.js_  
_availableTime.js_  
_booking.js_  
_employee.js_  
_service.js_  
_user.js_  

## Routes
Contains the REST api routes.  

### _admin.js_  
<details>
<summary> Admin routes </summary>  
 
Get users from userModel.
```
/getUsers
```

Get admins from adminModel.
```
/getAdmins
```

Get users by ID.
```
/getUsersById
```

Add a new user.
```
/addUser
```

Add a new admin to the database.
```
/addAdmin
```

Change user data.
```
/updateUser
```

Remove a user.
```
/removeUser
```

Update admin data.
```
/updateAdmin
```

Remote admin from database.
```
/removeAdmin
```
</details>  

### _bookings.js_  
<details>
<summary> Booking routes </summary>  

Get all bookings.
```
/getBookings
```

Get booking with service ID, uses auth middleware.
```
/getBookings/:service_id
```

Get bookings for a specific user, using user ID. Uses auth middleware.
```
/getBookingsByUserId
```

Delete a booking. Contains functionality for managing discount coupons upon booking removal. Will not allow removal of a booking for a timeslot that is less than 24 hours away.
```
/deleteBooking
```

Updates a booking.
```
/updateBooking
```

Adds a new user or admin booking. Also calculates amount of bookings for the user. Handles adding coupons once amount spent hits discount threshold. Handles email validation.
```
/postBooking
```

Get available timeslots for booking.
```
/getAvailableTimeSlots/:service_id/:date
```

Get booking amount for chosen service.
```
/getAmount/:service_id
```

Get booking amount for all services.
```
 /getAmount
```
</details>  

### _employees.js_  

<details>
 <summary>Employee Routes</summary>  
 
Get employee by ID.  
```
 /getEmployees/:ids
```
</details>

### _mail.js_  
<details>
 <summary>Mail Routes</summary>
 
Confirm a booking by sending an email to the customer.  
```
 function confirmBooking()
```
</details>

 
### _services.js_  
<details>
 <summary>Service routes</summary>

Get all services.
```
 /getServices
```
 
Get a service by it's ID.
```
 /getServiceById/:_id
```
 
Create a new service. This is a helper route that can be used in a route.rest file.
```
 /createService
```
</details>

### _statistic.js_  
<details>
 <summary>Statistics routes</summary>  
 
Get total amount of users.
```
/getUsersCount
```

Get total amount of bookings.
```
/getBookingsCount
```

Get user with most bookings.
```
/getMostLoyal
```

Update customer coupon status.
```
/updateUserCoupon
```

Update customer booking.
```
/updateUserBooking
```
</details>
 
### _users.js_  
<details>
 <summary>User routes</summary>  
 
Get user data. Checks if role is user or admin. Uses auth middleware.
```
/getUserData
```

Get user data by ID.
```
/getUserData/:_id
```

Register a new user. Uses bcrypt for password encryption. Returns error if user already exists.
```
/register
```

Register a new admin. Uses bcrypt for password encryption. Returns error if admin already exists.
```
/registerAdmin
```

Login route. Compares pasword input with encrypted password in database. Creates accessToken cookie.
```
/login
```
</details>

# Frontend
The frontend is made using React. It uses components that can be imported to where they're needed.  
## Components  

### _AboutPage.jsx_  

<details>
 <summary>Click me!</summary>  
 

Return the about page code.
```
function AboutPage()
```
</details>
 
### _AdminPage.jsx_  

<details>
 <summary>Click Me!</summary>

Finds the most loyal customer and displays them in a list using .map().
```
function AdminPage()
  useEffect()
    /statistic/getMostLoyal
```
</details>
 
### _Booking.jsx_  

<details>
 <summary>Click Me!</summary>  
 

Handle the booking. 
```
function Booking()
```

Handles booking timeslots. Sets start and end times for the bookings. Displays the booking form.

Set start and end times for bookings. Display the booking form.
```
function handleBooking()
```

Uses .map for timeslots. Goes through timeslots to see if they are available or not.
```
handleNewTimeSlots()
```

Handles fetching the timeslots.
```
function fetchTimeSlots()
  /bookings/getAvailableTimeSlots/${_id}/${selectedDate}
```

Fetch the employees. Can be used for assigning an employee to a specific service.
```
function fetchEmployees()
  /employees/getEmployees/${employee_ids.join(",")}
```
</details>
 
### _Carousel.jsx_  

<details>
 <summary>Click Me!</summary>  

Returns image carousel for the main page.
```
function CarouselComp()
```
</details>
 
 
### _ContactUs.jsx_ 

<details>
 <summary>Click Me!</summary>  

Handles contact page. Uses google maps API for displaying address location on map.
```
ContactUs()
```
</details>
 
### _GoogleLogin.jsx_  

<details>
 <summary>Click Me!</summary>  

Handles the user data returned from pressing google login button. Decoding the incoming JWT to allow for user credential storage in database.  
Clicking the button fetches registration route. If the user already exists, clicking the button will fetch login route.
```
function handleCredentialResponse()
  /users/register
  /users/login
```

Initializes the google login functionality. Renders the google login button.
```
function initializeGoogleLogin()
```

Import API script before calling init function.
```
function GoogleLogin()
```
</details>

### _LoginForm.jsx_  

<details>
 <summary>Click Me!</summary>  
 
Handle login submission. Checks if user is 'user' or 'admin'. Sets login status based on if submission is successful or not.
```
handleLoginSubmit()
  /users/login
```
</details>
 
### _NavigationBar.jsx_  

<details>
 <summary>Click Me!</summary>  

Checks if accessToken cookie exists. Returns true or false.
```
function checkToken()
```
</details>

### _Registration.jsx_  

<details>
 <summary>Click Me!</summary>  

Handles registration form submission. Checks if person registering is 'user' or 'admin'.  
Depending on user role, fetches the appropriate route.
```
function Registration()
  /admin/addAdmin
  /users/register
```

Validates form inputs. Checks for valid text formatting. Checks if both password inputs match.
```
validateForm()
```
</details>


### _Service.jsx_  

<details>
 <summary>Click Me!</summary>  

```
fetchServices()
  /services/getServices
```
</details>

### _User.jsx_  

<details>
 <summary>Click Me!</summary>  

Lets the user change their email on the profile page.
```
handleUpdateEmailClick()
  /admin/updateUser
```

Lets the user change their phone number on the profile page.
```
handleUpdatePhoneNumberClick()
  /admin/updateUser
```

Get booking by user ID. If service ID response is ok, add the new booking.
```
handleUserBookings()
  /bookings/getBookingsByUserId
  /services/getServiceById/${booking.service_id}
```
</details>

### Backgrounds  
Contains larger images used on the page as backgrounds.  

### CSS
Contains CSS files for styling.  

### Images
Contains smaller images used for components such as services.  

### Parts
Contains smaller components such as forms, popup windows, footer, accordions.





