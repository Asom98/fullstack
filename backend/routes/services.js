const express = require('express');
const router = express.Router();

const serviceModel = require("../models/service");

// Get all services
router.get("/getServices", async (req, res) => {
  try {
    const services = await serviceModel.find()
    res.json(services)
  } catch (error) {
    res.status(400).send({ message: error })
  }
});

// use with route.rest file to avoid having to add manually in cloud db
router.post("/createService", (req, res) => {
  try {
    const newService = new serviceModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      duration: req.body.duration,
      employee_ids: req.body.employee_ids
    })
    newService.save()
      .then(result => {
        res.status(201).send({ message: "Service created successfully" })
      })
  } catch (error) {
    res.status(400).send({ message: error })
  }
});

module.exports = router;