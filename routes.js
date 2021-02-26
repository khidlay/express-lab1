"use strict";

// Require the Express module.
const express = require("express");

// Creates a new router object.
const routes = express.Router();

const cartItems = [
  {
    id: 1,
    product: "milk",
    price: 2.5,
    quantity: 1,
  },
  {
    id: 2,
    product: "eggs",
    price: 3.0,
    quantity: 2,
  },
  {
    id: 3,
    product: "butter",
    price: 2.0,
    quantity: 1,
  },
  {
    id: 4,
    product: "bread",
    price: 3.0,
    quantity: 3,
  },
];

// Route
// routes.get("/cartItems", (req, res) => {
// .json sends response as JSON
//   res.json(cartItems);
// });

routes.get("/cartItems", (req, res) => {
  let filteredCartItems = cartItems;
  let maxPrice = req.params.maxPrice;
  let prefix = req.params.prefix;
  let pageSize = req.params.pageSize;
  if (maxPrice) {
    filteredCartItems = filteredCartItems.filter((item) => {
      return item.price <= parseInt(maxPrice);
    });
  }
  if (prefix) {
    filteredCartItems = filteredCartItems.filter((item) => {
      return item.product.toLowerCase().includes(prefix.toLowerCase().trim());
    });
  }
  if (pageSize) {
    filteredCartItems = filteredCartItems.slice(0, parseInt(pageSize));
  }
  res.json(filteredCartItems);
});

routes.get("/cartItems/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let foundCartItem = cartItems.find((item) => {
    return item.id === id;
  });
  if (foundCartItem) {
    res.json(foundCartItem);
    res.status(200);
  } else {
    res.send(`ID Not Found`);
    res.status(404);
  }
});

routes.post("/cartItems", (req, res) => {
  let cart = req.body;
  let nextId = 5;
  cart.id = nextId++;
  cartItems.push(cart);
  res.json(cart);
  res.status(201);
});

// Export routes for use in server.js
module.exports = routes;
