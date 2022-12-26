// core module
const fs = require('fs');
const readline = require('readline');


// // nulis file sync

// fs.writeFileSync('test1.txt', 'hello world secara syncs\n');


// // baca file sync
// const dataSync = fs.readFileSync('test1.txt', 'UTF-8');
// console.log(dataSync);


// // nulis file async

// fs.writeFile('test2.txt', 'hello world secara asyncs\n', (err) => {
//    console.log(err);
// });

// fs.readFile('test2.txt', 'UTF-8', (e,dataAsync) => {
//   if (e) throw console.log(e);
//   console.log(dataAsync);
// });



// //readline one answer

// const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// rl.question('What is you name? ', (answer) => {
//   console.log(`Thank you for your answer is: ${answer}`);

//   rl.close();

// });


// //readline 2 answer

// const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// rl.question('What is you name? ', (answer) => {
//   rl.question('no hp? ', (hp) => {
//     console.log(`Thank you..`)
//     console.log(`name : ${answer}`);
//     console.log(`hp: ${hp}`);
//     rl.close();
//   })
// });


// readline save json

const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); 
if (!fs.existsSync('contacts.json'))
  fs.writeFileSync('contacts.json', JSON.stringify([]));

rl.question('What is you name? ', (answer) => {
  rl.question('no hp? ', (hp) => {
    const newContact = { 'nama': answer, 'no hp': hp };
    const buffer = fs.readFileSync('contacts.json', 'utf8');
    // console.log(buffer);
    const contacts = JSON.parse(buffer);

console.log(contacts);
    contacts.push(newContact);

    fs.writeFileSync('contacts.json', JSON.stringify(contacts));
    console.log(`Thank you.. the new data:`)
    console.log(`name : ${answer}`);
    console.log(`hp: ${hp}`);
    rl.close();
  })
});








