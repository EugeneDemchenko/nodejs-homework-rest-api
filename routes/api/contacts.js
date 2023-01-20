const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  getAllcontacts,
  getContactById,
  removeContact,
  createContact,
  updateContact,
} = require("../../service/controllers/contacts");
const { userMiddleware } = require("../../middlewares/user");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get("/", userMiddleware, async (req, res, next) => {
  const contact = await getAllcontacts(req.user._id);
  res.send(contact);
});

router.get("/:contactId", userMiddleware, async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);
  if (!contact) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
    return;
  }
  res.send(contact);
});

router.post("/", userMiddleware, async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
    return;
  }
  const contact = await createContact({
    ...req.body,
    owner: req.user._id,
    favorite: req.body.favorite,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contact,
    },
  });
});

router.delete("/:contactId", userMiddleware, async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId, req.user._id);
  res.status(200).json({
    status: "contact deleted",
  });
});

router.put("/:contactId", userMiddleware, async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      message: validationResult.error.details[0].message,
    });
  }
  const contact = await updateContact(contactId, req.body, req.user._id);
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
  const contact = await updateContact(contactId, req.body, req.user._id);
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
