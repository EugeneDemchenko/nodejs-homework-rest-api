const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const contact = await listContacts();
  res.status(200).json({
    status: "success",
    data: {
      contact,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
    return;
  }
  res.status(200).json({
    status: "success",
    data: {
      contact,
    },
  });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      message: validationResult.error.details[0].message,
    });
  }
  const contact = await addContact(req.body);
  res.status(201).json({
    status: "success",
    data: {
      contact,
    },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  res.status(200).json({
    status: "success",
    message: "contact deleted",
  });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      message: validationResult.error.details[0].message,
    });
  }
  const contact = await updateContact(contactId, req.body);
  if (!contact) {
    return res.status(404).json({
      status: "error",
      message: "Not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      contact,
    },
  });
});

module.exports = router;
