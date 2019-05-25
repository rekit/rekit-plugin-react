module.exports = {
  defineArgs: args => {
    args.addCmd.addArgument(['--type', '-t'], {
      help: 'Which type of the component to create, class or functional.',
      dest: 'componentType',
      choices: ['class', 'functional'],
      defaultValue: 'class',
    });
  },
};
