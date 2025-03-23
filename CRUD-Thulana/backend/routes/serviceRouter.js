const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
});

module.exports = router;
