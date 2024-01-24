import SvgIcon from './SvgIcon.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

interface IAllComponent {
  [key: string]: any;
}

type IKeys = keyof IAllComponent;

const allGlobalComponent: IAllComponent = {
  SvgIcon,
  ...ElementPlusIconsVue,
};

export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((name: IKeys) => {
      app.component(name, allGlobalComponent[name]);
    });
  },
};
