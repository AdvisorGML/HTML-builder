console.clear();
const path = require('path');
const fsP = require('fs').promises;
const fs = require('fs');

async function MakeIndex(from, to) {
  let template = await fsP.readFile(path.join(from, 'template.html'), 'utf-8');

  const Tegs = template.match(/{{(.*?)}}/g);

  for (const teg of Tegs) {
    let component = await fsP.readFile(path.join(from, 'components', `${teg.slice(2, -2)}.html`), 'utf-8');
    template = template.replace(teg, component);
  }
  fs.writeFile(path.join(to, 'index.html'), template, (err) => {
    if (err) throw err;
  });
}

async function ListCSS(dir) {
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
  const ResultCSS = path.join(to, 'style.css');

  fs.createWriteStream(ResultCSS, 'utf-8');

  for (const item of await ListCSS(from)) {
    let style = await fsP.readFile(path.join(from, item), 'utf-8');
    fs.appendFile(ResultCSS, `${style}\n`, (err) => {
      if (err) throw err;
    });
  }
}

async function ListDir(dir) {
  const files = await fsP.readdir(dir, { withFileTypes: true });
  return files;
}

async function EmptyDir(from) {
  const FileList = await ListDir(from);
  for (const item of FileList) {
    if (item.isFile()) {
      fsP.unlink(path.join(from, item.name));
    } else {
      await EmptyDir(path.join(from, item.name));
    }
  }
}

async function RemoveDir(from) {
  const FileList = await ListDir(from);
  if (FileList.length === 0) {
    fs.rmdir(from, (err) => {
      if (err) throw err;
    });
  } else {
    for (const item of FileList) {
      RemoveDir(path.join(from, item.name));
    }
  }
}

async function CopyDir(from, to) {
  fsP.mkdir(to, { recursive: true });
  for (const item of await ListDir(from)) {
    if (item.isFile()) {
      fsP.copyFile(path.join(from, item.name), path.join(to, item.name));
    } else {
      CopyDir(path.join(from, item.name), path.join(to, item.name));
    }
  }
}

(async function () {
  const BaseDir = __dirname;
  const BaseAssetsDir = path.join(BaseDir, 'assets');
  const ProjectDir = path.join(BaseDir, 'project-dist');
  const AssetsDir = path.join(ProjectDir, 'assets');
  const CssDir = path.join(BaseDir, 'styles');

  await fsP.mkdir(ProjectDir, { recursive: true });
  await fsP.mkdir(AssetsDir, { recursive: true });
  MakeIndex(BaseDir, ProjectDir);
  BundleCSS(CssDir, ProjectDir);

  //  await fsP.rm(AssetsDir, { recursive: true, force: true });

  await EmptyDir(AssetsDir);
  await RemoveDir(AssetsDir);

  await CopyDir(BaseAssetsDir, AssetsDir);
})();
