const Contacts = require("../schemas/contactsSchema");

const getAllcontacts = async (id) => {
  return await Contacts.find({ owner: id });
};

const getContactById = async (contactId, id) => {
  return await Contacts.findOne({ _id: contactId, owner: id });
};

const createContact = (body) => {
  return Contacts.create(body);
};

const updateContact = (contactId, id, body) => {
  return Contacts.findByIdAndUpdate({ _id: contactId, owner: id }, body, {
    new: true,
  });
};

const removeContact = (contactId, id) => {
  return Contacts.findByIdAndRemove({ _id: contactId, owner: id });
};

module.exports = {
  getAllcontacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
