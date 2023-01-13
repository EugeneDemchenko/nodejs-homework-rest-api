const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  getAllcontacts,
  getContactById,
  removeContact,
  createContact,
  updateContact,
  updateStatusContact,
} = require("../../service/index");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get("/", async (req, res, next) => {
  const contact = await getAllcontacts();
  res.send(contact);
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
  res.send(contact);
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
  const contact = await createContact(req.body);
  res.send(contact).status(201);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  res.send(contact);
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
  res.send(contact).status(200);
});
router.patch("/:contactId/favorite", async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const validationResult = favoriteSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      message: "missing field favorite",
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
