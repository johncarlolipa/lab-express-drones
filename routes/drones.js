const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model');

router.get('/drones', async (req, res, next) => {
  try {
    // Iteration #2: List the drones
    const drones = await Drone.find();
    res.render('drones/list', { drones });
  } catch (error) {
    console.error('Error retrieving drones:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
