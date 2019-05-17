import { Modal, message } from 'antd';
import store from 'rs/common/store';
import * as actions from 'rs/features/core/redux/actions';

const showDialog = (...args) => store.dispatch(actions.showDialog(...args));
const execCoreCommand = args => store.dispatch(actions.execCoreCommand(args));

const byId = id => store.getState().home.elementById[id];

const menuItems = {
  del: { name: 'Delete', key: 'del' },
  // move: { name: 'Move', key: 'move' },
  rename: { name: 'Rename', key: 'rename' },
  newComponent: { name: 'Add Component', key: 'new-component' },
};

export default {
  contextMenu: {
    fillMenuItems(items, { elementId }) {
      const ele = byId(elementId);
      if (!ele) return;
      switch (ele.type) {
        case 'folder':
          items.unshift(menuItems.newComponent);
          break;
        case 'component':
          items.push(menuItems.rename, menuItems.del);
          break;
        default:
          break;
      }
    },
    handleMenuClick({ elementId, key }) {
      switch (key) {
        case 'new-component': {
          showDialog('core.element.add.component', 'New Component', {
            action: 'add',
            targetId: elementId,
            elementType: 'component',
          });
          break;
        }
        default:
          break;
      }
    },
  },
};
