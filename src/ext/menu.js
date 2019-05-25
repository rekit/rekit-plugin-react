import { Modal, message } from 'antd';
import store from 'rs/common/store';
import * as actions from 'rs/features/core/redux/actions';

const showDialog = (...args) => store.dispatch(actions.showDialog(...args));
const execCoreCommand = args => store.dispatch(actions.execCoreCommand(args));

const byId = id => store.getState().home.elementById[id];

const menuItems = {
  del: { name: 'Delete', key: 'react:del' },
  rename: { name: 'Rename', key: 'react:move-component' },
  newComponent: { name: 'New Component', key: 'react:new-component' },
};

export default {
  contextMenu: {
    fillMenuItems(items, { elementId }) {
      const ele = byId(elementId);
      console.log(ele.parent);
      if (!ele) return;
      switch (ele.type) {
        case 'folder':
          if (ele.id === 'src' || ele.id.startsWith('src/')) items.unshift(menuItems.newComponent);
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
        case 'react:new-component': {
          showDialog('react:core.element.add.component', 'New Component', {
            action: 'add',
            targetId: elementId,
            elementType: 'component',
          });
          break;
        }
        case 'react:move-component': {
          showDialog('react:core.element.move.component', 'Rename Component', {
            action: 'move',
            targetId: elementId,
            elementType: 'component',
          });
          break;
        }
        case 'react:del': {
          Modal.confirm({
            title: 'Are you sure to delete the component?',
            onOk() {
              const ele = byId(elementId);
              if (!ele) {
                Modal.error({
                  title: 'No element to delete',
                  content: `Element not found: ${elementId}`,
                });
                return;
              }

              let name = null;
              switch (ele.type) {
                case 'component':
                  name = ele.id.replace(/^v:src\/|\.[jt]sx?$/g, ''); // v:src/folder/App.js -> folder/App
                  break;
                default:
                  Modal.error({
                    title: 'Unknown element type to delete.',
                    content: `Element type not supported to delete: ${ele.type}`,
                  });
                  return;
              }
              execCoreCommand({
                commandName: 'remove',
                type: ele.type,
                name,
              }).then(
                () => {
                  message.success('Delete element success.');
                },
                err => {
                  Modal.error({
                    title: 'Failed to delete the element',
                    content: err.toString(),
                  });
                },
              );
            },
          });
          break;
        }
        default:
          break;
      }
    },
  },
};
