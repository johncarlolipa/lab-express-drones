const express = require("express");
const router = express.Router();
const Drone = require("../models/Drone.model");

router.get("/drones", async (req, res, next) => {
  try {
    // Iteration #2: List the drones
    const drones = await Drone.find();
    res.render("drones/list", { drones });
  } catch (error) {
    console.error("Error retrieving drones:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/drones/create", (req, res, next) => {
  // Show a form to create a drone
  res.render("drones/create-form");
});

// routes/drones.js
router.post("/drones/create", async (req, res, next) => {
  // Save a drone to the database
  try {
    const { name, propellers, maxSpeed } = req.body;

    // Create a new drone with the submitted information
    const newDrone = new Drone({
      name,
      propellers,
      maxSpeed,
    });

    // Save the new drone to the database
    await newDrone.save();

    // Redirect to the /drones route after successful creation
    res.redirect("/drones");
  } catch (error) {
    console.error("Error creating a new drone:", error);

    // Render the create-form view again with an error message
    res.render("drones/create-form", {
      error: "Error creating a new drone. Please try again.",
    });
  }
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
