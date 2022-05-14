console.clear();
const path = require('path');
const fsP = require('fs').promises;

async function listDir(dir) {
  const files = await fsP.readdir(dir);
  return files;
}

async function CopyDir(from, to) {

  fsP.mkdir(to, { recursive: true });

  for (const item of await listDir(to)) {
    fsP.unlink(path.join(to, item));
  }

  for (const item of await listDir(from)) {
    fsP.copyFile(path.join(from, item), path.join(to, item));
  }
}

const fromDir = path.join(__dirname, 'files');
const toDir = path.join(__dirname, 'files-copy');

CopyDir(fromDir, toDir);