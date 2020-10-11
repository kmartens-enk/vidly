const {Customer, validatecustomer} = require('../models/customer');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Customer.find({}, (err, customer) => {
    if (err)
      return res
        .status(500)
        .send("Could not retrieve customer: " + err.message);
    res.send(customers);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Customer.findById(id, (err, customer) => {
    if (err)
      return res
        .status(500)
        .send("could not retrieve customer: " + err.message);
    if (!customer)
      return res.status(404).send(`customer with id ${id} not found`);
    res.send(customer);
  });
});

router.post("/", (req, res) => {
  const { error } = validatecustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = new Customer(req.body);
  customer.save((err, savedcustomer) => {
    if (err)
      return res.status(400).send("Could not save customer: " + err.message);
    res.send(savedcustomer);
  });
});

router.put("/:id", async (req, res) => {
  const { error } = validatecustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const customer = await Customer.findByIdAndUpdate(
    id,
    { name: req.body.name },
    { new: true }
  );
  if (!customer)
    return res.status(404).send(`customer with id ${id} not found`);

  res.send(customer);
});

router.delete("/:id", (req, res) => {
  //find the give id
  const id = req.params.id;
  Customer.findByIdAndRemove(id, (err, customer) => {
    if (err)
      return res.status(500).send("could not delete customer: ", err.message);
    if (!customer)
      return res.status(404).send(`customer with id ${id} not found`);
    res.send(customer);
  });
});

module.exports = router;
