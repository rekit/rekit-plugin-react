const path = require('path');
const build = require('rekit-studio-sdk/lib/build');

build({ pluginDir: path.join(__dirname, '..') });
