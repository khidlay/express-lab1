"use strict";

// Require the Express module.
const express = require("express");

// Require the router object (and all the defined routes to be used in this file)
const routes = require("./routes");

// Require the Cors module.
const cors = require("cors");

// Creates an instance of an Express server.
const app = express();

// Enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains.
app.use(cors());

// Allow POST and PUT requests to use JSON bodies.
app.use(express.json());

// Use the router object (and all its defined routes)
app.use("/", routes);

// Define a port.
const port = 3000;

// Run the server.
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
