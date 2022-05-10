const path = require('path');
const fs = require('fs');
const { stdin } = require('process');
console.log('HI!');
stdin.on('str', (str) => {
  console.log(str);
});
