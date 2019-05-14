// This script removes the plugin from the global Rekit plugin folder
// The path is: /Users/<username>/.rekit/plugins

const path = require('path');
const undeployPlugin = require('rekit-studio/lib/undeployPlugin');

const root = path.join(__dirname, '..');
undeployPlugin(root);
