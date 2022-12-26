// core module
const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');
const validator = require('validator')


const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); 

const question = (input) => {
  return new Promise((resolve, reject) => {
    rl.question(`${input} `, (answer) => {
      resolve(answer);
    });
  });
};

const loadContact = () => {
  const buffer = fs.readFileSync('contacts.json', 'utf8');
  const contacts = JSON.parse(buffer);

  return contacts
}

const saveContact = (name, email, hp) => {
  if (!fs.existsSync('contacts.json'))
    fs.writeFileSync('contacts.json', '[]', 'utf8');

  const newContact = { name, email, hp };
  const contacts = loadContact();

  const duplicate = contacts.find((contact) =>  contact.name === name)
  if (duplicate) {
    console.log(chalk.red.inverse.bold('name already exists'))

    rl.close();
    return false;
  }

  if (email) {
    if (!validator.isEmail(email)){
      console.log(chalk.red.inverse.bold('email not valid'))
      
      rl.close();
      return false;
    }
  }

  if (!validator.isMobilePhone(hp, 'id-ID')){
    console.log(chalk.red.inverse.bold('mobile phone not valid'))
    rl.close()
    return false;
  }

  contacts.push(newContact);

  fs.writeFileSync('contacts.json', JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold(`Thank you.. the new data:`));
  console.log(`name  : ${name}`);
  console.log(`email : ${email}`);
  console.log(`hp.   : ${hp}`);
  rl.close();
};

const listContact = () => {
  const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('List contacts'))
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.hp}`)
  })

  rl.close();
}

const detailContact = (name) => {
  rl.close();
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase() )

  if (!contact) {
    console.log(chalk.red.inverse.bold(`Contact ${name} not found!`))
    return false;
  } 
  
  console.log(chalk.cyan.inverse.bold(`${contact.name} - ${contact.email} - ${contact.hp}`))
}

const deleteContact = (name) => {
  rl.close();
  const contacts = loadContact();
  const newContacts = contacts.filter((contact) => contact.name.toLowerCase() !== name.toLowerCase() )

  if (contacts.length == newContacts.length) {
    console.log(chalk.red.inverse.bold(`Contact ${name} not found!`))
    return false;
  } 

  fs.writeFileSync('contacts.json', JSON.stringify(newContacts));  
  console.log(chalk.cyan.inverse.bold(`Contact ${name} has been deleted`))
}

module.exports = { question, saveContact, listContact, detailContact, deleteContact }







