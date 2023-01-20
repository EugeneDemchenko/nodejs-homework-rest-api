// const mongoose = require("mongoose");
const { SchemaTypes, Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "users",
  },
});

const Contacts = model("Contacts", contactSchema);

module.exports = Contacts;
