const path = require('path');
const fs = require('fs');
// const dir = path.dirname('text.txt');
// console.log(dir);
// const p = path.join(__dirname,'text.txt');

// console.log(p);

let ReadStream = fs.createReadStream(path.join(__dirname,'text.txt'), 'utf-8');
ReadStream.on('data',(chunk) => {console.log(chunk);});