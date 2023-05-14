const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser")
require("dotenv").config();

const userRoutes = require("./routes/users");
const bookingRoutes = require("./routes/bookings");
const adminRoutes = require("./routes/admin");
const employeeRoutes = require("./routes/employees");
const serviceRoutes = require("./routes/services");
const authentication = require("./middleware/auth")
const statisticRoutes = require("./routes/statistic")

app.use(
  express.json(), 
  cors({ origin: "https://frontend-saloon2.onrender.com", credentials: true }),
  cookieParser()
);

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
app.use("/statistic", statisticRoutes);

app.get("/", (req, res) => {
  res.json("WELCOME TO THE SALOON");
});

app.get("/checkAuth", authentication.authenticateUser,(req, res) => {
  res.json(req.user)
})
