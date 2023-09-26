// const path = require("path")
const fs = require("fs/promises")
const {program} = require("commander")

const contacts = require('./contacts')

const invokeAction = async ({ action, id, name, email, phone })=>{
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts()
            return console.table(allContacts);
            break;
        case "get":
            const oneContarct = await contacts.getContactById(id)
            return console.log(oneContarct);
            break;
        case "add":
            const newContact = await contacts.addContact(name, email, phone)
            console.log(newContact)
            break;
        case "remove":
            const deleteContact = await contacts.removeContact(id);
            return console.log(deleteContact)
            break;
        default:
      console.warn('\x1B[31m Unknown action type!');
    }
}

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');



program.parse();
const option = program.opts();

invokeAction(option)
