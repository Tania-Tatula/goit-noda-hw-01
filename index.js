const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      if (argv.id) {
        getContactById(id);
      } else console.log("id not specified");
      break;

    case "add":
      if ((argv.name, argv.email, argv.phone)) {
        addContact(name, email, phone);
      } else console.log("name, email or phone not specified");

      break;

    case "remove":
      if (argv.id) {
        removeContact(id);
      } else console.log("id not specified");

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
