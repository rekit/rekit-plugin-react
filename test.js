global.__REKIT_NO_WATCH = true;
const rekit = require('rekit-core');
rekit.core.paths.setProjectRoot(require('./rekit.json').projectRoot);
const app = require('./core/app');
const appData = app.getProjectData();
Object.keys(appData.elementById).forEach(key => console.log(key));

console.log(appData.elements);