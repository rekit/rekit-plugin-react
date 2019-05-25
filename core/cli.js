module.exports = {
  defineArgs: args => {
    args.addCmd.addArgument(['--dir', '-d'], {
      help: 'Where to place the component.',
      dest: 'dirPath',
      defaultValue: 'src',
    });
  },
};
