const _ = require('lodash');
const path = require('path');

const pascalCase = _.flow(
  _.camelCase,
  _.upperFirst,
);

const getCssExt = () => rekit.core.config.getRekitConfig().css || 'css';

module.exports = {
  add(name, args) {
    const { template, config } = rekit.core;
    if (!args.dirPath) throw new Error('dirPath not found for adding component ' + name);
    name = pascalCase(name);
    const tplDir = config.getRekitConfig().templateDir || path.join(__dirname, './templates');
    const toGen = [
      {
        targetPath: path.join(args.dirPath, name + '.js'),
        tplPath: path.join(tplDir, 'FunctionComponent.js.tpl'),
      },
      {
        targetPath: path.join(args.dirPath, name + '.test.js'),
        tplPath: path.join(tplDir, 'Component.test.js.tpl'),
      },
      {
        targetPath: path.join(args.dirPath, name + '.' + getCssExt()),
        tplPath: path.join(tplDir, 'Component.css.tpl'),
      },
    ];
    toGen.forEach(({ targetPath, tplPath }) =>
      template.generate(targetPath, {
        templateFile: tplPath,
        context: { name },
      }),
    );
  },

  remove(name, args) {
    name = pascalCase(name);
    const { vio } = rekit.core;
    const toRemove = [
      path.join(args.dirPath, name + '.js'),
      path.join(args.dirPath, name + '.test.js'),
      path.join(args.dirPath, name + '.css'),
    ];
    toRemove.forEach(file => vio.del(file));
  },
};
