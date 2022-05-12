console.clear();
const path = require('path');
const fs = require('fs').promises;

async function listDir(dir) {
  const files = await fs.readdir(dir);
  return files;
}

async function CopyDir(from, to) {

  fs.mkdir(to, { recursive: true });

  for (const item of await listDir(to)) {
    fs.unlink(path.join(to, item));
  }

  for (const item of await listDir(from)) {
    fs.copyFile(path.join(from, item), path.join(to, item));
  }
}

const fromDir = path.join(__dirname, 'files');
const toDir = path.join(__dirname, 'files-copy');

CopyDir(fromDir, toDir);