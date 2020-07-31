import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  splitMenus: false,
  menu: {
    locale: true,
  },
  title: 'BOC MERCHANT PLATFORM',
  pwa: false,
  iconfontUrl: '',
  siderWidth: '240',
} as LayoutSettings & {
  pwa: boolean;
};
