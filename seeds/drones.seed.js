// Iteration #1
// seeds/drones.seeds.js
const mongoose = require('mongoose');
const Drone = require('../models/Drone.model');

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

// Establish a connection to the database
mongoose.connect('mongodb://localhost:27017/drones', { useNewUrlParser: true, useUnifiedTopology: true });

// Seed the database
Drone.create(drones)
  .then((createdDrones) => {
    console.log(`${createdDrones.length} drones have been created.`);
  })
  .catch((error) => {
    console.error('Error seeding the database:', error);
  })
  .finally(() => {
    // Close the database connection
    mongoose.connection.close();
  });
