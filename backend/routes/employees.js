const express = require("express");
const router = express.Router();
require("dotenv").config();

const employeeModel = require("../models/employee");

router.get("/getEmployees/:ids", async (req, res) => {
  const ids = req.params.ids.split(",");
  try {
    const employees = await employeeModel.find({ _id: { $in: [...ids] } });
    res.json(employees);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
