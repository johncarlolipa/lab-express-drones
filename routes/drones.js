const express = require("express");
const router = express.Router();
const Drone = require("../models/Drone.model");

const renderErrorPage = (res, error, statusCode = 500) => {
  console.error(`Error: ${error.message}`);
  res.status(statusCode).send("Internal Server Error");
};

router.get("/drones", async (req, res, next) => {
  try {
    const drones = await Drone.find();
    res.render("drones/list", { drones });
  } catch (error) {
    renderErrorPage(res, error);
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
    renderErrorPage(res, error);
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  try {
    const drone = await Drone.findById(req.params.id);

    res.render("drones/update-form", { drone });
  } catch (error) {
    renderErrorPage(res, error, 404);
  }
});

router.post("/drones/:id/edit", async (req, res, next) => {
  try {
    await Drone.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/drones");
  } catch (error) {
    renderErrorPage(res, error);
  }
});

router.post("/drones/:id/delete", async (req, res, next) => {
  try {
    await Drone.findByIdAndDelete(req.params.id);

    res.redirect("/drones");
  } catch (error) {
    renderErrorPage(res, error);
  }
});

module.exports = router;
