const path = require('path');
const start = require('rekit-studio-sdk/lib/startDevServer');

const root = path.join(__dirname, '..');
start({
  // The project Rekit Studio manages, change it if you don't want Rekit Studio to load the plugin project itself.
  projectRoot: require('../rekit.json').projectRoot || root,
  pluginDir: root,
  port: require('../rekit.json').devPort,
});
