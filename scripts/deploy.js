// This deploy the production build of the plugin to global Rekit plugin folder
// The path is: /Users/<username>/.rekit/plugins
// After deploy, you need to restart Rekit Studio to load the plugin.

const path = require('path');
const deployPlugin = require('rekit-studio-sdk/lib/deployPlugin');

const root = path.join(__dirname, '..');
deployPlugin(root);
