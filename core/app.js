/* eslint no-loop-func:0 */
const _ = require('lodash');

function processProjectData(prjData) {
  const { elements, elementById } = prjData;
  const byId = id => elementById[id];
  // Here elements is array of all root folders name, e.g. ['config', 'src', 'package.json']
  const children = [...elements];
  // A fake root element

  const handleCid = cid => {
    const child = byId(cid);
    if (child.type === 'folder' && child.children) {
      children.push(...child.children);
      return null;
    }
    if (
      /([A-Z][^.]*)\.[jt]sx?/.test(child.name) &&
      child.deps &&
      _.find(child.deps, { id: 'react' })
    ) {
      // If captilize and imports React it is a component
      const name = RegExp.$1;
      const id = `v:${child.id}`;
      const ele = {
        id,
        name,
        type: 'component',
        navigable: true,
        views: [
          { key: 'diagram', name: 'Diagram' },
          { key: 'code', name: 'Code', target: child.id, isDefault: true },
        ],
        parts: [child.id],
      };
      ['.css', '.less', '.scss'].some(cssExt => {
        const styleFile = child.id.replace(/\.\w+$/, cssExt);
        if (byId(styleFile)) {
          ele.views.push({ key: 'style', name: 'Style', target: styleFile });
          ele.parts.push(styleFile);
          return true;
        }
        return false;
      });
      const testFile = child.id.replace(/\.\w+$/, '.test.js');
      if (byId(testFile)) {
        ele.views.push({ key: 'test', name: 'Test', target: testFile });
        ele.parts.push(testFile);
      }

      elementById[id] = ele;
      return ele;
    }
    return null;
  };
  let current = { children: elements };
  while (children.length) {
    if (current.children) {
      const eles = current.children.map(handleCid);
      eles.forEach(ele => {
        if (ele) {
          current.children.push(ele.id);
          _.pullAll(current.children, ele.parts);
        }
      });
    }
    current = byId(children.pop());
  }
  Object.assign(byId('src'), {
    icon: 'src-folder',
    order: 0,
  });
  return { elements, elementById };
}

module.exports = { processProjectData };
