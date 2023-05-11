# Saloon Api Documentation

## Overview

Welcoem to the Saloon API documentation! This API provides access to a veriety of tools nad services that you can use to enchance you application with our API, some things that you can do is:

- Retrive information about Users
- Retrive information about Times
- Retrive information about Bookings
- Retrive information about Services
- Manage and update information such as name and date

You can make requests to our endpoints using HTTP methods such as GET, POST, PUT, and DELETE. Our API supports JSON for requests and responses.

## Endpoints

Our API provides the endpoints:

### /

METHOD GET
Responses

### /getUserData

METHOD GET

### /register

METHOD POST
Creates a user with the Role being set to User

Request Body

```
{
    username: String
    email: String
    phoneNumber: String
    password: String
}
```

Responses

### /registerAdmin

METHOD POST
Creates a user with the Role being set to Admin
Request Body

```
{
    username: String
    email: String
    phoneNumber: String
    password: String
}
```

Responses

### /login

METHOD POST

Request Body

```
{
    username: String
    password: String
}
```

Responses

### /getBookings

METHOD GET

Responses

### /postBooking

METHOD POST

Request Body

```
{
    service_id : String
    employee_id : String
    startTime: Date
    endTime: Date
    user_id : String
    contact_email: String
    status : Boolean
}
```

Responses

### /getAvailableTimes

METHOD GET

Responses

### /postAvailableTime

METHOD POST

Request Body

```
{
    serviceId: String
    startTime: Date
    endTime: Date
}
```

Responses

### /admin/getUsers

METHOD GET
Returns all the website members as json

Responses

### /admin/addUser

METHOD POST
Add a new member

Request Body

```
{
    username: String
    email: String
    phoneNumber: String
    password: String
}
```

Responses

### /admin/updateUser

METHOD PUT
Update member information by id

Request Body

```
{
    id : String
    username: String
    email: String
    phoneNumber : String
    password: String
}
```

Responses

### /admin/removeUser

METHOD DELETE
Remove member by id

Request Body

```
{
    id : String
}
```

Responses

### /mailer/confirmBooking

METHOD POST
confirm booking by id and send mail

Request Body

```
{
    bookingId : String
}
```

Responses

### /statistic/getBookingsCount

METHOD GET
Get bookings count

Request Body

Responses

### /statistic/getUsersCount

METHOD GET
Get users count

Request Body

Responses

## Parameters

## Responses

## Authentication

## code Exampels

## testing

## Contact information

https://commonmark.org/help/
