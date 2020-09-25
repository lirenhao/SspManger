import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/check/merAddon',
    name: '/check/merAddon',
    component: './mer/merAddon/check',
    locale: 'merAddonCheck.title',
    access: 'canShow',
    roles: ['admin', 'Merchant Checker'],
  },
  {
    path: '/check/merQrc',
    name: '/check/merQrc',
    component: './mer/merQrc/check',
    locale: 'merQrcCheck.title',
    access: 'canShow',
    roles: ['admin', 'Merchant Checker'],
  },
  {
    path: '/check/merMdr',
    name: '/check/merMdr',
    component: './check/merMdr',
    locale: 'merMdrCheck.title',
    access: 'canShow',
    roles: ['admin', 'Merchant Checker'],
  },
  {
    path: '/check/appUser',
    name: '/check/appUser',
    component: './app/user/check',
    locale: 'appUser.check.title',
    access: 'canShow',
    roles: ['admin', 'Merchant Checker'],
  },
  {
    path: '/check/ccpay',
    name: '/check/ccpay',
    component: './check/ccpay/mng',
    locale: 'ccpayCheck.title',
    access: 'canShow',
    roles: ['admin', 'Merchant Checker'],
  },
];

export default routes;
