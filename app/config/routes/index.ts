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
    path: '/mer',
    name: 'mer',
    icon: 'team',
    locale: 'menu.mer',
    routes: mer,
  },
  {
    path: '/terminal',
    name: 'terminal',
    icon: 'desktop',
    locale: 'menu.terminal',
    routes: terminal,
  },
  // mobile
  {
    path: '/ccpay',
    name: 'ccpay',
    icon: 'bank',
    locale: 'menu.ccpay',
    routes: ccpay,
  },
  {
    path: '/transaction',
    name: 'transaction',
    icon: 'search',
    locale: 'menu.trans',
    routes: trans,
  },
  {
    path: '/check',
    name: 'check',
    icon: 'checkSquare',
    locale: 'menu.check',
    routes: check,
  },
  {
    path: '/settle',
    name: 'settle',
    icon: 'unorderedList',
    locale: 'menu.settle',
    routes: settle,
  },
  {
    path: '/risk',
    name: 'risk',
    icon: 'warning',
    locale: 'menu.risk',
    routes: risk,
  },
  // (other)
  {
    component: './404',
  },
] as IRoute[];
