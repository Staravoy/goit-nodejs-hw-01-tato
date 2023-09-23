const path = require("path")
const fs = require("fs/promises")
const { nanoid } = require("nanoid")

// get path for file json
const contactsPath = path.join(__dirname, "db", "contacts.json")

// TODO: задокументувати кожну функцію
//Повертає масив контактів.
const listContacts = async () => {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data);
};
   
const getContactById = async(id) => {
    //Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const allContacts = await listContacts();
    const result = allContacts.find(item => item.id === id)
    return result || null
}

const removeContact = async(id) => {
    // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const allContacts = await listContacts();
    const index = allContacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null
    }
    const [result] = allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return result
}

  //Повертає об'єкт доданого контакту.
const addContact = async(name, email, phone) => {
    const allContacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact
}

module.exports = {listContacts, getContactById, removeContact, addContact}