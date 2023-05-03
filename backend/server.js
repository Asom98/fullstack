const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const mailer = require("./mailer/mailer")

const userRoutes = require("./routes/users")
const bookingRoutes = require("./routes/bookings")

app.use(
  express.json(), 
  cors({ origin: "http://localhost:5173" }),
);

mongoose.connect(process.env.CONNECTION_URL)
.then(console.log("Connected to Database"));

app.listen(
  process.env.PORT,
  console.log("Now listening on ", process.env.PORT)
);

app.use('/users', userRoutes);
app.use('/bookings', bookingRoutes);

app.get("/", (req,res) => {
  res.json("WELCOME TO THE SALOON")
})
