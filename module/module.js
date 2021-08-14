const fs = require("fs").promises;

async function contactsList(contact) {
  const data = await fs.readFile(contact);
  const contacts = JSON.parse(data);
  return contacts;
}

async function updateContacts(newContacts, contactsPath) {
  const newContactsList = JSON.stringify(newContacts);
  await fs.writeFile(contactsPath, newContactsList);
}

module.exports = {
  contactsList,
  updateContacts,
};
