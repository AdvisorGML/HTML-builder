const path = require('path');
const fs = require('fs');
const { stdin: input } = require('process');
const readline = require('readline');

const rl = readline.createInterface({ input });

console.log('Enter the text. To complete the input, enter "exit" or click "Ctrl+c"');

const file = path.join(__dirname, 'text.txt');
fs.createWriteStream(file, 'utf-8');

rl.on('line', (line) => {
  if (line === 'exit') {
    console.log('Good bye!!!');
    process.exit(0);
  }
  fs.appendFile(file, `${line}\n`, (err) => { if (err) throw err; });
});

process.on('SIGINT', () => {
  console.log('\nGood bye!!!');
  process.exit(0);
});