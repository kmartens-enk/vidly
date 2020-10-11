const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "customer",
  mongoose.Schema({
    name: { type: String, minlength: 3, required: true },
    phoneNumber: { type: String, minlength: 10 },
    isGold: {type: Boolean, default: false}
  })
);

function validateCustomer(customer) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      phoneNumber: Joi.string().min(10).required(),
      isGold: Joi.boolean().default(false)
    });
    const result = schema.validate(customer);
    return result;
  }

  exports.Customer = Customer;
  exports.validateCustomer = validateCustomer;
