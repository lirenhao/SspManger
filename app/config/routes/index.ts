import { IRoute } from "umi";
import SystemParamRoutes from './systemParam';

export default [
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
    routes: SystemParamRoutes,
  },
  {
    component: './404',
  },
] as IRoute[];