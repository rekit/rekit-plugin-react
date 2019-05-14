const { files, paths } = rekit.core;

function getProjectData() {
  const allFiles = files.readDir(paths.getProjectRoot());
  const { elements, elementById } = allFiles;
  const byId = id => elementById[id];
  // Here elements is array of all root folders name, e.g. ['config', 'src', 'package.json']
  const children = [...elements];
  // A fake root element
  const rootEle = { children: elements };
  let current = { children: elements };
  while(current) {
    const ele = byId(current);
  }

  return { elements: rootEle.elements, elementById };
}

module.exports = { getProjectData };
