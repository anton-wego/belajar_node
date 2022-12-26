const validator = require('validator');
const chalk = require('chalk');
// import chalk from 'chalk';


console.log(validator.isEmail("anton@wego.com"));
console.log(validator.isEmail("antonwego.com"));
console.log(validator.isMobilePhone("08112412998", ["id-ID"]));
console.log(validator.isMobilePhone("0821111111", ["id-ID"]));

console.log(chalk.bgWhite.black('Hello world!'));