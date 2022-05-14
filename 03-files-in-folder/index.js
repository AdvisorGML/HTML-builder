const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, 'secret-folder');

fs.readdir(dir, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    file = path.join(dir, file);
    fs.stat(file, (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        console.log(`${path.basename(file, path.extname(file))} - ${path.extname(file).slice(1)} - ${stats.size / 1024}kb`);
      }
    });
  });
});