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
  res.render("drones/create-form");
});

router.post("/drones/create", async (req, res, next) => {
  try {
    const { name, propellers, maxSpeed } = req.body;

    const newDrone = new Drone({
      name,
      propellers,
      maxSpeed,
    });

    await newDrone.save();

    res.redirect("/drones");
  } catch (error) {
    console.error("Error creating a new drone:", error);

    res.render("drones/create-form", {
      error: "Error creating a new drone. Please try again.",
    });
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  try {
    const drone = await Drone.findById(req.params.id);

    res.render("drones/update-form", { drone });
  } catch (error) {
    console.error("Error retrieving drone for editing:", error);
    res.status(404).render("not-found");
  }
});

router.post("/drones/:id/edit", async (req, res, next) => {
  try {
    await Drone.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/drones");
  } catch (error) {
    console.error("Error updating the drone:", error);

    res.render("drones/update-form", {
      error: "Error updating the drone. Please try again.",
      drone: req.body,
    });
  }
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
