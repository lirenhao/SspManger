import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/check/merAddon',
    name: '/check/merAddon',
    component: './mer/merAddon/check',
    locale: 'merAddonCheck.title',
    access: 'canShow',
    roles: ['admin', 'MerchantChecker'],
  },
  {
    path: '/check/merQrc',
    name: '/check/merQrc',
    component: './mer/merQrc/check',
    locale: 'merQrcCheck.title',
    access: 'canShow',
    roles: ['admin', 'MerchantChecker'],
  },
  {
    path: '/check/merMdr',
    name: '/check/merMdr',
    component: './mer/merMdr/check',
    locale: 'merMdrCheck.title',
    access: 'canShow',
    roles: ['admin', 'MerchantChecker'],
  },
  {
    path: '/check/appUser',
    name: '/check/appUser',
    component: './app/user/check',
    locale: 'appUser.check.title',
    access: 'canShow',
    roles: ['admin', 'MerchantChecker'],
  },
  {
    path: '/check/ccpay',
    name: '/check/ccpay',
    component: './ccpay/mng/check',
    locale: 'ccpayCheck.title',
    access: 'canShow',
    roles: ['admin', 'MerchantChecker'],
  },
];

export default routes;
