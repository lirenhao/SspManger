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
      path: '/',
      redirect: '/welcome',
    },
    {
      path: '/welcome',
      name: 'welcome',
      icon: 'home',
      component: './Welcome',
      hideInMenu: true,
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
      locale: 'menu.systemParam',
      routes: [
        {
          path: '/systemParam/merchant',
          name: 'merchant',
          component: './info/merchant',
          locale: 'merchant.title',
        },
        {
          path: '/systemParam/termSn',
          name: 'termSn',
          component: './info/termSn',
          locale: 'termSn.title',
        },
        {
          path: '/systemParam/apiOrg',
          name: 'apiOrg',
          component: './api/org',
          locale: 'apiOrg.title',
        },
        {
          path: '/systemParam/apiOrgMapping',
          name: 'apiOrgMapping',
          component: './api/org/mapping',
          locale: 'apiOrg.mapping.title',
        },
        {
          path: '/systemParam/appRole',
          name: 'appRole',
          component: './systemParam/appRole',
          locale: 'menu.appRole',
        },
        {
          path: '/systemParam/mccCode',
          name: 'mccCode',
          component: './systemParam/mccCode',
          locale: 'menu.mccCode',
        },
        {
          path: '/systemParam/currency',
          name: 'currency',
          component: './systemParam/ccyManager',
          locale: 'menu.currency',
        },
        {
          path: '/systemParam/country',
          name: 'country',
          component: './systemParam/country',
          locale: 'menu.country',
        },
        {
          path: '/systemParam/banks',
          name: 'bank list',
          component: './systemParam/banks',
          locale: 'menu.banks',
        },
        {
          path: '/systemParam/cardbin',
          name: 'bank list',
          component: './systemParam/cardbin',
          locale: 'menu.cardbin',
        },
        {
          path: '/systemParam/orgZmk',
          name: 'orgzmk',
          component: './systemParam/orgZmk',

          locale: 'menu.orgZmk',
        },
        {
          path: '/systemParam/orgTmk',
          name: 'orgtmk',
          component: './systemParam/orgTmk',
          locale: 'menu.orgtmk',
        },
        {
          path: '/systemParam/uploadTmk',
          name: 'uploadTmk',
          component: './systemParam/uploadTmk',
          locale: 'menu.uploadTmk',
        },
        {
          path: '/systemParam/policy',
          name: 'policy',
          component: './systemParam/policy',
          locale: 'policy.title',
        },
      ],
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
