const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "customer",
  mongoose.Schema({
    isGold: Boolean,
    name: { type: String, minlength: 3, required: true },
    phoneNumber: { type: String, minlength: 10 },
  })
);

function validateCustomer(customer) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });
    const result = schema.validate(customer);
    return result;
  }

  exports.Customer = Customer;
  exports.validateCustomer = validateCustomer;
