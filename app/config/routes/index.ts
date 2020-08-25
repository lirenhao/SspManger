import { IRoute } from 'umi';
import SystemParamRoutes from './systemParam';
import mer from './mer';
import terminal from './terminal';
import ccpay from './ccpay';
import trans from './trans';
import check from './check';
import settle from './settle';
import risk from './risk';

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
    path: '/modifyPwd',
    name: 'modifyPwd',
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
    path: '/terminal',
    name: 'terminal',
    icon: 'setting',
    locale: 'menu.terminal',
    routes: terminal,
  },
  {
    path: '/mer',
    name: 'mer',
    icon: 'setting',
    locale: 'menu.mer',
    routes: mer,
  },
  {
    path: '/ccpay',
    name: 'ccpay',
    icon: 'setting',
    locale: 'menu.ccpay',
    routes: ccpay,
  },
  {
    path: '/transaction',
    name: 'transaction',
    icon: 'setting',
    locale: 'menu.trans',
    routes: trans,
  },
  {
    path: '/check',
    name: 'check',
    icon: 'setting',
    locale: 'menu.check',
    routes: check,
  },
  {
    path: '/settle',
    name: 'settle',
    icon: 'setting',
    locale: 'menu.settle',
    routes: settle,
  },
  {
    path: '/risk',
    name: 'risk',
    icon: 'setting',
    locale: 'menu.risk',
    routes: risk,
  },
  {
    component: './404',
  },
] as IRoute[];
