const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport"); //auth library used for facebook login
require("dotenv").config();

const userRoutes = require("./routes/users");
const bookingRoutes = require("./routes/bookings");
const adminRoutes = require("./routes/admin");
const employeeRoutes = require("./routes/employees");
const serviceRoutes = require("./routes/services");

app.use(express.json(), cors({ origin: "http://localhost:5173" }));

// Passport middleware for facebook login
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // persistent login sessions

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(console.log("Connected to Database"));

app.listen(
  process.env.PORT,
  console.log("Now listening on ", process.env.PORT)
);

app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/employees", employeeRoutes);
app.use("/admin", adminRoutes);
app.use("/services", serviceRoutes);

app.get("/", (req, res) => {
  res.json("WELCOME TO THE SALOON");
});
