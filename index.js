const {
    listContacts,
    getContactById,
    removeContact,
    addContact
  } = require('./contacts');

// console.log(addContact('Mango', 'mango@gmail.com', '322-22-22'));


const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        console.table(listContacts());
      break;

    case 'get':
        if(argv.id){
            getContactById(id);
        }
      else console.log('id not specified');
      break;

    case 'add':
      console.log(addContact(name, email, phone));
      break;

    case 'remove':
       removeContact(id);
        break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

// console.log(getContactById(5));