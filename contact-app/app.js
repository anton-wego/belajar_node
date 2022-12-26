const yargs = require('yargs')
const {question, saveContact, listContact, detailContact, deleteContact} = require('./contacts');

// yargs.command('add', 'add new contact', () => {}, (args) => {})

yargs.command({
  command: 'add',
  describe: 'add new contact', 
  builder: {
    name: {
      describe: 'full name',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'email',
      demandOption: false,
      type: 'string'
    },
    hp: {
      describe: 'Mobile Phone',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    saveContact(argv.name, argv.email, argv.hp);
  }
}).demandCommand()


yargs.command({
  command: 'list',
  describe: 'show all name and hp', 
  handler(argv) {
    listContact();
  }
})

yargs.command({
  command: 'detail',
  describe: 'show detail contact', 
  builder: {
    name: {
      describe: 'full name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    detailContact(argv.name);
  }
})

yargs.command({
  command: 'delete',
  describe: 'delete contact', 
  builder: {
    name: {
      describe: 'full name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    deleteContact(argv.name);
  }
})

yargs.parse();

// console.log(yargs.argv);




// session learn one


// const main = async () => {
//   const name = await question('What is you name?');
//   const email = await question('What is you email?');
//   const hp = await question('What is you mobile phone?');

//   saveContact(name, email, hp);

//   console.log(`Thank you.. the new data:`);
//   console.log(`name  : ${name}`);
//   console.log(`email : ${email}`);
//   console.log(`hp.   : ${hp}`);
// }

// main();







