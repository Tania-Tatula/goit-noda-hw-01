const fs = require('fs').promises;
const path = require('path');
const {v4} = require("uuid");

// const contactsPath = path.resolve('./db/contacts.json');
const contactsPath = path.join(__dirname, './db/contacts.json');

// TODO: задокументировать каждую функцию
const listContacts = async() => {
    try{
const data = await fs.readFile(contactsPath);
const contacts = JSON.parse(data);
console.table(contacts);
return contacts;
    }
    catch(error){
        throw error;
    }
  }
  
  const getContactById = async(contactId) => {
    try{
        const contsctsList = await listContacts();
        const selectContact = contsctsList.find(item => String(item.id) === String(contactId));
        if(!selectContact){
            throw new Error('There is no product with this id');
        }
        console.table(selectContact);
        return selectContact;
            }
            catch(error){
                throw error;
            }
  }
  
  const removeContact = async(contactId) => {
    try{
        const contsctsList = await listContacts();
        const idx = contsctsList.findIndex(item => item.id == contactId);
        if(!idx === -1){
            throw new Error('There is no product with this id');
        }
        const newContacts = contsctsList.filter(item => item.id !== contactId);
        const newContactsList = JSON.stringify(newContacts);
        await fs.writeFile(contactsPath, newContactsList);
        console.table(newContacts);
        return contsctsList[idx];
            }
            catch(error){
                throw error;
            }

  }
  
  const addContact = async(name, email, phone) => {
    try {
    const contsctsList = await listContacts();
    const newContact = {
        "id": v4(),
        "name": name,
        "email": email,
        "phone": phone
      }

      const newContactsList = [...contsctsList, newContact];
      const contactsString = JSON.stringify(newContactsList);
      await fs.writeFile(contactsPath, contactsString);
      console.table(newContact);
      return newContact;
    }
    catch(error){
        throw error;
    }
  }
  
//   listContacts();
  getContactById(5);
// console.log(removeContact('c9d122bf-8546-40d9-8850-086304cc08f7'));
//  console.log(addContact('Mango', 'mango@gmail.com', '322-22-22'));

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }