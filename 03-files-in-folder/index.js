const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, 'secret-folder');

fs.readdir(dir, (error, files) => {
  if (error) throw error;
  files.forEach((file) => {
    file = path.join(dir, file);
    fs.stat(file, (error, stats) => {
      if (error) throw error;
      if (stats.isFile()) {
        console.log(`${path.basename(file, path.extname(file))} - ${path.extname(file).slice(1)} - ${stats.size / 1024}kb`);
      }
    });
  });
});