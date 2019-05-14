// This is the entry for plugin and used for UI build
import * as ext from './ext';
import route from './common/routeConfig';
import reducer from './common/rootReducer';
import './styles/index.less';

const plugin = {
  ...ext,
  route,
  reducer,
  name: 'react',
};

window.__REKIT_PLUGINS.push(plugin);
