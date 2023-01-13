const Contacts = require("./schemas/schema");

const getAllcontacts = async () => {
  return await Contacts.find();
};

const getContactById = async (contactId) => {
  return await Contacts.findById(contactId);
};

const createContact = (body) => {
  return Contacts.create(body);
};

const updateContact = (contactId, body) => {
  return Contacts.findByIdAndUpdate(contactId, body, { new: true });
};

const removeContact = (contactId) => {
  return Contacts.findByIdAndRemove(contactId);
};

const updateStatusContact = (contactId, body) => {
  return Contacts.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  getAllcontacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
