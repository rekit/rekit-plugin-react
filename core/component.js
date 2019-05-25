const _ = require('lodash');
const path = require('path');

const pascalCase = _.flow(
  _.camelCase,
  _.upperFirst,
);

const parseElePath = elePath => {
  const arr = elePath.split('/');
  arr.unshift('src');
  const name = pascalCase(arr.pop()).replace(/\.[jt]sx?$/, '');
  arr.push(name);
  elePath = arr.join('/');
  return {
    name,
    modulePath: elePath + '.js',
    testPath: elePath + '.test.js',
    stylePath: elePath + '.' + (rekit.core.config.getRekitConfig().css || 'css'),
    cssClass: arr.join('-').replace(/^src-/, ''), // uniq css class name
  };
};

module.exports = {
  //elePath: full path of the component under src folder, example: folder/MyComponent
  add(elePath, args) {
    const { template, config } = rekit.core;
    const ele = parseElePath(elePath);
    const tplDir = config.getRekitConfig().templateDir || path.join(__dirname, './templates');
    [
      { target: ele.modulePath, tpl: 'FunctionComponent.js.tpl' },
      { target: ele.testPath, tpl: 'Component.test.js.tpl' },
      { target: ele.stylePath, tpl: 'Component.css.tpl' },
    ].forEach(({ target, tpl }) =>
      template.generate(target, {
        templateFile: path.join(tplDir, tpl),
        context: ele,
      }),
    );
  },

  move(src, dest) {
    const srcEle = parseElePath(src);
    const destEle = parseElePath(dest);
    const { vio, refactor } = rekit.core;

    refactor.updateRefs(srcEle.modulePath, destEle.modulePath); // This should be called before move

    vio.move(srcEle.modulePath, destEle.modulePath);
    vio.move(srcEle.testPath, destEle.testPath);
    vio.move(srcEle.stylePath, destEle.stylePath);

    refactor.renameClassName(destEle.modulePath, srcEle.name, destEle.name); // for class component
    refactor.renameFunctionName(destEle.modulePath, srcEle.name, destEle.name); // for functional component
    refactor.renameCssClassName(destEle.modulePath, srcEle.cssClass, destEle.cssClass);
    refactor.renameCssClassInStyle(destEle.stylePath, srcEle.cssClass, destEle.cssClass);
  },

  remove(elePath) {
    const ele = parseElePath(elePath);
    const { vio } = rekit.core;
    vio.del(ele.modulePath);
    vio.del(ele.testPath);
    vio.del(ele.stylePath);
  },
};
