const _ = require('lodash');
const path = require('path');


const pascalCase = _.flow(
  _.camelCase,
  _.upperFirst
);

module.exports = {
  add(name, args) {console.log(name, args);
    const { template } = rekit.core;
    if (!args.dirPath) throw new Error('dirPath not found for adding component ' + name);
    name = pascalCase(name);

    const toGen = [
      {
        targetPath: path.join(args.dirPath, name + '.js'),
        tplPath: path.join(__dirname, './templates', 'FunctionComponent.js.tpl'),
      },
      {
        targetPath: path.join(args.dirPath, name + '.test.js'),
        tplPath: path.join(__dirname, './templates', 'Component.test.js.tpl'),
      },
      {
        targetPath: path.join(args.dirPath, name + '.css'),
        tplPath: path.join(__dirname, './templates', 'Component.css.tpl'),
      },
    ];
    toGen.forEach(({ targetPath, tplPath }) =>
      template.generate(targetPath, {
        templateFile: tplPath,
        context: { name },
      }),
    );
  },
};
