const {Customer, validateCustomer} = require('../models/customer');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find({});
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);
  if (!customer)
    return res.status(404).send(`customer with id ${id} not found`);
  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = new Customer({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    isGold: req.body.isGold});
  await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const customer = await Customer.findByIdAndUpdate(
    id,
    { name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  if (!customer)
    return res.status(404).send(`customer with id ${id} not found`);

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  //find the give id
  const id = req.params.id;
  const customer = await Customer.findByIdAndRemove(id);
  if (!customer)
    return res.status(404).send(`customer with id ${id} not found`);
  res.send(customer);
  
});

module.exports = router;
