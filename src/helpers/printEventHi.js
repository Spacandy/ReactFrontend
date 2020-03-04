const chalk = require('chalk');
// prettier-ignore
const printEventHi = () => {
  console.log(chalk.black.bgWhite.bold(`    ___             _   _  _ _    `));
  console.log(chalk.black.bgWhite.bold(`   | __|_ _____ _ _| |_| || (_)   `));
  console.log(chalk.black.bgWhite.bold(`   | _|\\ V / -_) ' \\  _| __ | |   `));
  console.log(chalk.black.bgWhite.bold(`   |___|\\_/\\___|_||_\\__|_||_|_|   `));
  console.log(chalk.black.bgWhite.bold(`                                  `));
};

module.exports = printEventHi;
