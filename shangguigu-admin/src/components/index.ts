import SvgIcon from './SvgIcon.vue';

interface IAllComponent {
  [key: string]: any;
}

type IKeys = keyof IAllComponent;

const allGlobalComponent: IAllComponent = {
  SvgIcon,
};

export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((name: IKeys) => {
      app.component(name, allGlobalComponent[name]);
    });
  },
};
