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

_admin.js_  

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
_bookings.js_  
_employees.js_  
_mail.js_  
_services.js_  
_statistic.js_  
_users.js_  


