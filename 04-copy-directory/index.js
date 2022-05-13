console.clear();
const path = require('path');
const fsPromises = require('fs').promises;

async function listDir(dir) {
  const files = await fsPromises.readdir(dir);
  return files;
}

async function CopyDir(from, to) {

  fsPromises.mkdir(to, { recursive: true });

  for (const item of await listDir(to)) {
    fsPromises.unlink(path.join(to, item));
  }

  for (const item of await listDir(from)) {
    fsPromises.copyFile(path.join(from, item), path.join(to, item));
  }
}

const fromDir = path.join(__dirname, 'files');
const toDir = path.join(__dirname, 'files-copy');

CopyDir(fromDir, toDir);