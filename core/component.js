const _ = require('lodash');
const path = require('path');

module.exports = {
  add(name, args) {
    const { template } = rekit.core;
    if (!args.dirPath) throw new Error('dirPath not found for adding component ' + name);
    const targetPath = path.join(args.dirPath, _.pascalCase(name) + '.js');

    const tplPath = path.join(__dirname, './templates', 'FunctionComponent.js.tpl');
    template.generate(targetPath, {
      templateFile: tplPath,
      context: { name: _.pascalCase(name) },
    });
    // const targetPath =
    console.log('adding elemnet: ', name, args);
  },
};
