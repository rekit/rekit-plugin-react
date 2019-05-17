import { Input } from 'antd';
import store from 'rs/common/store';

const byId = id => store.getState().home.elementById[id];
const nameMeta = () => ({
  key: 'name',
  label: 'Name',
  widget: Input,
  autoFocus: true,
  required: true,
});

export default {
  fillMeta(args) {
    switch (args.formId) {
      case 'core.element.add.component':
        args.meta.elements.push(nameMeta(), {
          key: 'type',
          label: 'Component Type',
          tooltip: 'Which type of the component to create, class or functional',
          widget: 'radio-group',
          options: [['class', 'Class'], ['function', 'Functional']],
          required: true,
          initialValue: 'component',
        });
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
      case 'core.element.add.component': {
        const target = context.targetId ? byId(context.targetId) : null;
        if (target) values.dirPath = target.id;
        return {
          ...values,
          commandName: 'add',
          type: context.elementType,
        };
      }
      default:
        break;
    }
    return args;
  },
};
