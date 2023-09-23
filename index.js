// const path = require("path")
const fs = require("fs/promises")
const {program} = require("commander")

const contacts = require('./contacts')

const invokeAction = async ({ action, id, name, email, phone })=>{
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts()
            return console.log(allContacts);
        case "get":
            const oneContarct = await contacts.getContactById(id)
            return console.log(oneContarct);
        case "add":
            const newContact = await contacts.addContact(name, email, phone)
            console.log(newContact)
        case "remove":
            const deleteContact = await contacts.removeContact(id);
            console.log(deleteContact)

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
