console.clear();
const path = require('path');
const fsP = require('fs').promises;
const fs = require('fs');

async function listCSS(dir) {
  let files = [];
  const list = await fsP.readdir(dir);
  for (const item of list) {
    let file = path.join(dir, item);
    if (path.extname(file) === '.css') {
      const stats = await fsP.stat(file);
      if (stats.isFile()) {
        files.push(item);
      }
    }
  }
  return files;
}

async function BundleCSS(from, to) {

  const ResultCSS = path.join(to, 'bundle.css');

  fs.createWriteStream(ResultCSS, 'utf-8');

  for (const item of await listCSS(from)) {
    let ReadStream = fs.createReadStream(path.join(from, item), 'utf-8');
    ReadStream.on('data', (chunk) => { fs.appendFile(ResultCSS, chunk, (err) => { if (err) throw err; }); });
  }
}

const fromDir = path.join(__dirname, 'styles');
const toDir = path.join(__dirname, 'project-dist');

BundleCSS(fromDir, toDir);