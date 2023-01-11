const fs = require("fs/promises");
const path = require("path");
const contactsDb = path.resolve(__dirname, "./contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsDb, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredContact = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsDb, JSON.stringify(filteredContact));
  return filteredContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: String(contacts.length + 1),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsDb, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  let contacts = await listContacts();
  contacts.forEach((contact) => {
    if (contact.id === contactId) {
      contact.name = body.name;
      contact.email = body.email;
      contact.phone = body.phone;
    }
  });
  await fs.writeFile(contactsDb, JSON.stringify(contacts));
  return contacts[contactId - 1];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
