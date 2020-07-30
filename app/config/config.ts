// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Ant Design Pro',
    locale: true,
    siderWidth: 208,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      icon: 'smile',
      component: './Welcome',
    },
    {
      name: 'modifyPwd',
      path: '/account/modifyPwd',
      component: './user/modifyPwd',
      locale: 'menu.modifyPwd',
      hideInMenu: true,
    },
    {
      path: '/systemParam',
      name: 'systemParam',
      icon: 'setting',
      routes: [
        {
          path: '/systemParam/appRole',
          name: 'appRole',
          component: './systemParam/appRole',
        },
        {
          path: '/systemParam/mccCode',
          name: 'mccCode',
          component: './systemParam/mccCode',
        },
        {
          path: '/systemParam/ccyManager',
          name: 'ccyManager',
          component: './systemParam/ccyManager',
        },
        {
          path: '/systemParam/country',
          name: 'country',
          component: './systemParam/country',
        },
      ],
    },
    {
      path: '/',
      redirect: '/welcome',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
