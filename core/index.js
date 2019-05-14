// Export plugin here if it extends rekit-core or rekit-studio.

module.exports = {
  app: require('./app'),
  appType: 'react',
  name: 'react',
  elements: {
    component: require('./component'),
  },
};
