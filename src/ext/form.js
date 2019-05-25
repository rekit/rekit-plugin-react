import { Input } from 'antd';
import store from 'rs/common/store';

const byId = id => store.getState().home.elementById[id];
const nameMeta = (label) => ({
  key: 'name',
  label: label || 'Name',
  widget: Input,
  autoFocus: true,
  required: true,
});

export default {
  fillMeta(args) {
    switch (args.formId) {
      case 'react:core.element.add.component':
        args.meta.elements.push(nameMeta(), {
          key: 'componentType',
          label: 'Component Type',
          tooltip: 'Which type of the component to create, class or functional',
          widget: 'radio-group',
          options: [['class', 'Class'], ['function', 'Functional']],
          required: true,
          initialValue: 'class',
        });
        break;
      case 'react:core.element.move.component':
        args.meta.elements.push(nameMeta('New Name'));
        break;
      default:
        break;
    }
  },
  preSubmit(args) {
    return Promise.resolve();
  },
  processValues(args) {
    const { context, values, formId } = args;
    switch (formId) {
      case 'react:core.element.add.component': {
        // const target = context.targetId ? byId(context.targetId) : null; 
        let name = values.name;
        console.log('args:', args)
        const targetId = context.targetId.replace(/^src\/?/, '');// targetId should be folder id
        if (targetId) {
          name = targetId + '/' + name;
        }
        return {
          ...values,
          name,
          commandName: 'add',
          type: context.elementType,
        };
      }
      case 'react:core.element.move.component': {
        const source = context.targetId.replace(/^v:src\/?|\.[jt]sx?$/g, '');
        const arr = source.split('/');
        arr.pop();
        arr.push(values.name);
        const target = arr.join('/');
        return {
          ...values,
          source,
          target,
          commandName: 'move',
          type: context.elementType,
        };
      }
      default:
        break;
    }
    return args;
  },
};
