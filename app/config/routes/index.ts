import { IRoute } from 'umi';
import SystemParamRoutes from './systemParam';
import mer from './mer';
import terminal from './terminal';
import user from './user';
import ccpay from './ccpay';
import trans from './trans';
import check from './check';
import settle from './settle';
import risk from './risk';
import other from './other';

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
    access: 'canShow',
    roles: ['admin', 'FinanceOperator'],
  },
  {
    path: '/mer',
    name: 'mer',
    icon: 'shop',
    locale: 'menu.mer',
    routes: mer,
    access: 'canShow',
    roles: ['admin', 'MerchantOperator', 'MerchantChecker'],
  },
  {
    path: '/terminal',
    name: 'terminal',
    icon: 'desktop',
    locale: 'menu.terminal',
    routes: terminal,
    access: 'canShow',
    roles: ['admin', 'MerchantOperator', 'MerchantChecker'],
  },
  {
    path: '/user',
    name: 'merchantUser',
    icon: 'mobile',
    locale: 'menu.merUser',
    routes: user,
    access: 'canShow',
    roles: ['admin', 'MerchantOperator'],
  },
  {
    path: '/ccpay',
    name: 'ccpay',
    icon: 'bank',
    locale: 'menu.ccpay',
    routes: ccpay,
    access: 'canShow',
    roles: ['admin', 'MerchantOperator'],
  },
  {
    path: '/transaction',
    name: 'transaction',
    icon: 'search',
    locale: 'menu.trans',
    routes: trans,
    access: 'canShow',
    roles: ['admin', 'MerchantOperator'],
  },
  {
    path: '/check',
    name: 'check',
    icon: 'checkSquare',
    locale: 'menu.check',
    routes: check,
    access: 'canShow',
    roles: ['admin', 'MerchantChecker'],
  },
  {
    path: '/settle',
    name: 'settle',
    icon: 'unorderedList',
    locale: 'menu.settle',
    routes: settle,
    access: 'canShow',
    roles: ['admin', 'MerchantOperator', 'FinanceOperator', 'FinanceChecker'],
  },
  {
    path: '/risk',
    name: 'risk',
    icon: 'warning',
    locale: 'menu.risk',
    routes: risk,
    access: 'canShow',
    roles: ['admin', 'Risk Operator'],
  },
  {
    path: '/other',
    name: 'other',
    icon: 'ellipsis',
    locale: 'menu.other',
    routes: other,
    access: 'canShow',
    roles: ['admin', 'FinanceOperator', 'MerchantChecker', 'FinanceChecker'],
  },
  {
    component: './404',
  },
] as IRoute[];
