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
 
### _users.js_  


